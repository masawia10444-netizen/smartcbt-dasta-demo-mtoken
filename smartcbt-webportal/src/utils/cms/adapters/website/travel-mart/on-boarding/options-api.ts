"use server";
import { Profile } from "@/utils/cms/adapters/authen";
import cmsApi from "@/utils/cms/cms-api";
import { parseTranslation } from "@/utils/helper";
import { readFieldsByCollection, readItems, uploadFiles } from "@directus/sdk";
import { get, isEmpty, isNil } from "lodash";
import {
  ApplicationRolePermissions,
  AssociationTravelGroup,
  Awards,
  CommuOnboarding,
  CommunityFacilities,
  CommunityOnBoardingBody,
  CsrTypes,
  GuideOnBoarding,
  GuideOnBoardingBody,
  OrgOnboarding,
  OrganizationOnBoardingBody,
  SelectingCommunityChoices,
  TouristTargetGroups,
  TouristTravelType,
} from "../types/on-boarding";
import { FacilityOption, Organization } from "../types/travel-mart";

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

async function checkExistApplication(profile: Profile, application: number, permission: ApplicationRolePermissions) {
  const existApp = await cmsApi.request(
    // @ts-ignore
    readItems("user_apps", {
      filter: {
        user: {
          _eq: profile.id,
        },
        application: {
          _eq: application,
        },
        user_app_role: {
          _eq: permission.id,
        },
      },
    })
  );

  if (!isEmpty(existApp)) throw new Error("already-on-boarding");

  return true;
}

// NOTE: FETCH DATA OPTIONS
async function fetchDastaBusinessType() {
  const types = await cmsApi.request(
    // @ts-ignore
    readItems("dasta_business_types", {
      filter: {
        status: {
          _eq: "published",
        },
      },
    })
  );

  return types.map((type) => ({ id: type.id, title: type.title }));
}

async function fetchAssociationTravelGroup() {
  const items: AssociationTravelGroup[] = await cmsApi.request(
    // @ts-ignore
    readItems("association_travel_group", {
      filter: {
        status: {
          _eq: "published",
        },
      },
    })
  );

  return items.map((item): { id: number; title: string } => ({ id: Number(item.id), title: String(item.title) }));
}

async function fetchCsrTypes() {
  const items: CsrTypes[] = await cmsApi.request(
    // @ts-ignore
    readItems("csr_types", {
      filter: {
        status: {
          _eq: "published",
        },
      },
    })
  );

  return items.map((item): { id: number; title: string } => ({ id: Number(item.id), title: String(item.title) }));
}

async function fetchSelectingCommunityChoices() {
  const items: SelectingCommunityChoices[] = await cmsApi.request(
    // @ts-ignore
    readItems("selecting_community_choices", {
      filter: {
        status: {
          _eq: "published",
        },
      },
    })
  );

  return items.map((item): { id: number; title: string } => ({ id: Number(item.id), title: String(item.title) }));
}

async function fetchAwards(languagesCode = "th-TH") {
  const items: Awards[] = await cmsApi.request(
    // @ts-ignore
    readItems("awards", {
      fields: ["*", "translations.*"],
      filter: {
        status: {
          _eq: "published",
        },
      },
    })
  );

  return items.map((item): { id: number; title: string } => {
    const rawTranslation: { [key: string]: any }[] = (item.translations as { [key: string]: any }[]) ?? [];
    const translations = parseTranslation(rawTranslation, languagesCode);
    return {
      id: Number(item.id),
      title: get(translations, [0, "title"], null),
    };
  });
}

async function fetchTouristTargetGroups() {
  const items: TouristTargetGroups[] = await cmsApi.request(
    // @ts-ignore
    readItems("tourist_target_groups", {
      filter: {
        status: {
          _eq: "published",
        },
      },
    })
  );

  return items.map((item): { id: number; title: string } => ({ id: Number(item.id), title: String(item.title) }));
}

