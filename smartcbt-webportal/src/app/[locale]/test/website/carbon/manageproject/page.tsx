import {
  adminChangeStatusCarbonProgram,
  createCarbonProgram,
  getCarbonProgram,
  listCarbonProgram,
  updateCarbonProgram,
  uploadCarbonAttachments,
} from "@/utils/cms/adapters/website/carbon/program";
import { CarbonProgramsType } from "@/utils/cms/adapters/website/carbon/types";
import { CARBON_PROGRAM_STATUS } from "@/utils/cms/adapters/website/constants";
import { CbtProject } from "@/utils/cms/adapters/website/sia/types/project";
import {
  createCbtProject,
  fetchAllOrganizations,
  fetchFolderIdByName,
  fetchRegionsWithProvince,
  getProfile,
  listCbtProject,
  loginEmail,
} from "@/utils/cms/cms-api-adapter";
import { ValueOf } from "next/dist/shared/lib/constants";

export default async function Page() {
  const email: string | null = "pasin3@harmonyx.co";
  const password: string | null = "Password1234";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);

  const createCbtProjectBody: CbtProject = {
    title: "test",
    organizations: 151,
  };

  const carbonProgram = {
    capacity: 20,
    status: "pending_for_approval",
    request_date: "2023-11-24T17:00:00.000Z",
    cbt_project: {
      id: 4,
      title: "TEST พักผ่อนหย่อนใจ 2 วัน 1 คืน ที่พัทยาและเกาะล้าน",
      status: "published",
      organizations: 66,
    },
    scope_assessment: 1,
    carbon_unit: 1,
    program_calendar: [
      {
        sort: 1,
        day: 1,
        status: "published",
        program_activity: [
          {
            no_specific_time: true,
            sort: 1,
            program_activity_title: "นั่งรถชมวิวรอบเมือง (มีอาหารว่างบนรถ)",
            status: "published",
            start_time: null,
            end_time: null,
          },
          {
            no_specific_time: true,
            sort: 2,
            program_activity_title: "รับประทานอาหารกลางวันที่ร้านอาหารซีฟู้ด",
            status: "published",
            start_time: null,
            end_time: null,
          },
        ],
      },
      {
        sort: 2,
        day: 2,
        status: "published",
        program_activity: [
          {
            no_specific_time: true,
            sort: 1,
            program_activity_title: "รับประทานอาหารเช้า ที่โรงแรมจัดเตรียมไว้",
            status: "published",
            start_time: null,
            end_time: null,
          },
        ],
      },
    ],
    round: [
      {
        sort: 1,
        round: 1,
        capacity_value: 20,
        summary_cf: null,
        waste_cf: null,
        food_cf: null,
        accommodation_cf: null,
        travel_cf: null,
        average_cfp: null,
        status: "published",
        program_end: "2023-11-26",
        program_start: "2023-11-24",
        program_round_activity: [
          {
            activity_ef: 2500,
            status: "published",
            program_activity_detail: [
              {
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 11,
                capacity: 2,
                cfp_amount: 1000,
                ef_value: 500,
                activity_detail_title: "test1",
                status: "published",
              },
              {
                sort: 2,
                pcr_type: 1,
                emission_factor_type: 11,
                capacity: 3,
                cfp_amount: 1500,
                ef_value: 500,
                activity_detail_title: "test2",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: true,
              sort: 1,
              program_activity_title: "นั่งรถชมวิวรอบเมือง (มีอาหารว่างบนรถ)",
              status: "published",
              start_time: null,
              end_time: null,
            },
          },
          {
            activity_ef: 36.0,
            status: "published",
            program_activity_detail: [
              {
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 3,
                capacity: 3,
                cfp_amount: 36,
                ef_value: 12,
                activity_detail_title: "test3",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: true,
              sort: 2,
              program_activity_title: "รับประทานอาหารกลางวันที่ร้านอาหารซีฟู้ด",
              status: "published",
              start_time: null,
              end_time: null,
            },
          },
          {
            activity_ef: 24.0,
            status: "published",
            program_activity_detail: [
              {
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 2,
                capacity: 2,
                cfp_amount: 24,
                ef_value: 12,
                activity_detail_title: "wswsw",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: true,
              sort: 1,
              program_activity_title: "รับประทานอาหารเช้า ที่โรงแรมจัดเตรียมไว้",
              status: "published",
              start_time: null,
              end_time: null,
            },
          },
        ],
      },
      {
        sort: 2,
        round: 2,
        capacity_value: 20,
        summary_cf: null,
        waste_cf: null,
        food_cf: null,
        accommodation_cf: null,
        travel_cf: null,
        average_cfp: null,
        status: "published",
        program_end: "2023-11-26",
        program_start: "2023-11-24",
        program_round_activity: [
          {
            activity_ef: 2500,
            status: "published",
            program_activity_detail: [
              {
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 11,
                capacity: 2,
                cfp_amount: 1000,
                ef_value: 500,
                activity_detail_title: "test1",
                status: "published",
              },
              {
                sort: 2,
                pcr_type: 1,
                emission_factor_type: 11,
                capacity: 3,
                cfp_amount: 1500,
                ef_value: 500,
                activity_detail_title: "test2",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: true,
              sort: 1,
              program_activity_title: "นั่งรถชมวิวรอบเมือง (มีอาหารว่างบนรถ)",
              status: "published",
              start_time: null,
              end_time: null,
            },
          },
          {
            activity_ef: 36.0,
            status: "published",
            program_activity_detail: [
              {
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 3,
                capacity: 3,
                cfp_amount: 36,
                ef_value: 12,
                activity_detail_title: "test3",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: true,
              sort: 2,
              program_activity_title: "รับประทานอาหารกลางวันที่ร้านอาหารซีฟู้ด",
              status: "published",
              start_time: null,
              end_time: null,
            },
          },
          {
            activity_ef: 24.0,
            status: "published",
            program_activity_detail: [
              {
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 2,
                capacity: 2,
                cfp_amount: 24,
                ef_value: 12,
                activity_detail_title: "wswsw",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: true,
              sort: 1,
              program_activity_title: "รับประทานอาหารเช้า ที่โรงแรมจัดเตรียมไว้",
              status: "published",
              start_time: null,
              end_time: null,
            },
          },
        ],
      },
    ],
    cover_image: "adedd0ee-f3ce-4a2b-ad70-e60dc68d9dc1",
  };
  const carbonProgramAfterApprove1: CarbonProgramsType = {
    round: [
      {
        id: 5,
        capacity_value: 10,
        summary_cf: 54.8,
        round: 1,
        waste_cf: null,
        food_cf: null,
        accommodation_cf: null,
        travel_cf: null,
        average_cfp: null,
        program_start: "2023-07-28",
        program_end: "2023-07-29",
        program_round_activity: [
          {
            id: 16,
            sort: null,
            program_round: 5,
            activity_ef: null,
            status: "published",
            program_activity_detail: [
              {
                id: 16,
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 1,
                capacity: 20,
                cfp_amount: null,
                ef_value: 123,
                activity_detail_title: "รถ SUV สีน้ำตาล ทะเบียน 5กก1234",
                status: "published",
              },
            ],
            program_activity: 27,
          },
          {
            id: 17,
            sort: null,
            program_round: 5,
            activity_ef: null,
            status: "published",
            program_activity_detail: [
              {
                id: 17,
                sort: 1,
                pcr_type: 3,
                emission_factor_type: null,
                capacity: 20,
                cfp_amount: null,
                ef_value: null,
                activity_detail_title: "ครัวเฉลียงลม",
                status: "published",
              },
            ],
            program_activity: 28,
          },
          {
            id: 18,
            sort: null,
            program_round: 5,
            activity_ef: null,
            status: "published",
            program_activity_detail: [
              {
                id: 18,
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 1,
                capacity: 20,
                cfp_amount: null,
                ef_value: null,
                activity_detail_title: "เรือ speed boat ทะเบียน A-B123",
                status: "published",
              },
            ],
            program_activity: 29,
          },
        ],
      },
    ],
  };

  const carbonProgramAfterApprove2: CarbonProgramsType = {
    round: [
      {
        id: 5,
      },
      {
        round: 2,
        capacity_value: 15,
        summary_cf: 69.4,
        waste_cf: null,
        food_cf: null,
        accommodation_cf: null,
        travel_cf: null,
        average_cfp: null,
        program_start: "2023-10-10",
        program_end: "2023-10-11",
        program_round_activity: [
          {
            sort: null,
            activity_ef: null,
            status: "published",
            program_activity_detail: [
              {
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 2,
                capacity: 20,
                cfp_amount: null,
                ef_value: 0.1622,
                activity_detail_title: "รถ SUV สีน้ำตาล ทะเบียน 5กก1234",
                status: "published",
              },
            ],
            program_activity: 30,
          },
          {
            sort: null,
            activity_ef: null,
            status: "published",
            program_activity_detail: [
              {
                sort: null,
                pcr_type: 3,
                emission_factor_type: 1,
                capacity: 10,
                cfp_amount: null,
                ef_value: null,
                activity_detail_title: "ร้านอาหาร",
                status: "published",
              },
            ],
            program_activity: 31,
          },
        ],
      },
    ],
  };

  const carbonProgramEdit: CarbonProgramsType = {
    capacity: 20,
    status: "pending_for_approval",
    province: 34,
    cbt_project: 1,
    scope_assessment: 1,
    carbon_unit: 1,
    program_calendar: [
      {
        id: 7,
        sort: 1,
        day: 1,
        program: 10,
        status: "published",
        program_activity: [
          {
            no_specific_time: false,
            id: 23,
            sort: 1,
            program_calendar_id: 7,
            program_activity_title: "นั่งรถชมวิวรอบเมือง (มีอาหารว่างบนรถ)",
            status: "published",
            start_time: "10:00:00",
            end_time: "12:00:00",
          },
          {
            no_specific_time: false,
            id: 24,
            sort: 2,
            program_calendar_id: 7,
            program_activity_title: "รับประทานอาหารกลางวันที่ร้านอาหารซีฟู้ด",
            status: "published",
            start_time: "10:00:00",
            end_time: "12:00:00",
          },
          {
            no_specific_time: true,
            id: 25,
            sort: 3,
            program_calendar_id: 7,
            program_activity_title: "ขึ้นเรือเดินทางไปเกาะล้าน",
            status: "published",
            start_time: null,
            end_time: null,
          },
        ],
      },
      {
        id: 8,
        sort: 2,
        day: 2,
        program: 10,
        status: "published",
        program_activity: [
          {
            no_specific_time: false,
            id: 26,
            sort: 1,
            program_calendar_id: 8,
            program_activity_title: "นั่งรถชมวิวรอบเมือง (มีอาหารว่างบนรถ)",
            status: "published",
            start_time: "10:00:00",
            end_time: "12:00:00",
          },
        ],
      },
    ],
    round: [
      {
        sort: 1,
        round: 1,
        program: 10,
        capacity_value: 10,
        id: 5,
        summary_cf: null,
        waste_cf: null,
        food_cf: null,
        accommodation_cf: null,
        travel_cf: null,
        average_cfp: null,
        status: "published",
        program_end: "2023-07-29",
        program_start: "2023-07-28",
        program_round_activity: [
          {
            id: 16,
            sort: null,
            program_round: 5,
            activity_ef: null,
            status: "published",
            program_activity_detail: [
              {
                id: 16,
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 1,
                capacity: 20,
                program_round_activity: 16,
                cfp_amount: null,
                ef_value: null,
                activity_detail_title: "รถ SUV สีน้ำตาล ทะเบียน 5กก1234",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: false,
              id: 27,
              sort: 1,
              program_calendar_id: null,
              program_activity_title: "นั่งรถชมวิวรอบเมือง (มีอาหารว่างบนรถ)",
              status: "published",
              start_time: "10:00:00",
              end_time: "12:00:00",
            },
          },
          {
            id: 17,
            sort: null,
            program_round: 5,
            activity_ef: null,
            status: "published",
            program_activity_detail: [
              {
                id: 17,
                sort: 1,
                pcr_type: 3,
                emission_factor_type: null,
                capacity: 20,
                program_round_activity: 17,
                cfp_amount: null,
                ef_value: null,
                activity_detail_title: "ครัวเฉลียงลม",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: false,
              id: 28,
              sort: 2,
              program_calendar_id: null,
              program_activity_title: "รับประทานอาหารกลางวันที่ร้านอาหารซีฟู้ด",
              status: "published",
              start_time: "10:00:00",
              end_time: "12:00:00",
            },
          },
          {
            id: 18,
            sort: null,
            program_round: 5,
            activity_ef: null,
            status: "published",
            program_activity_detail: [
              {
                id: 18,
                sort: 1,
                pcr_type: 1,
                emission_factor_type: 1,
                capacity: 20,
                program_round_activity: 18,
                cfp_amount: null,
                ef_value: null,
                activity_detail_title: "เรือ speed boat ทะเบียน A-B123",
                status: "published",
              },
            ],
            program_activity: {
              no_specific_time: true,
              id: 29,
              sort: 3,
              program_calendar_id: null,
              program_activity_title: "ขึ้นเรือเดินทางไปเกาะล้าน",
              status: "published",
              start_time: null,
              end_time: null,
            },
          },
        ],
      },
    ],
    cover_image: "841be916-e9c4-42c0-953a-f1a1cc8a22de",
    travel_images: [
      {
        id: 10,
      },
    ],
    waste_images: [
      {
        id: 10,
      },
    ],
    food_images: [
      {
        id: 10,
      },
    ],
    accommodation_images: [
      {
        id: 10,
      },
    ],
    trip_publicity_documents_images: [
      {
        id: 10,
      },
    ],
  };

  // const listCbtProjectDatas = await listCbtProjectData(String(resLogin.access_token), appCode);
  // const createCbtProjectDatas = await createCbtProjectData(
  //   String(resLogin.access_token),
  //   appCode,
  //   createCbtProjectBody
  // );

  // const listCarbonProgramsData = await listCarbonPrograms(String(resLogin.access_token), appCode, {
  //   status: "published",
  //   province: 34,
  //   organizations: 66,
  //   // search: "เกาะ",
  // });

  const organizations = await listOrganization();

  const regions = await listRegionWithProvinces();

  const getCarbonProgramByIdData = await getCarbonProgramById(String(resLogin.access_token), appCode, 109);

  // const createCarbonPrograms = await createCarbonProgramData(
  //   String(resLogin.access_token),
  //   appCode,
  //   carbonProgram as any
  // );

  // const updateStatusById = await adminUpdateStatusCarbonProgram(
  //   String(resLogin.access_token),
  //   appCode,
  //   10,
  //   CARBON_PROGRAM_STATUS.APPROVAL,
  //   "test remark"
  // );

  // const updateCarbonProgramDatas = await updateCarbonProgramData(
  //   String(resLogin.access_token),
  //   appCode,
  //   10,
  //   carbonProgramAfterApprove1
  // );
  // const updateCarbonProgramDatas2 = await updateCarbonProgramDataAfterApprove(
  //   String(resLogin.access_token),
  //   appCode,
  //   10,
  //   carbonProgramAfterApprove2
  // );

  // const editProgram = await updateCarbonProgramData(
  //   String(resLogin.access_token),
  //   appCode,
  //   10,
  //   carbonProgramEdit
  // );
  return (
    <>
      {/* <h1>listCarbonProgramsData</h1>
        <br />
        {listCarbonProgramsData}
        <br /> */}
      <h1>getCarbonProgramByIdData</h1>
        <br />
        {getCarbonProgramByIdData}
        <br />
      {/* <h1>createCarbonPrograms</h1>
      <br />
      {createCarbonPrograms}
      <br /> */}
      {/* <h1>updateStatusById</h1>
      <br />
      {updateStatusById} */}
      {/* <h1>updateCarbonProgramDatas</h1>
      <br />
      {updateCarbonProgramDatas}
      <br /> */}
      {/* <h1>updateCarbonProgramDatas2</h1>
      <br />
      {updateCarbonProgramDatas2}
      <br /> */}
      {/* <h1>editProgram</h1>
      <br />
      {editProgram}
      <br /> */}
      {/* <h1>createCbtProjectData</h1>
      <br />
      {createCbtProjectDatas} */}
      {/* <h1>listCbtProjectData</h1>
      <br />
      {listCbtProjectDatas}
      <br /> */}
      {/* <h1>organizations</h1>
      <br />
      {organizations}
      <br /> */}
      {/* <h1>regions</h1>
      <br />
      {regions}
      <br /> */}
    </>
  );
}

async function listCarbonPrograms(
  token: string,
  appCode: string,
  filter?: {
    status?: string;
    province?: number;
    organizations?: number;
    search?: string;
  }
) {
  const profile = await getProfile(token, appCode);
  const res = await listCarbonProgram(profile, filter);
  return JSON.stringify(res);
}

async function getCarbonProgramById(token: string, appCode: string, id: number) {
  const profile = await getProfile(token, appCode);
  const res = await getCarbonProgram(id);
  return JSON.stringify(res);
}

async function createCarbonProgramData(token: string, appCode: string, data: CarbonProgramsType) {
  const profile = await getProfile(token, appCode);
  const res = await createCarbonProgram(data);
  return JSON.stringify(res);
}

async function updateCarbonProgramDataAfterApprove(
  token: string,
  appCode: string,
  id: number,
  data: CarbonProgramsType
) {
  const profile = await getProfile(token, appCode);
  const res = await updateCarbonProgram(id, data);
  return JSON.stringify(res);
}

async function updateCarbonProgramData(token: string, appCode: string, id: number, data: CarbonProgramsType) {
  const profile = await getProfile(token, appCode);
  const res = await updateCarbonProgram(id, data);
  return JSON.stringify(res);
}

async function adminUpdateStatusCarbonProgram(
  token: string,
  appCode: string,
  id: number,
  status: ValueOf<typeof CARBON_PROGRAM_STATUS>,
  remark?: string
) {
  const profile = await getProfile(token, appCode);
  const res = await adminChangeStatusCarbonProgram(id, status, remark);
  return JSON.stringify(res);
}

async function handleUploadFileCoverImage(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  // use folder Cover image
  const folderId = await fetchFolderIdByName("Cover image");
  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  const result = await uploadCarbonAttachments(formData);
  return JSON.stringify(result);
}

async function handleUploadFileAccommodationImage(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  // use folder Accommodation images
  const folderId = await fetchFolderIdByName("Accommodation images");
  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  const result = await uploadCarbonAttachments(formData);
  return JSON.stringify(result);
}

async function handleUploadFileFoodImage(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  // use folder Food images
  const folderId = await fetchFolderIdByName("Food images");
  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  const result = await uploadCarbonAttachments(formData);
  return JSON.stringify(result);
}

async function handleUploadFileTeavelImage(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  // use folder Travel images
  const folderId = await fetchFolderIdByName("Travel images");
  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  const result = await uploadCarbonAttachments(formData);
  return JSON.stringify(result);
}

async function handleUploadFileTripPublicityDocumentsImage(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  // use folder Trip publicity documents images
  const folderId = await fetchFolderIdByName("Trip publicity documents images");
  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  const result = await uploadCarbonAttachments(formData);
  return JSON.stringify(result);
}

async function handleUploadFileWasteImage(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  // use folder Waste images
  const folderId = await fetchFolderIdByName("Waste images");
  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  const result = await uploadCarbonAttachments(formData);
  return JSON.stringify(result);
}

async function createCbtProjectData(token: string, appCode: string, cbtProject: CbtProject) {
  await getProfile(token, appCode);
  const res = await createCbtProject(cbtProject);
  return JSON.stringify(res);
}

async function listCbtProjectData(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await listCbtProject(profile);
  return JSON.stringify(res);
}

async function listOrganization() {
  const organizations = await fetchAllOrganizations();
  return JSON.stringify(organizations);
}

async function listRegionWithProvinces() {
  const regions = await fetchRegionsWithProvince();
  return JSON.stringify(regions);
}
