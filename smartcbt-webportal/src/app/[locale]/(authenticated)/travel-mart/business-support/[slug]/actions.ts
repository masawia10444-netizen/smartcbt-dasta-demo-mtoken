import { BusinessSupport } from "@/models/travel-mart/travel-mart-business-support";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { revalidatePath } from "next/cache";

export async function getBusinessSupportBySlug(slug: string) {
  try {
    const url = `${getCmsURL()}/items/business_supports?fields=*.*`;
    const data = await fetch(url, { cache: "force-cache" });
    const json: { data: BusinessSupport[] } = await data.json();
    const guideData = new Promise<BusinessSupport | undefined>((resolve) => {
      setTimeout(() => {
        return resolve(json.data.find((d) => d.slug == slug));
      }, 1000);
    });
    return guideData;
  } catch (error) {
    console.error(error);
    revalidatePath(`/travel-mart`);
  }
}
