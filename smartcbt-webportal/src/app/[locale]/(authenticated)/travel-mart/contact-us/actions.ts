import { BusinessContact } from "@/models/travel-mart/travel-mart-business-contact";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { revalidatePath } from "next/cache";

export async function getBusinessContacts() {
  try {
    const url = `${getCmsURL()}/items/business_contacts?fields=*.*.*.*`;
    const data = await fetch(url, { cache: "no-cache" });
    const json: { data: BusinessContact[] } = await data.json();
    const businessContacts = new Promise<BusinessContact[] | undefined>((resolve) => {
      setTimeout(() => {
        return resolve(json.data);
      }, 1000);
    });
    return businessContacts;
  } catch (error) {
    console.error(error);
    revalidatePath(`/travel-mart`);
  }
}
