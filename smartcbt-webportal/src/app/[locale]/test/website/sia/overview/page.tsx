import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import {
  getOptionDastaWorkingAreas,
  getOptionProjectLocations,
  getOptionProvinces,
  getProfile,
  listProjectData,
  loginEmail,
} from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // demo data

  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);

  const fetchListProjectLocationOption = await getfetchListProjectLocationsOption(
    String(resLogin.access_token),
    appCode
  );

  const fetchListDastaWorkingAreasOption = await getfetchListDastaWorkingAreasOption(
    String(resLogin.access_token),
    appCode
  );

  const fetchListProvincesOption = await getfetchListProvincesOption(String(resLogin.access_token), appCode);

  const fetchListProject = await getfetchListProject(
    String(resLogin.access_token),
    appCode,
    {
      status: PROJECT_STATUS.DRAFT,
      startYear: "2564",
      endYear: "2569",
      // projectLocations: 22,
      // dastaWorkingArea: 1,
    },
    {
      npv_sroi: "desc",
    }
  );

  return (
    <>
      {/* <h1>fetchListProjectLocationOption</h1>
      <br />
      {fetchListProjectLocationOption}
      <br />
      <br />

      <h1>fetchListDastaWorkingAreasOption</h1>
      <br />
      {fetchListDastaWorkingAreasOption}
      <br />
      <br /> */}

      <h1>fetchListProvincesOption</h1>
      <br />
      {fetchListProvincesOption}
      <br />
      <br />

      <h1>fetchListProject</h1>
      <br />
      {fetchListProject}
      <br />
      <br />
    </>
  );
}

async function getfetchListProjectLocationsOption(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await getOptionProjectLocations();
  return JSON.stringify(res);
}

async function getfetchListDastaWorkingAreasOption(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await getOptionDastaWorkingAreas();
  return JSON.stringify(res);
}

async function getfetchListProvincesOption(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await getOptionProvinces();
  return JSON.stringify(res);
}

async function getfetchListProject(
  token: string,
  appCode: string,
  filter?: {
    status?: string;
    startYear?: string;
    endYear?: string;
    projectLocations?: number;
    dastaWorkingArea?: number;
  },
  sort?: {
    npv_sroi?: string;
  }
) {
  const profile = await getProfile(token, appCode);
  const res = await listProjectData(profile, filter, sort);
  return JSON.stringify(res);
}
