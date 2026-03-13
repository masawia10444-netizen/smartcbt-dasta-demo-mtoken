"use server";

import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { fetchFolderIdByName } from "@/utils/cms/adapters/files/files";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { createCbtProject, createProject } from "@/utils/cms/adapters/website/sia/create-sia";
import {
  getListManageFinancialProxy,
  getListManageMinorFinancialProxyByCreatedBy,
} from "@/utils/cms/adapters/website/sia/financial-proxies";
import { updateProjectData, updateProjectStatus } from "@/utils/cms/adapters/website/sia/project";
import { uploadProjectManagementAttachments } from "@/utils/cms/adapters/website/sia/project-strategies";
import { CbtProject, Project } from "@/utils/cms/adapters/website/sia/types/project";
import { createCommunity } from "@/utils/cms/adapters/website/travel-mart/communities/communities";
import { CreateCommunityBody } from "@/utils/cms/adapters/website/travel-mart/types/communities";
import { ValueOf } from "next/dist/shared/lib/constants";

export async function uploadFileAction(formData: FormData) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  const folderId = await fetchFolderIdByName("Project Management");
  formData.append("folder", folderId);
  const response = await uploadProjectManagementAttachments(formData);
  return response;
}

export async function createSIAProjectAction(body: Project): Promise<any> {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await createProject(body) };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function updateSIAProjectAction(id: number, body: Project) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await updateProjectData(id, body) };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function createOrganizationsAction(bodies: CreateCommunityBody[]) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  const promises: Promise<{ body: CreateCommunityBody; response: any }>[] = bodies.map(async (body) => {
    const response = await createCommunity(body);
    return { body, response };
  });

  return await Promise.all(promises);
}

export async function createCbtProjectAction(bodies: CbtProject[]) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  const promises: Promise<{ body: CbtProject; response: any }>[] = bodies.map(async (body) => {
    const response = await createCbtProject(body);
    return { body, response };
  });

  return await Promise.all(promises);
}

export async function updateProjectStatusAction(
  id: number,
  status: ValueOf<typeof PROJECT_STATUS>,
  remark?: string | null
) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await updateProjectStatus(id, status, remark ?? "") };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function getFinancialProxiesByYear(year: string) {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  return await getListManageFinancialProxy(profile, Number(year));
}

export async function getFinancialMinorProxiesByYear(userId: string, year: string) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  return await getListManageMinorFinancialProxyByCreatedBy(userId, Number(year));
}
