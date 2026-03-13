"use server";
import publicApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { readItems } from "@directus/sdk";
import * as _ from "lodash";
import { Provinces } from "../../website/sia/types/project";

export type Regions = Collection["regions"];

export type RegionJSONData = Pick<Awaited<ReturnType<typeof fetchRegions>>[number], "id" | "title">;
export type RegionsWithProvinceJson = Awaited<ReturnType<typeof fetchRegionsWithProvince>>;

async function fetchRegions() {
  const res: Regions[] = await publicApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("regions", {
        fields: ["id, title"],
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  return res;

  // return res.map((res: Provinces) => ({ id: res.id, title: res.title }));
  // return await transformAttractionType(res);
}

async function fetchRegionsWithProvince(lang = "th") {
  let langCode = "th-TH";
  if (lang === "en") {
    langCode = "en-US";
  } else if (lang === "th") {
    langCode = "th-TH";
  }
  const res: Provinces[] = await publicApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("provinces", {
        fields: ["id, title,translations.* ", "region.*", "region.translations.*"],
        sort: ["id"],
        limit: "-1",
      }),
      0
    )
  );

  const regions: { [key: number]: Regions | null } = {};

  const groupByRegion: { [key: string]: Provinces[] } = _.groupBy(res, (item: Provinces) => {
    const regionId = _.get(item, ["region", "id"]);
    if (_.isNil(regions[regionId]) && !_.isNil(item.region) && !_.isNumber(item.region)) {
      regions[regionId] = item.region ? item.region : null;
    }
    return regionId;
  });

  const provinceGroupByRegionKey = Object.keys(groupByRegion);

  const regionWithProvince = provinceGroupByRegionKey.map((regionId: string) => {
    const matchProvince = groupByRegion[regionId];
    //provinceBylang
    const provinceBylang = matchProvince.map((province) => {
      const translationObjectProvince = _.find(province?.translations, { languages_code: langCode }, undefined);
      return {
        ...province,
        title: translationObjectProvince?.title ?? null,
      };
    });
    const region = _.get(regions, [regionId], null);
    const translationObject = _.find(region?.translations, { languages_code: langCode }, undefined);
    return {
      id: Number(regionId),
      // title: _.get(regions, [regionId, "title"], null),
      title: translationObject?.title ?? null,
      provinces: provinceBylang,
      // provinces: matchProvince,
    };
  });

  // return res.map((res: Provinces) => ({ id: res.id, title: res.title }));
  return await regionWithProvince;
}

export { fetchRegions, fetchRegionsWithProvince };
