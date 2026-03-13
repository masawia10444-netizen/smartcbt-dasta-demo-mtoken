import { FinancialProxiesBody, Project } from "@/utils/cms/adapters/website/sia/types/project";
import {
  CreateCommunityBody,
  ProjectLocations,
  createCommunity,
  createFinancialProxy,
  createProjectLocation,
  fetchFolderIdByName,
  getDataProject,
  getDataProjectOutcome,
  getDataProjectProjectBasedCaseImpact,
  getDataProjectUtilizer,
  getListFinancialProxyByProvince,
  getProfile,
  getProjectReport,
  listCommunity,
  listProjectBasedCaseImpactType,
  listProjectLocation,
  loginEmail,
  updateProjectData,
  uploadFileFinancialProxy,
  uploadFileProjectFile,
} from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // demo data

  const data: FinancialProxiesBody = {
    is_supported_all_province: false,
    remark: "ใช้ได้ต่อเมือต้องการลดผลกระทบภายนอก (Externality Cost) จากการปลูกมะพร้าวปลอดสารพิษ",
    growth_rate: 1.98,
    value: 155.99,
    title_en: "Coconut",
    growth_formula: "ืnpv",
    categories: "prevention_cost",
    title: "การลดผลกระทบภายนอก (Externality Cost) จากการปลูกมะพร้าวปลอดสารพิษ",
    status: "published",
    start_year: "2020-09-01T12:00:00",
    end_year: "2026-10-31T12:00:00",
    proxy_type: 3,
    unit: "ครั้ง",
    province: 17,
    // attachments: [
    //   {
    //     directus_files_id: "", // uuid ของไฟล์ ได้จาก handleUploadFinancialProxyAttachments
    //   },
    // ],
  };

  const projectDataExpost: Project = {
    project_outcomes: [
      {
        id: "1a8ab5dc-77b3-42ca-bfdf-3667484dd3f4",
        benefits: [
          {
            id: "b441a79e-5fd1-4793-8bdd-7aa8a26858e6",
            ex_post: [
              {
                year: 2565,
                present_benefit: 3000,
              },
            ],
          },
        ],
      },
    ],
    project_summary_ex_post: {
      sroi_ratio: 1.1,
      npv_sroi: 4796103,
      sroi_irr: 43.67,
      sroi_ex_post: [
        {
          year: 2567,
          net_sroi: -2500000,
        },
        {
          year: 2567,
          net_sroi: -2500000,
        },
        {
          year: 2567,
          net_sroi: -2500000,
        },
        {
          year: 2567,
          net_sroi: -2500000,
        },
        {
          year: 2567,
          net_sroi: -2500000,
        },
        {
          year: 2567,
          net_sroi: -2500000,
        },
      ],
      // archive_file: [
      //   {
      //     directus_files_id: "f38c6086-10cd-4646-aff4-115df85b2aed", // uuid(id) ของไฟล์ ที่ได้จาก handleUploadExpostArchiveFile
      //   },
      // ],
    },
  };

  const projectLocationData: ProjectLocations = {
    title: "ชุมชนท่าข้าม จังหวัดพิษณุโลก",
    address: "ชุมชนท่าข้าม ตำบลท่าข้าม จังหวัดพิษณุโลก ",
    province: 2,
    district: 4,
    subdistrict: 33,
    postalcode: null,
    longitude: "321",
    latitude: "123",
  };

  const community: CreateCommunityBody = {
    title: "ชุมชนท่าข้าม จังหวัดพิษณุโลก test",
    address_info: {
      province_id: 2,
      district_id: 4,
      sub_district_id: 33,
      postal_code: "12345",
      longitude: "321",
      latitude: "123",
    },
  };

  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);

  const fetchProjectDataProject = await getfetchDataProject(String(resLogin.access_token), appCode, 330);
  // const fetchProjectLocation = await getDataProjectLocation(String(resLogin.access_token), appCode);
  // const createProjectLocationDataLocation = await createProjectLocationData(
  //   String(resLogin.access_token),
  //   appCode,
  //   projectLocationData
  // );
  // const fetchProjectDataProjectOutcome = await getfetchDataProjectOutcome(
  //   String(resLogin.access_token),
  //   appCode,
  //   "312c4a65-8e6a-44f2-bac2-3b43a9af258b"
  // );

  // const fetchProjectDataProjectUtilizer = await getfetchDataProjectUtilizer(
  //   String(resLogin.access_token),
  //   appCode,
  //   "092da76b-105d-49a2-8cdc-dd7df2761668"
  // );

  // const fetchProjectDataProjectProjectBasedCaseImpact = await getfetchDataProjectProjectBasedCaseImpact(
  //   String(resLogin.access_token),
  //   appCode,
  //   "711efe64-7a20-4166-bb4b-40d651c53d21"
  // );

  // const fetchFinancialProxyByProvince = await getfetchDataFinancialProxyByProvince(
  //   String(resLogin.access_token),
  //   appCode,
  //   21
  // );

  // const listProjectBasedCaseImpactTypeData = await getListProjectBasedCaseImpactType(
  //   String(resLogin.access_token),
  //   appCode
  // );

  // const gennarateProjectReportData = await gennarateProjectReport(String(resLogin.access_token), appCode, 208);

  // const updateProjectDataProjectExpost = await updateProjectExpost(String(resLogin.access_token), appCode, 208, projectDataExpost);

  // const createFinancialProxy = await createFinancialProxyData(String(resLogin.access_token), appCode, data);
  return (
    <>
      {/* <h1>gennarateProjectReportData</h1>
      <br />
      {gennarateProjectReportData}
      <br />
      <br /> */}
      <h1>fetchProjectDataProject</h1>
      <br />
      {fetchProjectDataProject}
      <br />
      <br />
      {/* <h1>fetchProjectLocation</h1>
      <br />
      {fetchProjectLocation}
      <br />
      <br /> */}
      {/* <h1>createProjectLocationDataLocation</h1>
      <br />
      {createProjectLocationDataLocation}
      <br />
      <br /> */}
      {/* <h1>fetchProjectDataProjectUtilizer</h1>
      <br />
      {fetchProjectDataProjectUtilizer}
      <br />
      <br /> */}
      {/* <h1>fetchProjectDataProjectOutcome</h1>
      <br />
      {fetchProjectDataProjectOutcome}
      <br />
      <br /> */}
      {/* <h1>fetchProjectDataProjectProjectBasedCaseImpact</h1>
      <br />
      {fetchProjectDataProjectProjectBasedCaseImpact}
      <br />
      <br /> */}
      {/* <h1>fetchFinancialProxyByProvince</h1>
      <br />
      {fetchFinancialProxyByProvince}
      <br />
      <br /> */}
      {/* <h1>createFinancialProxy</h1>
      <br />
      {createFinancialProxy}
      <br />
      <br /> */}
      {/* <h1>updateProjectDataProjectExpost</h1>
      <br />
      {updateProjectDataProjectExpost} */}
      <br />
      <br />
      {/* <h1>listProjectBasedCaseImpactTypeData</h1>
      <br />
      {listProjectBasedCaseImpactTypeData}
      <br />
      <br /> */}
    </>
  );
}

