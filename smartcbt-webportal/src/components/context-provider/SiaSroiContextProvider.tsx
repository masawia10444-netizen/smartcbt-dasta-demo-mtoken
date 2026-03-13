"use client";

import { SiaSroiContext } from "@/contexts/App.context";
import { CommunitySIAJson, DiscountRateJson } from "@/utils/cms/adapters/website/sia/types/project";
import { CBTProjectJson, ProjectTypeJson } from "@/utils/cms/cms-api-adapter";
import { ReactNode } from "react";

type SiaSroiContextProviderProps = {
  dastaWorkingArea?: { key: string; value: string; label: string }[];
  projectTypes?: ProjectTypeJson[];
  discountRates?: DiscountRateJson;
  listCBTProject?: CBTProjectJson[];
  listCommunity?: CommunitySIAJson[];
  children: ReactNode;
};

const SiaSroiContextProvider = (props: SiaSroiContextProviderProps) => {
  const { listCBTProject, dastaWorkingArea, listCommunity, projectTypes, discountRates, children } = props;

  const value = {
    listCBTProject: listCBTProject ?? [],
    dastaWorkingArea: dastaWorkingArea ?? [],
    projectTypes: projectTypes ?? [],
    listCommunity: listCommunity ?? [],
    discountRates: discountRates ?? undefined,
  };

  return <SiaSroiContext.Provider value={value}>{children}</SiaSroiContext.Provider>;
};

export default SiaSroiContextProvider;
