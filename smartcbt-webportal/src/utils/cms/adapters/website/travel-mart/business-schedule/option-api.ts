"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { fetchCommunityById } from "@/utils/cms/cms-api-adapter";
import { Collection } from "@/utils/cms/cms-type";
import { QueryFilter, readItem, readItems } from "@directus/sdk";
import { every, isEmpty } from "lodash";
import { transformOrganizationInfo, transformSchedule, transformSlot } from ".";
import { REQUEST_BY, SCHEDULE_STATUS } from "../../constants";
import {
  BusinessAppointmentSlot,
  BusinessCommunitySchedule,
  Community,
  Organization,
  Schedule,
} from "../types/travel-mart";

const AVAILABLE = "available";

async function fetchCommunityScheduleSlotsByCommunityId(communityId: number) {
  const date = new Date().toISOString().split("T")[0];

  const res: BusinessAppointmentSlot[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("business_appointment_slots", {
        fields: ["*", "schedules.community"],
        filter: {
          status: {
            _eq: AVAILABLE,
          },
          available_slot: {
            _gte: 1,
          },
          date: {
            _gte: date,
          },
        },
        limit: "-1",
        sort: "start_time",
      }),
      0
    )
  );

  const community = await fetchCommunityById(communityId);

  if (isEmpty(res))
    return {
      community,
      slots: [],
    };

  const slots = await transformSlot(
    res.filter((item) =>
      every(item.schedules, (schedule: BusinessCommunitySchedule) => schedule.community != communityId)
    )
  );

  return {
    community,
    slots,
  };
}

async function fetchCommunityScheduleSlotsByOrganizationId(organizationId: number) {
  const date = new Date().toISOString().split("T")[0];
  const res: BusinessAppointmentSlot[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("business_appointment_slots", {
        fields: ["*", "schedules.organization"],
        filter: {
          status: {
            _eq: AVAILABLE,
          },
          available_slot: {
            _gte: 1,
          },
          date: {
            _gte: date,
          },
        },
        limit: "-1",
        sort: "start_time",
      }),
      0
    )
  );

  const organization = await fetchOrganizationById(organizationId);

  const slots = await transformSlot(
    res.filter((item) =>
      every(item.schedules, (schedule: BusinessCommunitySchedule) => schedule.organization != organizationId)
    )
  );

  return {
    organization: {
      id: organization.id,
      title: organization.title,
      province_title: organization.province_title,
    },
    slots,
  };
}

