"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import {
  transformCommunity,
  transformCommunityProject,
  transformCommunityProjectInfo,
  transformOrganization,
  transformOrganizationRecommend,
} from "@/utils/cms/cms-api-adapter";
import { Collection } from "@/utils/cms/cms-type";
import { parseTranslation } from "@/utils/helper";
import { QueryFilter, readItem, readItems } from "@directus/sdk";
import * as _ from "lodash";
import { AttractionTypeInfo, Community, CommunityAttractionType, Organization } from "../types/travel-mart";

export type CommunityJSONData = Pick<Awaited<ReturnType<typeof fetchCommunities>>[number], "id" | "title">;

async function fetchCommunityById(id: number) {
  const res: Community = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("communities", id, {
        fields: ["*.*.*"],
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  return await transformCommunity(res);
}

async function fetchCommunities(search?: string) {
  let filter: any = {
    status: {
      _eq: "published",
    },
  };
  if (!_.isNil(search)) {
    filter.title = {
      _eq: search,
    };
  }
  const res: Community[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("communities", {
        fields: ["*.*.*"],
        filter: filter,
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  const sortedThaiStrings = res
    .filter((a) => a.title !== null && a.title !== undefined)
    .sort((a, b) => {
      if (a.title && b.title) {
        return a.title.localeCompare(b.title, "th");
      }
      return 0;
    });
  const promiseTransform = sortedThaiStrings.map((data) => transformCommunity(data));
  return await Promise.all(promiseTransform);
}

async function fetchCommunityProjects(
  params: {
    filter?: {
      projectTitle?: string | null;
      communityId?: number | null;
      provinceId?: number | null;
      regionId?: number | null;
      attractionType?: string | null;
      requireBusinessMatching?: boolean | null;
    };
  } = {}
) {
  let filter: QueryFilter<Collection, Collection["communities"]> = {
    status: {
      _in: ["published"],
    },
  };

  let organizationFilter: QueryFilter<Collection, Collection["organization"]> | null = null;

  if (!_.isNil(params.filter)) {
    if (!_.isNil(params.filter.communityId)) {
      filter.id = {
        _eq: params.filter.communityId,
      };
    }

    // FIXME: change to community project when have data
    if (!_.isNil(params.filter.projectTitle) && !_.isEmpty(params.filter.projectTitle)) {
      // if (_.isEmpty(organizationFilter) || _.isNil(organizationFilter)) organizationFilter = { _or: [] };
      organizationFilter = { title: { _contains: params.filter.projectTitle } };
    }

    if (!_.isNull(params.filter.requireBusinessMatching)) {
      organizationFilter = {
        ...organizationFilter,
        require_business_matching: {
          _eq: params.filter.requireBusinessMatching,
        },
      };
    }

    if (!_.isNil(params.filter.provinceId)) {
      organizationFilter = {
        ...organizationFilter,
        province: {
          id: {
            _eq: params.filter.provinceId,
          },
        },
      };
    }
    if (!_.isNil(params.filter.regionId)) {
      const provinceFilter = _.get(organizationFilter, ["province"], {});

      if (_.isEmpty(provinceFilter) || _.isNil(provinceFilter)) {
        organizationFilter = {
          ...organizationFilter,
          province: {
            region: {
              id: {
                _eq: params.filter.regionId,
              },
            },
          },
        };
      } else {
        const organizationFilters = organizationFilter
          ? Object.keys(organizationFilter).map((key) => ({ [key]: (organizationFilter as any)[key] }))
          : [];
        organizationFilter = {
          _and: [
            ...organizationFilters,
            {
              province: {
                region: {
                  id: {
                    _eq: params.filter.regionId,
                  },
                },
              },
            },
            {
              province: {
                id: {
                  _eq: params.filter.provinceId,
                },
              },
            },
          ],
        };
      }
    }

    if (!_.isNil(params.filter.attractionType) && !_.isEmpty(params.filter.attractionType)) {
      filter.attraction_type = {
        community_tourist_attraction_type_id: {
          titleshort: {
            _contains: params.filter.attractionType,
          },
        },
      };
    }
  }

  if (!_.isNil(organizationFilter) && !_.isEmpty(organizationFilter)) {
    filter.organization = organizationFilter as Collection["organization"];
  }

  const res: Community[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("communities", {
        fields: ["*.*.*"],
        filter,
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  return transformCommunityProject(res);
}

async function fetchRecommendOrganization(
  params: {
    filter?: {
      regionId?: number | null;
      title?: string | null;
      provinceId?: number | null;
      attractionType?: string | null;
      require_business_matching?: boolean | null;
    };
  } = {}
) {
  let filter: QueryFilter<Collection, Collection["organizations"]> = {
    status: {
      _in: ["published"],
    },
    organization_type: {
      _neq: 3, // not: "community_enterprise"
    },
  };

  let organizationFilter: QueryFilter<Collection, Collection["organization"]> | null = null;

  if (!_.isNil(params.filter)) {
    // FIXME: change to community project when have data
    if (!_.isNil(params.filter.provinceId)) {
      organizationFilter = {
        province: {
          _eq: params.filter.provinceId,
        },
      };
    }
    // if (!_.isNil(params.filter.regionId)) {
    //   organizationFilter = {
    //     province: {
    //       region: {
    //         _eq: params.filter.regionId,
    //       },
    //     },
    //   };
    // }
    if (!_.isNil(params.filter.regionId)) {
      const provinceFilter = _.get(organizationFilter, ["province"], {});

      if (_.isEmpty(provinceFilter) || _.isNil(provinceFilter)) {
        organizationFilter = {
          ...organizationFilter,
          province: {
            region: {
              id: {
                _eq: params.filter.regionId,
              },
            },
          },
        };
      } else {
        const organizationFilters = organizationFilter
          ? Object.keys(organizationFilter).map((key) => ({ [key]: (organizationFilter as any)[key] }))
          : [];
        organizationFilter = {
          _and: [
            ...organizationFilters,
            {
              province: {
                region: {
                  id: {
                    _eq: params.filter.regionId,
                  },
                },
              },
            },
            {
              province: {
                id: {
                  _eq: params.filter.provinceId,
                },
              },
            },
          ],
        };
      }
    }
    if (!_.isNil(params.filter.attractionType)) {
      organizationFilter = {
        ...organizationFilter,
        attraction_types: {
          community_tourist_attraction_type_id: {
            titleshort: {
              _contains: params.filter.attractionType,
            },
          },
        },
      };
    }
    if (!_.isNull(params.filter.require_business_matching)) {
      organizationFilter = {
        require_business_matching: {
          _eq: true,
        },
      };
    }
  }

  if (!_.isNil(organizationFilter) && !_.isEmpty(organizationFilter)) {
    filter = { ...filter, ...organizationFilter } as Collection["organization"];
  }

  // transform to and condition
  const res: Organization[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("organizations", {
        fields: ["*.*.*"],
        filter,
        search: _.get(params, ["filter", "title"], null),
        // sort: "sort, -score, -date_created",
        limit: -1,
        sort: "-id",
      }),
      0
    )
  );

  return transformOrganizationRecommend(res);
}

async function fetchAllOrganizations() {
  const res: Organization[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("organizations", {
        fields: ["*.*.*"],
        filter: {
          status: {
            _neq: "archived",
          },
        },
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  return await transformOrganization(res);
}

async function fetchAttractionType() {
  // call fetch type
  const res: CommunityAttractionType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("community_tourist_attraction_type", {
        fields: ["*"],
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  return res.map((res: CommunityAttractionType) => ({ id: res.id, title: res.titleshort }));
  // return await transformAttractionType(res);
}

async function fetchCommunityRatingByCommunityId(communityId: number) {
  const [response] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("rating", {
        fields: ["rating"],
        filter: {
          community: {
            _eq: communityId,
          },
        },
        sort: "-id",
        limit: 1,
      }),
      0
    )
  );
  return response?.rating ?? 0;
}

async function fetchCommunityProjectById(id: number) {
  const res = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("communities", id, {
        fields: [
          "*",
          "featured_image.*",
          "traveling_recommended_during.months_id.*",
          "traveling_recommended_during.months_id.translations.*",
          "facilities.*",
          "organization.*",
          "organization.district.*",
          "organization.subdistrict.*",
          "organization.province.*",
          "facilities.facility.*",
          "facilities.facility.group.id",
          "facilities.facility.group.translations.*",
          "facilities.facility.translations.title",
          "facilities.facility.translations.languages_code",
          "facilities.facility.unit_size.translations.title",
          "facilities.facility.unit_size.translations.languages_code",
          "facilities.facility.unit_quantity.translations.title",
          "facilities.facility.unit_quantity.translations.languages_code",
          "presentations.*",
          "presentations.directus_files_id.*",
          "attraction_type.community_tourist_attraction_type_id.*",
          "tourism_activities.*",
          "tourism_activities.featured_image.*",
          "traveling_recommended_during.*",
          "tourism_products.*",
          "food_menus.*",
          "smartcbt_recommended.*",
          "galleries.directus_files_id.*",
          "awards.awards_id.*",
          "awards.awards_id.translations.*",
        ],
      }),
      0
    )
  );

  // build for

  return await transformCommunityProjectInfo(res);
}

async function listMonths(languagesCode = "th-TH") {
  const months = await cmsApi.request<Community[]>(
    withRevalidate(
      //@ts-ignore
      readItems("months", {
        fields: ["id", "translations.*"],
      }),
      0
    )
  );

  return months.map((month) => {
    const rawTranslations = _.get(month, ["translations"], null);

    const translations = parseTranslation(rawTranslations, languagesCode);
    return {
      id: month.id,
      title: _.get(translations, [0, "title"], null),
    };
  });
}

async function fetchOrganizationAttractionType(organizationId?: number) {
  if (!organizationId) return [];
  const res: Organization = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("organizations", organizationId, {
        fields: ["id", "attraction_types.*"],
      }),
      0
    )
  );

  return _.get(res, ["attraction_types"], []).map((attraction) => {
    return {
      community_tourist_attraction_type_id: _.get(attraction, "community_tourist_attraction_type_id", 0) as number,
    };
  }) as AttractionTypeInfo[];
}

async function fetchCommunityAttractionType(communityId: number) {
  if (!communityId) return [];

  const res: Community = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("communities", communityId, {
        fields: ["id", "attraction_type.*"],
      }),
      0
    )
  );

  return _.get(res, ["attraction_type"], []).map((attraction) => {
    return {
      community_tourist_attraction_type_id: _.get(attraction, "community_tourist_attraction_type_id", 0) as number,
    };
  }) as AttractionTypeInfo[];
}

export {
  fetchCommunityRatingByCommunityId,
  fetchAllOrganizations,
  fetchAttractionType,
  fetchCommunities,
  fetchCommunityAttractionType,
  fetchCommunityById,
  fetchCommunityProjectById,
  fetchCommunityProjects,
  fetchOrganizationAttractionType,
  fetchRecommendOrganization,
  listMonths,
};
