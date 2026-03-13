import Policy from "@/components/manage-api/developer/policy/Policy";
import useCookies from "@/hooks/useCookies";
import { APP_CODE } from "@/utils/cms/adapters/website/api-management";
import { fetchConsentsByAppCode } from "@/utils/cms/cms-api-adapter";

export default async function DeveloperPolicyPage() {
  const { token, appCode } = useCookies();
  const consents = await fetchConsentsByAppCode(APP_CODE);

  return <Policy data={consents} />;
}
