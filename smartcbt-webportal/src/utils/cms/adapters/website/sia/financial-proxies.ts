"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Profile } from "@/utils/cms/cms-api-adapter";
import { createItem, readItems, updateItem, uploadFiles } from "@directus/sdk";
import jsonata from "jsonata";
import * as _ from "lodash";
import { FINANCIAL_PROXY_LEVEL, FINANCIAL_PROXY_STATUS } from "../constants";
import { FinancialProxies, FinancialProxiesBody, StandardCbtSiasroiDiscountRate } from "./types/project";

export interface DiscountRateJson {
  id: string;
  status: string;
  start_date: string;
  end_date: string;
  discount_rate: number;
}
interface Province {
  sort: null | unknown;
  id: number;
  status: string;
  title: string;
  lat: string;
  lng: string;
  date_created: string;
  date_updated: string;
  region: {
    id: number;
    sort: null | unknown;
    lng: string;
    lat: string;
    title: string;
    status: string;
    date_updated: string;
    date_created: string;
    user_updated: string;
    user_created: string;
  };
  country: {
    sort: null | unknown;
    id: number;
    status: string;
    title: string;
    date_created: string;
    date_updated: string;
    user_created: string;
    user_updated: string;
  };
  user_created: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: null | unknown;
    title: null | unknown;
    description: null | unknown;
    tags: null | unknown;
    language: string;
    theme: string;
    tfa_secret: null | unknown;
    email_notifications: boolean;
    status: string;
    role: string;
    token: null | unknown;
    id: string;
    last_page: string;
    last_access: string;
    provider: string;
    external_identifier: null | unknown;
    auth_data: null | unknown;
    location: null | unknown;
    user_info: any[]; // You might want to define a specific type for this array
  };
  user_updated: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: null | unknown;
    title: null | unknown;
    description: null | unknown;
    tags: null | unknown;
    language: string;
    theme: string;
    tfa_secret: null | unknown;
    email_notifications: boolean;
    status: string;
    role: string;
    token: string;
    id: string;
    last_page: string;
    last_access: string;
    provider: string;
    external_identifier: null | unknown;
    auth_data: null | unknown;
    location: null | unknown;
    user_info: any[]; // You might want to define a specific type for this array
  };
}

interface ProxyType {
  sort: number;
  id: number;
  status: string;
  title: string;
  date_created: string;
  date_updated: string;
  user_created: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: null | unknown;
    title: null | unknown;
    description: null | unknown;
    tags: null | unknown;
    language: null | unknown;
    theme: string;
    tfa_secret: null | unknown;
    email_notifications: boolean;
    status: string;
    role: string;
    token: string;
    id: string;
    last_page: string;
    last_access: string;
    provider: string;
    external_identifier: null | unknown;
    auth_data: null | unknown;
    location: null | unknown;
    user_info: any[]; // You might want to define a specific type for this array
  };
  user_updated: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: null | unknown;
    title: null | unknown;
    description: null | unknown;
    tags: null | unknown;
    language: string;
    theme: string;
    tfa_secret: null | unknown;
    email_notifications: boolean;
    status: string;
    role: string;
    token: null | unknown;
    id: string;
    last_page: string;
    last_access: string;
    provider: string;
    external_identifier: null | unknown;
    auth_data: null | unknown;
    location: null | unknown;
    user_info: any[]; // You might want to define a specific type for this array
  };
}

interface Unit {
  id: number;
  sort: null | unknown;
  code: string;
  status: string;
  date_updated: string;
  date_created: string;
  translations: Array<{
    id: number;
    units_id: number;
    abbreviation: null | unknown;
    title: string;
    languages_code: string;
  }>;
  user_updated: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: null | unknown;
    title: null | unknown;
    description: null | unknown;
    tags: null | unknown;
    language: string;
    theme: string;
    tfa_secret: null | unknown;
    email_notifications: boolean;
    status: string;
    role: string;
    token: string;
    id: string;
    last_page: string;
    last_access: string;
    provider: string;
    external_identifier: null | unknown;
    auth_data: null | unknown;
    location: null | unknown;
    user_info: any[]; // You might want to define a specific type for this array
  };
  user_created: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: null | unknown;
    title: null | unknown;
    description: null | unknown;
    tags: null | unknown;
    language: string;
    theme: string;
    tfa_secret: null | unknown;
    email_notifications: boolean;
    status: string;
    role: string;
    token: null | unknown;
    id: string;
    last_page: string;
    last_access: string;
    provider: string;
    external_identifier: null | unknown;
    auth_data: null | unknown;
    location: null | unknown;
    user_info: any[]; // You might want to define a specific type for this array
  };
}

