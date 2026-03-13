import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { getProfile, listProjectData, loginEmail, updateProjectStatus } from "@/utils/cms/cms-api-adapter";
import { ValueOf } from "next/dist/shared/lib/constants";

export default async function Page() {
  // demo data

  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);

  const fetchListProject = await getfetchListProject(String(resLogin.access_token), appCode, {
    status: PROJECT_STATUS.APPROVAL,
  });

  const updateProject = await updateProjectStatusData(
    String(resLogin.access_token),
    appCode,
    25,
    PROJECT_STATUS.APPROVAL
  );

  return (
    <>
      <h1>fetchListProject</h1>
      <br />
      {fetchListProject}
      <br />
      <br />
      {/* <h1>updateProject</h1>
      <br />
      {updateProject}
      <br />
      <br /> */}
    </>
  );
}

async function getfetchListProject(
  token: string,
  appCode: string,
  filter?: {
    status?: string;
    startYear?: string;
    endYear?: string;
    dastaWorkingArea?: number;
  },
  sort?: {
    npv_sroi?: string;
  },
  search?: string
) {
  const profile = await getProfile(token, appCode);
  const res = await listProjectData(profile, filter);
  return JSON.stringify(res);
}

async function updateProjectStatusData(
  token: string,
  appCode: string,
  id: number,
  status: ValueOf<typeof PROJECT_STATUS>,
  remark?: string
) {
  await getProfile(token, appCode);
  const res = await updateProjectStatus(id, status, remark);
  return JSON.stringify(res);
}
