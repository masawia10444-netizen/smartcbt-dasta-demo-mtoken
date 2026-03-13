"use server";

import useCookies from "@/hooks/useCookies";
import { updateProfile } from "@/utils/cms/adapters/website/users/profile";
import { UpdateProfile } from "@/utils/cms/adapters/website/users/types/user";
import { CreateOnBoardingApiManagement, getProfile, updateOnBoarding } from "@/utils/cms/cms-api-adapter";

export async function updateProfileAction(body: UpdateProfile) {
  const { appCode, token } = useCookies();
  console.log(appCode, token);
  console.log(body);
  const profile = await getProfile(token, appCode);
  const res = await updateProfile(profile, body);
  return res;
}
