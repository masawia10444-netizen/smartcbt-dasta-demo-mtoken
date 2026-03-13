import ManageApiRegister from "@/components/manage-api/register/ManageApiRegister";
import useCookies from "@/hooks/useCookies";
import { APP_CODE } from "@/utils/cms/adapters/website/api-management";
import { fetchConsentsByAppCode, getProfile } from "@/utils/cms/cms-api-adapter";
import { redirect } from "next/navigation";

export default async function ManageApiRegisterPage() {
  const { token, appCode } = useCookies();
  if (!!token) {
    const profile = await getProfile(token, appCode);
    if (!!profile) redirect("/mapi/onboarding");
  }

  const consents = await fetchConsentsByAppCode(APP_CODE);
  return <ManageApiRegister policy={consents} />;
}
