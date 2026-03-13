import { listContactus } from "@/utils/cms/adapters/website/contact-us/contact-us";
import { getProfile, loginEmail } from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // demo data

  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);

  const getListContactusData = await getListContactus(String(resLogin.access_token), appCode);

  return (
    <>
      <h1>getListContactusData</h1>
      <br />
      {getListContactusData}
      <br />
      <br />
    </>
  );
}

async function getListContactus(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await listContactus();
  return JSON.stringify(res);
}
