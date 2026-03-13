import ProfileUser from "@/components/profile/user/ProfileUser";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";

export default async function ProfileUserPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  return <ProfileUser />;
}
