"use server";
import { publicApi, withRevalidate } from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { readItems } from "@directus/sdk";

type Countries = Collection["countries"];

export type CountryJSONData = Pick<Awaited<ReturnType<typeof fetchCountries>>[number], "id" | "title">;

async function fetchCountries() {
  const res: Countries[] = await publicApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("countries", {
        fields: ["id, title"],
        filter: {
          status: {
            _eq: "published",
          },
        },
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

export { fetchCountries };
