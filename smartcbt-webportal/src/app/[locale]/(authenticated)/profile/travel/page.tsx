import ProfileTravelMart from "@/components/profile/travel-mart/ProfileTravelMart";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";

export default async function ProfileTravelMartPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  return <ProfileTravelMart />;
}
