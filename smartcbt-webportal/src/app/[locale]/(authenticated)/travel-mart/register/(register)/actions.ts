"use server";

import useCookies from "@/hooks/useCookies";
import { TravelMartRegisterCommunitySchema } from "@/schemas/forms/travel-mart/register/travel-mart-register-community-schema";
import { TravelMartRegisterEntrepreneurSchema } from "@/schemas/forms/travel-mart/register/travel-mart-register-entrepreneur-schema";
import { TravelMartRegisterGuideSchema } from "@/schemas/forms/travel-mart/register/travel-mart-register-guide-schema";
import {
  CommunityOnBoardingBody,
  GuideOnBoardingBody,
  OrganizationOnBoardingBody,
} from "@/utils/cms/adapters/website/travel-mart/types/on-boarding";
import {
  getProfile,
  onBoardingCommunity,
  onBoardingGuide,
  onBoardingOrganization,
  updateOnBoardingOrganization,
} from "@/utils/cms/cms-api-adapter";

interface MyJsonObject {
  [key: string]: {
    value: string;
  };
}

function getBooleanValue(key: string, json: MyJsonObject, targetValue: string): boolean {
  const item = json[key];
  if (item && item.value) {
    return item.value == targetValue;
  }
  return false;
}

function getValues(json: MyJsonObject): number[] {
  const values: number[] = [];
  for (const key in json) {
    if (json.hasOwnProperty(key) && json[key].value) {
      values.push(Number(json[key].value));
    }
  }
  return values;
}

export const handleOnboardingCommunity = async (body: TravelMartRegisterCommunitySchema) => {
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
    const result = await onBoardingCommunity(profile, bodyCommunityOnBoarding);
    return result;
  } catch (error) {
    console.log("Error onBoardingCommunity:", error);
    return {
      error: `${error}`,
    };
  }
};

export const handleOnboardingOrganization = async (body: TravelMartRegisterEntrepreneurSchema) => {
  const { token, appCode } = useCookies();
  if (!token || !appCode) {
    return {
      error: `Undefined Token or App Code`,
    };
  }
  const profile = await getProfile(token, appCode);

  // const folderId = await fetchFolderIdByName("Registered Attachments");

  const bodyOrganizationOnBoarding: OrganizationOnBoardingBody = {
    contactPoints: [
      {
        firstname: body.firstName,
        lastname: body.lastName,
        mobile: body.phoneNumber,
        email: body.email,
        line: body.line ?? null,
      },
    ],
    organizationInfo: {
      organizationTitle: body.companyName,
      registeredNo: body.companyLicenseNumber,
      registeredAttachments: null,
      address: body.address.addressDetail ?? null,
      provinceId: body.address.province.id,
      districtId: body.address.district.id,
      subDistrictId: body.address.subdistrict.id,
      postalCode: body.address.postCode,
      organizationYear: body.lengthOfBusiness,
      website: body.website ?? null,
      facebook: body.facebook ?? null,
      instagram: body.instagram ?? null,
      tiktok: body.tikTok ?? null,
      other: body.haveOther ? body.other ?? null : null,
      latitude: body.address.lat ?? null,
      longitude: body.address.long ?? null,
      googleMapUrl: body.address.googleMapUrl ?? null,
    },
    organizationMarketingTourism: {
      dastaBusinessType: body.typeOfEstablishment.id,
      associationTravelGroup: body.association.id,
      attractionTypes: getValues(body.step3.value as any) ?? [],
      selectingCommunityChoices: getValues(body.step4.value as any) ?? [],
      awards: getValues(body.step5.value as any) ?? [],
      csrTypes: getValues(body.step6.value as any) ?? [],
      requireBusinessMatching: getBooleanValue("7-option-1", body.step7.value as any, "7-option-1"),
      currentTouristTargetGroups: getValues(body.step8.value as any) ?? [],
      futureTouristTargetGroups: getValues(body.step9.value as any) ?? [],
      requireFacilities: [],
      currentTouristTravelType: getValues(body.step10.value as any) ?? [],
      futureTouristTravelType: getValues(body.step11.value as any) ?? [],
    },
    consents: [2],
  };

  // console.log(bodyOrganizationOnBoarding);

  try {
    const result = await onBoardingOrganization(profile, bodyOrganizationOnBoarding);
    return result;
  } catch (error) {
    console.log("Error onBoardingOrganization:", error);
    return {
      error: `${error}`,
    };
  }
};

