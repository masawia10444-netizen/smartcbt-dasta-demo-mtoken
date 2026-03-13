import { ProvinceJSONData } from "@/utils/cms/adapters/master-data/geolocation/provinces";
import { ProjectTypeJson } from "@/utils/cms/cms-api-adapter";
import { File } from "./emission-factor-proxy";

export enum FinancialProxyStatus {
  Publish = "published",
  Hide = "hide",
  Draft = "draft",
}

export enum FinancialProxyCategory {
  PreventionCost = "prevention_cost",
  BenefitTransfer = "benefit_transfer",
  MarketPrice = "market_price",
}

export enum FinancialProxyType {
  Society = "society",
  Economy = "economy",
  Environment = "environment",
}

export type FinancialProxy = {
  id?: string;
  proxyId: string;
  discountRate: number;
  nameEn: string;
  nameTh: string;
  category: FinancialProxyCategory;
  type: ProjectTypeJson;
  province: ProvinceJSONData;
  value: number;
  unit: string;
  createBy?: string;
  status: FinancialProxyStatus;
  startingYear: number;
  endingYear: number;
  note: string;
  internalId?: string;
  files: File[];
};

interface Region {
  id: number;
  sort: null;
  lng: string;
  lat: string;
  title: string;
  status: string;
  date_updated: string;
  date_created: string;
  user_updated: string;
  user_created: string;
}

interface Country {
  sort: null;
  id: number;
  status: string;
  title: string;
  date_created: string;
  date_updated: string;
  user_created: string;
  user_updated: string;
}

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  avatar: null;
  title: null;
  description: null;
  tags: null;
  language: string;
  theme: string;
  tfa_secret: null;
  email_notifications: boolean;
  status: string;
  role: string;
  token: null | string;
  id: string;
  last_page: string;
  last_access: string;
  provider: string;
  external_identifier: null;
  auth_data: null;
  location: null;
  user_info: any[]; // You might need to define the type for this array based on its structure
}

interface Province {
  sort: null;
  id: number;
  status: string;
  title: string;
  lat: string;
  lng: string;
  date_created: string;
  date_updated: string;
  region: Region;
  country: Country;
  user_created: User;
  user_updated: User;
}

interface ProxyType {
  sort: number;
  id: number;
  status: string;
  title: string;
  date_created: string;
  date_updated: string;
  user_created: User;
  user_updated: User;
}

interface Translation {
  id: number;
  units_id: number;
  abbreviation: null;
  title: string;
  languages_code: string;
}

interface Unit {
  id: number;
  sort: null;
  code: string;
  status: string;
  date_updated: string;
  date_created: string;
  translations: Translation[];
  user_updated: User;
  user_created: User;
}

// Define the main type for the provided JSON structure

export interface ProxyJson {
  id: string;
  status: string;
  title: string;
  title_en: null;
  remark: string;
  is_supported_all_province: boolean;
  province: Province;
  proxy_type: ProxyType;
  unit: string;
  level: string;
  categories: string;
  growth_formula: string;
  growth_rate: number;
  value: number;
  growth_rate_calculation_detail: null;
  start_year: string;
  end_year: string;
  attachments: null;
}

export const mockFinancialProxies: FinancialProxy[] = [
  {
    id: "1",
    discountRate: 5,
    proxyId: "P001",
    nameEn: "ค่ารักษาพยาบาล",
    nameTh: "ค่ารักษาพยาบาล",
    category: FinancialProxyCategory.PreventionCost,
    type: {
      key: "project_type_2",
      label: "ด้านสังคมและวัฒนธรรม ",
      value: "2",
    },
    province: { id: 1, title: "กรุงเทพมหานคร" },
    value: 1500.0,
    unit: "ครั้ง",
    createBy: "มินตรา พิธาร",
    startingYear: 2565,
    endingYear: 2571,
    note: "",
    files: [{ url: "https://example.com", title: "ref.png", id: "test" }],
    internalId: "P001",
    status: FinancialProxyStatus.Publish,
  },
  {
    id: "2",
    discountRate: 5,
    proxyId: "P002",
    nameEn: "ปลูกต้นไม้",
    nameTh: "ปลูกต้นไม้",
    category: FinancialProxyCategory.PreventionCost,
    type: {
      key: "project_type_2",
      label: "ด้านสังคมและวัฒนธรรม ",
      value: "2",
    },
    province: { id: 2, title: "พิษณุโลก" },
    value: 2500.0,
    unit: "ไร่",
    createBy: "มินตรา พิธาร",
    startingYear: 2565,
    endingYear: 2571,
    note: "",
    files: [{ url: "https://example.com", title: "ref.png", id: "test" }],
    internalId: "P002",
    status: FinancialProxyStatus.Hide,
  },
  {
    id: "3",
    discountRate: 5,
    proxyId: "P003",
    nameEn: "รายได้จากการสร้างงาน",
    nameTh: "รายได้จากการสร้างงาน",
    category: FinancialProxyCategory.PreventionCost,
    type: {
      key: "project_type_2",
      label: "ด้านสังคมและวัฒนธรรม ",
      value: "2",
    },
    province: { id: 3, title: "นครปฐม" },
    value: 3500.0,
    unit: "ครั้ง",
    createBy: "มินตรา พิธาร",
    startingYear: 2565,
    endingYear: 2571,
    note: "",
    files: [{ url: "https://example.com", title: "ref.png", id: "test" }],
    internalId: "P003",
    status: FinancialProxyStatus.Draft,
  },
];
