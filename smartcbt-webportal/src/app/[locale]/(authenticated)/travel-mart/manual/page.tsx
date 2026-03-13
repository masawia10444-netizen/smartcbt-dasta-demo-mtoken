import TravelMartManual from "@/components/travel-mart/TravelMartManual";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { manualsByApplication } from "@/utils/cms/adapters/website/application-manual/manual";

export default async function CbtThailandPage() {
  const { token, appCode } = useCookies();

  await getProfile(token, appCode);

  const manauls = await manualsByApplication("BUSINESS", false);
  return (
    <>
      <TravelMartManual title="travelMart.manual.title" manuals={manauls} />
    </>
  );
}