async function fetchFacilities(languagesCode = "th-TH") {
  const items: CommunityFacilities[] = await cmsApi.request(
    // @ts-ignore
    readItems("community_facilities", {
      fields: [
        "*",
        "translations.*",
        "unit_quantity.translations.*",
        "unit_size.translations.*",
        "group.translations.*",
        "size_flag",
        "quantity_flag",
      ],
      filter: {
        status: {
          _eq: "published",
        },
      },
    })
  );

  return items.map((item): FacilityOption => {
    const rawTranslation: { [key: string]: any }[] = (item.translations as { [key: string]: any }[]) ?? [];
    const translations = parseTranslation(rawTranslation, languagesCode);
    const unitQuantityTranslationsRaw =
      typeof item.unit_quantity == "object" ? get(item, ["unit_quantity", "translations"], []) : [];
    const unitQuantityTranslations = parseTranslation(unitQuantityTranslationsRaw, languagesCode);

    const unitSizeTranslationsRaw =
      typeof item.unit_quantity == "object" ? get(item, ["unit_size", "translations"], []) : [];
    const unitSizeTranslations = parseTranslation(unitSizeTranslationsRaw, languagesCode);

    const groupTranslationsRaw = typeof item.group == "object" ? get(item, ["group", "translations"], []) : [];
    const groupTranslations = parseTranslation(groupTranslationsRaw, languagesCode);

    return {
      id: Number(item.id),
      title: get(translations, [0, "title"], null),
      size_flag: item.size_flag ?? false,
      quantity_flag: item.quantity_flag ?? false,
      group_title: get(groupTranslations, [0, "title"], null),
      unit_quantity_title: get(unitQuantityTranslations, [0, "title"], null),
      unit_size_title: get(unitSizeTranslations, [0, "title"], null),
    };
  });
}

async function fetchTouristTravelType() {
  const items: TouristTravelType[] = await cmsApi.request(
    // @ts-ignore
    readItems("tourist_travel_type", {
      filter: {
        status: {
          _eq: "published",
        },
      },
    })
  );

  return items.map((item): { id: number; title: string } => ({ id: Number(item.id), title: String(item.title) }));
}

async function fetchLanguageSkills() {
  const fields = await cmsApi.request(readFieldsByCollection("user_guide_onboarding"));

  const languageSkillField = fields.find((f) => f.field == "guide_languages_skills");

  return get(languageSkillField, ["meta", "options", "choices"], []).map(
    (choice: Record<string, string>): { id: string; title: string } => ({
      id: choice.value,
      title: choice.text,
    })
  );
}

async function fetchOnBoardingCommunity(profile: Profile) {
  const onBoardingInfoList: CommuOnboarding[] = await cmsApi.request(
    // @ts-ignore
    readItems("user_community_onboarding", {
      fields: ["*", "consents.*", "user_app.status"],
      filter: { user_app: { user: { id: { _eq: profile.id } } } },
    })
  );

  if (isEmpty(onBoardingInfoList)) throw Error("on-boarding-community-not-found");

  const onBoardingInfo = onBoardingInfoList[0];

  const consents: number[] =
    !isNil(onBoardingInfo.consents) && !isEmpty(onBoardingInfo.consents)
      ? onBoardingInfo.consents.map((value) => {
          return Number(get(value, ["application_consents_id"]));
        })
      : [];

  const status = String(get(onBoardingInfo, ["user_app", "status"], "draft")) ?? "draft";

  const parsedInfo: CommunityOnBoardingBody = {
    firstname: String(onBoardingInfo.commu_firstname),
    status,
    lastname: String(onBoardingInfo.commu_lastname),
    mobile: String(onBoardingInfo.commu_mobile),
    email: String(onBoardingInfo.commu_email),
    addressInfo: {
      address: String(onBoardingInfo.commu_address),
      provinceId: Number(onBoardingInfo.commu_province),
      districtId: Number(onBoardingInfo.commu_district),
      subDistrictId: Number(onBoardingInfo.commu_subdistrict),
      postalCode: String(onBoardingInfo.commu_postal_code),
    },
    consents,
  };

  return parsedInfo;
}

