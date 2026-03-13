"use server";
import { Profile, checkExistApplication, checkPermissionExist } from "@/utils/cms/adapters/authen";
import cmsApi from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { createItem, readItems, updateItem, uploadFiles } from "@directus/sdk";
import { get, isEmpty, isNil } from "lodash";

import {
  CommuOnboarding,
  CommunityOnBoardingBody,
  GuideOnBoarding,
  GuideOnBoardingBody,
  OrgOnboarding,
  OrganizationOnBoardingBody,
  UserApps,
} from "../types/on-boarding";
import { Organization } from "../types/travel-mart";
import { calculateOptions } from "./utils";

function isString(test: any): test is string {
  return typeof test === "string";
}

function parseString(data: any | string | null | undefined) {
  return isString(data) && !isNil(data) ? String(data) : null;
}

function isNumber(test: any): test is number {
  return typeof test === "number";
}

function parseNumber(data: any | number | null | undefined) {
  return isNumber(data) && !isNil(data) ? Number(data) : null;
}

// NOTE: CREATE NEW ONBOARDING

async function onBoardingCommunity(profile: Profile, body: CommunityOnBoardingBody) {
  // find business application
  const code = "community";
  const permission = await checkPermissionExist("BUSINESS", code);

  // add user app
  // check not exist
  const application = Number(permission.applications);

  await checkExistApplication(profile, application, permission);

  const commuOnBoarding: CommuOnboarding = {
    commu_firstname: body.firstname,
    commu_lastname: body.lastname,
    commu_mobile: body.mobile,
    commu_email: body.email,
    commu_address: body.addressInfo.address,
    commu_province: body.addressInfo.provinceId,
    commu_district: body.addressInfo.districtId,
    commu_subdistrict: body.addressInfo.subDistrictId,
    commu_postal_code: body.addressInfo.postalCode,
  };

  if (!isEmpty(body.consents)) {
    commuOnBoarding.consents = body.consents.map((consentId) => ({ application_consents_id: consentId }));
  }

  const userAppBody: Partial<UserApps> = {
    user: profile.id,
    application: application,
    user_app_role: permission.id,
    commu_onboarding: [commuOnBoarding],
  };

  try {
    await cmsApi.request(createItem("user_apps", userAppBody));
    return { status: "success" };
  } catch (e) {
    console.log("error: ", e);
  }
}

