"use server";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { Collection } from "@/utils/cms/cms-type";
import * as _ from "lodash";

type Districts = Collection["district"];

// export type DistrictJSONData = Pick<Awaited<ReturnType<typeof fetchDistricts>>[number], "title"> & { title?: string };
export type DistrictJSONData = {
  id?: number;
  title?: string | null;
  province?: number | any;
};
async function fetchDistricts(lang = "th") {
  const url = `${getCmsURL()}/items/district?fields=id,province.id,translations,translations.*&limit=-1`;
  const data = await fetch(url);
  const json: { data: Districts[] } = await data.json();

  const result = json.data.map((item): Districts => {
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
      province: !_.isNil(item.province) ? _.get(item, ["province", "id"], null) : null,
    };
  });

  return result as any[];
}

export { fetchDistricts };
