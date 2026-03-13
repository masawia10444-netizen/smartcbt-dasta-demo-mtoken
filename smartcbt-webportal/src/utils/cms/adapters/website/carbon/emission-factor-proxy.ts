"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Profile } from "@/utils/cms/cms-api-adapter";
import { createItem, readItem, readItems, updateItem, uploadFiles } from "@directus/sdk";
import jsonata from "jsonata";
import * as _ from "lodash";
import { EmissionFactorProxyType } from "./types";

async function getEmissionFactorProxy(id: number) {
  const res: EmissionFactorProxyType = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("emission_factor_proxy", id, {
        fields: [
          "*",
          "emission_factor_unit.*",
          "files.*",
          "files.directus_files_id.*",
          "pcr_type.*",
          "approve_by.user_info.*",
        ],
        // filter: { level: { _eq: "MAJOR" } },
      }),
      0
    )
  );

  return await transformEmissionFactorProxy(res);
}

async function listEmissionFactorProxy(profile: Profile, search?: string) {
  const role = profile.roles.find((item) => item.app_code === "CARBON");
  let filterRole: unknown = {
    _or: [{ level: { _eq: "MAJOR" } }],
  };
  if (role?.role === "user") {
    filterRole = {
      _or: [{ level: { _eq: "MAJOR" } }, { level: { _eq: "MINOR" }, user_created: { _eq: profile.user_id.id } }],
    };
  }
  const res: EmissionFactorProxyType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("emission_factor_proxy", {
        fields: [
          "*",
          "pcr_type.*",
          "emission_factor_unit.*",
          "files.*",
          "files.directus_files_id.*",
          "approve_by.user_info.*",
        ],
        filter: filterRole,
        search: search,
        limit: -1,
      }),
      0
    )
  );
  return await Promise.all(res.map((item) => transformEmissionFactorProxyList(item)));
}

async function transformEmissionFactorProxyList(data: EmissionFactorProxyType) {
  const expression = jsonata(`
  $.{
        'id': id,
        'status': status,
        'emission_factor_value': emission_factor_value,
        'name': name,
        'unit': unit,
        'tooltip_flag': tooltip_flag,
        'tooltip_data': tooltip_data,
        'emission_factor_unit': emission_factor_unit.{
            'id': id,
            'label': label
        },
        'pcr_type': pcr_type.{
            'id': id,
            'label': label
        },
        'approve_by': approve_by.user_info[0] ? approve_by.user_info[0].{
          'id': id,
          'email': email,
          'first_name': first_name,
          'last_name': last_name
        } : null
    }`);

  const result = await expression.evaluate(data);
  return result;
}

async function transformEmissionFactorProxy(data: EmissionFactorProxyType) {
  const expression = jsonata(`
  $.{
        'id': id,
        'emission_factor_value': emission_factor_value,
        'level': level,
        'name': name,
        'unit': unit,
        'control_variable_unit': unit,
        'tooltip_flag': tooltip_flag,
        'tooltip_data': tooltip_data,
        'files': files,
        'emission_factor_unit': emission_factor_unit.{
            'id': id,
            'label': label
        },
        'pcr_type': pcr_type.{
            'id': id,
            'label': label
        },
        'approve_by': approve_by.user_info[0] ? approve_by.user_info[0].{
          'id': id,
          'email': email,
          'first_name': first_name,
          'last_name': last_name
        } : null
    }`);

  const result = await expression.evaluate(data);
  result.files = !_.isNil(result.files)
    ? result.files.map((item: unknown) => {
        return {
          id: _.get(item, ["directus_files_id", "id"], null),
          url: _.get(item, ["directus_files_id", "filename_disk"], null),
          type: _.get(item, ["directus_files_id", "type"], null),
          title: _.get(item, ["directus_files_id", "title"], null),
        };
      })
    : null;
  return result;
}

async function createEmissionFactorProxy(payload: EmissionFactorProxyType) {
  const res = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      createItem("emission_factor_proxy", {
        ...payload,
        level: "MINOR",
      }),
      0
    )
  );
  return res;
}

async function updateEmissionFactorProxy(id: number, payload: EmissionFactorProxyType) {
  const res = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      updateItem("emission_factor_proxy", id, payload),
      0
    )
  );
  return res;
}

async function uploadRegisteredAttachments(formData: FormData) {
  // @ts-ignore
  try {
    const result = await cmsApi.request(uploadFiles(formData));
    return result;
  } catch (e) {
    console.log("e: ", JSON.stringify(e));
  }
}
export {
  createEmissionFactorProxy,
  getEmissionFactorProxy,
  listEmissionFactorProxy,
  updateEmissionFactorProxy,
  uploadRegisteredAttachments,
};
