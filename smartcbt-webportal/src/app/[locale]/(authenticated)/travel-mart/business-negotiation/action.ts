"use server";

import useCookies from "@/hooks/useCookies";
import { getProfile, ratingSchedule } from "@/utils/cms/cms-api-adapter";

export async function handleRatingSchedule(scheduleId: number, rating: number, type: "community" | "organization") {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  if (profile) {
    const result = await ratingSchedule(scheduleId, rating, type);
    return result;
  }
  throw Error("Not Found Profile");
}
