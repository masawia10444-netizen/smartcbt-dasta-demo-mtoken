import { updateProfile } from "@/utils/cms/adapters/website/users/profile";
import { listApplications, registerUser, removeUser } from "@/utils/cms/adapters/website/users/register";
import { RegisterUser, UpdateProfile } from "@/utils/cms/adapters/website/users/types/user";
import { getProfile, loginEmail } from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // demo data

  const email: string | null = "pasin3@harmonyx.co";
  const password: string | null = "Password1234";
  const appCode: string = "PORTAL";
  const resLogin = await loginEmail(email, password, appCode);

  const dataUpdateProfile: UpdateProfile = {
    first_name: "Pasinsskk",
    last_name: "testUpdate",
    // password: "Password1234",
  };

  // const removeUserResponse = await handleRemoveUser(String(resLogin.access_token), appCode, "Password1234");

  // const registerUserDataResponse = await registerUserData({
  //   email: "pasin5@harmonyx.co",
  //   mobile: "081239995",
  //   password: "Password1234",
  // });

  // const listApplicationsResponse = await handleListApplications(String(resLogin.access_token), appCode);

  const updateProfileResponse = await handleUpdateProfile(String(resLogin.access_token), appCode, dataUpdateProfile);
  return (
    <>
      {/* <h1>registerUserDataResponse</h1>
      <br />
      {registerUserDataResponse}
      <br />
      <br /> */}
      {/* <h1>removeUserResponse</h1>
      <br />
      {removeUserResponse}
      <br /> */}
      {/* <h1>listApplicationsResponse</h1>
      <br />
      {listApplicationsResponse} */}
      <h1>updateProfileResponse</h1>
      <br />
      {updateProfileResponse}
    </>
  );
}

// demo response
// {
//    "access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMzN2Y5ZGZkLTY5M2UtNGE3Zi05OTFlLWViNjdkOTA0YjY0YSIsInJvbGUiOiI0YjQzYzE2MS02MDAyLTQwNmItODc5Yy05NDRhZmFmNzU5ODgiLCJhcHBfYWNjZXNzIjp0cnVlLCJhZG1pbl9hY2Nlc3MiOmZhbHNlLCJpYXQiOjE2OTc2OTE2MDUsImV4cCI6MTY5NzY5MjUwNSwiaXNzIjoiZGlyZWN0dXMifQ.mPASq2BxwImaAcZtmb8-PcXovwrQW6MA618wAOhty8g",
//    "expires":900000,
//    "refresh_token":"_hfjARQjy8z4pM4HXHb_vy2LhIJZR4Y2Ax2G7kapl7KSWSz0Qw5V9nJH-KoYauez",
//    "expires_at":1697692506048
// }

async function registerUserData(user: RegisterUser) {
  const res = await registerUser(user);
  return JSON.stringify(res);
}

async function handleRemoveUser(token: string, appCode: string, password: string) {
  const profile = await getProfile(token, appCode);
  const res = await removeUser(profile.user_id.id, {
    email: profile.email,
    password: password,
  });
  return JSON.stringify(res);
}

async function handleListApplications(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await listApplications();
  return JSON.stringify(res);
}
async function handleUpdateProfile(token: string, appCode: string, dataUpdateProfile: UpdateProfile) {
  const profile = await getProfile(token, appCode);
  const res = await updateProfile(profile, dataUpdateProfile);
  return JSON.stringify(res);
}
