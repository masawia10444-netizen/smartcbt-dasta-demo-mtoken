"use server";

import useCookies from "@/hooks/useCookies";
import { FinancialProxyStatus, ProxyJson } from "@/models/financial-proxy";
import { getFinancialProxyById, getProfile, updateManageFinancialProxyStatus } from "@/utils/cms/cms-api-adapter";

export async function getSiaProxyById(id: number) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: ((await getFinancialProxyById(id)) as ProxyJson[]).find((p) => Number(p.id) == id) };
  } catch (error) {
    return { error: error };
  }
}

export async function updateManageFinancialProxyStatusById(id: number, status: FinancialProxyStatus) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await updateManageFinancialProxyStatus(id, status) };
  } catch (error) {
    return { error: error };
  }
}
