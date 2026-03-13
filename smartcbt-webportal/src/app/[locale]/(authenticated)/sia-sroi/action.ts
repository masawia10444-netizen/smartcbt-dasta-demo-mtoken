"use server";

import useCookies from "@/hooks/useCookies";
import { FinancialProxiesBody } from "@/utils/cms/adapters/website/sia/types/project";
import { createManageFinancialProxy, getProfile, listProjectData } from "@/utils/cms/cms-api-adapter";

export async function fetchListProject(
  status?: string,
  startYear?: string,
  endYear?: string,
  projectLocations?: number,
  dastaWorkingArea?: number,
  province?: number,
  npvSort?: string,
  search?: string
) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);

  const filter = {
    status: status ?? undefined,
    startYear: startYear ?? undefined,
    endYear: endYear ?? undefined,
    projectLocations: projectLocations ?? undefined,
    dastaWorkingArea: dastaWorkingArea ?? undefined,
    province: province ?? undefined,
  };
  const sort = npvSort
    ? {
        npv_sroi: npvSort ?? "asc",
      }
    : { id: "desc" };

  // console.log(filter);

  const res = await listProjectData(profile, filter, sort, search);
  if (Array.isArray(res)) {
    return res?.sort((a, b) => (a.score ?? 0) - (b.score ?? 0)) ?? [];
  }
  return [res] ?? [];
}

export async function createFinancialProxyAction(body: FinancialProxiesBody) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await createManageFinancialProxy(body) };
  } catch (e) {
    return { error: JSON.stringify(e) };
  }
}
