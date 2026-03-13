import { getRequestApiCountFilter, rateLimitConfig } from "@/utils/cms/adapters/website/api-management/rate-limit";
import { forgetPassword, resetPassword } from "@/utils/cms/adapters/website/users/register";
import {
  CreateOnBoardingApiManagement,
  CreateUserExternal,
  USER_ROLE_CODE,
  addIpAddress,
  fetchApiOnBoardingToken,
  fetchPolicies,
  generateToken,
  getProfile,
  getProfileApiOnBoarding,
  listIpRestriction,
  onBoardingApiManagement,
  registerExternalUser,
  removeIpAddress,
  updateOnBoarding,
} from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // Initiate both requests in parallel

  const email: string | null = "external+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "APM";

  const body: CreateUserExternal = {
    email,
    password,
    organization: "test",
    consents: [1, 2],
  };

  const onBoardingBody: CreateOnBoardingApiManagement = {
    mobile: "0877777777",
    organization: "test",
    firstName: "fisrt",
    lastName: "last",
  };

  const jwtToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYjUwYTk4ZS01YTMwLTQyNGYtOWEyZC01MWZhYmY5NWU1ZjkiLCJlbWFpbCI6InRhbmFwb2wrMUBoYXJtb255eC5jbyIsImV4cCI6MTY5OTI1MjY4NywiaWF0IjoxNjk5MjUxNzg3fQ.1_31zexJ318TLBk-YjTiN7nX602wy2XeA1fRQW9v3MA";

  // const res = await loginEmail(email, password, appCode);
  // const token = await handleGetToken(String(res.access_token), appCode);

  const registerResult = await registerExternalUser(body);
  // const registerResult = await handleOnBoardingApiManagement(String(res.access_token), appCode, onBoardingBody);

  // const token = await handleGenerateToken(String(res.access_token), appCode);
  // const profile = await handleGetProfile(String(res.access_token), appCode);

  // add ip restriction
  // const ipRestriction = await handleListIpRestriction(String(res.access_token), appCode);
  const ip = "172.28.0.8";
  // const result = await handleAddIpAddress(String(res.access_token), appCode, ip);
  // const resultRemoveIp = await handleRemoveIpAddress(String(res.access_token), appCode, ip);

  // await handleForgetPassword(email);
  // await handleResetPassword(jwtToken, password);
  const policy = await handlePolicies("APM");

  // update profile
  // const updateProfile = await handleUpdateProfile(String(res.access_token), appCode, onBoardingBody);

  // const rateLimit = await handleGetRateLimit(String(res.access_token), appCode);

  // const rateLimitChart = await handleRateLimitChart(String(res.access_token), appCode, {
  //   start: "2023-09-01T00:00:00.000Z",
  //   end: "2023-11-13T12:00:00.000Z",
  // });

  return (
    <>
      {/* <h1>Token</h1>
      <br />
      {token}
      <hr /> */}
      {/* <h1>Profile</h1>
      <br />
      {profile}
      <hr /> */}
      {/* <h1>Policy</h1>
      <br />
      {policy}
      <hr />
      <h1>IP Restriction</h1>
      <br />
      {ipRestriction}
      <hr /> */}
      {/* <h1>Rate Limit</h1>
      <br />
      {rateLimit}
      <hr /> */}
      {/* <h1>Rate Limit Chart</h1>
      <br />
      {rateLimitChart} */}
    </>
  );
}

async function handleGenerateToken(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await generateToken(profile);
  return res;
}

async function handleGetToken(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  return fetchApiOnBoardingToken(profile);
}

async function handleOnBoardingApiManagement(token: string, appCode: string, body: CreateOnBoardingApiManagement) {
  const profile = await getProfile(token, appCode);
  return onBoardingApiManagement(profile, body, USER_ROLE_CODE.INTERNAL);
}

async function handleGetProfile(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const boarding = await getProfileApiOnBoarding(profile);

  return JSON.stringify(boarding);
}

async function handleUpdateProfile(token: string, appCode: string, body: CreateOnBoardingApiManagement) {
  const profile = await getProfile(token, appCode);
  const result = await updateOnBoarding(profile, body);
  return result;
}

async function handleForgetPassword(email: string) {
  await forgetPassword(email);
}

async function handleResetPassword(token: string, newPassword: string) {
  await resetPassword(token, newPassword);
}

async function handlePolicies(appCode: string) {
  const policy = await fetchPolicies(appCode, "privacy");
  return JSON.stringify(policy);
}

async function handleListIpRestriction(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const list = await listIpRestriction(profile);
  return JSON.stringify(list);
}

async function handleAddIpAddress(token: string, appCode: string, ipAddress: string) {
  const profile = await getProfile(token, appCode);
  const list = await addIpAddress(profile, ipAddress);
  return JSON.stringify(list);
}

async function handleRemoveIpAddress(token: string, appCode: string, ipAddress: string) {
  const profile = await getProfile(token, appCode);
  const list = await removeIpAddress(profile, ipAddress);
  return JSON.stringify(list);
}

async function handleGetRateLimit(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const config = await rateLimitConfig(profile);
  return JSON.stringify(config);
}

async function handleRateLimitChart(token: string, appCode: string, query: { start: string; end: string }) {
  const profile = await getProfile(token, appCode);
  const config = await getRequestApiCountFilter(profile, query);
  return JSON.stringify(config);
}
