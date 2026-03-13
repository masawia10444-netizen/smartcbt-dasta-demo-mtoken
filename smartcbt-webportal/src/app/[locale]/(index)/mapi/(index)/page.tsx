import ManageApiMain from "@/components/manage-api/main/ManageApiMain";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/cms-api-adapter";

export default async function ManageApiMainPage() {
  const { appCode, token } = useCookies();
  let profile;

  try {
    if (!!token) {
      profile = await getProfile(token, appCode);
    }
  } catch {}

  return <ManageApiMain profile={profile} />;
}
