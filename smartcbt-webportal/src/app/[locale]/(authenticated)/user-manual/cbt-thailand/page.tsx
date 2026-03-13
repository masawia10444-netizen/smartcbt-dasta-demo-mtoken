import CbtManual from "@/components/user-manual/CbtManual";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { listManualsCbt } from "@/utils/cms/adapters/website/application-manual/manual";

export default async function CbtThailandPage() {
  const { token, appCode } = useCookies();
  const manauls = await listManualsCbt();

  await getProfile(token, appCode);

  return (
    <>
      <CbtManual title="userManual.cbtTitle" image="/images/shared/cbt-thailand.png" manuals={manauls} />
    </>
  );
}
