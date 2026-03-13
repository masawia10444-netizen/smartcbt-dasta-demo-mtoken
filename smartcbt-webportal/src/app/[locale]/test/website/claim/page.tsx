import { createCommunnityClaim, listRequestCommunity } from "@/utils/cms/adapters/website/claim/claim-community";
import { createOrganizationClaim, listRequestOrganization } from "@/utils/cms/adapters/website/claim/claim-organization";
import { getProfile, loginEmail } from "@/utils/cms/cms-api-adapter";
export default async function Page() {
  // demo data

  const email: string | null = "pasin3@harmonyx.co";
  const password: string | null = "Password1234";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);

  const getListRequestCommunityData = await requestCommunity(String(resLogin.access_token), appCode);

  //   const claimCommunityRequest = await createCommunityRequest({ community: 2 });

  const getListRequestOrganizationData = await requestOrganization(String(resLogin.access_token), appCode);

    const claimOrganizationRequest = await createOrganizationRequest({ organization: 566 });

  return (
    <>
      <h1>getListRequestCommunityData</h1>
      <br />
      {getListRequestCommunityData}
      <br />
      <br />
      {/* <h1>claimCommunityRequest</h1>
      <br />
      {claimCommunityRequest}
      <br />
      <br /> */}

      <h1>getListRequestOrganizationData</h1>
      <br />
      {getListRequestOrganizationData}
      <br />
      <br />
      {/* <h1>claimOrganizationRequest</h1>
      <br />
      {claimOrganizationRequest} */}
      <br />
      <br />
    </>
  );
}

async function requestCommunity(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await listRequestCommunity(profile);
  return JSON.stringify(res);
}

async function createCommunityRequest(payload: { community: number }) {
  const res = await createCommunnityClaim(payload);
  return JSON.stringify(res);
}

async function requestOrganization(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await listRequestOrganization(profile);
  return JSON.stringify(res);
}

async function createOrganizationRequest(payload: { organization: number }) {
  const res = await createOrganizationClaim(payload);
  return JSON.stringify(res);
}