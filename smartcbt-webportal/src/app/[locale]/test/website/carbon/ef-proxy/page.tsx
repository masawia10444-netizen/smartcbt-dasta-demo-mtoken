import {
  createEmissionFactorProxy,
  getEmissionFactorProxy,
  listEmissionFactorProxy,
  updateEmissionFactorProxy,
  uploadRegisteredAttachments,
} from "@/utils/cms/adapters/website/carbon/emission-factor-proxy";
import { EmissionFactorProxyType } from "@/utils/cms/adapters/website/carbon/types";
import { fetchFolderIdByName, getProfile, loginEmail } from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);

  const proxyBody: EmissionFactorProxyType = {
    emission_factor_unit: 1,
    pcr_type: 1,
    sort: null,
    status: "draft",
    emission_factor_value: 12,
    name: "รถตู้s",
    unit: "km",
    tooltip_flag: true,
    tooltip_data: "test",
    files: [
        // {
        //   directus_files_id: "98051358-ce24-4a1c-8886-2644a0f8dd71",
        // },
    ],
  };
  const fetchListDataEfProxyData = await fetchListDataEfProxy(String(resLogin.access_token), appCode);
  const fetchEmissionFactorProxyByIdData = await fetchEmissionFactorProxyById(
    String(resLogin.access_token),
    appCode,
    13
  );

    // const createEmissionFactorProxyDataData = await createEmissionFactorProxyData(
    //   String(resLogin.access_token),
    //   appCode,
    //   proxyBody
    // );

  const updateEmissionFactorProxyDataData = await updateEmissionFactorProxyData(
    String(resLogin.access_token),
    appCode,
    3,
    proxyBody
  );

  return (
    <>
      {/* <h1>fetchListDataEfProxyData</h1>
        <br />
        {fetchListDataEfProxyData}
        <hr /> */}
      <h1>fetchEmissionFactorProxyByIdData</h1>
      <br />
      {fetchEmissionFactorProxyByIdData}
      <hr />
      {/* <h1>createEmissionFactorProxyDataData</h1>
      <br />
      {createEmissionFactorProxyDataData}
      <hr /> */}
      {/* <h1>updateEmissionFactorProxyDataData</h1>
      <br />
      {updateEmissionFactorProxyDataData}
      <hr /> */}
      {/* <h1>handleUploadFile</h1>
      <br />
      {await handleUploadFile(String(resLogin.access_token), appCode)}
      <hr /> */}
    </>
  );
}

async function fetchListDataEfProxy(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await listEmissionFactorProxy(profile);
  return JSON.stringify(res);
}

async function fetchEmissionFactorProxyById(token: string, appCode: string, id: number) {
  const profile = await getProfile(token, appCode);
  const res = await getEmissionFactorProxy(id);
  return JSON.stringify(res);
}

async function createEmissionFactorProxyData(token: string, appCode: string, payload: EmissionFactorProxyType) {
  const profile = await getProfile(token, appCode);
  const res = await createEmissionFactorProxy(payload);
  return JSON.stringify(res);
}

async function updateEmissionFactorProxyData(
  token: string,
  appCode: string,
  id: number,
  payload: EmissionFactorProxyType
) {
  const profile = await getProfile(token, appCode);
  const res = await updateEmissionFactorProxy(id, payload);
  return JSON.stringify(res);
}

async function handleUploadFile(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  // use folder Emission Factor
  const folderId = await fetchFolderIdByName("Emission Factor");
  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  const result = await uploadRegisteredAttachments(formData);
  return JSON.stringify(result);
}
