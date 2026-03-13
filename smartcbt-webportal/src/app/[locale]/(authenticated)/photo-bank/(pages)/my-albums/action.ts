"use server";

import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { createAlbum, updateAlbumById } from "@/utils/cms/adapters/website/photo-bank/photographer";
import { CreateAlbumBody } from "@/utils/cms/adapters/website/photo-bank/types";

export async function createAlbumAction(body: CreateAlbumBody) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await createAlbum(body) };
  } catch (e) {
    return { error: JSON.stringify(e) };
  }
}

export async function updateAlbumAction(id: number, body: CreateAlbumBody) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);
  try {
    return { response: await updateAlbumById(id, body) };
  } catch (e) {
    return { error: JSON.stringify(e) };
  }
}