async function onBoardingOrganization(profile: Profile, body: OrganizationOnBoardingBody) {
  // find business application
  const code = "organization";
  const permission = await checkPermissionExist("BUSINESS", code);

  // add user app
  // check not exist
  const application = Number(permission.applications);

  await checkExistApplication(profile, application, permission);

  const rawAttractionTypes = get(body, ["organizationMarketingTourism", "attractionTypes"], []) ?? [];
  const rawSelectingCommunityChoices =
    get(body, ["organizationMarketingTourism", "selectingCommunityChoices"], []) ?? [];
  const rawAwards = get(body, ["organizationMarketingTourism", "awards"], []) ?? [];
  const rawCsrTypes = get(body, ["organizationMarketingTourism", "csrTypes"], []) ?? [];
  const rawCurrentTouristTargetGroups =
    get(body, ["organizationMarketingTourism", "currentTouristTargetGroups"], []) ?? [];
  const rawFutureTouristTargetGroups =
    get(body, ["organizationMarketingTourism", "futureTouristTargetGroups"], []) ?? [];
  const rawRequireFacilities = get(body, ["organizationMarketingTourism", "requireFacilities"], []) ?? [];
  const rawCurrentTouristTravelType = get(body, ["organizationMarketingTourism", "currentTouristTravelType"], []) ?? [];
  const rawFutureTouristTravelType = get(body, ["organizationMarketingTourism", "futureTouristTravelType"], []) ?? [];

  const attractionTypes = !isEmpty(rawAttractionTypes)
    ? rawAttractionTypes.map((id) => ({
        community_tourist_attraction_type_id: id,
      }))
    : [];

  const selectingCommunityChoices = !isEmpty(rawSelectingCommunityChoices)
    ? rawSelectingCommunityChoices.map((id) => ({
        selecting_community_choices_id: id,
      }))
    : [];

  const awards = !isEmpty(rawAwards)
    ? rawAwards.map((id) => ({
        awards_id: id,
      }))
    : [];

  const csrTypes = !isEmpty(rawCsrTypes)
    ? rawCsrTypes.map((id) => ({
        csr_types_id: id,
      }))
    : [];

  const currentTouristTargetGroups = !isEmpty(rawCurrentTouristTargetGroups)
    ? rawCurrentTouristTargetGroups.map((id) => ({
        tourist_target_groups_id: id,
      }))
    : [];

  const futureTouristTargetGroups = !isEmpty(rawFutureTouristTargetGroups)
    ? rawFutureTouristTargetGroups.map((id) => ({
        tourist_target_groups_id: id,
      }))
    : [];

  const requireFacilities = !isEmpty(rawRequireFacilities)
    ? rawRequireFacilities.map((id) => ({
        community_facilities_id: id,
      }))
    : [];

  const currentTouristTravelType = !isEmpty(rawCurrentTouristTravelType)
    ? rawCurrentTouristTravelType.map((id) => ({
        tourist_travel_type_id: id,
      }))
    : [];

  const futureTouristTravelType = !isEmpty(rawFutureTouristTravelType)
    ? rawFutureTouristTravelType.map((id) => ({
        tourist_travel_type_id: id,
      }))
    : [];

  // create organization
  const organizationBody: Organization = {
    title: body.organizationInfo.organizationTitle,
    contacts: body.contactPoints,
    organization_type: 2, // business type,
    registered_no: body.organizationInfo.registeredNo,
    registered_attachments: !isNil(body.organizationInfo.registeredAttachments)
      ? [{ directus_files_id: String(body.organizationInfo.registeredAttachments) }]
      : [],
    business_period: body.organizationInfo.organizationYear.toString(),
    business_period_unit: "year",
    website: body.organizationInfo.website,
    dasta_business_type: body.organizationMarketingTourism.dastaBusinessType,
    address_1: body.organizationInfo.address,
    province: body.organizationInfo.provinceId,
    district: body.organizationInfo.districtId,
    subdistrict: body.organizationInfo.subDistrictId,
    postal_code: body.organizationInfo.postalCode,
    facebook_id: body.organizationInfo.facebook,
    tiktok_id: body.organizationInfo.tiktok,
    instagram_id: body.organizationInfo.instagram,
    latitude: body.organizationInfo.latitude,
    longitude: body.organizationInfo.longitude,
    google_map_url: body.organizationInfo.googleMapUrl,
    organization_year: body.organizationInfo.organizationYear,
    association_travel_group: body.organizationMarketingTourism.associationTravelGroup,
    attraction_types: attractionTypes,
    selecting_community_choices: selectingCommunityChoices,
    awards: awards,
    csr_types: csrTypes,
    require_business_matching: body.organizationMarketingTourism.requireBusinessMatching,
    current_tourist_target_groups: currentTouristTargetGroups,
    future_tourist_target_groups: futureTouristTargetGroups,
    require_facilities: requireFacilities,
    current_tourist_travel_types: currentTouristTravelType,
    future_tourist_travel_types: futureTouristTravelType,
  };

  const organizationRes = await cmsApi.request(createItem("organizations", organizationBody));

  // update user
  if (!isEmpty(organizationRes) && !isNil(organizationRes)) {
    await cmsApi.request(
      // @ts-ignore
      createItem("users_organizations", { users_id: profile.id, organizations_id: organizationRes.id })
    );

    const orgOnboarding: OrgOnboarding = {
      organization: organizationRes.id,
    };

    if (!isEmpty(body.consents)) {
      orgOnboarding.consents = body.consents.map((consentId) => ({ application_consents_id: consentId }));
    }

    const userAppBody: Partial<UserApps> = {
      user: profile.id,
      application: application,
      user_app_role: permission.id,
      org_onboarding: [orgOnboarding],
    };

    await cmsApi.request(createItem("user_apps", userAppBody));
  }

  return { status: "success" };
}

