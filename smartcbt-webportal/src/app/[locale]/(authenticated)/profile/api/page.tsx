import ProfileAPI from "@/components/profile/api/ProfileAPI";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";

export default async function ProfilePage() {
  const { token, appCode } = useCookies();
  await getProfile(token, appCode);

  return <ProfileAPI />;
}
