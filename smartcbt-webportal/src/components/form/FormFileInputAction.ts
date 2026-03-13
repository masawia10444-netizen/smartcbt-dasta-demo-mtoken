"use server";

import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { fetchFolderIdByName } from "@/utils/cms/adapters/files/files";
import { uploadFileFinancialProxy, uploadRegisteredAttachments } from "@/utils/cms/cms-api-adapter";

export async function uploadFile(folderName: string, formData: FormData) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  const folderId = await fetchFolderIdByName(folderName);
  formData.append("folder", folderId);
  return await uploadRegisteredAttachments(formData);
}

export async function uploadFileForFinancialProxy(folderName: string, formData: FormData) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  const folderId = await fetchFolderIdByName(folderName);
  formData.append("folder", folderId);
  return await uploadFileFinancialProxy(formData);
}
