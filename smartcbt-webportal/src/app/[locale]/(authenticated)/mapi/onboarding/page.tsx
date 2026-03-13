import ManageApiOnboarding from "@/components/manage-api/onboarding/ManageApiOnboarding";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/cms-api-adapter";
import { getIsOnBoarding } from "@/utils/manage-api";
import { redirect } from "next/navigation";

export default async function ManageApiOnboardingPage() {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);

  if (!!profile && getIsOnBoarding(profile?.roles)) redirect("/mapi");

  return <ManageApiOnboarding />;
}
