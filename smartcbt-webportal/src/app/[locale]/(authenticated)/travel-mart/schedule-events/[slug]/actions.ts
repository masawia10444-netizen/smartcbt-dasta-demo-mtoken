"use server"

import { BusinessActivities, StatusOfScheduleEvent } from "@/models/travel-mart/travel-mart-schedule-events";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { revalidatePath } from "next/cache";

export async function getBusinessActivitiesDataBySlug(slug: string) {
  try {
    const url = `${getCmsURL()}/items/business_activities?fields=*.*.*.*`;
    const data = await fetch(url, { cache: "no-cache" });
    const json: { data: BusinessActivities[] } = await data.json();
    //Simulate select view form data table need to change if have data table
    const businessActivities = new Promise<BusinessActivities | undefined>((resolve) => {
      setTimeout(() => {
        return resolve(
          json.data?.filter((d) => d.status == StatusOfScheduleEvent.Published).find((d) => d.slug == slug)
        );
      }, 1000);
    });
    return businessActivities;
  } catch (error) {
    console.error(error);
    revalidatePath(`/travel-mart`);
  }
}
