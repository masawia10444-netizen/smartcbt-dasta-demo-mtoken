// import { Collection } from "@/utils/cms/cms-type";

export type Project = Collection["projects"];
export type CbtProject = Collection["cbt_projects"];
export type ProjectLocations = Collection["project_locations"];
export type DastaWorkingArea = Collection["dasta_working_area"];
export type Provinces = Collection["provinces"];
export type ProjectBenefits = Collection["project_benefits"];
export type ProjectExante = Collection["project_exante"];
export type ProjectUtilizers = Collection["project_utilizers"];
export type ProjectOutcomes = Collection["project_outcomes"];
export type ProjectBasedCaseImpacts = Collection["project_based_case_impacts"];
export type FinancialProxies = Collection["standard_cbt_siasroi_financial_proxies"];
export type StandardCbtSiasroiDiscountRate = Collection["standard_cbt_siasroi_discount_rate"];
export type ProjectStrategiesItems = Collection["project_strategies_items"];
export type ProjectReport = Collection["project_reportings"];
export type ProjectSummaryExAnte = Collection["project_summary_ex_ante"];
export type ProjectSummaryExPost = Collection["project_summary_ex_post"];
export type ProjectBasedCaseImpactsType = Collection["project_based_case_impacts_type"];

export type OrganizationJson = {
  key: string;
  label: string;
  value: string;
};

export type FinancialProxiesBody = {
  is_supported_all_province: boolean;
  sort?: number;
  remark: string;
  growth_rate_calculation_detail?: object;
  growth_rate?: number;
  value?: number;
  title_en?: string | null;
  growth_formula: string;
  categories?: string;
  title: string;
  status?: string;
  start_year: string;
  end_year: string;
  proxy_type: number;
  unit: string;
  province?: number | null;
  attachments?: {
    directus_files_id: string;
  }[];
};

export type ProjectListJSON = {
  id: number;
  status: PROJECT_STATUS;
  title: string;
  featured_image: {
    url: string;
    type: string;
    title: string;
  };
  project_galleries: {
    url: string;
    type: string;
    title: string;
  }[];
  duration_type: string;
  project_start_year: number | null;
  project_end_year: number | null;
  project_duration_year: number | null;
  project_start_datetime: string | null;
  project_end_datetime: string | null;
  project_budget: string | null;
  project_owner: any | null;
  user_created: any | null;
  project_owner_other: any | null;
  project_consequence_end_year: number | null;
  project_consequence_duration_year: number | null;
  cbt_project: { title: string };
  project_locations: {
    id: number;
    sort: null;
    address: string;
    status: string;
    postalcode: null;
    latitude: string | null;
    longitude: string | null;
    title: string | null;
    province: {
      sort: null;
      id: number;
      title: string | null;
      status: string;
    };
    district: {
      sort: null;
      id: number;
      status: string;
      title: string | null;
      province: number;
    };
    subdistrict: {
      sort: null;
      id: number;
      status: string;
      title: string | null;
      district: number;
    };
    project_id: number;
  };
  dasta_working_area: {
    id: number;
    dasta_working_area_id: {
      id: number;
      title: string;
      status: string;
      provinces: number[];
    };
  }[];
  project_summary_ex_post: {
    npv_sroi: number;
    sroi_ratio: number;
    sroi_irr: number;
  };
  project_summary_ex_ante: {
    npv_sroi: number;
    sroi_ratio: number;
    sroi_irr: number;
  };
  date_updated: string;
};

export type ProjectBody = {
  project_owner: string;
  project_consequence_end_year: number;
  project_duration_datetime: boolean;
  project_end_datetime?: Date;
  project_start_datetime?: Date;
  project_duration_year?: boolean;
  project_end_year?: number;
  project_start_year?: number;
  project_characteristic: number;
  project_type: number;
  project_locations: {
    province: number;
    district: number;
    subdistrict: number;
    title: string;
    postalcode: string;
    latitude: string;
    longitude: string;
  };
  duration_type: string; //date, year
  project_status: string; //"new", "continue"
  title: string;
  project_objectives: {
    no: number;
    objective: string;
  }[];

  project_budget_details: {
    year_no: number;
    detail: string;
    amount: number;
  }[];
  project_characteristic_other: null;
  project_budget: number;
  featured_image: string; // ได้มาจาก uploadfile
  project_sdgs: number[];
  project_utilizers: {
    title: string;
  }[];
  dasta_working_area: {
    dasta_working_area_id: number;
  }[];
  project_galleries: [];
  project_activities: {
    title: string;
  }[];
  project_outputs: {
    title: string;
  }[];
  project_outcomes: {
    ordering: string;
    title: string;
    impacts: {
      detail: string;
      mode: string;
      categorie: string;
    }[];
    benefits: [
      {
        title: string;
        ordering: string;
        based_case_impacts: {
          year: number;
          type: number;
          title: string;
          impact: number;
          benefit: number;
        }[];
      },
    ];
  }[];
  dasta_objective: number[];
  has_project_strategies: number[];
};

