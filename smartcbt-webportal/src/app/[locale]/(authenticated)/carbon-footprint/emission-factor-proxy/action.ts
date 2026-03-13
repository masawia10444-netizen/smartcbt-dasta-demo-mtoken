"use server";

import useCookies from "@/hooks/useCookies";
import { EmissionFactorProxyListJson } from "@/models/emission-factor-proxy";

import { getProfile } from "@/utils/cms/adapters/authen/authen";
import {
  createEmissionFactorProxy,
  getEmissionFactorProxy,
  listEmissionFactorProxy,
  updateEmissionFactorProxy,
} from "@/utils/cms/adapters/website/carbon/emission-factor-proxy";
import { EmissionFactorProxyType } from "@/utils/cms/adapters/website/carbon/types";

export async function getEmissionFactors(search?: string | undefined) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  try {
    return {
      response: ((await listEmissionFactorProxy(profile, search)) as EmissionFactorProxyListJson[])?.sort((a, b) => {
        const orderingA = a?.id ?? 0;
        const orderingB = b?.id ?? 0;
        return orderingA - orderingB;
      }),
    };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function getEmissionFactorById(id: number) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: (await getEmissionFactorProxy(id)) as EmissionFactorProxyListJson };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function createEmissionFactor(body: EmissionFactorProxyType) {
  try {
    return { response: await createEmissionFactorProxy(body) };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function updateEmissionFactor(id: number, body: EmissionFactorProxyType) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await updateEmissionFactorProxy(id, body) };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}
