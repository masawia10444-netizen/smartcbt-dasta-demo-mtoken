import TravelMartAboutProject from "@/components/travel-mart/about-project/TravelMartAboutProject";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/manage-api";

export default async function TravelMartAboutProjectPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  return <TravelMartAboutProject />;
}