async function onBoardingGuide(profile: Profile, body: GuideOnBoardingBody) {
  // find business application
  const code = "guide";
  const permission = await checkPermissionExist("BUSINESS", code);

  // add user app
  // check not exist
  const application = Number(permission.applications);

  await checkExistApplication(profile, application, permission);

  const guideOnBoarding: GuideOnBoarding = {
    guide_profile_image: body.profileImage,
    guide_firstname: body.firstname,
    guide_lastname: body.lastname,
    guide_thai_national_id: body.thaiNationalId,
    guide_nationality: body.nationality,
    guide_mobile: body.mobile,
    guide_email: body.email,
    guide_line_id: body.lineId,
    guide_facebook: body.facebook,
    guide_instagram: body.instagram,
    guide_other: body.other,
    guide_address: body.addressInfo.address,
    guide_province: body.addressInfo.provinceId,
    guide_district: body.addressInfo.districtId,
    guide_subdistrict: body.addressInfo.subDistrictId,
    guide_postal_code: body.addressInfo.postalCode,
    guide_license_number: body.guideInfo.licenseNumber,
    guide_license_expired_date: body.guideInfo.licenseExpiredDate.toISOString(),
    guide_community_title: body.guideInfo.communityTitle,
    guide_organization_title: body.guideInfo.organizationTitle,
    guide_year_experience: body.guideInfo.yearExperience,
    guide_month_experience: body.guideInfo.monthExperience,
    guide_languages_skills: body.guideInfo.languageSkills,
    guide_work_province: body.guideInfo.workProvinceId,
  };

  if (!isEmpty(body.consents)) {
    guideOnBoarding.consents = body.consents.map((consentId) => ({ application_consents_id: consentId }));
  }

  const userAppBody: Partial<UserApps> = {
    user: profile.id,
    application: application,
    user_app_role: permission.id,
    guide_onboarding: [guideOnBoarding],
  };

  await cmsApi.request(createItem("user_apps", userAppBody));

  return { status: "success" };
}

// NOTE: UPDATE BOARDING DATA
async function updateOnBoardingCommunity(profile: Profile, body: CommunityOnBoardingBody) {
  // get exist onboarding guide
  const existInfo = await cmsApi.request(
    // @ts-ignore
    readItems("user_community_onboarding", {
      filter: {
        user_app: {
          user: {
            _eq: profile.id,
          },
        },
      },
    })
  );

  if (isEmpty(existInfo)) throw new Error("not-found-community-onboarding");

  const id = get(existInfo, [0, "id"]);

  const commuOnBoarding: CommuOnboarding = {
    commu_firstname: body.firstname,
    commu_lastname: body.lastname,
    commu_address: body.addressInfo.address,
    commu_province: body.addressInfo.provinceId,
    commu_district: body.addressInfo.districtId,
    commu_subdistrict: body.addressInfo.subDistrictId,
    commu_postal_code: body.addressInfo.postalCode,
  };

  await cmsApi.request(updateItem("user_community_onboarding", id, commuOnBoarding));

  return { status: "success" };
}

