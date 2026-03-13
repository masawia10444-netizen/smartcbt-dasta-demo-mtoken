"use server";
import { Profile } from "@/utils/cms/adapters/authen";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import {
  fetchCommunityScheduleRequest,
  fetchCommunityScheduleWaitingAccept,
  fetchScheduleById,
} from "@/utils/cms/cms-api-adapter";
import { createItem, readItems, updateItem } from "@directus/sdk";
import { isEmpty, isNil, some } from "lodash";
import { REQUEST_BY, SCHEDULE_STATUS } from "../../constants";
import { BusinessAppointmentSlot, BusinessCommunitySchedule } from "../types/travel-mart";

const AVAILABLE = "available";

async function checkCommunityAlreadyeRequestByCommunityId(profile: Profile, communityId: number) {
  // list waiting this community accept
  const list = await fetchCommunityScheduleRequest(profile.organizations[0].id);

  return list.find((item) => item.community_id == communityId) || null;
}

async function checkCommunityWaitingAcceptByCommunityId(profile: Profile, communityId: number) {
  // list community that request to business
  const list = await fetchCommunityScheduleWaitingAccept(profile.organizations[0].id);
  // find by community id

  return list.find((item) => item.community_id == communityId) || null;
}

// use organization id
async function checkOrganizationAlreadyeRequestByOrganizationId(
  profile: Profile,
  organizationId: number,
  communityOrganizationId?: string
) {
  // list waiting this community accept
  let list
  if (communityOrganizationId) {
    list = await fetchCommunityScheduleRequest(Number(communityOrganizationId));
  } else {
    // list = await fetchCommunityScheduleRequest(profile.organizations[0].id);
    return null;
  }
  // const list = await fetchCommunityScheduleRequest(profile.organizations[0].id);

  return list.find((item) => item.organization_id == organizationId) || null;
}

async function checkOrganizationWaitingAcceptByOrganizationId(
  profile: Profile,
  organizationId: number,
  communityOrganizationId?: string
) {
  // list community that request to business
  if (!communityOrganizationId) {
    return null;
  }
  const list = await fetchCommunityScheduleWaitingAccept(Number(communityOrganizationId));
  // find by community id

  return list.find((item) => item.organization_id == organizationId) || null;
}

async function matchingBusiness(body: {
  slotId: string;
  requestBy: string;
  profile: Profile;
  communityId?: number;
  organizationId?: number;
  guideRequestFlag?: boolean;
}): Promise<{ status: string }> {
  // get slot info
  const slotInfos = await cmsApi.request<BusinessAppointmentSlot[]>(
    withRevalidate(
      readItems<BusinessAppointmentSlot, never, Record<string, any>>("business_appointment_slots" as never, {
        fields: [
          "available_slot",
          "date",
          "start_time",
          "end_time",
          "schedules",
          "schedules.community",
          "schedules.organization",
        ],
        filter: {
          id: {
            _eq: body.slotId,
          },
          status: {
            _eq: AVAILABLE,
          },
          available_slot: {
            _gte: 1,
          },
        },
      }),
      0
    )
  );

  if (isEmpty(slotInfos)) {
    throw new Error("slot-unavailable");
  }

  const slotInfo = slotInfos[0];

  const isUsed = some(slotInfo.schedules, (schedule: BusinessCommunitySchedule) => {
    // organization request to community if have only one schedule has same id that means unavailable
    if (!isNil(body.communityId) && body.requestBy == REQUEST_BY.ORGANIZATION) {
      return schedule.community == body.communityId;
    } else if (!isNil(body.organizationId) && body.requestBy == REQUEST_BY.COMMUNITY) {
      // community request to organization if have only one schedule has same id that means unavailable
      return schedule.organization == body.organizationId;
    }
  });

  if (isUsed) {
    throw new Error("slot-unavailable");
  }

  let organizationId = body.organizationId;
  let communityId = body.communityId;

  if (body.requestBy == REQUEST_BY.ORGANIZATION && !isEmpty(body.profile.organizations)) {
    organizationId = body.profile.organizations[0].id;
  } else if (body.requestBy == REQUEST_BY.COMMUNITY && !isEmpty(body.profile.communities)) {
    communityId = body.profile.communities[0].id;
  }

  await cmsApi.request(
    createItem("business_community_schedules", {
      date: slotInfo.date,
      start_time: slotInfo.start_time,
      end_time: slotInfo.end_time,
      community: communityId,
      organization: organizationId,
      community_request: body.requestBy == REQUEST_BY.COMMUNITY ? communityId : null,
      organization_accept: body.requestBy == REQUEST_BY.COMMUNITY ? organizationId : null,
      community_accept: body.requestBy == REQUEST_BY.ORGANIZATION ? communityId : null,
      organization_request: body.requestBy == REQUEST_BY.ORGANIZATION ? organizationId : null,
      request_by: body.requestBy,
      guide_request_flag: body.guideRequestFlag ?? false,
      user_request: body.profile.id,
      status: "published",
      slot: body.slotId,
      schedule_status: SCHEDULE_STATUS.PENDING,
    })
  );

  // update slot status
  const avaialbleSlot = Number(slotInfo.available_slot) - 1;
  const slotStatus = avaialbleSlot > 0 ? "available" : "unavailable";

  await cmsApi.request(
    updateItem("business_appointment_slots", body.slotId, { status: slotStatus, available_slot: avaialbleSlot })
  );

  return { status: "success" };
}

