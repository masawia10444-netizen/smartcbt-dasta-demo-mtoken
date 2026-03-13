"use server";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { Collection } from "@/utils/cms/cms-type";
import jsonata from "jsonata";
import * as _ from "lodash";

type Provinces = Collection["provinces"];
type CommunityAttractionType = Collection["community_tourist_attraction_type"];

export type ProvinceJSONData = Pick<Awaited<ReturnType<typeof fetchProvinces>>[number], "id" | "title" | "region">;

async function fetchProvinces(lang = "th"): Promise<Provinces[]> {
  const url = `${getCmsURL()}/items/provinces?fields=id,region,translations,translations.*&limit=-1`;
  const data = await fetch(url);
  const json: { data: Provinces[] } = await data.json();

  // const result = await Promise.all(res.map(async (res: Provinces) => await transformProvinces(res, lang)));
  const result = json.data.map((item): { id?: number; title: string | null; region: number | undefined | null } => {
    let langCode = "th-TH";
    if (lang === "en") {
      langCode = "en-US";
    } else if (lang === "th") {
      langCode = "th-TH";
    }
    // find lang
    const matchLang = !_.isNil(item.translations)
      ? item.translations.find((t) => _.get(t, ["languages_code"], null) == langCode)
      : null;

    return {
      id: item.id,
      title: !_.isNil(matchLang) ? _.get(matchLang, "title", null) : null,
      region: item.region as number,
    };
  });

  // console.log(result);
  const sortResponse = result
    .filter((a) => a.title !== null && a.title !== undefined)
    .sort((a, b) => {
      if (a.title && b.title) {
        return a.title.localeCompare(b.title, lang);
      }
      return 0;
    });
  return sortResponse;
}

async function transformProvinces(provinces: Provinces, lang: string) {
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

  const result = await expression.evaluate(provinces);
  return result;
}

export { fetchProvinces };