async function getfetchDataProject(token: string, appCode: string, id: number) {
  await getProfile(token, appCode);
  const res = await getDataProject(id);
  return JSON.stringify(res);
}

async function getfetchDataProjectOutcome(token: string, appCode: string, id: string) {
  await getProfile(token, appCode);
  const res = await getDataProjectOutcome(id);
  return JSON.stringify(res);
}

async function getfetchDataProjectUtilizer(token: string, appCode: string, id: string) {
  await getProfile(token, appCode);
  const res = await getDataProjectUtilizer(id);
  return JSON.stringify(res);
}

async function getfetchDataProjectProjectBasedCaseImpact(token: string, appCode: string, id: string) {
  await getProfile(token, appCode);
  const res = await getDataProjectProjectBasedCaseImpact(id);
  return JSON.stringify(res);
}

async function getfetchDataFinancialProxyByProvince(token: string, appCode: string, id: number) {
  await getProfile(token, appCode);
  const res = await getListFinancialProxyByProvince(id);
  return JSON.stringify(res);
}

async function createFinancialProxyData(token: string, appCode: string, data: FinancialProxiesBody) {
  await getProfile(token, appCode);
  const res = await createFinancialProxy(data);
  return JSON.stringify(res);
}

async function updateProjectExpost(token: string, appCode: string, id: number, data: Project) {
  await getProfile(token, appCode);
  const res = await updateProjectData(id, data);
  return JSON.stringify(res);
}

async function gennarateProjectReport(token: string, appCode: string, id: number) {
  await getProfile(token, appCode);
  const res = await getProjectReport(id);
  return JSON.stringify(res);
}

async function getListProjectBasedCaseImpactType(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await listProjectBasedCaseImpactType();
  return JSON.stringify(res);
}

async function handleUploadExpostArchiveFile(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  const folderId = await fetchFolderIdByName("Archive File");

  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  return await uploadFileProjectFile(formData);
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

async function getDataProjectLocation(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await listProjectLocation();
  return JSON.stringify(res);
}

async function createProjectLocationData(token: string, appCode: string, data: ProjectLocations) {
  await getProfile(token, appCode);
  const res = await createProjectLocation(data);
  return JSON.stringify(res);
}

async function hanldeCreateCommunity(body: CreateCommunityBody) {
  const res = await createCommunity(body);
  return JSON.stringify(res);
}

async function handleListCommunity() {
  const res = await listCommunity();
  return JSON.stringify(res);
}
