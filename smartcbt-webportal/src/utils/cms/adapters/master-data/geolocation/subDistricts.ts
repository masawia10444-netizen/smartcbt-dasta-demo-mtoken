"use server";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { Collection } from "@/utils/cms/cms-type";
import * as _ from "lodash";

type SubDistricts = Collection["subdistrict"];

// export type SubDistrictJSONData = Pick<Awaited<ReturnType<typeof fetchSubDistricts>>[number], "id" | "title">;
export type SubDistrictJSONData = {
  id?: number;
  title?: string | null;
  district?: number | any;
  postal?: string | null;
};

// fetch all sub

async function fetchAllSubdistrict(lang: string) {
  const url = `${getCmsURL()}/items/subdistrict?aggregate[count]=*`;
  const data = await fetch(url);
  const json: { data: SubDistricts[] } = await data.json();
  const count = _.get(json, ["data", 0, "count"], 0);
  const perPage = 1000;
  const length = Math.ceil(count / perPage) + 1;

  const arrayList = _.range(1, length);

  const resultList = await Promise.all(
    arrayList.map(async (page) => {
      const url = `${getCmsURL()}/items/subdistrict?fields=id,district.id,postal,translations,translations.*&limit=${perPage}&page=${page}`;
      const data = await fetch(url);
      const json: { data: SubDistricts[] } = await data.json();
      return json.data;
    })
  );

  return _.flatten(resultList);
}

async function fetchSubDistricts(lang = "th") {
  const allSubDistricts = await fetchAllSubdistrict(lang);

  // const result = await Promise.all(res.map(async (res: SubDistricts) => await transformSubDistricts(res, lang)));
  const result = allSubDistricts.map((item): SubDistricts => {
    let langCode = "th-TH";
    if (lang === "en") {
      langCode = "en-US";
    } else if (lang === "th") {
      langCode = "th-TH";
    }
    // find lang
    const matchLang = !_.isNil(item.translations)
      ? item.translations.find((t: any) => _.get(t, ["languages_code"], null) == langCode)
      : null;

    return {
      id: item.id,
      title: !_.isNil(matchLang) ? _.get(matchLang, "title", null) : null,
      district: !_.isNil(item.district) ? _.get(item, ["district", "id"], null) : null,
      postal: item.postal,
    };
  });

  return result;
}

export { fetchSubDistricts };
