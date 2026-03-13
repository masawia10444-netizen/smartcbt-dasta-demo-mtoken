import { Collection } from "@/utils/cms/cms-type";

export type ApplicationRolePermissions = Collection["application_role_permissions"];
export type UserApps = Collection["user_apps"];
export type CommunityTouristAttractionType = Collection["community_tourist_attraction_type"];
export type OrgOnboarding = Collection["user_organization_onboarding"];
export type CommuOnboarding = Collection["user_community_onboarding"];
export type GuideOnBoarding = Collection["user_guide_onboarding"];
export type SelectingCommunityChoices = Collection["selecting_community_choices"];
export type AssociationTravelGroup = Collection["association_travel_group"];
export type Awards = Collection["awards"];
export type CommunityFacilities = Collection["community_facilities"];
export type TouristTargetGroups = Collection["tourist_target_groups"];
export type TouristTravelType = Collection["tourist_travel_type"];
export type CsrTypes = Collection["csr_types"];

export type CommunityOnBoardingBody = {
  firstname: string;
  lastname: string;
  status?: string;
  mobile: string;
  email: string;
  addressInfo: {
    address: string | null;
    provinceId: number;
    districtId: number;
    subDistrictId: number;
    postalCode: string;
  };
  consents: number[];
};

export type OrganizationOnBoardingBody = {
  contactPoints: {
    firstname: string;
    lastname: string;
    mobile: string;
    email: string;
    line: string | null;
  }[];
  organizationInfo: {
    status?: string;
    organizationTitle: string;
    registeredNo: string;
    registeredAttachments: string | null;
    registeredAttachmentsInfo?: {
      url: string;
      type: string;
      title: string;
    } | null;
    address: string | null;
    provinceId: number;
    districtId: number;
    subDistrictId: number;
    postalCode: string;
    organizationYear: number;
    website: string | null;
    facebook: string | null;
    instagram: string | null;
    tiktok: string | null;
    other: string | null;
    latitude: string | null;
    longitude: string | null;
    googleMapUrl: string | null;
  };
  organizationMarketingTourism: {
    dastaBusinessType: number | null;
    associationTravelGroup: number | null;
    attractionTypes: number[] | null;
    selectingCommunityChoices: number[] | null;
    awards: number[] | null;
    csrTypes: number[];
    requireBusinessMatching: boolean;
    currentTouristTargetGroups: number[];
    futureTouristTargetGroups: number[];
    requireFacilities: number[];
    currentTouristTravelType: number[];
    futureTouristTravelType: number[];
  };
  consents: number[];
};

export type GuideOnBoardingBody = {
  status?: string;
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  thaiNationalId: string;
  nationality: string | null;
  facebook: string | null;
  instagram: string | null;
  lineId: string | null;
  other: string | null;
  profileImage: string | null;
  profileImageInfo?: {
    id: string;
    url: string;
    type: string;
    title?: string;
  } | null;
  addressInfo: {
    address: string | null;
    provinceId: number;
    districtId: number;
    subDistrictId: number;
    postalCode: string;
  };
  guideInfo: {
    licenseNumber: string;
    licenseExpiredDate: Date;
    communityTitle: string;
    organizationTitle: string;
    yearExperience: number;
    monthExperience: number;
    workProvinceId: number;
    languageSkills: string[];
  };
  consents: number[];
};