export interface FinancialProxiesJson {
  id: number;
  status: string;
  title: string;
  level: string;
  title_en: string | null;
  is_supported_all_province: boolean;
  province: Province;
  proxy_type: ProxyType;
  unit: Unit;
  categories: string;
  value: number;
  user_created: string;
}

async function createFinancialProxy(data: FinancialProxiesBody) {
  const res: FinancialProxies = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      createItem("standard_cbt_siasroi_financial_proxies", {
        ...data,
        level: FINANCIAL_PROXY_LEVEL.MINOR,
      }),
      0
    )
  );
  return res;
}

async function getListFinancialProxy() {
  const res: FinancialProxies = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("standard_cbt_siasroi_financial_proxies", {
        fields: ["*", "*.*", "*.*.*"],
        filter: { status: { _eq: FINANCIAL_PROXY_STATUS.PUBLISHED }, level: { _eq: FINANCIAL_PROXY_LEVEL.MAJOR } },
        sort: ["id"],
        limit: 100,
      }),
      0
    )
  );
  const promiseList = res.map((item: FinancialProxies) => transformListFinancialProxy(item)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function getListFinancialProxyByProvince(provinceId?: number) {
  const res: FinancialProxies = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("standard_cbt_siasroi_financial_proxies", {
        fields: ["*", "attachments.*"],
        filter: {
          _or: [{ province: { _eq: provinceId } }, { is_supported_all_province: { _eq: true } }],
          status: { _eq: FINANCIAL_PROXY_STATUS.PUBLISHED },
          level: { _eq: FINANCIAL_PROXY_LEVEL.MAJOR },
        },
        sort: ["id"],
        limit: 100,
      }),
      0
    )
  );
  const promiseList = res.map((item: FinancialProxies) => transformListFinancialProxy(item)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function transformListFinancialProxy(data: FinancialProxies) {
  const expression = jsonata(`
  $.{
    'id': id,
    'status': status,
    'title': title,
    "title_en": title_en,
    'remark': remark,
    'is_supported_all_province': is_supported_all_province,
    'province': province,
    'proxy_type': proxy_type,
    'unit': unit,
    'level': level,
    'categories': categories,
    'growth_formula': growth_formula,
    'growth_rate': growth_rate,
    'value': value,
    'growth_rate_calculation_detail': growth_rate_calculation_detail,
    'start_year': start_year,
    'end_year': end_year,
    'attachments': attachments
  }`);

  const result = await expression.evaluate(data);
  result.attachments = !_.isNil(result.attachment)
    ? {
        id: _.get(result.attachment, ["directus_files_id", "id"], null),
        url: _.get(result.attachment, ["directus_files_id", "filename_disk"], null),
        type: _.get(result.attachment, ["directus_files_id", "type"], null),
        title: _.get(result.attachment, ["directus_files_id", "title"], null),
      }
    : null;
  return result;
}

async function getListManageFinancialProxy(profile: Profile, year?: number) {
  const role = profile.roles.find((item) => item.app_code === "SIA/SROI");

  let filter = {};
  if (role?.role === "user") {
    filter = {
      status: {
        _eq: FINANCIAL_PROXY_STATUS.PUBLISHED,
      },
    };
  }

  const res: FinancialProxies[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("standard_cbt_siasroi_financial_proxies", {
        fields: ["*", "*.*", "*.*.*"],
        filter: { level: { _eq: FINANCIAL_PROXY_LEVEL.MAJOR }, ...filter },
        sort: ["id"],
        limit: -1,
      }),
      0
    )
  );

  let resFilter = res;
  if (year) {
    resFilter = res.filter((item) => {
      if (item.growth_rate_calculation_detail) {
        return (
          item.growth_rate_calculation_detail?.filter((detail: { year: number }) => detail.year === year).length > 0
        );
      }
    });
  }
  const promiseList = resFilter.map((item: FinancialProxies) => transformListManageFinancialProxy(item)) ?? [];
  const result = await Promise.all(promiseList);

  return result;
}

