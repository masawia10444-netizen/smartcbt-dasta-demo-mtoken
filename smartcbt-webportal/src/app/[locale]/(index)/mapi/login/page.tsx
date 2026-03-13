import ManageApiLogin from "@/components/manage-api/login/ManageApiLogin";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/cms-api-adapter";
import { getIsOnBoarding } from "@/utils/manage-api";
import { redirect } from "next/navigation";

export default async function ManageApiLoginPage() {
  const { token, appCode } = useCookies();
  if (!!token) {
    const profile = await getProfile(token, appCode);
    const isOnboarding = getIsOnBoarding(profile?.roles) ?? false;

    if (!!profile) {
      isOnboarding ? redirect("/mapi") : redirect("/mapi/onboarding");
    }
  }

  return <ManageApiLogin />;
}
