"use server";

import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { fetchFolderIdByName } from "@/utils/cms/adapters/files/files";
import { uploadRegisteredAttachments } from "@/utils/cms/adapters/website/travel-mart/on-boarding/on-boarding";

export async function uploadFile(formData: FormData) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  const folderId = await fetchFolderIdByName("Communities");
  formData.append("folder", folderId);
  return await uploadRegisteredAttachments(formData);
}
