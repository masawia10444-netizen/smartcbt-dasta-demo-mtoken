import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartContextProvider from "@/components/context-provider/TravelMartContextProvider";
import { CommunityInfoPortalForm } from "@/components/travel-mart/community/create/CommunityInfoPortalForm";
import useCookies from "@/hooks/useCookies";
import {
  FacilityOptionSchema,
  Step2Schema,
} from "@/schemas/forms/community-info/create/community-info-create-schema-step2";
import { Step3Schema } from "@/schemas/forms/community-info/create/community-info-create-schema-step3";
import { SelectionQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { fetchCountries } from "@/utils/cms/adapters/master-data/geolocation/countries";
import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchRegions } from "@/utils/cms/adapters/master-data/geolocation/regions";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import { fetchAttractionType, listMonths } from "@/utils/cms/adapters/website/travel-mart/communities/option-api";
import {
  fetchFacilities,
  fetchTouristTargetGroups,
} from "@/utils/cms/adapters/website/travel-mart/on-boarding/options-api";
import { fetchProvinces } from "@/utils/cms/cms-api-adapter";

export default async function CommunityInfoFormPage() {
  const { token, appCode } = useCookies();
  await getProfile(token, appCode);

  const [
    provinces,
    districts,
    subdistricts,
    attractionTypes,
    regions,
    countries,
    touristTargetGroups,
    months,
    facilities,
  ] = await Promise.all([
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
    fetchAttractionType(),
    fetchRegions(),
    fetchCountries(),
    fetchTouristTargetGroups(),
    listMonths(),
    fetchFacilities(),
  ]);

  // Fetch options - Step1

  // Fetch options - Step2
  const step2: Step2Schema = [];
  var foundGroup: string | null = null;
  var facilitySchemas: FacilityOptionSchema[] = [];

  facilities.forEach((facility) => {
    const { group_title } = facility;
    if (group_title !== foundGroup) {
      if (foundGroup !== null) {
        step2.push({
          isEnabled: false,
          type: "group",
          title: foundGroup,
          facilities: [...facilitySchemas],
        });
        facilitySchemas = [];
      }
      foundGroup = group_title;
    }
    if (group_title) {
      facilitySchemas.push({
        id: facility.id,
        isEnabled: false,
        title: facility.title,
        unit: facility.unit_quantity_title ?? "",
        isQuantityEnabled: facility.quantity_flag,
        isSizeEnabled: facility.size_flag,
      });
    } else {
      step2.push({
        type: "none",
        facility: {
          id: facility.id,
          isEnabled: false,
          title: facility.title,
          unit: facility.unit_quantity_title ?? "",
          isQuantityEnabled: facility.quantity_flag,
          isSizeEnabled: facility.size_flag,
        },
      });
    }
  });
  if (facilitySchemas.length > 0) {
    step2.push({
      type: "group",
      title: foundGroup ?? "",
      facilities: [...facilitySchemas],
    });
  }

  // Fetch options - Step3
  const step31: SelectionQuestionSchema = {
    key: "1",
    label: "",
    placeholder: "",
    value: {},
    options: touristTargetGroups.map(({ id, title }) => ({ key: id?.toString(), label: title, value: id?.toString() })),
    type: "checkbox",
  };
  const step321: SelectionQuestionSchema = {
    key: "2-1",
    label: "",
    placeholder: "",
    value: {},
    options: regions.map(({ id, title }) => ({ key: `${id}` ?? "", label: title ?? "", value: `${id}` ?? "" })),
    type: "checkbox",
  };
  const step322: SelectionQuestionSchema = {
    key: "2-2",
    label: "",
    placeholder: "",
    value: {},
    options: countries.map(({ id, title }) => ({ key: `${id}` ?? "", label: title ?? "", value: `${id}` ?? "" })),
    type: "checkbox",
  };
  const step323: SelectionQuestionSchema = {
    key: "2-3",
    label: "",
    placeholder: "",
    value: {},
    options: attractionTypes.map(({ id, title }) => ({ key: `${id}` ?? "", label: title ?? "", value: `${id}` ?? "" })),
    type: "checkbox",
  };
  const step3: Step3Schema = { "1": step31, "2-1": step321, "2-2": step322, "2-3": step323 };

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <TravelMartContextProvider attractionTypes={attractionTypes}>
        <CommunityInfoPortalForm months={months} step2={step2} step3={step3} />
      </TravelMartContextProvider>
    </AppContextProvider>
  );
}
