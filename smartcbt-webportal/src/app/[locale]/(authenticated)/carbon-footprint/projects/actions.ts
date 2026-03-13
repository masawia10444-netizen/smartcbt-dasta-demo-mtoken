"use server";

import useCookies from "@/hooks/useCookies";
import {
  createCarbonProgram,
  listCarbonProgram,
  updateCarbonProgram,
  uploadCarbonAttachments,
} from "@/utils/cms/adapters/website/carbon/program";
import { CarbonProgramsType } from "@/utils/cms/adapters/website/carbon/types";
import { fetchFolderIdByName, getProfile } from "@/utils/cms/cms-api-adapter";

export async function fetchListCarbon(status?: string, programOwner?: number, province?: number, search?: string) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);

  const filter = {
    status: status ?? undefined,
    province: province ?? undefined,
    organizations: programOwner ?? undefined,
    search: search ?? undefined,
  };
  const res = await listCarbonProgram(profile, filter);
  if (Array.isArray(res)) {
    return res?.sort((a, b) => (a.score ?? 0) - (b.score ?? 0)) ?? [];
  }
  return [res] ?? [];
}

export async function uploadFile(folderName: string, formData: FormData) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  const folderId = await fetchFolderIdByName(folderName);
  formData.append("folder", folderId);
  const response = await uploadCarbonAttachments(formData);
  return response;
}

export async function createCarbonProgramAction(body: CarbonProgramsType) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  try {
    return { response: await createCarbonProgram(body) };
  } catch (error) {
    return { error: error };
  }
}

export async function updateCarbonProgramAction(id: number, body: CarbonProgramsType) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  try {
    return { response: await updateCarbonProgram(id, body) };
  } catch (error) {
    return { error: error };
  }
}
