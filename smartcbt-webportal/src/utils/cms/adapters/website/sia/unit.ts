import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { readItems } from "@directus/sdk";

export async function getUnits() {
  const res = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("units", {
        fields: ["*"],
        limit: "-1",
      }),
      0
    )
  );
  return res;
}
