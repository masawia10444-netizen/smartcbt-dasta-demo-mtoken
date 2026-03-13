import TravelMartContactUs from "@/components/travel-mart/contact-us/TravelMartContactUs";
import { BusinessContactStatus } from "@/models/travel-mart/travel-mart-business-contact";
import { getBusinessContacts } from "./actions";

export default async function TravelMartContactPage() {
  const data = (await getBusinessContacts())
    ?.filter((value) => value.status == BusinessContactStatus.Published)
    ?.sort((a, b) => {
      const orderingA = a?.sort ?? 0;
      const orderingB = b?.sort ?? 0;
      return orderingA - orderingB;
    });
  return <TravelMartContactUs data={data} />;
}