async function acceptScheduleId(profile: Profile, scheduleId: number) {
  const schedule = await fetchScheduleById(scheduleId);
  const organizationIds: number[] = profile.organizations.map((organization) => Number(organization.id));

  if (
    !isEmpty(schedule) &&
    schedule.status == SCHEDULE_STATUS.PENDING || schedule.status == SCHEDULE_STATUS["CHANGE-SLOT"] &&
    ((schedule.request_by == REQUEST_BY.COMMUNITY && organizationIds.includes(Number(schedule.organization_id))) ||
      (schedule.request_by == REQUEST_BY.ORGANIZATION &&
        organizationIds.includes(Number(schedule.organization_by_community))))
  ) {
    await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        updateItem("business_community_schedules", scheduleId, {
          schedule_status: SCHEDULE_STATUS.OPEN,
          note: null,
        }),
        0
      )
    );
    return { status: "success" };
  }
  throw new Error("unprocessable-content");
}

async function rejectShceduleId(profile: Profile, scheduleId: number, note?: string) {
  const schedule = await fetchScheduleById(scheduleId);

  const organizationIds = profile.organizations.map((organization) => Number(organization.id));

  // check permission for reject
  if (
    !isEmpty(schedule) &&
    schedule.status == SCHEDULE_STATUS.PENDING || schedule.status == SCHEDULE_STATUS["CHANGE-SLOT"] &&
    ((schedule.request_by == REQUEST_BY.COMMUNITY && organizationIds.includes(Number(schedule.organization_id))) ||
      (schedule.request_by == REQUEST_BY.ORGANIZATION &&
        organizationIds.includes(Number(schedule.organization_by_community))))
  ) {
    await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        updateItem("business_community_schedules", scheduleId, {
          schedule_status: SCHEDULE_STATUS.REJECTED,
          note: !isNil(note) ? note : null,
        }),
        0
      )
    );

    const slotInfo = schedule.slot;

    const avaialbleSlot = Number(slotInfo.available_slot) + 1;

    const slotStatus = avaialbleSlot > 0 ? "available" : "unavailable";

    await cmsApi.request(
      updateItem("business_appointment_slots", String(slotInfo.id), {
        status: slotStatus,
        available_slot: avaialbleSlot,
      })
    );

    return { status: "success" };
  }
  throw new Error("unprocessable-content");
}