async function updateOnBoardingOrganization(profile: Profile, body: OrganizationOnBoardingBody) {
  // get exist onboarding guide
  const existInfo = await cmsApi.request(
    // @ts-ignore
    readItems("user_organization_onboarding", {
      filter: {
        user_app: {
          user: {
            _eq: profile.id,
          },
        },
      },
    })
  );

  if (isEmpty(existInfo)) throw new Error("not-found-organization-onboarding");

  const organizationId = get(existInfo, [0, "organization"]);

  const organizationInfoList: Organization[] = await cmsApi.request(
    // @ts-ignore
    readItems("organizations", {
      fields: ["*.*", "registered_attachments.directus_files_id.*"],
      filter: {
        id: {
          _eq: organizationId,
        },
      },
    })
  );

  if (isEmpty(organizationInfoList)) throw new Error("not-found-organization");

  const rawAttractionTypes = get(body, ["organizationMarketingTourism", "attractionTypes"], []) ?? [];
  const rawSelectingCommunityChoices =
    get(body, ["organizationMarketingTourism", "selectingCommunityChoices"], []) ?? [];
  const rawAwards = get(body, ["organizationMarketingTourism", "awards"], []) ?? [];
  const rawCsrTypes = get(body, ["organizationMarketingTourism", "csrTypes"], []) ?? [];
  const rawCurrentTouristTargetGroups =
    get(body, ["organizationMarketingTourism", "currentTouristTargetGroups"], []) ?? [];
  const rawFutureTouristTargetGroups =
    get(body, ["organizationMarketingTourism", "futureTouristTargetGroups"], []) ?? [];
  const rawRequireFacilities = get(body, ["organizationMarketingTourism", "requireFacilities"], []) ?? [];
  const rawCurrentTouristTravelType = get(body, ["organizationMarketingTourism", "currentTouristTravelType"], []) ?? [];
  const rawFutureTouristTravelType = get(body, ["organizationMarketingTourism", "futureTouristTravelType"], []) ?? [];

  const organizationInfo = organizationInfoList[0];

  // Attraction Types
  const existAttractionTypes =
    organizationInfo.attraction_types as Collection["organizations_community_tourist_attraction_type"][];

  const attractionTypes = await calculateOptions<Collection["organizations_community_tourist_attraction_type"]>(
    organizationId,
    existAttractionTypes,
    rawAttractionTypes,
    "community_tourist_attraction_type_id",
    "organizations_community_tourist_attraction_type"
  );

  // Selecting choices
  const existSelectingCommunityChoices =
    organizationInfo.selecting_community_choices as Collection["organizations_selecting_community_choices"][];

  const selectingCommunityChoices = await calculateOptions<Collection["organizations_selecting_community_choices"]>(
    organizationId,
    existSelectingCommunityChoices,
    rawSelectingCommunityChoices,
    "selecting_community_choices_id",
    "organizations_selecting_community_choices"
  );

  // awarids
  const existAwards = organizationInfo.awards as Collection["organizations_awards"][];

  const awards = await calculateOptions<Collection["organizations_awards"]>(
    organizationId,
    existAwards,
    rawAwards,
    "awards_id",
    "organizations_awards"
  );

  const existCsrTypes = organizationInfo.csr_types as Collection["organizations_csr_types"][];

  const csrTypes = await calculateOptions<Collection["organizations_csr_types"]>(
    organizationId,
    existCsrTypes,
    rawCsrTypes,
    "csr_types_id",
    "organizations_csr_types"
  );

  const existCurrentTargetGroups =
    organizationInfo.current_tourist_target_groups as Collection["organizations_tourist_target_groups"][];

  const currentTouristTargetGroups = await calculateOptions<Collection["organizations_tourist_target_groups"]>(
    organizationId,
    existCurrentTargetGroups,
    rawCurrentTouristTargetGroups,
    "tourist_target_groups_id",
    "organizations_tourist_target_groups"
  );

  const existFutureTouristTargetGroups =
    organizationInfo.future_tourist_target_groups as Collection["organizations_tourist_target_groups"][];

  const futureTouristTargetGroups = await calculateOptions<Collection["organizations_tourist_target_groups"]>(
    organizationId,
    existFutureTouristTargetGroups,
    rawFutureTouristTargetGroups,
    "tourist_target_groups_id",
    "organizations_tourist_target_groups_1"
  );

  const existFacilitites = organizationInfo.require_facilities as Collection["organizations_community_facilities"][];

  const requireFacilities = await calculateOptions<Collection["organizations_community_facilities"]>(
    organizationId,
    existFacilitites,
    rawRequireFacilities,
    "community_facilities_id",
    "organizations_community_facilities"
  );

  const existCurrentTravelTypes =
    organizationInfo.current_tourist_travel_types as Collection["organizations_tourist_travel_type"][];

  const currentTouristTravelType = await calculateOptions<Collection["organizations_tourist_travel_type"]>(
    organizationId,
    existCurrentTravelTypes,
    rawCurrentTouristTravelType,
    "tourist_travel_type_id",
    "organizations_tourist_travel_type"
  );

  const existFutureTouristTravelType =
    organizationInfo.future_tourist_travel_types as Collection["organizations_tourist_travel_type"][];

  const futureTouristTravelType = await calculateOptions<Collection["organizations_tourist_travel_type"]>(
    organizationId,
    existFutureTouristTravelType,
    rawFutureTouristTravelType,
    "tourist_travel_type_id",
    "organizations_tourist_travel_type_1"
  );

  // create organization
  const organizationBody: Organization = {
    title: body.organizationInfo.organizationTitle,
    status: "pending",
    contacts: body.contactPoints,
    organization_type: 2, // business type,
    registered_no: body.organizationInfo.registeredNo,
    registered_attachments: !isNil(body.organizationInfo.registeredAttachments)
      ? [{ directus_files_id: String(body.organizationInfo.registeredAttachments) }]
      : [],
    business_period: body.organizationInfo.organizationYear.toString(),
    business_period_unit: "year",
    website: body.organizationInfo.website,
    dasta_business_type: body.organizationMarketingTourism.dastaBusinessType,
    address_1: body.organizationInfo.address,
    province: body.organizationInfo.provinceId,
    district: body.organizationInfo.districtId,
    subdistrict: body.organizationInfo.subDistrictId,
    postal_code: body.organizationInfo.postalCode,
    facebook_id: body.organizationInfo.facebook,
    tiktok_id: body.organizationInfo.tiktok,
    instagram_id: body.organizationInfo.instagram,
    latitude: body.organizationInfo.latitude,
    longitude: body.organizationInfo.longitude,
    google_map_url: body.organizationInfo.googleMapUrl,
    organization_year: body.organizationInfo.organizationYear,
    association_travel_group: body.organizationMarketingTourism.associationTravelGroup,
    attraction_types: attractionTypes,
    selecting_community_choices: selectingCommunityChoices,
    awards: awards,
    csr_types: csrTypes,
    require_business_matching: body.organizationMarketingTourism.requireBusinessMatching,
    current_tourist_target_groups: currentTouristTargetGroups,
    future_tourist_target_groups: futureTouristTargetGroups,
    require_facilities: requireFacilities,
    current_tourist_travel_types: currentTouristTravelType,
    future_tourist_travel_types: futureTouristTravelType,
  };

  await cmsApi.request(
    // @ts-ignore
    updateItem("organizations", organizationId, organizationBody)
  );

  return { status: "success" };
}