async function fetchOnBoardingOrganization(profile: Profile) {
  const onBoardingInfoList: OrgOnboarding[] = await cmsApi.request(
    // @ts-ignore
    readItems("user_organization_onboarding", {
      fields: ["*", "organization.*.*", "organization.registered_attachments.directus_files_id.*", "consents.*"],
      filter: {
        user_app: {
          user: {
            id: {
              _eq: profile.id,
            },
          },
        },
      },
    })
  );

  if (isEmpty(onBoardingInfoList)) throw Error("on-boarding-community-not-found");

  const onBoardingInfo = onBoardingInfoList[0];

  const organization = onBoardingInfo.organization as Organization;
  const attachment = !isNil(organization.registered_attachments) ? organization.registered_attachments[0] : null;

  const attachmentId = get(attachment, ["directus_files_id", "id"], null);

  const registeredAttachmentsInfo = !isNil(attachment)
    ? {
        url: get(attachment, ["directus_files_id", "filename_disk"], null),
        type: get(attachment, ["directus_files_id", "type"], null),
        title: get(attachment, ["directus_files_id", "title"], null),
      }
    : null;

  const attractionTypes: number[] | null =
    !isNil(organization.attraction_types) && !isEmpty(organization.attraction_types)
      ? organization.attraction_types.map((value) => {
          return Number(get(value, ["community_tourist_attraction_type_id"]));
        })
      : null;

  const selectingCommunityChoices: number[] | null =
    !isNil(organization.selecting_community_choices) && !isEmpty(organization.selecting_community_choices)
      ? organization.selecting_community_choices.map((value) => {
          return Number(get(value, ["selecting_community_choices_id"]));
        })
      : null;

  const awards: number[] | null =
    !isNil(organization.awards) && !isEmpty(organization.awards)
      ? organization.awards.map((value) => {
          return Number(get(value, ["awards_id"]));
        })
      : null;

  const csrTypes: number[] =
    !isNil(organization.csr_types) && !isEmpty(organization.csr_types)
      ? organization.csr_types.map((value) => {
          return Number(get(value, ["csr_types_id"]));
        })
      : [];

  const currentTouristTargetGroups: number[] =
    !isNil(organization.current_tourist_target_groups) && !isEmpty(organization.current_tourist_target_groups)
      ? organization.current_tourist_target_groups.map((value) => {
          return Number(get(value, ["tourist_target_groups_id"]));
        })
      : [];

  const futureTouristTargetGroups: number[] =
    !isNil(organization.future_tourist_target_groups) && !isEmpty(organization.future_tourist_target_groups)
      ? organization.future_tourist_target_groups.map((value) => {
          return Number(get(value, ["tourist_target_groups_id"]));
        })
      : [];

  const requireFacilities: number[] =
    !isNil(organization.require_facilities) && !isEmpty(organization.require_facilities)
      ? organization.require_facilities.map((value) => {
          return Number(get(value, ["community_facilities_id"]));
        })
      : [];

  const currentTouristTravelType: number[] =
    !isNil(organization.current_tourist_travel_types) && !isEmpty(organization.current_tourist_travel_types)
      ? organization.current_tourist_travel_types.map((value) => {
          return Number(get(value, ["tourist_travel_type_id"]));
        })
      : [];

  const futureTouristTravelType: number[] =
    !isNil(organization.future_tourist_travel_types) && !isEmpty(organization.future_tourist_travel_types)
      ? organization.future_tourist_travel_types.map((value) => {
          return Number(get(value, ["tourist_travel_type_id"]));
        })
      : [];

  const consents: number[] =
    !isNil(onBoardingInfo.consents) && !isEmpty(onBoardingInfo.consents)
      ? onBoardingInfo.consents.map((value) => {
          return Number(get(value, ["application_consents_id"]));
        })
      : [];

  const parsedInfo: OrganizationOnBoardingBody = {
    contactPoints: isNil(organization.contacts)
      ? []
      : organization.contacts.map((contact: { [key: string]: any }) => ({
          firstname: contact.firstname,
          lastname: contact.lastname,
          mobile: contact.mobile,
          email: contact.email,
          line: contact.line,
        })),
    organizationInfo: {
      status: organization.status,
      organizationTitle: String(organization.title),
      registeredNo: String(organization.registered_no),
      registeredAttachments: !isNil(attachmentId) ? parseString(attachmentId) : null,
      registeredAttachmentsInfo: registeredAttachmentsInfo,
      address: parseString(organization.address_1),
      provinceId: Number(get(organization, ["province", "id"])),
      districtId: Number(get(organization, ["district", "id"])),
      subDistrictId: Number(get(organization, ["subdistrict", "id"])),
      postalCode: String(organization.postal_code),
      organizationYear: Number(organization.organization_year),
      website: parseString(organization.website),
      facebook: parseString(organization.facebook_id),
      instagram: parseString(organization.instagram_id),
      tiktok: parseString(organization.tiktok_id),
      other: parseString(organization.other),
      latitude: parseString(organization.latitude),
      longitude: parseString(organization.latitude),
      googleMapUrl: parseString(organization.google_map_url),
    },
    organizationMarketingTourism: {
      dastaBusinessType:
        typeof organization.dasta_business_type != "number" ? parseNumber(organization.dasta_business_type?.id) : null,
      associationTravelGroup:
        typeof organization.association_travel_group != "number"
          ? parseNumber(organization.association_travel_group?.id)
          : null,
      attractionTypes,
      selectingCommunityChoices,
      awards,
      csrTypes,
      requireBusinessMatching: !isNil(organization.require_business_matching) && organization.require_business_matching,
      currentTouristTargetGroups,
      futureTouristTargetGroups,
      requireFacilities,
      currentTouristTravelType,
      futureTouristTravelType,
    },
    consents,
  };

  return parsedInfo;
}

