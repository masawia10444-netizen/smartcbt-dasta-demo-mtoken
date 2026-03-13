"use client";

import { CarbonContext } from "@/contexts/App.context";
import { EmissionFactorUnit } from "@/models/emission-factor-proxy";
import { CBTProjectJson, OrganizationRecommend, RegionsWithProvinceJson } from "@/utils/cms/cms-api-adapter";
import { ReactNode } from "react";

type CarbonContextProviderProps = {
  listCBTProject?: CBTProjectJson[];
  listCommunity?: OrganizationRecommend[];
  regionsWithProvince?: RegionsWithProvinceJson;
  listEmissionFactorProxy?: any[];
  scopeAssessments?: { id: number; title: string }[];
  carbonUnitOption?: { id: number; title: string }[];
  emissionFactorUnits?: EmissionFactorUnit[];

  children: ReactNode;
};

const CarbonContextProvider = (props: CarbonContextProviderProps) => {
  const {
    listCBTProject,
    carbonUnitOption,
    listCommunity,
    listEmissionFactorProxy,
    regionsWithProvince,
    scopeAssessments,
    emissionFactorUnits,
    children,
  } = props;

  const value = {
    listCBTProject: listCBTProject ?? [],
    carbonUnitOption: carbonUnitOption ?? [],
    scopeAssessments: scopeAssessments ?? [],
    listCommunity: listCommunity ?? [],
    listEmissionFactorProxy: listEmissionFactorProxy ?? [],
    regionsWithProvince: regionsWithProvince ?? [],
    emissionFactorUnits: emissionFactorUnits ?? [],
  };

  return <CarbonContext.Provider value={value}>{children}</CarbonContext.Provider>;
};

export default CarbonContextProvider;
