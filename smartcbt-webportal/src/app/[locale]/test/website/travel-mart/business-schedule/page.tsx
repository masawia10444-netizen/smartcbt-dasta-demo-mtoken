import {
  acceptScheduleId,
  changeSlotScheduleId,
  checkCommunityAlreadyeRequestByCommunityId,
  checkCommunityWaitingAcceptByCommunityId,
  checkOrganizationAlreadyeRequestByOrganizationId,
  checkOrganizationWaitingAcceptByOrganizationId,
  fetchBusinessMatchingCount,
  fetchCommunityScheduleAccepted,
  fetchCommunityScheduleHistory,
  fetchCommunityScheduleRequest,
  fetchCommunityScheduleSlotsByCommunityId,
  fetchCommunityScheduleSlotsByOrganizationId,
  fetchCommunityScheduleWaitingAccept,
  fetchOrganizationById,
  getProfile,
  loginEmail,
  matchingBusiness,
  rejectShceduleId,
} from "@/utils/cms/cms-api-adapter";
import { isEmpty, isNil } from "lodash";

export default async function Page() {
  // Initiate both requests in parallel

  const communityId: number | null = 2;
  const organizationId: number | null = 3;
  const scheduleId: number | null = 97;

  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  // const email: string | null = "smtvhet.uthong@gmail.com";
  // const password: string | null = "cbt0929142899";
  const appCode: string = "BUSINESS";

  const resLogin = await loginEmail(email, password, appCode);

  const schedulesSlotsByCommunityId = await getCommunityScheduleSlotsByCommunityId(
    String(resLogin.access_token),
    appCode,
    communityId
  );
  const schedulesSlotsByOrganizationId = await getCommunityScheduleSlotsByOrganizationId(
    String(resLogin.access_token),
    appCode,
    organizationId
  );
  const waitingAccept = await getCommunityScheduleWaitingAccept(String(resLogin.access_token), appCode);
  const requestList = await getCommunityScheduleRequest(String(resLogin.access_token), appCode);
  const acceptList = await getCommunityScheduleAccepted(String(resLogin.access_token), appCode);
  const historyList = await getCommunityScheduleHistory(String(resLogin.access_token), appCode);
  const countList = await handleMatchingBusinessCount(String(resLogin.access_token), appCode);
  const resultCheckCommunity = await handleCheckCommunity(String(resLogin.access_token), appCode, communityId);
  const resultCheckOrganization = await handleCheckOrganization(String(resLogin.access_token), appCode, organizationId);
  const organizationInfo = await handleFetchOrganizationById(organizationId);

  // const resultAccept = await handleAcceptScheduleById(String(resLogin.access_token), appCode, scheduleId);
  // const resultReject = await handleRejectScheduleById(String(resLogin.access_token), appCode, scheduleId, note);
  // const slotId: string = "4aed9fae-fc25-4427-a4e9-2e2d276e0d7a";
  // const resultChangeSlot = await handleChangeSlotScheudle({
  //   token: String(resLogin.access_token),
  //   appCode,
  //   scheduleId,
  //   slotId,
  // });

  // business request to community use community id
  // const requestBy = REQUEST_BY.ORGANIZATION;
  // const requestCommunityId = 1;
  // const slotId: string | null = "ad1173d2-d4d2-410e-affa-03a58c5f71f0";
  // const resultMatching = await handleMatchingBusiness({
  //   token: String(resLogin.access_token),
  //   appCode,
  //   slotId,
  //   requestBy,
  //   guideRequestFlag: false,
  //   communityId: requestCommunityId,
  // });

  // community request to business use business id
  // const requestBy = REQUEST_BY.COMMUNITY;
  // const requestOrganizationId = 3;
  // const slotId: string | null = "981ce83e-aacd-4f16-8f17-fada4fdc72c9";
  // const resultMatching = await handleMatchingBusiness({
  //   token: String(resLogin.access_token),
  //   appCode,
  //   slotId,
  //   requestBy,
  //   guideRequestFlag: false,
  //   organizationId: requestOrganizationId,
  //   // communityId: requestCommunityId,
  // });

  return (
    <>
      <h1>slots by community id</h1>
      <br />
      {schedulesSlotsByCommunityId}
      <hr />
      <h1>slots by organization id</h1>
      <br />
      {schedulesSlotsByOrganizationId}
      <hr />
      <h1>waiting accept</h1>
      <br />
      {waitingAccept}
      <hr />
      <h1>request list</h1>
      <br />
      {requestList}
      <hr />
      <h1>accept list</h1>
      <br />
      {acceptList}
      <hr />
      <h1>history list</h1>
      <br />
      {historyList}
      <hr />
      <h1>count list</h1>
      <br />
      {countList}
      <hr />
      {/* <h1>result matching</h1>
      <br />
      {resultMatching}
      <hr /> */}
      <h1>result check community</h1>
      <br />
      {resultCheckCommunity}
      <hr />
      <h1>result check organiztion</h1>
      <br />
      {resultCheckOrganization}
      <hr />
      <h1>organization info</h1>
      <br />
      {organizationInfo}
      <hr />
      {/* <h1>result accept</h1>
      <br />
      {resultAccept}
      <hr /> */}
    </>
  );
}

async function getCommunityScheduleSlotsByCommunityId(token: string, appCode: string, communityId: number) {
  await getProfile(token, appCode);
  const res = await fetchCommunityScheduleSlotsByCommunityId(communityId);
  return JSON.stringify(res);
}