async function fetchOnBoardingGuide(profile: Profile) {
  const onBoardingInfoList: GuideOnBoarding[] = await cmsApi.request(
    // @ts-ignore
    readItems("user_guide_onboarding", {
      fields: ["*", "guide_profile_image.*", "consents.*", "user_app.status"],
      filter: { user_app: { user: { id: { _eq: profile.id } } } },
    })
  );

  if (isEmpty(onBoardingInfoList)) throw Error("on-boarding-guide-not-found");

  const onBoardingInfo = onBoardingInfoList[0];

  const profileImageInfo = !isNil(onBoardingInfo.guide_profile_image)
    ? {
        id: get(onBoardingInfo, ["guide_profile_image", "id"], null),
        url: get(onBoardingInfo, ["guide_profile_image", "filename_disk"], null),
        type: get(onBoardingInfo, ["guide_profile_image", "type"], null),
        title: get(onBoardingInfo, ["guide_profile_image", "title"], null),
      }
    : null;

  const consents: number[] =
    !isNil(onBoardingInfo.consents) && !isEmpty(onBoardingInfo.consents)
      ? onBoardingInfo.consents.map((value) => {
          return Number(get(value, ["application_consents_id"]));
        })
      : [];

  const parsedInfo: GuideOnBoardingBody = {
    status: get(onBoardingInfo, ["user_app", "status"], "draft") ?? "draft",
    firstname: String(onBoardingInfo.guide_firstname),
    lastname: String(onBoardingInfo.guide_lastname),
    mobile: String(onBoardingInfo.guide_mobile),
    email: String(onBoardingInfo.guide_email),
    thaiNationalId: String(onBoardingInfo.guide_thai_national_id),
    nationality: String(onBoardingInfo.guide_nationality),
    facebook: !isNil(onBoardingInfo.guide_facebook) ? String(onBoardingInfo.guide_facebook) : null,
    instagram: !isNil(onBoardingInfo.guide_instagram) ? String(onBoardingInfo.guide_instagram) : null,
    lineId: !isNil(onBoardingInfo.guide_line_id) ? String(onBoardingInfo.guide_line_id) : null,
    other: !isNil(onBoardingInfo.guide_other) ? String(onBoardingInfo.guide_other) : null,
    profileImage: !isNil(onBoardingInfo.guide_profile_image)
      ? parseString(get(onBoardingInfo, ["guide_profile_image", "id"]))
      : null,
    profileImageInfo,
    addressInfo: {
      address: String(onBoardingInfo.guide_address),
      provinceId: Number(onBoardingInfo.guide_province),
      districtId: Number(onBoardingInfo.guide_district),
      subDistrictId: Number(onBoardingInfo.guide_subdistrict),
      postalCode: String(onBoardingInfo.guide_postal_code),
    },
    guideInfo: {
      licenseNumber: String(onBoardingInfo.guide_license_number),
      licenseExpiredDate: !isNil(onBoardingInfo.guide_license_expired_date)
        ? new Date(onBoardingInfo.guide_license_expired_date)
        : new Date(),
      communityTitle: String(onBoardingInfo.guide_community_title),
      organizationTitle: String(onBoardingInfo.guide_organization_title),
      monthExperience: Number(onBoardingInfo.guide_month_experience),
      yearExperience: Number(onBoardingInfo.guide_year_experience),
      workProvinceId: Number(onBoardingInfo.guide_work_province),
      languageSkills: !isNil(onBoardingInfo.guide_languages_skills)
        ? Object.values(onBoardingInfo.guide_languages_skills)
        : [],
    },
    consents,
  };

  return parsedInfo;
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
  fetchAssociationTravelGroup,
  fetchAwards,
  fetchCsrTypes,
  fetchDastaBusinessType,
  fetchFacilities,
  fetchLanguageSkills,
  fetchOnBoardingCommunity,
  fetchOnBoardingGuide,
  fetchOnBoardingOrganization,
  fetchSelectingCommunityChoices,
  fetchTouristTargetGroups,
  fetchTouristTravelType,
};
