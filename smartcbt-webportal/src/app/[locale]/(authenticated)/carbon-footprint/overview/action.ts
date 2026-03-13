"use server";

import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import {
  getPieChartCarbonProgram,
  getTableCarbonProgram,
  getTableCarbonProgramByRegion,
  groupMapCarbonProgram,
  summaryCarbonProgram,
} from "@/utils/cms/adapters/website/carbon/program";
import { convertFromDateToString } from "@/utils/helper";

export async function getSummaryCarbonProgramAction() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await summaryCarbonProgram() };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function getGroupMapCarbonProgramAction() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await groupMapCarbonProgram() };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function getPieChartCarbonProgramAction() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await getPieChartCarbonProgram() };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function getTableCarbonProgramAction(filter: {
  startDate?: Date | null;
  endDate?: Date | null;
  startMonth?: Date | null;
  endMonth?: Date | null;
}) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  const params: Record<string, string> = {};
  try {
    if (filter.startDate) params["startDate"] = convertFromDateToString(filter.startDate);
    if (filter.endDate) params["endDate"] = convertFromDateToString(filter.endDate);
    if (filter.startMonth) params["startMonth"] = convertFromDateToString(filter.startMonth);
    if (filter.endMonth) params["endMonth"] = convertFromDateToString(filter.endMonth);
    return { response: await getTableCarbonProgram(params) };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function getTableCarbonProgramByRegionAction(filter: {
  startDate?: Date | null;
  endDate?: Date | null;
  startMonth?: Date | null;
  endMonth?: Date | null;
}) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  const params: Record<string, string> = {};
  try {
    if (filter.startDate) params["startDate"] = convertFromDateToString(filter.startDate);
    if (filter.endDate) params["endDate"] = convertFromDateToString(filter.endDate);
    if (filter.startMonth) params["startMonth"] = convertFromDateToString(filter.startMonth);
    if (filter.endMonth) params["endMonth"] = convertFromDateToString(filter.endMonth);
    return { response: await getTableCarbonProgramByRegion(params) };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}
