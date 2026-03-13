"use client";

import { TravelMartContext } from "@/contexts/App.context";
import { Policies } from "@/models/travel-mart/register/travel-mart-policies";
import { TermConditions } from "@/models/travel-mart/register/travel-mart-term-conditions";
import {
  AssociationTravelGroup,
  Awards,
  CommunityAttractionTypeJSON,
  CommunityFacilities,
  CommunityJSON,
  Consents,
  CsrTypes,
  RegionJSONData,
  SelectingCommunityChoices,
  TouristTargetGroups,
} from "@/utils/cms/cms-api-adapter";
import { ReactNode } from "react";

type TravelMartContextProviderProps = {
  termConditions?: TermConditions[];
  policies?: Policies[];
  attractionTypes?: CommunityAttractionTypeJSON[];
  communities?: CommunityJSON[];
  regions?: RegionJSONData[];
  associationTravelGroup?: AssociationTravelGroup[];
  dastaBusinessType?: { id: number; title: string }[];
  selectingCommunityChoices?: SelectingCommunityChoices[];
  awards?: Awards[];
  csrTypes?: CsrTypes[];
  touristTargetGroups?: TouristTargetGroups[];
  facilities?: CommunityFacilities[];
  touristTravelType?: TouristTargetGroups[];
  consents?: Consents[];
  languageSkills?: { id: string; title: string }[];
  children: ReactNode;
};

const TravelMartContextProvider = (props: TravelMartContextProviderProps) => {
  const {
    attractionTypes,
    communities,
    policies,
    termConditions,
    regions,
    associationTravelGroup,
    awards,
    consents,
    csrTypes,
    dastaBusinessType,
    facilities,
    selectingCommunityChoices,
    touristTargetGroups,
    touristTravelType,
    languageSkills,
    children,
  } = props;

  const value = {
    attractionTypes: attractionTypes ?? [],
    communities: communities ?? [],
    policies: policies ?? [],
    termConditions: termConditions ?? [],
    regions: regions ?? [],
    associationTravelGroup: associationTravelGroup ?? [],
    awards: awards ?? [],
    consents: consents ?? [],
    csrTypes: csrTypes ?? [],
    dastaBusinessType: dastaBusinessType ?? [],
    facilities: facilities ?? [],
    selectingCommunityChoices: selectingCommunityChoices ?? [],
    touristTargetGroups: touristTargetGroups ?? [],
    touristTravelType: touristTravelType ?? [],
    languageSkills: languageSkills ?? [],
  };

  return <TravelMartContext.Provider value={value}>{children}</TravelMartContext.Provider>;
};

export default TravelMartContextProvider;
