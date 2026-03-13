import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartContextProvider from "@/components/context-provider/TravelMartContextProvider";
import TravelMartMain from "@/components/travel-mart/TravelMartMain";
import useCookies from "@/hooks/useCookies";
import { fetchAttractionType, fetchProvinces, fetchRegions, getProfile } from "@/utils/cms/cms-api-adapter";

export default async function TravelMartMainPage() {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);

  const [provinces, attractionTypes, regions] = await Promise.all([
    fetchProvinces(),
    fetchAttractionType(),
    fetchRegions(),
  ]);

  return (
    <AppContextProvider provinces={provinces}>
      <TravelMartContextProvider attractionTypes={attractionTypes} regions={regions}>
        <TravelMartMain profile={profile} />
      </TravelMartContextProvider>
    </AppContextProvider>
  );
}