async function updateOnBoardingGuide(profile: Profile, body: GuideOnBoardingBody) {
  // get exist onboarding guide
  const existInfo = await cmsApi.request(
    // @ts-ignore
    readItems("user_guide_onboarding", {
      filter: {
        user_app: {
          user: {
            _eq: profile.id,
          },
        },
      },
    })
  );

  if (isEmpty(existInfo)) throw new Error("not-found-guide-onboarding");

  const id = get(existInfo, [0, "id"]);

  const guideOnBoarding: GuideOnBoarding = {
    guide_profile_image: body.profileImage,
    guide_firstname: body.firstname,
    guide_lastname: body.lastname,
    guide_thai_national_id: body.thaiNationalId,
    guide_nationality: body.nationality,
    guide_mobile: body.mobile,
    guide_email: body.email,
    guide_line_id: body.lineId,
    guide_facebook: body.facebook,
    guide_instagram: body.instagram,
    guide_other: body.other,
    guide_address: body.addressInfo.address,
    guide_province: body.addressInfo.provinceId,
    guide_district: body.addressInfo.districtId,
    guide_subdistrict: body.addressInfo.subDistrictId,
    guide_postal_code: body.addressInfo.postalCode,
  };

  await cmsApi.request(updateItem("user_guide_onboarding", id, guideOnBoarding));

  return { status: "success" };
}

async function uploadRegisteredAttachments(formData: FormData) {
  // @ts-ignore
  try {
    const result = await cmsApi.request(uploadFiles(formData));
    return result;
  } catch (e) {
    console.log("e: ", e);
  }
}

export {
  onBoardingCommunity,
  onBoardingGuide,
  onBoardingOrganization,
  updateOnBoardingCommunity,
  updateOnBoardingGuide,
  updateOnBoardingOrganization,
  uploadRegisteredAttachments,
};
