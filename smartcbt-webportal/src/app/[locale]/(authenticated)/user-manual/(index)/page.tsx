import UserManual from "@/components/user-manual/UserManual";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { manualsByApplication } from "@/utils/cms/adapters/website/application-manual/manual";

export default async function UserManualPage() {
  const { token, appCode } = useCookies();
  await getProfile(token, appCode);
  const manuals = await manualsByApplication();
  manuals.push({
    id: manuals.length + 1,
    title: "CBT Thailand",
    href: "/user-manual/cbt-thailand",
    application_code: "CBT",
    width: 140,
    height: 140,
  });

  return <UserManual manuals={manuals} />;
}