async function getCommunityScheduleSlotsByOrganizationId(token: string, appCode: string, organizationId: number) {
  await getProfile(token, appCode);
  const res = await fetchCommunityScheduleSlotsByOrganizationId(organizationId);
  return JSON.stringify(res);
}

async function getCommunityScheduleWaitingAccept(token: string, appCode: string) {
  // flow for get
  // 1. login
  // 2. get profile
  // 3. use organization id to query
  const profile = await getProfile(token, appCode);

  if (!isEmpty(profile.organizations)) {
    const list = await fetchCommunityScheduleWaitingAccept(profile.organizations[0].id);
    return JSON.stringify(list);
  }
  fetchCommunityScheduleAccepted;
  return null;
}

async function getCommunityScheduleRequest(token: string, appCode: string) {
  // flow for get
  // 1. login
  // 2. get profile
  // 3. use organization id to query
  const profile = await getProfile(token, appCode);

  if (!isEmpty(profile.organizations)) {
    const list = await fetchCommunityScheduleRequest(profile.organizations[0].id);
    return JSON.stringify(list);
  }
  return null;
}

async function handleCheckCommunity(token: string, appCode: string, communityId: number) {
  const profile = await getProfile(token, appCode);

  if (!isEmpty(profile.organizations)) {
    const waitingAcceptCommunity = await checkCommunityWaitingAcceptByCommunityId(profile, communityId);
    const requestByCommunity = await checkCommunityAlreadyeRequestByCommunityId(profile, communityId);

    const result = !isNil(waitingAcceptCommunity)
      ? { ...waitingAcceptCommunity, is_waiting: true }
      : !isNil(requestByCommunity)
      ? { ...requestByCommunity, is_waiting: false }
      : null;

    return JSON.stringify(result);
  }
}

async function handleCheckOrganization(token: string, appCode: string, organizationId: number) {
  const profile = await getProfile(token, appCode);

  if (!isEmpty(profile.organizations)) {
    const waitingAcceptOrganization = await checkOrganizationWaitingAcceptByOrganizationId(profile, organizationId);
    const requestByOrganization = await checkOrganizationAlreadyeRequestByOrganizationId(profile, organizationId);

    const result = !isNil(waitingAcceptOrganization)
      ? { ...waitingAcceptOrganization, is_waiting: true }
      : !isNil(requestByOrganization)
      ? { ...requestByOrganization, is_waiting: false }
      : null;

    return JSON.stringify(result);
  }
}

async function getCommunityScheduleAccepted(token: string, appCode: string) {
  // flow for get
  // 1. login
  // 2. get profile
  // 3. use organization id to query
  const profile = await getProfile(token, appCode);

  if (!isEmpty(profile.organizations)) {
    const list = await fetchCommunityScheduleAccepted(profile.organizations[0].id);
    return JSON.stringify(list);
  }
  return null;
}
async function getCommunityScheduleHistory(token: string, appCode: string) {
  // flow for get
  // 1. login
  // 2. get profile
  // 3. use organization id to query
  const profile = await getProfile(token, appCode);

  if (!isEmpty(profile.organizations)) {
    const list = await fetchCommunityScheduleHistory(profile.organizations[0].id);
    return JSON.stringify(list);
  }
  return null;
}

async function handleMatchingBusiness(body: {
  token: string;
  appCode: string;
  slotId: string;
  requestBy: string;
  guideRequestFlag: boolean;
  organizationId?: number;
  communityId?: number;
}) {
  // flow
  // 1. login
  // 2. get profile
  const profile = await getProfile(body.token, body.appCode);

  try {
    const res = await matchingBusiness({
      ...body,
      profile,
    });
    return JSON.stringify(res);
  } catch (e) {
    return JSON.stringify({ status: "failed" });
  }
}

async function handleAcceptScheduleById(token: string, appCode: string, scheduleId: number) {
  // flow
  // 1. login
  // 2. get profile
  const profile = await getProfile(token, appCode);

  try {
    const res = await acceptScheduleId(profile, scheduleId);
    return JSON.stringify(res);
  } catch (e) {
    console.log("E: ", e);
    return JSON.stringify({ status: "failed" });
  }
}

async function handleRejectScheduleById(token: string, appCode: string, scheduleId: number, note?: string) {
  // flow
  // 1. login
  // 2. get profile
  const profile = await getProfile(token, appCode);

  try {
    const res = await rejectShceduleId(profile, scheduleId, note);
    return JSON.stringify(res);
  } catch (e) {
    console.log("E: ", e);
    return JSON.stringify({ status: "failed" });
  }
}

async function handleChangeSlotScheudle(body: { scheduleId: number; token: string; appCode: string; slotId: string }) {
  // flow
  // 1. login
  // 2. get profile
  const profile = await getProfile(body.token, body.appCode);

  try {
    const res = await changeSlotScheduleId({ profile, ...body });
    return JSON.stringify(res);
  } catch (e) {
    console.log("E: ", e);
    return JSON.stringify({ status: "failed" });
  }
}

async function handleMatchingBusinessCount(token: string, appCode: string) {
  // flow for get
  // 1. login
  // 2. get profile
  const profile = await getProfile(token, appCode);

  try {
    if (!isEmpty(profile.organizations)) {
      const list = await fetchBusinessMatchingCount(profile.organizations[0].id);
      return JSON.stringify(list);
    }
  } catch (e) {
    console.log("e: ", e);
    return e;
  }
}

async function handleFetchOrganizationById(organizationId: number) {
  const organization = await fetchOrganizationById(organizationId);
  return JSON.stringify(organization);
}
