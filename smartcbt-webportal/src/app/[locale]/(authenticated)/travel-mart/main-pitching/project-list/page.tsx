import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartContextProvider from "@/components/context-provider/TravelMartContextProvider";
import TravelMartSellProjectList from "@/components/travel-mart/sell/TravelMartSellProjectList";
import useCookies from "@/hooks/useCookies";
import { fetchAttractionType, fetchProvinces, fetchRegions, getProfile } from "@/utils/cms/cms-api-adapter";

export default async function TravelMartSellPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  const [provinces, attractionTypes, regions] = await Promise.all([
    fetchProvinces(),
    fetchAttractionType(),
    fetchRegions(),
  ]);

  return (
    <AppContextProvider provinces={provinces}>
      <TravelMartContextProvider attractionTypes={attractionTypes} regions={regions}>
        <TravelMartSellProjectList />
      </TravelMartContextProvider>
    </AppContextProvider>
  );
}
