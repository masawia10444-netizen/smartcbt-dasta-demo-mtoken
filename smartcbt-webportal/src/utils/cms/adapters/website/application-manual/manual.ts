"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { readItems } from "@directus/sdk";
import jsonata from "jsonata";
import * as _ from "lodash";

async function manualsByApplication(appCode: string | null = null, isDefault = true) {
  let filter: Record<string, unknown> = isDefault
    ? {
        is_default: {
          _eq: isDefault,
        },
      }
    : {};

  if (appCode) {
    filter.applications = {
      code: {
        _eq: appCode,
      },
    };
  }

  const data = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("manual", {
        fields: ["*", "icon.*", "application_manual.*", "applications.*"],
        filter,
      }),
      0
    )
  );
  return await Promise.all(
    data.map(async (item) => {
      return await transformManual(item);
    })
  );
}

async function listManualsCbt() {
  const data = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("cbt_manuals", {
        fields: ["*", "manual.*", "icon.*"],
        // filter: filter,
      }),
      0
    )
  );
  const result = data.map((item) => {
    return {
      ...item,
      icon: !_.isNil(item.icon)
        ? {
            id: _.get(item.icon, ["id"], null),
            url: _.get(item.icon, ["filename_disk"], null),
            type: _.get(item.icon, ["type"], null),
            title: _.get(item.icon, ["title"], null),
          }
        : null,
      manual: !_.isNil(item.manual)
        ? {
            id: _.get(item.manual, ["id"], null),
            url: _.get(item.manual, ["filename_disk"], null),
            type: _.get(item.manual, ["type"], null),
            title: _.get(item.manual, ["title"], null),
          }
        : null,
    };
  });
  return _.groupBy(result, "type");
}

async function transformManual(data: any) {
  const expression = jsonata(`$.{
    "application_code": applications.code,
    "id": id,
    "title": title,
    "date_updated": date_updated,
    "application_manual": application_manual,
    "icon": icon
  }`);
  const result = await expression.evaluate(data);
  result.application_manual = !_.isNil(result.application_manual)
    ? {
        id: _.get(result.application_manual, ["id"], null),
        url: _.get(result.application_manual, ["filename_disk"], null),
        type: _.get(result.application_manual, ["type"], null),
        title: _.get(result.application_manual, ["title"], null),
      }
    : null;

  result.icon = !_.isNil(result.icon)
    ? {
        id: _.get(result.icon, ["id"], null),
        url: _.get(result.icon, ["filename_disk"], null),
        type: _.get(result.icon, ["type"], null),
        title: _.get(result.icon, ["title"], null),
      }
    : null;

  return result;
}

export { listManualsCbt, manualsByApplication };
