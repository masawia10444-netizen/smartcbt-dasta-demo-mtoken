import TravelMartRegisterPortal from "@/components/travel-mart/register/TravelMartRegisterPortal";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/cms-api-adapter";

export default async function RegisterTravelMartPortalPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  return <TravelMartRegisterPortal />;
}
