"use server";

import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import {
  getOnBoardingPhotoGrapher,
  onboardingPhotoGrapher,
  updateOnboardingPhotoGrapher,
} from "@/utils/cms/adapters/website/photo-bank/photographer";
import { PhotoGrapherOnBoardingBody } from "@/utils/cms/adapters/website/photo-bank/types";

export type GetPhotoGrapherProfile = Pick<
  Awaited<ReturnType<typeof getPhotoGrapherProfile>>,
  "photoGrapher"
>["photoGrapher"];

export async function getPhotoGrapherProfile() {
  try {
    const { appCode, token } = useCookies();
    const profile = await getProfile(token, appCode);
    const photoGrapher = await getOnBoardingPhotoGrapher(profile);
    return { photoGrapher: photoGrapher };
  } catch (error) {
    console.log(error);
    return { error: "Not Found Profile", photoGrapher: null };
  }
}
export async function onboardingPhotoGrapherAction(body: PhotoGrapherOnBoardingBody) {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);
  try {
    return { response: await onboardingPhotoGrapher(profile, body) };
  } catch (e) {
    return { error: JSON.stringify(e) };
  }
}

export async function updateOnboardingPhotoGrapherAction(body: PhotoGrapherOnBoardingBody) {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);
  try {
    return { response: await updateOnboardingPhotoGrapher(profile, body) };
  } catch (e) {
    return { error: JSON.stringify(e) };
  }
}
