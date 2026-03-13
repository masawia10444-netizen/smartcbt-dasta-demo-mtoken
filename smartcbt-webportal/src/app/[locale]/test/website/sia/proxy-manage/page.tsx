import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import { groupMapCarbonProgram } from "@/utils/cms/adapters/website/carbon/program";
import { FINANCIAL_PROXY_STATUS } from "@/utils/cms/adapters/website/constants";
import { FinancialProxiesBody } from "@/utils/cms/adapters/website/sia/types/project";
import {
  createManageFinancialProxy,
  fetchFolderIdByName,
  fetchProvinces,
  fetchRegionsWithProvince,
  getDiscountRate,
  getFinancialProxyById,
  getListManageFinancialProxy,
  getProfile,
  loginEmail,
  updateManageFinancialProxy,
  updateManageFinancialProxyStatus,
  uploadFileFinancialProxy,
} from "@/utils/cms/cms-api-adapter";
import { ValueOf } from "next/dist/shared/lib/constants";

export default async function Page() {
  // demo data

  const data: FinancialProxiesBody = {
    is_supported_all_province: false,
    remark: "ใช้ได้ต่อเมือต้องการลดผลกระทบภายนอก (Externality Cost) จากการปลูกมะพร้าวปลอดสารพิษ",
    growth_rate: 1.98,
    value: 155.99,
    title_en: "Coconut",
    growth_formula: "ืnpv",
    categories: "prevention cost",
    title: "การลดผลกระทบภายนอก (Externality Cost) จากการปลูกมะพร้าวปลอดสารพิษ",
    status: "published",
    start_year: "2020-09-01T12:00:00",
    end_year: "2026-10-31T12:00:00",
    proxy_type: 3,
    unit: 'ครั้ง',
    province: 17,
    growth_rate_calculation_detail: [
      {
        year: 2564,
        year_index: 0,
        value: 20000,
      },
      {
        year: 2565,
        year_index: 1,
        value: 21000,
      },
      {
        year: 2566,
        year_index: 2,
        value: 22050,
      },
      {
        year: 2567,
        year_index: 3,
        value: 23152.5,
      },
      {
        year: 2568,
        year_index: 4,
        value: 24310.13,
      },
      {
        year: 2569,
        year_index: 5,
        value: 25525.63,
      },
      {
        year: 2570,
        year_index: 6,
        value: 26801.91,
      },
    ],
    // attachments: [
    //   {
    //     directus_files_id: "", // uuid ของไฟล์ ที่ได้จาก handleUploadFinancialProxyAttachments
    //   },
    // ],
  };

  const email: string | null = "pasin3@harmonyx.co";
  const password: string | null = "Password1234";
  const appCode: string = "BUSINESS";
  // const email: string | null = "user-sia@harmonyx.co";
  // const password: string | null = "Password1234";
  // const appCode: string = "SIA/SROI";
  const resLogin = await loginEmail(email, password, appCode);

  const fetchListManageFinancialProxy = await getfetchListManageFinancialProxy(String(resLogin.access_token), appCode);

  // const createManageFinancialProxy = await createManageFinancialProxyData(
  //   String(resLogin.access_token),
  //   appCode,
  //   data
  // );

  // const updateFinancialProxyStatusData = await updateFinancialProxyStatus(
  //   String(resLogin.access_token),
  //   appCode,
  //   7,
  //   FINANCIAL_PROXY_STATUS.DRAFT
  // );

  // const updateFinancialProxyDara = await updateFinancialProxy(
  //   String(resLogin.access_token),
  //   appCode,
  //   7,
  //   data
  // );

  // const getFinancialProxyData = await getFinancialProxy(
  //   String(resLogin.access_token),
  //   appCode,
  //   7
  // );

  // const handleGetDiscountRateData = await getDiscountRateData(
  //   String(resLogin.access_token),
  //   appCode
  // );

  // const province = await groupMapCarbonProgram('en');

  return (
    <>
      <h1>fetchListManageFinancialProxy</h1>
      <br />
      {fetchListManageFinancialProxy}
      <br />
      <br />
      {/* <h1>createManageFinancialProxy</h1>
      <br />
      {createManageFinancialProxy}
      <br />
      <br /> */}
      {/* <h1>updateFinancialProxyStatusData</h1>
      <br />
      {updateFinancialProxyStatusData}
      <br />
      <br /> */}
      {/* <h1>updateFinancialProxyDara</h1>
      <br />
      {updateFinancialProxyDara}
      <br />
      <br /> */}
      {/* <h1>getFinancialProxyData</h1>
      <br />
      {getFinancialProxyData}
      <br />
      <br /> */}

      {/* <h1>handleGetDiscountRateData</h1>
      <br />
      {handleGetDiscountRateData}
      <br />
      <br />

      <h1>province</h1>
      <br />
      {JSON.stringify(province)} */}
    </>
  );
}

async function getfetchListManageFinancialProxy(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await getListManageFinancialProxy(profile, 2561);
  return JSON.stringify(res);
}

async function createManageFinancialProxyData(token: string, appCode: string, data: FinancialProxiesBody) {
  await getProfile(token, appCode);
  const res = await createManageFinancialProxy(data);
  return JSON.stringify(res);
}

async function updateFinancialProxyStatus(
  token: string,
  appCode: string,
  id: number,
  status: ValueOf<typeof FINANCIAL_PROXY_STATUS>
) {
  await getProfile(token, appCode);
  const res = await updateManageFinancialProxyStatus(id, status);
  return JSON.stringify(res);
}

async function updateFinancialProxy(token: string, appCode: string, id: number, data: FinancialProxiesBody) {
  await getProfile(token, appCode);
  const res = await updateManageFinancialProxy(id, data);
  return JSON.stringify(res);
}

async function getFinancialProxy(token: string, appCode: string, id: number) {
  await getProfile(token, appCode);
  const res = await getFinancialProxyById(id);
  return JSON.stringify(res);
}

async function handleUploadFinancialProxyAttachments(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  const folderId = await fetchFolderIdByName("cbt-siasroi");

  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  return await uploadFileFinancialProxy(formData);
}

async function getDiscountRateData(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await getDiscountRate();
  return JSON.stringify(res);
}
