import BusinessNegotiationPortal from "@/components/travel-mart/business-negotiation/BusinessNegotiationPostal";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/cms-api-adapter";

export default async function BusinessNegotiationPortalPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  return <BusinessNegotiationPortal />;
}
