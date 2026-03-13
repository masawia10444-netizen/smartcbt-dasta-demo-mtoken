"use client";

import { AppContext } from "@/contexts/App.context";
import { Policies } from "@/models/travel-mart/register/travel-mart-policies";
import { TermConditions } from "@/models/travel-mart/register/travel-mart-term-conditions";
import { District, Subdistrict } from "@/models/travel-mart/travel-mart-countries";
import { CommunityJSONData, ProvinceJSONData } from "@/utils/cms/cms-api-adapter";
import { ReactNode } from "react";

type AppContextProviderProps = {
  provinces?: ProvinceJSONData[];
  districts?: District[];
  subdistricts?: Subdistrict[];
  termConditions?: TermConditions[];
  policies?: Policies[];
  communities?: CommunityJSONData[];
  children: ReactNode;
};

const AppContextProvider = (props: AppContextProviderProps) => {
  const { provinces, districts, subdistricts, termConditions, policies, communities, children } = props;

  const value = {
    provinces: provinces ?? [],
    districts: districts ?? [],
    subdistricts: subdistricts ?? [],
    termConditions: termConditions ?? [],
    policies: policies ?? [],
    communities: communities ?? [],
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
