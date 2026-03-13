"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { readItems } from "@directus/sdk";
import jsonata from "jsonata";
import { DastaWorkingArea, ProjectLocations, Provinces } from "./types/project";

async function getOptionProjectLocations() {
  const res: ProjectLocations[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("project_locations", {
        fields: ["*"],
        // filter: { status: { _eq: "published" } },
      }),
      0
    )
  );
  const promiseList = res.map((item: ProjectLocations) => transformDataProject(item)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function transformDataProject(data: ProjectLocations) {
  const expression = jsonata(`$.{
    'id': id,
    'address': address
}`);

  const result = await expression.evaluate(data);
  return result;
}

async function getOptionDastaWorkingAreas() {
  const res: DastaWorkingArea[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("dasta_working_area", {
        fields: ["*"],
        sort: ["sort"],
        limit: -1,
      }),
      0
    )
  );
  const promiseList = res.map((item: DastaWorkingArea) => transformDataDastaWorkingAreas(item)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function transformDataDastaWorkingAreas(data: DastaWorkingArea) {
  const expression = jsonata(`$.{
    'id': id,
    'title': title
}`);

  const result = await expression.evaluate(data);
  return result;
}

async function getOptionProvinces(lang = "th") {
  const res: Provinces[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("provinces", {
        fields: ["id, translations.*"],
      }),
      0
    )
  );
  const promiseList = res.map((item: Provinces) => transformDataProvince(item, lang)) ?? [];
  const result = await Promise.all(promiseList);
  return result;
}

async function transformDataProvince(data: Provinces, lang: string) {
  let langCode = "th-TH";
  if (lang === "en") {
    langCode = "en-US";
  } else if (lang === "th") {
    langCode = "th-TH";
  }
  const expression = jsonata(`
    $.{
        'id': id,
        'title': translations[languages_code = '${langCode}'].title
    }
  `);

  const result = await expression.evaluate(data);
  return result;
}
export { getOptionDastaWorkingAreas, getOptionProjectLocations, getOptionProvinces };
