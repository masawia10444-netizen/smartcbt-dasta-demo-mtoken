import z from "zod";

// Hx's types
export type File = {
  id?: string | null;
  title?: string | null;
  url?: string | null;
  type?: string | null;
};

export type EmissionFactorUnit = {
  id?: number | null;
  label?: string | null;
};

export type PcrType = {
  id?: number | null;
  label?: string | null;
  type?: string | null;
};

export type Approval = {
  id?: string | null;
  organization?: any | null;
  country?: any | null;
  province?: any | null;
  district?: any | null;
  subdistrict?: any | null;
  sort?: any | null;
  note?: any | null;
  forget_password_token?: any | null;
  postal_code?: any | null;
  other?: any | null;
  thai_national_id_card?: any | null;
  tiktok_id?: any | null;
  position?: any | null;
  instagram_id?: any | null;
  facebook_id?: any | null;
  line_id?: any | null;
  address?: any | null;
  department?: any | null;
  mobile?: string | null;
  email?: string | null;
  lastname?: string | null;
  firstname?: string | null;
  title?: any | null;
  status?: string | null;
  date_created?: string | null;
  date_updated?: any | null;
  user_created?: string | null;
  user_updated?: string | null;
  directus_user?: string | null;
  organizaitons?: any[] | null;
  applications?: string[] | null;
};

export type EmissionFactorProxy = {
  id?: string | number;
  proxyId: string;
  status: EmissionFactorProxyStatus | string;
  name: string;
  pcr_type: EmissionFactorProxySchema;
  emissionFactorValue: number;
  unit: string;
  approvedBy: string;
  internalId?: string;
  controlVariableUnit: string;
  hasControlVariable: boolean;
  controlVariableValue: number | null;
  files: File[];
  tooltipFlag: boolean;
  tooltipData: string;
};

export type EmissionFactorProxyListJson = {
  id?: number | null;
  status?: string | null;
  emission_factor_value?: number | null;
  name?: string | null;
  unit?: string | null;
  emission_factor_unit?: EmissionFactorUnit | null;
  pcr_type?: PcrType | null;
  approve_by?: Approval | null;
  has_control_variable?: string | null;
  controll_variable_value?: number | null;
  controll_variable_unit?: string | null;
  files?: File[] | null;
  tooltip_flag?: boolean | null;
  tooltip_data?: string | null;
};

export enum EmissionFactorProxyStatus {
  Publish = "published",
  Hide = "hide",
  Draft = "draft",
  // nullish = "nullish",
}

export type EmissionFactorProxyPCRs = {
  id: number;
  label: string;
};

export type EmissionFactorProxySchema = z.infer<typeof EmissionFactorProxyPCRs>;

export enum PCRType {
  Transportation = 1,
  Accomodation = 2,
  Food = 3,
  Waste = 4,
}

export enum PCRTypes {
  Transportation = "transportations",
  Accomodation = "accomodations",
  Food = "foods",
  Waste = "wastes",
}

export enum PCRDashboardType {
  Transportation = "travel_cf",
  Accommodation = "accommodation_cf",
  Food = "food_cf",
  Waste = "waste_cf",
}

export const EmissionFactorProxyPCRs = z.object({
  id: z.number(),
  label: z.string(),
});

export const dashboardEmissionFactorProxyPCRs = [
  { id: 1, name: "การเดินทาง", type: PCRDashboardType.Transportation },
  { id: 2, name: "ที่พักแรม/กิจกรรม", type: PCRDashboardType.Accommodation },
  { id: 3, name: "อาหาร", type: PCRDashboardType.Food },
  { id: 4, name: "ของเสีย", type: PCRDashboardType.Waste },
];

export const emissionFactorProxyPCRs = [
  { id: 1, label: "การเดินทาง" },
  { id: 2, label: "ที่พักแรม/กิจกรรม" },
  { id: 3, label: "อาหาร" },
  { id: 4, label: "ของเสีย" },
];

export enum EmissionFactorProxyCategory {
  PreventionCost = "preventionCost",
  BenefitTransfer = "benefitTransfer",
  MarketPrice = "marketPrice",
}

export enum EmissionFactorProxyType {
  Society = "society",
  Economy = "economy",
  Environment = "environment",
}

// Comment mock type
// export type EmissionFactorProxy = {
//   id?: string;
//   proxyId: string;
//   status: EmissionFactorProxyStatus;
//   name: string;
//   pcrType: EmissionFactorProxyPCRs;
//   emissionFactorValue: number;
//   unit: string;
//   approvedBy: string;
//   internalId?: string;
//   controlVariableUnit: string;
//   hasControlVariable: boolean;
//   controlVariableValue: number | null;
//   files: { url: string; name: string }[];
// };

// export const mockEmissionProxies: EmissionFactorProxy[] = [
//   {
//     id: "1",
//     proxyId: "P001",
//     name: "รถบัสปรับอากาศ (เบนซิน)",
//     pcrType: emissionFactorProxyPCRs[0],
//     emissionFactorValue: 2.74,
//     unit: "kgCO2eq/คน/กม.",
//     approvedBy: "Super Admin 1",
//     hasControlVariable: false,
//     controlVariableValue: null,
//     controlVariableUnit: "kgCO2eq/คน/กม.",
//     files: [{ url: "https://example.com", name: "ref.png" }],
//     internalId: "P001",
//     status: EmissionFactorProxyStatus.Publish,
//   },
//   {
//     id: "2",
//     proxyId: "P002",
//     name: "โรมแรมแคปซูล",
//     pcrType: emissionFactorProxyPCRs[1],
//     emissionFactorValue: 1.22,
//     unit: "kgCO2eq/คน/คืน",
//     approvedBy: "Super Admin 1",
//     hasControlVariable: false,
//     controlVariableValue: null,
//     controlVariableUnit: "kgCO2eq/คน/คืน",
//     files: [{ url: "https://example.com", name: "ref.png" }],
//     internalId: "P002",
//     status: EmissionFactorProxyStatus.Publish,
//   },
//   {
//     id: "3",
//     proxyId: "P003",
//     name: "น้ำหวาน",
//     pcrType: emissionFactorProxyPCRs[2],
//     emissionFactorValue: 0.199,
//     unit: "kgCO2eq/คน/คืน",
//     approvedBy: "Super Admin 1",
//     hasControlVariable: false,
//     controlVariableValue: null,
//     controlVariableUnit: "kgCO2eq/คน/คืน",
//     files: [{ url: "https://example.com", name: "ref.png" }],
//     internalId: "P003",
//     status: EmissionFactorProxyStatus.Hide,
//   },
//   {
//     id: "4",
//     proxyId: "P004",
//     name: "หนังสังเคราะห์",
//     pcrType: emissionFactorProxyPCRs[3],
//     emissionFactorValue: 2.32,
//     unit: "kgCO2eq/กก.",
//     approvedBy: "Super Admin 1",
//     controlVariableUnit: "kgCO2eq/คน/กก.",
//     hasControlVariable: false,
//     controlVariableValue: null,
//     files: [{ url: "https://example.com", name: "ref.png" }],
//     internalId: "P004",
//     status: EmissionFactorProxyStatus.Draft,
//   },
// ];