async function getListManageMinorFinancialProxyByCreatedBy(userId: string, year: number) {
  if (!userId) return [];

  const res: FinancialProxies[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("standard_cbt_siasroi_financial_proxies", {
        fields: ["*", "*.*", "*.*.*"],
        filter: { level: { _eq: FINANCIAL_PROXY_LEVEL.MINOR }, user_created: { _eq: userId } },
        sort: ["id"],
        limit: -1,
      }),
      0
    )
  );

  let resFilter = res;

  if (year) {
    resFilter = res.filter((item) => {
      if (item.growth_rate_calculation_detail) {
        return (
          item.growth_rate_calculation_detail?.filter((detail: { year: number }) => detail.year === year).length > 0
        );
      }
    });
  }

  const promiseList = resFilter.map((item: FinancialProxies) => transformListManageFinancialProxy(item)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function transformListManageFinancialProxy(data: FinancialProxies) {
  // const expression = jsonata(`
  // $.{
  //   'id': id,
  //   'status': status,
  //   'title': title,
  //   'level': level,
  //   'title_en': title_en,
  //   'is_supported_all_province': is_supported_all_province,
  //   'growth_rate_calculation_detail': growth_rate_calculation_detail,
  //   'province': province,
  //   'proxy_type': proxy_type,
  //   'unit': unit,
  //   'categories': categories,
  //   'value': value,
  //   'user_created': user_created
  // }`);

  const result = {
    id: data.id,
    status: data.status,
    title: data.title,
    level: data.level,
    title_en: data.title_en,
    is_supported_all_province: data.is_supported_all_province,
    growth_rate_calculation_detail: data.growth_rate_calculation_detail,
    province: data.province,
    start_year: data.start_year,
    end_year: data.end_year,
    proxy_type: data.proxy_type,
    unit: data.unit,
    categories: data.categories,
    value: data.value,
    user_created: data.user_created,
  };

  result.user_created = result.user_created ? `${result.user_created.first_name} ${result.user_created.last_name}` : "";

  return result;
}

async function createManageFinancialProxy(data: FinancialProxiesBody) {
  const res: FinancialProxies = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      createItem("standard_cbt_siasroi_financial_proxies", {
        ...data,
        level: FINANCIAL_PROXY_LEVEL.MAJOR,
      }),
      0
    )
  );
  return res;
}

async function updateManageFinancialProxy(id: number, data: FinancialProxiesBody) {
  const res: FinancialProxies = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      updateItem("standard_cbt_siasroi_financial_proxies", id, data),
      0
    )
  );
  return res;
}

async function updateManageFinancialProxyStatus(id: number, status: string) {
  const res: FinancialProxies = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      updateItem("standard_cbt_siasroi_financial_proxies", id, { status }),
      0
    )
  );
  return res;
}

async function getFinancialProxyById(id: number) {
  const res: FinancialProxies = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("standard_cbt_siasroi_financial_proxies", {
        fields: ["*", "*.*", "*.*.*"],
        filter: { id: { _eq: id } },
      }),
      0
    )
  );
  const promiseList = res.map((item: FinancialProxies) => transformListFinancialProxy(item)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function uploadFileFinancialProxy(formData: FormData) {
  // @ts-ignore
  try {
    const result = await cmsApi.request(uploadFiles(formData));
    return result;
  } catch (e) {
    console.log("e: ", e);
  }
}

async function getDiscountRate() {
  const res: StandardCbtSiasroiDiscountRate[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("standard_cbt_siasroi_discount_rate", {
        fields: ["*", "*.*"],
        filter: { status: { _eq: FINANCIAL_PROXY_STATUS.PUBLISHED } },
        sort: "start_date",
        limit: 1,
      }),
      0
    )
  );
  const expression = jsonata(`
  $.{
    'id': id,
    'status': status,
    'start_date': start_date,
    'end_date': end_date,
    'discount_rate': discount_rate
  }`);
  const result = await expression.evaluate(res[0]);
  return result;
}

export {
  createFinancialProxy,
  createManageFinancialProxy,
  getDiscountRate,
  getFinancialProxyById,
  getListFinancialProxy,
  getListFinancialProxyByProvince,
  getListManageFinancialProxy,
  getListManageMinorFinancialProxyByCreatedBy,
  updateManageFinancialProxy,
  updateManageFinancialProxyStatus,
  uploadFileFinancialProxy,
};