export type BenefitJson = {
  sort: number | null;
  title: string;
  ordering: string;
  status: string;
  id: string;
  outcome_id: string;
  ex_ante: {
    proxy: {
      id: string;
      is_supported_all_province: boolean;
      proxy_type: number;
      unit: number;
      province: number;
      sort: null | any; // You can specify a more specific type if needed
      remark: string;
      growth_rate: number;
      growth_rate_calculation_detail: null | any; // You can specify a more specific type if needed
      value: number;
      title_en: string;
      level: string;
      growth_formula: string;
      categories: string;
      title: string;
      status: string;
      start_year: string; // Consider using a Date type if applicable
      end_year: string; // Consider using a Date type if applicable
      date_created: string; // Consider using a Date type if applicable
      date_updated: string; // Consider using a Date type if applicable
      user_created: string;
      user_updated: string;
      attachments: number[];
    };
    id: number;
    sort: number | null;
    year: number;
    unit: number;
    present_benefit: number;
    fixed_cost: number;
    bestcase: number;
    worstcase: number;
    variable_cost: number;
    quantity: number;
    status: string;
  }[];
  ex_post: {
    year: number;
    present_benefit: number;
  }[];
  based_case_impacts: {
    ordering: string;
    year: number;
    type: number;
    sort: string;
    title: string;
    benefit: number;
    impact: number;
    status: string;
    project_benefit_id: string;
    id: string;
  }[];
  impacts: {
    proxy: string;
    ordering: string;
    year: number;
    write: string;
    status: string;
  }[];
};

