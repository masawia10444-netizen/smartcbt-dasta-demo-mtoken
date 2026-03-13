import TravelMartBusinessSupport from "@/components/travel-mart/business-support/TravelMartBusinessSupport";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/manage-api";
import { getBusinessSupportBySlug } from "./actions";

export default async function TravelMartBusinessSupportPage({ params }: { params: { slug: string } }) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  const data = await getBusinessSupportBySlug(params.slug);
  return <TravelMartBusinessSupport businessSupport={data} />;
}
