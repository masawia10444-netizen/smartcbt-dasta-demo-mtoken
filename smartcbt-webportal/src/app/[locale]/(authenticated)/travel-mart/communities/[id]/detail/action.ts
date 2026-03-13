"use server";

import useCookies from "@/hooks/useCookies";
import { REQUEST_BY } from "@/utils/cms/adapters/website/constants";
import {
  Profile,
  acceptScheduleId,
  changeSlotScheduleId,
  checkCommunityAlreadyeRequestByCommunityId,
  checkCommunityWaitingAcceptByCommunityId,
  getProfile,
  matchingBusiness,
  rejectShceduleId,
} from "@/utils/cms/cms-api-adapter";
import { isEmpty, isNil } from "lodash";

export type CheckCommunityJSON = Awaited<ReturnType<typeof fetchCheckCommunity>>;

export async function fetchCheckCommunity(profile: Profile, communityId: number) {
  if (!isEmpty(profile.organizations)) {
    const waitingAcceptCommunity = await checkCommunityWaitingAcceptByCommunityId(profile, communityId);
    const requestByCommunity = await checkCommunityAlreadyeRequestByCommunityId(profile, communityId);

    // console.log("waitingAcceptCommunity", waitingAcceptCommunity);
    // console.log("requestByCommunity", requestByCommunity);
    // console.log("isNil(waitingAcceptCommunity)", !isNil(waitingAcceptCommunity));

    const result = !isNil(waitingAcceptCommunity)
      ? { ...waitingAcceptCommunity, is_waiting: true }
      : { ...requestByCommunity, is_waiting: false };

    return result;
  }
}

export async function handleMatchingBusiness(body: Record<string, any | string>, requestBy: REQUEST_BY) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  if (profile) {
    const data = {
      slotId: body.dateSelect.time.id,
      requestBy: requestBy,
      profile: profile,
      communityId: body.communityId ?? undefined,
      organizationId: body.organizationId ?? undefined,
      guideRequestFlag: body.dateSelect.needGuide,
    };
    const result = await matchingBusiness(data);
    return result;
  }
  throw Error("Not Found Profile");
}

export async function handleAccept(scheduleId?: string | number) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  if (profile && scheduleId) {
    const result = await acceptScheduleId(profile, scheduleId as number);
    return result;
  }
  throw Error("Not Found Profile");
}

export async function handleChangeSlot(body: Record<string, any | string>, scheduleId?: string | number) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  if (profile && scheduleId) {
    const result = await changeSlotScheduleId({
      profile: profile,
      scheduleId: scheduleId as number,
      slotId: body.changeTime.time.id,
    });
    return result;
  }
  throw Error("Not Found Profile");
}

export async function handleReject(body: Record<string, any | string>, scheduleId?: string | number) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  if (profile) {
    const result = await rejectShceduleId(profile, scheduleId as number, body.other);
    return result;
  }
  throw Error("Not Found Profile");
}

export async function handleConfirmReschedule(scheduleId?: string | number) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  if (profile) {
    const result = await acceptScheduleId(profile, scheduleId as number);
    return result;
  }
  throw Error("Not Found Profile");
}
