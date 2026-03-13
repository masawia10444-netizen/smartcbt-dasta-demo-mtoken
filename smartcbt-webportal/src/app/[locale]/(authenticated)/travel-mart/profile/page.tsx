import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartContextProvider from "@/components/context-provider/TravelMartContextProvider";
import TravelMartProfileMain from "@/components/travel-mart/profile/TravelMartProfileMain";
import useCookies from "@/hooks/useCookies";
import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import {
  fetchAssociationTravelGroup,
  fetchAttractionType,
  fetchAwards,
  fetchConsentsByAppCode,
  fetchCsrTypes,
  fetchDastaBusinessType,
  fetchFacilities,
  fetchLanguageSkills,
  fetchProvinces,
  fetchSelectingCommunityChoices,
  fetchTouristTargetGroups,
  fetchTouristTravelType,
  getProfile,
} from "@/utils/cms/cms-api-adapter";
import { getPolicies, getTermConditions } from "../actions";

export default async function TravelMartProfilePage() {
  const { token, appCode } = useCookies();
  await getProfile(token, appCode);

  const [
    associationTravelGroup,
    attractionTypes,
    awards,
    csrTypes,
    dastaBusinessType,
    facilities,
    selectingCommunityChoices,
    touristTargetGroups,
    touristTravelType,
    consents,
    languageSkills,
    termConditions,
    policies,
    provinces,
    districts,
    subdistricts,
  ] = await Promise.all([
    fetchAssociationTravelGroup(),
    fetchAttractionType(),
    fetchAwards(),
    fetchCsrTypes(),
    fetchDastaBusinessType(),
    fetchFacilities(),
    fetchSelectingCommunityChoices(),
    fetchTouristTargetGroups(),
    fetchTouristTravelType(),
    fetchConsentsByAppCode(appCode),
    fetchLanguageSkills(),
    getTermConditions(),
    getPolicies(),
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
  ]);

  const props = {
    awards: awards,
    attractionTypes: attractionTypes,
    languageSkills: languageSkills,
    associationTravelGroup: associationTravelGroup,
    csrTypes: csrTypes,
    dastaBusinessType: dastaBusinessType,
    facilities: facilities,
    selectingCommunityChoices: selectingCommunityChoices,
    touristTargetGroups: touristTargetGroups,
    touristTravelType: touristTravelType,
    consents: consents,
    termConditions: termConditions,
    policies: policies,
  };

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <TravelMartContextProvider {...props}>
        <TravelMartProfileMain />
      </TravelMartContextProvider>
    </AppContextProvider>
  );
}
