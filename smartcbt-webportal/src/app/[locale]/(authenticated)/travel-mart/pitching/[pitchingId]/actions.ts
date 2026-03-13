import { PitchingData } from "@/models/travel-mart/travel-mart-pitching";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { revalidatePath } from "next/cache";

export async function getDataPitching() {
  try {
    const url = `${getCmsURL()}/items/business_pitching?fields=*,featured_image.filename_disk,featured_image.type,groups.*,groups.expertise.*,groups.expertise.photo.filename_disk,groups.expertise.photo.type,groups.schedules.*,groups.schedules.user.id,groups.schedules.user.firstname,groups.schedules.user.lastname,groups.schedules.user.organizaitons.organizations_id.province.title`;
    const data = await fetch(url, { cache: "force-cache" });
    const json: { data: PitchingData[] } = await data.json();
    return json.data;
  } catch (error) {
    console.error(error);
    revalidatePath(`/travel-mart`);
  }
}
