"use client";

import { EmissionFactorUnit } from "@/models/emission-factor-proxy";
import { Policies } from "@/models/travel-mart/register/travel-mart-policies";
import { TermConditions } from "@/models/travel-mart/register/travel-mart-term-conditions";
import { District, Subdistrict } from "@/models/travel-mart/travel-mart-countries";
import { ProvinceJSONData } from "@/utils/cms/adapters/master-data/geolocation/provinces";
import { CommunitySIAJson, DiscountRateJson } from "@/utils/cms/adapters/website/sia/types/project";
import {
  AssociationTravelGroup,
  Awards,
  CommunityAttractionTypeJSON,
  CommunityFacilities,
  CommunityJSON,
  CommunityJSONData,
  CsrTypes,
  OrganizationRecommend,
  SelectingCommunityChoices,
  TouristTargetGroups,
} from "@/utils/cms/adapters/website/travel-mart";
import {
  CBTProjectJson,
  Consents,
  ProjectTypeJson,
  RegionJSONData,
  RegionsWithProvinceJson,
} from "@/utils/cms/cms-api-adapter";
import { createContext } from "react";

export const AppContext = createContext<{
  provinces: ProvinceJSONData[];
  districts: District[];
  subdistricts: Subdistrict[];
  termConditions: TermConditions[];
  policies: Policies[];
  communities: CommunityJSONData[];
}>({ provinces: [], districts: [], subdistricts: [], communities: [], policies: [], termConditions: [] });

export const TravelMartContext = createContext<{
  termConditions: TermConditions[];
  policies: Policies[];
  attractionTypes: CommunityAttractionTypeJSON[];
  communities: CommunityJSON[];
  regions: RegionJSONData[];
  associationTravelGroup: AssociationTravelGroup[];
  dastaBusinessType: { id: number; title: string }[];
  selectingCommunityChoices: SelectingCommunityChoices[];
  awards: Awards[];
  csrTypes: CsrTypes[];
  touristTargetGroups: TouristTargetGroups[];
  facilities: CommunityFacilities[];
  touristTravelType: TouristTargetGroups[];
  consents: Consents[];
  languageSkills: { id: string; title: string }[];
}>({
  policies: [],
  termConditions: [],
  attractionTypes: [],
  communities: [],
  regions: [],
  associationTravelGroup: [],
  awards: [],
  consents: [],
  csrTypes: [],
  dastaBusinessType: [],
  facilities: [],
  selectingCommunityChoices: [],
  touristTargetGroups: [],
  touristTravelType: [],
  languageSkills: [],
});

export const SiaSroiContext = createContext<{
  dastaWorkingArea: { key: string; value: string; label: string }[];
  projectTypes: ProjectTypeJson[];
  discountRates?: DiscountRateJson;
  listCBTProject: CBTProjectJson[];
  listCommunity: CommunitySIAJson[];
}>({
  dastaWorkingArea: [],
  projectTypes: [],
  discountRates: undefined,
  listCBTProject: [],
  listCommunity: [],
});

export const CarbonContext = createContext<{
  listCBTProject: CBTProjectJson[];
  listCommunity: OrganizationRecommend[];
  regionsWithProvince: RegionsWithProvinceJson;
  listEmissionFactorProxy: any[];
  scopeAssessments: { id: number; title: string }[];
  carbonUnitOption: { id: number; title: string }[];
  emissionFactorUnits: EmissionFactorUnit[];
}>({
  listCBTProject: [],
  listCommunity: [],
  regionsWithProvince: [],
  listEmissionFactorProxy: [],
  scopeAssessments: [],
  carbonUnitOption: [],
  emissionFactorUnits: [],
});

export const ManageApiContext = createContext<{ isOnboarding: boolean }>({
  isOnboarding: false,
});
