import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartContextProvider from "@/components/context-provider/TravelMartContextProvider";
import TravelMartRegisterMainForm from "@/components/travel-mart/register/TravelMartRegisterMainForm";
import useCookies from "@/hooks/useCookies";
import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import { fetchLanguageSkills, fetchProvinces, getProfile } from "@/utils/cms/cms-api-adapter";
import { getPolicies, getTermConditions } from "../../../actions";

export default async function RegisterTravelMartPage() {
  const { token, appCode } = useCookies();
  await getProfile(token, appCode);

  const [termConditions, policies, languageSkills, provinces, districts, subdistricts] = await Promise.all([
    getTermConditions(),
    getPolicies(),
    fetchLanguageSkills(),
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
  ]);

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <TravelMartContextProvider policies={policies} termConditions={termConditions} languageSkills={languageSkills}>
        <TravelMartRegisterMainForm type="guide" />;
      </TravelMartContextProvider>
    </AppContextProvider>
  );
}
