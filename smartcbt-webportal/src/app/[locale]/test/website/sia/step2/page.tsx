import { CbtProject, Project, ProjectBody } from "@/utils/cms/adapters/website/sia/types/project";
import {
  createCbtProject,
  createProject,
  fetchFolderIdByName,
  fetchProjectDetail,
  getProfile,
  listCbtProject,
  loginEmail,
  uploadProjectManagementAttachments,
} from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // demo data

  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);
  // const file = await handleUploadFiles(String(resLogin.access_token), appCode);

  const createCbtProjectBody: CbtProject = {
    title: "test",
    organizations: 151,
  };

  const createProjectBody: Project = {
    cbt_project: 11,
    featured_image: {
      id: "8ffd5ed2-f926-43f8-95aa-e9bd0e2f14d0",
    },
    project_galleries: [
      {
        id: "8ffd5ed2-f926-43f8-95aa-e9bd0e2f14d0",
      },
    ],
    has_project_strategies: [
      {
        project_strategies_items_id: 1,
      },
      {
        project_strategies_items_id: 2,
      },
      {
        project_strategies_items_id: 3,
      },
      {
        project_strategies_items_id: 4,
      },
      {
        project_strategies_items_id: 5,
      },
    ],
    dasta_objective: [
      {
        dasta_working_objective_id: 1,
        detail: "A1",
      },
      {
        dasta_working_objective_id: 2,
        detail: "1",
      },
      {
        dasta_working_objective_id: 3,
        detail: "1,2",
      },
    ],
    project_characteristic: {
      id: 1,
    },
    project_characteristic_other: null,
    project_type: [
      {
        project_types_id: 2,
      },
    ],
    project_status: "new",
    related_project_id: null,
    project_locations: {
      postalcode: "10200",
      latitude: "1.123",
      longitude: "3.213",
      title: "ทดสอบ",
      province: {
        id: 22,
      },
      district: {
        id: 22,
      },
      subdistrict: {
        id: 22,
      },
    },
    dasta_working_area: [
      {
        dasta_working_area_id: 1,
      },
    ],
    project_owner: {
      id: 1,
    },
    project_owner_other: null,
    duration_type: "year", //dont change
    project_start_year: 2560,
    project_end_year: 2563,
    project_duration_year: 4,
    project_consequence_end_year: 2580,
    project_budget: "4500000.00",
    project_budget_details: [
      {
        year_no: 1,
        detail: "สร้างระบบ Vertical Indoor Farming รองรับการปลูกผักกาดหอม แบบ Hydroponic จำนวน 500 หลุม",
        amount: 1000000,
      },
      {
        year_no: 1,
        detail: "ติดตั้ง Solar Rooftop ระบบ On-Grid ขนาด 300 Watts ให้กับบ้านในชุมชน 50 หลัง",
        amount: 1500000,
      },
      {
        year_no: 2,
        detail: "พัฒนาระบบแสงไฟธรรมชาติ ในการปลูก Hydoponic",
        amount: 500000,
      },
      {
        year_no: 2,
        detail: "พัฒนาระบบ Solar Rooftop แบบ Hybrid System ขนาด 500 Watts ที่ Vertical Indoor Farming",
        amount: 500000,
      },
      {
        year_no: 3,
        detail: "ทำระบบบำบัดน้ำ เพื่อให้เกิดการใช้อย่างหมุนเวียน",
        amount: 1000000,
      },
    ],
    project_objectives: [
      {
        no: 1,
        objective: "เพื่อส่งเสริมการทำการเกษตรอย่างยั่งยืน และเพิ่มรายได้ให้กับชุมชน",
      },
      {
        no: 2,
        objective: " เพื่อลดค่าครองชีพให้กับคนในชุมชน",
      },
      {
        no: 3,
        objective: "เพื่อลดการปลดปล่อยน้ำเสียลงสู่ชุมชน และธรรมชาติ",
      },
      {
        no: 4,
        objective: "เพื่อลดการใช้สารเคมีในการปลูกผักสวนครัว",
      },
    ],
    project_activities: [
      {
        title: "2. ติดตั้งระบบ Solar Rooftop ระบบ On-Grid ขนาด 300 Watts ให้กับครัวเรือนจำนวน 50 หลัง",
      },
      {
        title: "5. ติดตั้งระบบบำบัดน้ำ",
      },
      {
        title: "3. พัฒนาระบบไฟธรรมชาติ ในการปลูกผัก Hydoponic",
      },
      {
        title: "1.สร้างระบบ Vertical Indoor Farming",
      },
      {
        title: "4. ติดตั้งระบบ Solar Rooftop แบบ Hybrid System ขนาด 500 Watts ที่ Vertical Indoor Farming",
      },
    ],
    project_outputs: [
      {
        title:
          "1. เกิดอาคารต้นแบบในการทำ Vertical Indoor Farming 1 โรงเรือน ขนาด 60 ตร.ม.  สำหรับการปลูกผัก Hydoponic จำนวน 500 หลุม",
      },
      {
        title: "2. ครัวเรือนในชุมชน 50 หลัง มีระบบ Solar Rooftop ขนาด 300 Watts ใช้ เพื่อลดค่าใช้จ่ายด้านไฟฟ้า",
      },
      {
        title: "3. ชุมชนมีระบบบำบัดน้ำต้นแบบ ที่ทำให้เกิดการใช้พลังงานหมุนเวียน",
      },
    ],
    sensitivity_analysis: true,
    project_outcomes: [
      {
        ordering: "1",
        title: "เพิ่มรายได้ให้กับคนในชุมชนจากการทำเกษตรกรรมที่ทันสมัย",
        impacts: [
          {
            detail: "<p>1. เกิดการสร้างรายได้ให้กับชุมชนได้ทุกฤดูกาลตลอดปีจากการทำ Vertical Indoor Farming</p>",
            mode: "with",
            categorie: "economic",
            title: null,
          },
          {
            detail: "<p>1. ความสัมพันธ์ระหว่างสมาชิกในชุมชนดีขึ้น</p>",
            mode: "with",
            categorie: "social",
            title: null,
          },
          {
            detail: "<p>1. ลดการเกิดของเสีย</p>",
            mode: "with",
            categorie: "environment",
            title: null,
          },
          {
            detail: "<p>1. รายได้ของชุมชนไม่สม่ำเสมอ ขึ้นอยู่กับฤดูกาล</p>",
            mode: "withoout",
            categorie: "economic",
            title: null,
          },
          {
            detail: "<p>1. ไม่เกิดความร่วมมือในชุมชน ต่างคนต่างทำ เกิดการแย่งใช้ทรัพยากร</p>",
            mode: "withoout",
            categorie: "social",
            title: null,
          },
          {
            detail: "<p>1. ปริมาณของเสียเยอะ</p>",
            mode: "withoout",
            categorie: "environment",
            title: null,
          },
        ],
        benefits: [
          {
            title: "รายได้จากการขายผักกาดหอม แบบ Hydoponic",
            ordering: "1",
            ex_ante: [
              {
                proxy: {
                  id: 7,
                },
                year: 2565,
                unit: 'ไร่',
                present_benefit: 0,
                fixed_cost: 200000,
                variable_cost: 10.51,
                quantity: 54000,
              },
            ],
            based_case_impacts: [
              {
                year: 2571,
                type: 3,
                title: "ไม่มี",
                benefit: 100,
                impact: 0,
              },
              {
                year: 2569,
                type: 3,
                title: "ไม่มี",
                benefit: 100,
                impact: 0,
              },
            ],
          },
        ],
      },
    ],
    project_utilizers: [
      {
        title: "1. ชาวบ้านชุมชนท่าข้าม จังหวัดพิษณุโลก",
      },
    ],
    project_sdgs: [
      {
        sdgs_id: 3,
      },
      {
        sdgs_id: 4,
      },
      {
        sdgs_id: 5,
      },
    ],
    project_summary_ex_ante: {
      sroi_ratio: 1.1,
      npv_sroi: 4796103,
      sroi_irr: 43.67,
      sroi_ex_ante: [
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
    },
  };

  const fetchProjectDetailData = await getfetchProjectDetail(String(resLogin.access_token), appCode);
  // const createProjectData = await setCreateProject(String(resLogin.access_token), appCode, createProjectBody);
  // const createCbtProjectDatas = await createCbtProjectData(
  //   String(resLogin.access_token),
  //   appCode,
  //   createCbtProjectBody
  // );

  const fetchCbtProjectData = await listCbtProjectData(String(resLogin.access_token), appCode);

  return (
    <>
      <h1>fetchProjectDetailData</h1>
      <br />
      {fetchProjectDetailData}
      <br />

      {/* <h1>fetchProjectData</h1> 
      <br />
       {fetchProjectData} */}

      {/* <h1>createProjectData</h1>
      <br />
      {createProjectData} */}

      {/* <h1>createCbtProjectData</h1>
      <br />
      {createCbtProjectDatas} */}

      {/* <h1>fetchCbtProjectData</h1>
      <br />
      {fetchCbtProjectData} */}

    </>
  );
}

async function getfetchProjectDetail(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await fetchProjectDetail();
  return JSON.stringify(res);
}

async function setCreateProject(token: string, appCode: string, projectBody: ProjectBody) {
  await getProfile(token, appCode);
  const res = await createProject(projectBody);
  return JSON.stringify(res);
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

async function handleUploadFiles(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  const folderId = await fetchFolderIdByName("Project Management");

  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  return await uploadProjectManagementAttachments(formData);
}