async function changeSlotScheduleId(body: { profile: Profile; scheduleId: number; slotId: string }) {
  const schedule = await fetchScheduleById(body.scheduleId);

  const organizationIds = body.profile.organizations.map((organization) => Number(organization.id));

  // check permission for reject
  if (
    !isEmpty(schedule) &&
    schedule.status == SCHEDULE_STATUS.PENDING &&
    ((schedule.request_by == REQUEST_BY.COMMUNITY && organizationIds.includes(Number(schedule.organization_id))) ||
      (schedule.request_by == REQUEST_BY.ORGANIZATION &&
        organizationIds.includes(Number(schedule.organization_by_community))))
  ) {
    // new slot
    const slotInfos = await cmsApi.request<BusinessAppointmentSlot[]>(
      withRevalidate(
        readItems<BusinessAppointmentSlot, never, Record<string, any>>("business_appointment_slots" as never, {
          fields: [
            "available_slot",
            "date",
            "start_time",
            "end_time",
            "schedules",
            "schedules.community",
            "schedules.organization",
          ],
          filter: {
            id: {
              _eq: body.slotId,
            },
            status: {
              _eq: AVAILABLE,
            },
            available_slot: {
              _gte: 1,
            },
          },
        }),
        0
      )
    );

    if (isEmpty(slotInfos)) {
      throw new Error("slot-unavailable");
    }

    const slotInfo = slotInfos[0];
    const scheduleSlotInfo = schedule.slot;

    const requestBy = schedule.request_by == REQUEST_BY.ORGANIZATION ? REQUEST_BY.COMMUNITY : REQUEST_BY.ORGANIZATION;

    let organizationId = schedule.organization_id;
    let communityId = schedule.community_id;

    if (requestBy == REQUEST_BY.ORGANIZATION && !isEmpty(body.profile.organizations)) {
      organizationId = body.profile.organizations[0].id;
    } else if (requestBy == REQUEST_BY.COMMUNITY && !isEmpty(body.profile.communities)) {
      communityId = schedule.community_id;
    }

    const isUsed = some(slotInfo.schedules, (schedule: BusinessCommunitySchedule) => {
      // organization request to community if have only one schedule has same id that means unavailable
      if (!isNil(communityId) && requestBy == REQUEST_BY.ORGANIZATION) {
        return schedule.community == communityId;
      } else if (!isNil(organizationId) && requestBy == REQUEST_BY.COMMUNITY) {
        // community request to organization if have only one schedule has same id that means unavailable
        return schedule.organization == organizationId;
      }
    });

    if (isUsed) {
      throw new Error("slot-unavailable");
    }

    await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        updateItem("business_community_schedules", schedule.id, {
          schedule_status: SCHEDULE_STATUS["CHANGE-SLOT"],
          date: slotInfo.date,
          start_time: slotInfo.start_time,
          end_time: slotInfo.end_time,
          community_request: requestBy == REQUEST_BY.COMMUNITY ? communityId : null,
          organization_accept: requestBy == REQUEST_BY.COMMUNITY ? organizationId : null,
          community_accept: requestBy == REQUEST_BY.ORGANIZATION ? communityId : null,
          organization_request: requestBy == REQUEST_BY.ORGANIZATION ? organizationId : null,
          request_by: requestBy,
          has_change_slot: true,
          user_request: body.profile.id,
          slot: body.slotId,
          note: "ต้องการเปลี่ยนเวลาการเจรจา",
        }),
        0
      )
    );

    const scheduleAvaialbleSlot = Number(scheduleSlotInfo.available_slot) + 1;

    const scheduleSlotStatus = scheduleAvaialbleSlot > 0 ? "available" : "unavailable";

    await cmsApi.request(
      updateItem("business_appointment_slots", String(scheduleSlotInfo.id), {
        status: scheduleSlotStatus,
        available_slot: scheduleAvaialbleSlot,
      })
    );

    // update slot status
    const avaialbleSlot = Number(slotInfo.available_slot) - 1;
    const slotStatus = avaialbleSlot > 0 ? "available" : "unavailable";

    await cmsApi.request(
      updateItem("business_appointment_slots", body.slotId, { status: slotStatus, available_slot: avaialbleSlot })
    );

    return { status: "success" };
  }
  throw new Error("unprocessable-content");
}

async function ratingSchedule(scheduleId: number, rating: number, type: "community" | "organization") {
  try {
    if (type === "organization") {
      await cmsApi.request(
        withRevalidate(
          // @ts-ignore
          updateItem("business_community_schedules", scheduleId, {
            community_rating: rating,
          }),
          0
        )
      );
      return { status: "success" };
    } else if (type === "community") {
      await cmsApi.request(
        withRevalidate(
          // @ts-ignore
          updateItem("business_community_schedules", scheduleId, {
            organization_rating: rating,
          }),
          0
        )
      );
      return { status: "success" };
    }
  } catch (error) {
    console.error(error);
    throw new Error("unprocessable-content");
  }
}

export {
  acceptScheduleId,
  changeSlotScheduleId,
  checkCommunityAlreadyeRequestByCommunityId,
  checkCommunityWaitingAcceptByCommunityId,
  checkOrganizationAlreadyeRequestByOrganizationId,
  checkOrganizationWaitingAcceptByOrganizationId,
  matchingBusiness,
  ratingSchedule,
  rejectShceduleId,
};
