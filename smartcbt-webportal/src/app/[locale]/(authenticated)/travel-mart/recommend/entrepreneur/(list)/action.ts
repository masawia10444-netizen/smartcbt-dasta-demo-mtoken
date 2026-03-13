import { fetchRecommendOrganization } from "@/utils/cms/adapters/website/travel-mart/communities";
import { AttractionTypeInfo, OrganizationRecommend } from "@/utils/cms/cms-api-adapter";
import { getFeatureFlag } from "@/utils/feature-flag";
import * as _ from "lodash";

export async function getOrganizationsByQuery(
  regionId?: number | null,
  projectTitle?: string | null,
  provinceId?: number | null,
  communityAttractionTypes?: AttractionTypeInfo[],
  attractionType?: string | null
) {
  const requireMatching = await getFeatureFlag("require_business_matching");
  const filter = {
    regionId: regionId ?? null,
    title: projectTitle ?? null,
    provinceId: provinceId ?? null,
    attractionType: attractionType ?? null,
    require_business_matching: !requireMatching ? null : true,
  };
  const response: OrganizationRecommend | OrganizationRecommend[] | undefined = await fetchRecommendOrganization({
    filter,
  });
  // calculate score
  // LOGIC: find intersect attraction type and sort by length
  const calculatedScoreOrganization = _.isEmpty(response)
    ? []
    : response.map((organization) => {
        // find intersect type
        const intersectAttractionType = _.intersectionBy(
          _.get(organization, ["attraction_types"], []),
          communityAttractionTypes ?? [],
          "community_tourist_attraction_type_id"
        );

        return {
          ...organization,
          score: intersectAttractionType.length ?? 0,
        };
      });

  return _.orderBy(calculatedScoreOrganization, ["score", "id"], ["desc", "desc"]) ?? [];
}
