import { fetchCommunityProjects } from "@/utils/cms/adapters/website/travel-mart/communities";
import { AttractionTypeInfo, CommunityRecommend } from "@/utils/cms/cms-api-adapter";
import { getFeatureFlag } from "@/utils/feature-flag";
import * as _ from "lodash";

export async function getCommunitiesByQuery(
  projectTitle?: string | null,
  provinceId?: number | null,
  attractionType?: string | null,
  regionId?: number | null,
  organizationAttractionTypes?: AttractionTypeInfo[]
) {
  const requireMatching = await getFeatureFlag("require_business_matching");
  const filter = {
    projectTitle: projectTitle ?? null,
    provinceId: provinceId ?? null,
    attractionType: attractionType ?? null,
    regionId: regionId ?? null,
    requireBusinessMatching: !requireMatching ? null : true,
  };

  //
  const response: CommunityRecommend[] = await fetchCommunityProjects({ filter });

  // calculate score
  // LOGIC: find intersect attraction type and sort by length
  const calculatedScoreCommunity = _.isEmpty(response)
    ? []
    : response.map((community) => {
        // find intersect type
        const intersectAttractionType = _.intersectionBy(
          _.get(community, ["organization", "attraction_types"], []),
          organizationAttractionTypes ?? [],
          "community_tourist_attraction_type_id"
        );

        return {
          ...community,
          score: intersectAttractionType.length ?? 0,
        };
      });

  return _.orderBy(calculatedScoreCommunity, ["score", "id"], ["desc", "desc"]) ?? [];
}