export type ProjectJson = {
  id?: number | null;
  remark?: string | null;
  user_created?: any;
  cbt_project?: {
    id?: number | null;
    title?: string | null;
    organization?: CommunitySIAJson | null;
  } | null;
  sensitivity_analysis?: boolean | null;
  featured_image?: {
    id?: string | null;
    url?: string | null;
    type?: string | null;
    title?: string | null;
  } | null;
  project_galleries?:
    | {
        id?: string | null;
        url?: string | null;
        type?: string | null;
        title?: string | null;
      }[]
    | null;
  status?: PROJECT_STATUS | null;
  has_project_strategies?:
    | {
        id?: number | null;
        project_strategies_items_id?: {
          id?: number | null;
          strategies_no?: number | null;
          title?: string | null;
          status?: string | null;
          strategies?: number | null;
          strategies_category?: number | null;
        } | null;
      }[]
    | null;
  dasta_objective?:
    | {
        id?: number | null;
        dasta_working_objective_id?: {
          id?: number | null;
          sort?: number | null;
          condition?: string | null;
          title?: string | null;
          status?: string | null;
        } | null;
        detail?: string | null;
        selected?: boolean | null;
      }[]
    | null;
  project_characteristic?: {
    sort?: number | null;
    id?: number | null;
    title?: string | null;
    status?: string | null;
  } | null;
  project_characteristic_other?: string | null;
  project_type?:
    | {
        sort?: number | null;
        id?: number | null;
        status?: string | null;
        title?: string | null;
      }[]
    | null;
  project_status?: string | null;
  related_project_id?: ProjectJson | null;
  project_locations?: {
    id?: number | null;
    sort?: number | null;
    address?: string | null;
    status?: string | null;
    postalcode?: string | null;
    latitude?: string | null;
    longitude?: string | null;
    title?: string | null;
    province?: {
      sort?: number | null;
      id?: number | null;
      title?: string | null;
      status?: string | null;
    } | null;
    district?: {
      sort?: number | null;
      id?: number | null;
      status?: string | null;
      title?: string | null;
      province?: number | null;
    } | null;
    subdistrict?: {
      sort?: number | null;
      id?: number | null;
      status?: string | null;
      title?: string | null;
      district?: number | null;
    } | null;
  } | null;
  dasta_working_area?:
    | {
        id?: number | null;
        dasta_working_area_id?: {
          id?: number | null;
          sort?: number | null;
          title?: string | null;
          status?: string | null;
          date_updated?: string | null;
          date_created?: string | null;
          provinces?: any[] | null;
          user_updated?: {
            first_name?: string | null;
            last_name?: string | null;
            email?: string | null;
          } | null;
          user_created?: {
            first_name?: string | null;
            last_name?: string | null;
            email?: string | null;
          } | null;
        } | null;
      }[]
    | null;
  project_owner?: {
    id?: number | null;
    require_business_matching?: string | null;
    sort?: number | null;
    contacts?: string | null;
    status?: string | null;
    latitude?: string | null;
    tiktok_id?: string | null;
    website?: string | null;
    instagram_id?: string | null;
    facebook_id?: string | null;
    other?: string | null;
    google_map_url?: string | null;
    longitude?: string | null;
    address_2?: string | null;
    address_1?: string | null;
    abbreviation?: string | null;
    title?: string | null;
    line_id?: string | null;
    business_period_unit?: string | null;
    business_period?: string | null;
    registered_no?: string | null;
    organization_year?: string | null;
    communities?: any[] | null;
    future_tourist_target_groups?: any[] | null;
    require_facilities?: any[] | null;
    csr_types?: any[] | null;
    attraction_types?: any[] | null;
    current_tourist_travel_types?: any[] | null;
    future_tourist_travel_types?: any[] | null;
    awards?: any[] | null;
    selecting_community_choices?: any[] | null;
    current_tourist_target_groups?: any[] | null;
    registered_attachments?: any[] | null;
    association_travel_group?: string | null;
    dasta_business_type?: any[] | null;
    business_type?: string | null;
    district?: string | null;
    subdistrict?: string | null;
    province?: any | null;
    organization_type?: {
      sort?: number | null;
      id?: number | null;
      title?: string | null;
      scope?: string | null;
      type?: string | null;
      status?: string | null;
    } | null;
  } | null;
  project_owner_other?: string | null;
  duration_type?: string | null;
  project_start_year?: number | null;
  project_end_year?: number | null;
  project_duration_year?: number | null;
  project_start_datetime?: string | null;
  project_end_datetime?: string | null;
  project_consequence_end_year?: number | null;
  project_budget?: string | null;
  project_budget_details?:
    | {
        year_no?: number | null;
        detail?: string | null;
        amount?: number | null;
      }[]
    | null;
  project_objectives?:
    | {
        no?: number | null;
        objective?: string | null;
      }[]
    | null;
  project_activities?:
    | {
        sort?: number | null;
        title?: string | null;
        status?: string | null;
        id?: string | null;
        project_id?: number | null;
      }[]
    | null;
  project_outputs?:
    | {
        sort?: number | null;
        title?: string | null;
        status?: string | null;
        id?: string | null;
        project_id?: number | null;
      }[]
    | null;
  project_outcomes?:
    | {
        sort?: number | null;
        ordering?: string | null;
        title?: string | null;
        status?: string | null;
        impacts?:
          | {
              sort?: number | null;
              id?: number | null;
              detail?: string | null;
              mode?: string | null;
              categorie?: string | null;
              title?: string | null;
              status?: string | null;
              project?: string | null;
            }[]
          | null;
        benefits?: BenefitJson[] | null;
        reference_documents?:
          | {
              id: string;
              url: string;
              type: string;
              title: string;
            }[]
          | null;
      }[]
    | null;
  selected?: boolean | null;
  project_consequence_duration_year?: number | null;
  project_utilizers?:
    | {
        sort?: number | null;
        title?: string | null;
        status?: string | null;
        id?: number | null;
        province?: any | null;
        project_id?: number | null;
      }[]
    | null;
  project_sdgs?:
    | { sdgs_id?: { id?: number | null; sort?: number | null; title?: string | null; status?: string | null } }[]
    | null;
};

export type ProjectBudgetDetails = {
  year_no: number;
  detail: string;
  amount: number;
};

export type DiscountRateJson = {
  id: string;
  status: string;
  start_date: string;
  end_date: string;
  discount_rate: number;
};

export type CBTProjectJson = {
  id: number;
  status: string;
  title: string;
  organizations: CommunitySIAJson;
};

export type CommunitySIAJson = {
  title: string | null | undefined;
  province_id: any;
  province_title: any;
  district_id: any;
  district_title: any;
  subdistrict_id: any;
  subdistrict_title: any;
  postal_code: any;
  latitude: any;
  longitude: any;
  organizations: any;
};