export const handleOnboardingGuide = async (body: TravelMartRegisterGuideSchema) => {
  const { token, appCode } = useCookies();
  if (!token || !appCode) {
    return {
      error: `Undefined Token or App Code`,
    };
  }
  const bodyGuideOnBoarding: GuideOnBoardingBody = {
    firstname: body.firstName,
    lastname: body.lastName,
    mobile: body.phoneNumber,
    email: body.email,
    lineId: body.line ?? null,
    thaiNationalId: body.identification,
    nationality: body.nationality ?? null,
    facebook: body.facebook ?? null,
    instagram: body.instagram ?? null,
    other: body.haveOtherSocial
      ? body.otherSocial != undefined && body.otherSocial != null && body.otherSocial != ""
        ? body.otherSocial
        : null
      : null,
    addressInfo: {
      address: body.guideAddress.addressDetail,
      provinceId: body.guideAddress.province.id,
      districtId: body.guideAddress.district.id,
      subDistrictId: body.guideAddress.subdistrict.id,
      postalCode: body.guideAddress.postCode,
    },
    guideInfo: {
      licenseNumber: body.licenseNumber,
      licenseExpiredDate: new Date(body.expiateDate),
      communityTitle: body.affiliatedWith,
      organizationTitle: body.companyWork,
      yearExperience: body.lengthOfGuide,
      monthExperience: body.lengthOfGuideMonth,
      workProvinceId: body.provinceGuide.id,
      languageSkills: body.language.map((l) => l.name.title),
    },
    consents: [2],
    profileImage: body.files.id,
  };
  const profile = await getProfile(token, appCode);
  try {
    console.log("bodyGuideOnBoarding: ", JSON.stringify(bodyGuideOnBoarding));
    const result = await onBoardingGuide(profile, bodyGuideOnBoarding);
    return result;
  } catch (error) {
    console.log("Error onBoardingGuide:", error);
    return {
      error: `${error}`,
    };
  }
};

export const handleUpdateOnboardingOrganization = async (body: TravelMartRegisterEntrepreneurSchema) => {
  const { token, appCode } = useCookies();
  if (!token || !appCode) {
    return {
      error: `Undefined Token or App Code`,
    };
  }
  const profile = await getProfile(token, appCode);

  // const folderId = await fetchFolderIdByName("Registered Attachments");

  const bodyOrganizationOnBoarding: OrganizationOnBoardingBody = {
    contactPoints: [
      {
        firstname: body.firstName,
        lastname: body.lastName,
        mobile: body.phoneNumber,
        email: body.email,
        line: body.line ?? null,
      },
    ],
    organizationInfo: {
      organizationTitle: body.companyName,
      registeredNo: body.companyLicenseNumber,
      registeredAttachments: null,
      address: body.address.addressDetail ?? null,
      provinceId: body.address.province.id,
      districtId: body.address.district.id,
      subDistrictId: body.address.subdistrict.id,
      postalCode: body.address.postCode,
      organizationYear: body.lengthOfBusiness,
      website: body.website ?? null,
      facebook: body.facebook ?? null,
      instagram: body.instagram ?? null,
      tiktok: body.tikTok ?? null,
      other: body.haveOther ? body.other ?? null : null,
      latitude: body.address.lat ?? null,
      longitude: body.address.long ?? null,
      googleMapUrl: body.address.googleMapUrl ?? null,
    },
    organizationMarketingTourism: {
      dastaBusinessType: body.typeOfEstablishment.id,
      associationTravelGroup: body.association.id,
      attractionTypes: getValues(body.step3.value as any) ?? [],
      selectingCommunityChoices: getValues(body.step4.value as any) ?? [],
      awards: getValues(body.step5.value as any) ?? [],
      csrTypes: getValues(body.step6.value as any) ?? [],
      requireBusinessMatching: getBooleanValue("7-option-1", body.step7.value as any, "7-option-1"),
      currentTouristTargetGroups: getValues(body.step8.value as any) ?? [],
      futureTouristTargetGroups: getValues(body.step9.value as any) ?? [],
      requireFacilities: [],
      currentTouristTravelType: getValues(body.step10.value as any) ?? [],
      futureTouristTravelType: getValues(body.step11.value as any) ?? [],
    },
    consents: [2],
  };


  try {
    const result = await updateOnBoardingOrganization(profile, bodyOrganizationOnBoarding);
    return result;
  } catch (error) {
    console.log("Error updateOnBoardingOrganization:", error);
    return {
      error: `${error}`,
    };
  }
};