async function fetchCommunityScheduleWaitingAccept(organizationId: number) {
  // request type and id is the same
  // ex: request by community and community->organization id is equal profile that mean user has request
  const filter: QueryFilter<Collection["business_community_schedules"], Collection["business_community_schedules"]> = {
    status: {
      _eq: "published",
    },
    schedule_status: {
      _in: [SCHEDULE_STATUS.PENDING, SCHEDULE_STATUS["CHANGE-SLOT"]],
    },
    _or: [
      {
        community_request: {
          organization: {
            id: {
              _eq: organizationId,
            },
          },
        },
      },
      {
        organization_request: {
          id: {
            _eq: organizationId,
          },
        },
      },
    ],
  };

  const res: BusinessCommunitySchedule[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems<BusinessCommunitySchedule>("business_community_schedules", {
        fields: [
          "*",
          "organization.*",
          "community.*",
          "community.organization.*",
          "organization.province.*",
          "community.organization.province.*",
        ],
        filter,
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  const promiseList = res.map((item) => transformSchedule(item, organizationId)) ?? [];
  const result = await Promise.all(promiseList);

  return result;
}

async function fetchCommunityScheduleRequest(organizationId?: number) {
  if (!organizationId) return [];

  const filter: QueryFilter<Collection["business_community_schedules"], Collection["business_community_schedules"]> = {
    status: {
      _eq: "published",
    },
    schedule_status: {
      _in: [SCHEDULE_STATUS.PENDING, SCHEDULE_STATUS["CHANGE-SLOT"]],
    },
    _or: [
      {
        community_accept: {
          organization: {
            id: {
              _eq: organizationId,
            },
          },
        },
      },
      {
        organization_accept: {
          id: {
            _eq: organizationId,
          },
        },
      },
    ],
  };

  const res: BusinessCommunitySchedule[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems<BusinessCommunitySchedule>("business_community_schedules", {
        fields: [
          "*",
          "organization.*",
          "community.*",
          "community.organization.*",
          "community.organization.province.title",
          "organization.province.*",
          "organization.dasta_business_type.title",
        ],
        filter,
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  const promiseList = res.map((item) => transformSchedule(item, organizationId)) ?? [];
  const result = await Promise.all(promiseList);

  return result;
}

async function fetchCommunityScheduleAccepted(organizationId: number) {
  const filter: QueryFilter<Collection["business_community_schedules"], Collection["business_community_schedules"]> = {
    status: {
      _eq: "published",
    },
    schedule_status: {
      _eq: SCHEDULE_STATUS.OPEN,
    },
    _or: [
      {
        community: {
          organization: {
            id: {
              _eq: organizationId,
            },
          },
        },
      },
      {
        organization: {
          id: {
            _eq: organizationId,
          },
        },
      },
    ],
  };

  const res: BusinessCommunitySchedule[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems<BusinessCommunitySchedule>("business_community_schedules", {
        fields: ["*", "organization.*", "community.*", "community.organization.*", "community.organization.province.*"],
        filter,
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  const promiseList = res.map((item) => transformSchedule(item, organizationId)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function fetchCommunityScheduleHistory(
  organizationId: number,
  raw = false
): Promise<Schedule[] | BusinessCommunitySchedule[]> {
  const filter: QueryFilter<Collection["business_community_schedules"], Collection["business_community_schedules"]> = {
    status: {
      _eq: "published",
    },
    _or: [
      {
        community: {
          organization: {
            id: {
              _eq: organizationId,
            },
          },
        },
      },
      {
        organization: {
          id: {
            _eq: organizationId,
          },
        },
      },
    ],
  };

  const res: BusinessCommunitySchedule[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems<BusinessCommunitySchedule>("business_community_schedules", {
        fields: [
          "*",
          "organization.*",
          "community.*",
          "community.organization.*",
          "organization.province.*",
          "community.organization.province.title",
        ],
        filter,
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  if (raw) {
    return res;
  }

  const resultPromise = res.map((item) => transformSchedule(item, organizationId));

  return await Promise.all(resultPromise);
}

async function fetchBusinessMatchingCount(organizationId: number) {
  const history: BusinessCommunitySchedule[] = (await fetchCommunityScheduleHistory(
    organizationId,
    true
  )) as BusinessCommunitySchedule[];
  const countList = {
    request: 0,
    waiting_accept: 0,
    open: 0,
    history: 0,
  };

  if (!isEmpty(history)) {
    history.forEach((item) => {
      const community = item?.community as Community;
      const organizaitonByCommunity = community?.organization as Organization;
      const organization = item?.organization as Organization;

      if (item.schedule_status == SCHEDULE_STATUS.PENDING || item.schedule_status == SCHEDULE_STATUS["CHANGE-SLOT"]) {
        // if organization in profile == oreganization that request is in waiting accept
        if (
          (item.request_by == REQUEST_BY.ORGANIZATION && organization?.id == organizationId) ||
          (item.request_by == REQUEST_BY.COMMUNITY && organizaitonByCommunity?.id == organizationId)
        ) {
          countList.waiting_accept += 1;
        } else if (
          // if organization in profile == oreganization that has requested is in waiting accept
          (item.request_by == REQUEST_BY.COMMUNITY && organization?.id == organizationId) ||
          (item.request_by == REQUEST_BY.ORGANIZATION && organizaitonByCommunity?.id == organizationId)
        ) {
          countList.request += 1;
        }
      } else if (item.schedule_status == SCHEDULE_STATUS.OPEN) {
        countList.open += 1;
      }

      countList.history += 1;
    });
  }

  return countList;
}

async function fetchScheduleById(scheduleId: number) {
  const res: BusinessCommunitySchedule = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem<BusinessCommunitySchedule>("business_community_schedules", scheduleId, {
        fields: ["*", "organization.*", "community.*", "community.organization.*", "slot.*"],
      }),
      0
    )
  );

  return transformSchedule(res);
}

async function fetchOrganizationById(organizationId: number) {
  const res: BusinessCommunitySchedule = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem<BusinessCommunitySchedule>("organizations", organizationId, {
        fields: [
          "*",
          "dasta_business_type.*",
          "csr_types.*",
          "csr_types.csr_types_id.*",
          "province.*",
          "province.*",
          "district.*",
          "subdistrict.*",
        ],
      }),
      0
    )
  );

  return transformOrganizationInfo(res);
}

async function fetchOrganizationRatingByOrganizationId(organizationId: number) {
  const [response] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("rating", {
        fields: ["rating"],
        filter: {
          organizations: {
            _eq: organizationId,
          },
        },
        sort: "-id",
        limit: 1,
      }),
      0
    )
  );
  return response?.rating ?? 0;
}

export {
  fetchOrganizationRatingByOrganizationId,
  fetchBusinessMatchingCount,
  fetchCommunityScheduleAccepted,
  fetchCommunityScheduleHistory,
  fetchCommunityScheduleRequest,
  fetchCommunityScheduleSlotsByCommunityId,
  fetchCommunityScheduleSlotsByOrganizationId,
  fetchCommunityScheduleWaitingAccept,
  fetchOrganizationById,
  fetchScheduleById,
};
