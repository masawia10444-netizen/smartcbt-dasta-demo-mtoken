import {
  getPieChartCarbonProgram,
  getTableCarbonProgram,
  getTableCarbonProgramByRegion,
  groupMapCarbonProgram,
  summaryCarbonProgram,
} from "@/utils/cms/adapters/website/carbon/program";
import { getProfile, loginEmail } from "@/utils/cms/cms-api-adapter";
import * as _ from "lodash";

export default async function Page() {
  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "BUSINESS";
  const resLogin = await loginEmail(email, password, appCode);
  const fetchCarbonData = await getTableCarbonProgramData(String(resLogin.access_token), appCode);
  const fetchPieChartCarbonProgramResponse = await getPieChartCarbonProgramResponse(
    String(resLogin.access_token),
    appCode
  );
  const fetchSummaryCarbonProgram = await getsummaryCarbonProgram(String(resLogin.access_token), appCode);
  const handleTableCarbonProgramByRegionData = await getTableCarbonProgramByRegionData(
    String(resLogin.access_token),
    appCode
  );

  const handleGroupMapCarbonProgramData = await groupMapCarbonProgramData(String(resLogin.access_token), appCode);
  return (
    <div>
      {/* <div>{fetchCarbonData}</div>  */}
      {/* <div>{handleTableCarbonProgramByRegionData}</div> */}
      <div>{fetchPieChartCarbonProgramResponse}</div>
      {/* <div>{fetchSummaryCarbonProgram}</div> */}
      {/* <div>{handleGroupMapCarbonProgramData}</div> */}
    </div>
  );
}

async function getTableCarbonProgramData(
  token: string,
  appCode: string,
  filter?: {
    startDate?: string;
    endDate?: string;
    startMonth?: string;
    endMonth?: string;
    startYear?: string;
    endYear?: string;
  }
) {
  const profile = await getProfile(token, appCode);
  const res = await getTableCarbonProgram({
    // startDate: "2023-01-01",
    // endDate: "2024-01-31",
    startMonth: "2023-10-01",
    endMonth: "2023-10-05",
    // startYear: "2023-01-01",
    // endYear: "2024-12-31",
  });

  const result = {
    national: res.map((item) => {
      return {
        date: item.program_start,
        value: item.sum_carbon,
      };
    }),
  };
  return JSON.stringify(result);
}

async function getPieChartCarbonProgramResponse(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await getPieChartCarbonProgram();
  return JSON.stringify(res);
}

async function getsummaryCarbonProgram(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await summaryCarbonProgram();
  return JSON.stringify(res);
}


async function getTableCarbonProgramByRegionData(token: string, appCode: string) {
  await getProfile(token, appCode);
  const res = await getTableCarbonProgramByRegion({
    // startDate: "2023-01-01",
    // endDate: "2024-01-31",
    startMonth: "2023-10-09",
    endMonth: "2023-10-13",
    // startYear: "2023-01-01",
    // endYear: "2024-12-31",
  });
  const result: {
    [key: string]: {
      program_start: string;
      sum_carbon: number;
    }[];
  } = {};

  res.forEach(({ region, data }) => {
    if (!_.isNil(region)) result[region] = data;
  });
  return JSON.stringify(result);
}

async function groupMapCarbonProgramData(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await groupMapCarbonProgram();
  return JSON.stringify(res);
}
