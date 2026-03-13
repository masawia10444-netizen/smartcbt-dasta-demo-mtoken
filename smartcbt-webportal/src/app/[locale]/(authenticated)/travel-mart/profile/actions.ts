"use server";

import useCookies from "@/hooks/useCookies";
import { TravelMartRegisterCommunitySchema } from "@/schemas/forms/travel-mart/register/travel-mart-register-community-schema";
import {
  CommunityOnBoardingBody,
  fetchAssociationTravelGroup,
  fetchAttractionType,
  fetchAwards,
  fetchCsrTypes,
  fetchDastaBusinessType,
  fetchFacilities,
  fetchOnBoardingCommunity,
  fetchOnBoardingGuide,
  fetchOnBoardingOrganization,
  fetchSelectingCommunityChoices,
  fetchTouristTargetGroups,
  fetchTouristTravelType,
  getProfile,
  updateOnBoardingCommunity,
} from "@/utils/cms/cms-api-adapter";
export type GetOrganizationProfileJSON = Pick<Awaited<ReturnType<typeof getOrganizationProfile>>, "organization">;

export async function getGuideProfile() {
  try {
    const { appCode, token } = useCookies();
    const profile = await getProfile(token, appCode);
    const guide = await fetchOnBoardingGuide(profile);
    return { guide: guide };
  } catch (error) {
    console.log(error);
    return { error: "Not Found Profile" };
  }
}
export async function getCommunityProfile() {
  try {
    const { appCode, token } = useCookies();
    const profile = await getProfile(token, appCode);
    const community = await fetchOnBoardingCommunity(profile);
    return { community: community };
  } catch (error) {
    console.log(error);
    return { error: "Not Found Profile" };
  }
}
export async function getOrganizationProfile() {
  try {
    const { appCode, token } = useCookies();
    const profile = await getProfile(token, appCode);
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
    ]);
    const organization = await fetchOnBoardingOrganization(profile);
    const organizationMarketingTourism = {
      dastaBusinessType: dastaBusinessType.find(
        (d) => d.id == organization.organizationMarketingTourism.dastaBusinessType
      ),
      associationTravelGroup: associationTravelGroup.find(
        (atg) => atg.id == organization.organizationMarketingTourism.associationTravelGroup
      ),
      attractionTypes: attractionTypes.filter(
        (at) => at.id && organization.organizationMarketingTourism.attractionTypes?.includes(at.id)
      ),
      selectingCommunityChoices: selectingCommunityChoices.filter(
        (scc) => organization.organizationMarketingTourism.selectingCommunityChoices?.includes(scc.id)
      ),
      awards: awards.filter((aw) => organization.organizationMarketingTourism.awards?.includes(aw.id)),
      csrTypes: csrTypes.filter((csr) => organization.organizationMarketingTourism.csrTypes?.includes(csr.id)),
      requireBusinessMatching: organization.organizationMarketingTourism.requireBusinessMatching,
      currentTouristTargetGroups: touristTargetGroups.filter(
        (ttg) => organization.organizationMarketingTourism.currentTouristTargetGroups?.includes(ttg.id)
      ),
      futureTouristTargetGroups: touristTargetGroups.filter(
        (ttg) => organization.organizationMarketingTourism.futureTouristTargetGroups?.includes(ttg.id)
      ),
      requireFacilities: facilities.filter(
        (f) => organization.organizationMarketingTourism.requireFacilities?.includes(f.id)
      ),
      currentTouristTravelType: touristTravelType.filter(
        (ttt) => organization.organizationMarketingTourism.currentTouristTravelType?.includes(ttt.id)
      ),
      futureTouristTravelType: touristTravelType.filter(
        (ttt) => organization.organizationMarketingTourism.futureTouristTravelType?.includes(ttt.id)
      ),
    };
    return { organization: { ...organization, organizationMarketingTourism } };
  } catch (error) {
    console.log(error);
    return { error: "Not Found Profile" };
  }
}

export const handleUpdateCommunity = async (body: TravelMartRegisterCommunitySchema) => {
  const { token, appCode } = useCookies();
  if (!token || !appCode) {
    return {
      error: `Undefined Token or App Code`,
    };
  }
  const profile = await getProfile(token, appCode);
  try {
    const bodyCommunityOnBoarding: CommunityOnBoardingBody = {
      firstname: body.firstName,
      lastname: body.lastName,
      mobile: body.phoneNumber,
      email: body.email,
      addressInfo: {
        address: body.communityAddress.addressDetail,
        provinceId: body.communityAddress.province.id,
        districtId: body.communityAddress.district.id,
        subDistrictId: body.communityAddress.subdistrict.id,
        postalCode: body.communityAddress.postCode,
      },
      consents: [2],
    };
    const result = await updateOnBoardingCommunity(profile, bodyCommunityOnBoarding);
    return { result: result };
  } catch (error) {
    console.log("Error updateOnBoardingCommunity:", error);
    return {
      error: `${error}`,
    };
  }
};
