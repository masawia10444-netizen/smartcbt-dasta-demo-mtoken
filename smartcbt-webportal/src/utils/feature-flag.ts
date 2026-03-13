"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { readItem } from "@directus/sdk";

type FeatureConfigurationType = Collection["feature_configurations"];

export async function getFeatureFlag(featureName: string) {
  try {
    const res: FeatureConfigurationType = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        readItem("feature_configurations", featureName, {
          fields: ["enabled_flag"],
        }),
        0
      )
    );

    return res.enabled_flag ?? false;
  } catch (errors: unknown) {
    return false;
  }
}
