import { Collection } from "@/utils/cms/cms-type";
import { PROJECT_STATUS } from "../constants";
import { Organization } from "../travel-mart";
import {
  getPieChartCarbonProgram,
  getTableCarbonProgram,
  getTableCarbonProgramByRegion,
  groupMapCarbonProgram,
  summaryCarbonProgram,
} from "./program";

export type CarbonProgramsType = Collection["carbon_programs"];
export type CarbonCalendarType = Collection["program_calendar"];
export type CarbonProgramsRoundType = Collection["program_round"];
export type CarbonUnitOptionType = Collection["carbon_unit_option"];
export type EmissionFactorProxyType = Collection["emission_factor_proxy"];
export type EmissionFactorUnitType = Collection["emission_factor_unit"];
export type OptionPcrType = Collection["option_pcr"];
export type ScopeAssessmentType = Collection["scope_assessment"];
export type ProgramRoundType = Collection["program_round"];
export type ProvincesType = Collection["provinces"];
export type RegionType = Collection["regions"];

export type PieChartCarbon = Awaited<ReturnType<typeof getPieChartCarbonProgram>>;
export type SummaryCarbon = Awaited<ReturnType<typeof summaryCarbonProgram>>;
export type TableCarbon = Awaited<ReturnType<typeof getTableCarbonProgram>>;
export type TableCarbonByRegion = Awaited<ReturnType<typeof getTableCarbonProgramByRegion>>;
export type GroupMapCarbon = Awaited<ReturnType<typeof groupMapCarbonProgram>>;
export type GroupMapCarbonJson = {
  value: any;
  key: string;
  position: {
    lat: string | null | undefined;
    lng: string | null | undefined;
  };
  name: string | null | undefined;
  category: string;
};

interface UserCreated {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: null | any;
  title: null | any;
  description: null | any;
  tags: null | any;
  language: null | any;
  theme: string;
  tfa_secret: null | any;
  email_notifications: boolean;
  status: string;
  role: string;
  token: string;
  id: string;
  last_page: string;
  last_access: string;
  provider: string;
  external_identifier: null | any;
  auth_data: null | any;
  location: null | any;
  user_info: string[];
}

export interface CarbonListJson {
  id: number;
  cbt_project: {
    title: string;
    organizations: Organization;
  };
  status: PROJECT_STATUS;
  cover_image: {
    url: string;
    type: string;
    title: string;
  };
  summary_cf: number;
  summary_cf_all: number;
  approve_date: null | any;
  user_created: UserCreated;
}

interface CBTProject {
  id: number;
  title: string;
  organizations: Organization;
  // Other CBTProject properties
}

interface ProgramActivityDetail {
  capacity: number;
  program_round_activity: number;
  id: number;
  sort: number;
  pcr_type: number;
  emission_factor_type: number;
  cfp_amount?: number | null;
  ef_value?: number | null;
  activity_detail_title: string;
  status: string;
  date_updated: string;
  date_created: string;
  user_created: string;
  user_updated: string;
}

export interface ProgramActivity {
  id: number;
  sort: number;
  program_calendar_id: number | null;
  // program_activity_title: string;
  program_activity: {
    no_specific_time: boolean;
    id: number;
    sort: number;
    program_calendar_id: number | null;
    program_activity_title: string;
    status: string;
    start_time: string;
    end_time: string;
    date_updated: string;
    date_created: string;
    user_updated: string;
    user_created: string;
  };
  status: string;
  start_time: string | null;
  end_time: string | null;
  date_updated: string | null;
  date_created: string;
  no_specific_time: boolean;
  user_updated: string | null;
  user_created: string;
  program_activity_detail?: ProgramActivityDetail[];
}

interface ProgramCalendar {
  sort: number;
  day: number;
  program: number;
  id: number;
  status: string;
  date_updated: string | null;
  date_created: string;
  user_updated: string | null;
  user_created: string;
  program_activity: ProgramActivity[];
}

interface Round {
  id: number;
  sort: number | null;
  round: number;
  program: number;
  capacity_value: number;
  summary_cf: number;
  average_cfp: number | null;
  travel_cf: number | null;
  accommodation_cf: number | null;
  food_cf: number | null;
  waste_cf: number | null;
  status: string;
  program_start: string;
  program_end: string;
  date_updated: string | null;
  date_created: string;
  user_updated: string | null;
  user_created: string;
  program_round_activity: ProgramActivity[];
}

interface CoverImage {
  id: string;
  url: string;
  type: string;
  title: string;
}

export interface CarbonJson {
  id: number;
  cbt_project: CBTProject;
  status: string;
  capacity: number;
  scope_assessment: {
    id: number;
    sort: number | null;
    title: string;
    status: string;
    date_updated: string | null;
    date_created: string;
    user_updated: string | null;
    user_created: string;
  };
  province: {
    country: number;
    sort: number | null;
    id: number;
    lng: string;
    lat: string;
    title: string;
    status: string;
    date_created: string;
    date_updated: string | null;
    user_created: string;
    user_updated: string | null;
    region: {
      sort: number | null;
      id: number;
      lng: string;
      lat: string;
      title: string;
      status: string;
      date_updated: string | null;
      date_created: string;
      user_updated: string | null;
      user_created: string;
    };
  };
  carbon_unit: {
    id: number;
    sort: number | null;
    title: string;
    status: string;
    date_updated: string | null;
    date_created: string;
    user_updated: string | null;
    user_created: string;
  };
  request_date: string | null;
  approve_date: string | null;
  program_calendar: ProgramCalendar[];
  round: Round[];
  cover_image: CoverImage;
  travel_images: CoverImage[];
  accommodation_images: CoverImage[];
  food_images: CoverImage[];
  waste_images: CoverImage[];
  trip_publicity_documents_images: CoverImage[];
  approve_by: string | null;
  remark: string | null;
}
