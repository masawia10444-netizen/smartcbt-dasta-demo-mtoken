import { getProfile, loginEmail, loginMobile } from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // Initiate both requests in parallel

  const email: string | null = "smtvhet.uthong@gmail.com";
  const mobile: string | null = "0929142899";
  const password: string | null = "cbt0929142899";
  const appCode: string = "BUSINESS";

  // 200 Success
  const successEmailData = await handleLoginEmail(email, password, appCode);
  const successMobileData = await handleLoginMobile(mobile, password, appCode);
  const profileData = await handleGetProfile(String(successEmailData.access_token), appCode);

  const jsonSuccessEmail = JSON.stringify(successEmailData);

  // 401 Not Authorize
  // const successData = await handleLoginEmail("test@test.com", password, appCode);
  // const mobileData = await handleLoginMobile("0911111111", password, appCode);

  return (
    <>
      <h1>login response</h1>
      <br />
      {jsonSuccessEmail}
      <hr />
      <h1>login mobile response</h1>
      <br />
      {successMobileData}
      <hr />
      <h1>profile response</h1>
      <br />
      {profileData}
      <hr />
    </>
  );
}

async function handleLoginEmail(email: string, password: string, appCode: string) {
  const res = await loginEmail(email, password, appCode);
  return res;
}

async function handleLoginMobile(mobile: string, password: string, appCode: string) {
  const res = await loginMobile(mobile, password, appCode);
  return JSON.stringify(res);
  // return { token: res.access_token, data: JSON.stringify(res) };
}

async function handleGetProfile(token: string, appCode: string) {
  const res = await getProfile(token, appCode);
  return JSON.stringify(res);
}
