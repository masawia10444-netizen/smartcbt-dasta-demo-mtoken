"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Profile, fetchAwards } from "@/utils/cms/cms-api-adapter";
import { parseTranslation } from "@/utils/helper";
import { createItem, readItem, readItems, updateItem } from "@directus/sdk";
import * as _ from "lodash";
import { COMMUNITY_STATUS } from "../../constants";
import { CreateCommunityBody } from "../types/communities";
import { Community, Organization } from "../types/travel-mart";

async function buildCommunityBody(body: CreateCommunityBody, isApproveRequest = false) {
  // create organziation
  let organization;
  if (_.isNil(body.organization)) {
    const resCreateOrg = await cmsApi.request(
      createItem("organizations", {
        title: body.title,
        address_1: body.address_info.address,
        province: body.address_info.province_id,
        district: body.address_info.district_id,
        subdistrict: body.address_info.sub_district_id,
        postal_code: body.address_info.postal_code,
        latitude: body.address_info.latitude,
        longitude: body.address_info.longitude,
        organization_type: 3, // community type
      })
    );
    organization = resCreateOrg.id;
  } else {
    const resOrg = await cmsApi.request(
      updateItem("organizations", body.organization, {
        title: body.title,
        address_1: body.address_info.address,
        province: body.address_info.province_id,
        district: body.address_info.district_id,
        subdistrict: body.address_info.sub_district_id,
        postal_code: body.address_info.postal_code,
        latitude: body.address_info.latitude,
        longitude: body.address_info.longitude,
      })
    );
    organization = resOrg.id;
  }

  // find awards match
  const awardList = await fetchAwards();
  const awardIds: { awards_id: number }[] = [];
  let travelingRecommendedDuring: { months_id: number }[] = [];
  let galleries: { directus_files_id: string }[] = [];
  let travelType: { tourist_travel_type_id: number }[] = [];
  let travelGroup: { tourist_target_groups_id: number }[] = [];
  let attractionType: { community_tourist_attraction_type_id: number }[] = [];
  let touristTravelCountries: { countries_id: number }[] = [];
  let touristTravelRegions: { regions_id: number }[] = [];

  if (!_.isNil(body.awards)) {
    const newAwards: { status: string; translations: { title: string; languages_code: string }[] }[] = [];
    body.awards.forEach((award) => {
      const matchAward = awardList.find((a) => {
        return a.title == award.title;
      });
      if (!_.isNil(matchAward)) awardIds.push({ awards_id: matchAward.id });
      else
        newAwards.push({
          status: "published",
          translations: [
            {
              title: award.title,
              languages_code: "th-TH",
            },
          ],
        });
    });

    // if is not awards
    if (!_.isEmpty(newAwards)) {
      const result = await Promise.all(
        newAwards.map(async (award) => {
          return cmsApi.request(
            createItem("awards", award, {
              fields: ["id"],
            })
          );
        })
      );

      result.forEach((res) => {
        awardIds.push({ awards_id: Number(res.id) });
      });
    }
  }

  if (!_.isNil(body.traveling_recommended_during)) {
    travelingRecommendedDuring = body.traveling_recommended_during.map((id) => ({ months_id: id }));
  }
  if (!_.isNil(body.galleries)) {
    galleries = body.galleries.map((id) => ({ directus_files_id: id }));
  }

  if (!_.isNil(body.videos)) {
    const videos: { directus_files_id: string }[] = body.videos.map((id) => ({ directus_files_id: id }));
    galleries = galleries.concat(videos);
  }

  if (!_.isNil(body.tourist_travel_types)) {
    travelType = body.tourist_travel_types.map((id) => ({ tourist_travel_type_id: id }));
  }
  if (!_.isNil(body.tourist_target_groups)) {
    travelGroup = body.tourist_target_groups.map((id) => ({ tourist_target_groups_id: id }));
  }

  if (!_.isNil(body.attraction_type)) {
    attractionType = body.attraction_type.map((id) => ({ community_tourist_attraction_type_id: id }));
  }

  if (!_.isNil(body.tourist_travel_countries)) {
    touristTravelCountries = body.tourist_travel_countries.map((id) => ({ countries_id: id }));
  }

  if (!_.isNil(body.tourist_travel_regions)) {
    touristTravelRegions = body.tourist_travel_regions.map((id) => ({ regions_id: id }));
  }

  return {
    organization: organization,
    status: isApproveRequest ? COMMUNITY_STATUS.PENDING : COMMUNITY_STATUS.DRAFT,
    approve_request_at: new Date().toISOString(),
    contacts: body.contact_points,
    title: body.title,
    description: body.description,
    highlight: body.highlight,
    tourism_activities: _.isNil(body.tourism_activities) ? [] : body.tourism_activities,
    tourism_products: _.isNil(body.tourism_products) ? [] : body.tourism_products,
    food_menus: _.isNil(body.food_menus) ? [] : body.food_menus,
    awards: awardIds,
    traveling_recommended_during: travelingRecommendedDuring,
    tourism_activities_prices: body.tourism_activities_prices,
    tourist_accomodate_min: body.tourist_accomodate_min,
    tourist_accomodate_max: body.tourist_accomodate_max,
    community_way_of_life: body.community_way_of_life,
    community_local_language: body.community_local_language,
    attraction_type: attractionType,
    tour_agent: body.tour_agents,
    featured_image: !_.isNil(body.featured_image) ? body.featured_image : undefined,
    galleries,
    presentation_video: body.presentation_video,
    presentation_facebook: body.presentation_facebook,
    presentation_instagram: body.presentation_instagram,
    presentation_tiktok: body.presentation_tiktok,
    presentations: !_.isNil(body.presentations) ? [{ directus_files_id: body.presentations }] : [],
    presentation_other: body.presentation_other,
    facilities: !_.isNil(body.facilities) ? body.facilities : [],
    tourist_travel_types: travelType,
    tourist_target_groups: travelGroup,
    tourist_travel_countries: touristTravelCountries,
    tourist_travel_regions: touristTravelRegions,
  };
}

async function createCommunity(body: CreateCommunityBody, isApproveRequest = false, profile?: Profile | null) {
  const buildBody = await buildCommunityBody(body, isApproveRequest);
  const res = await cmsApi.request(
    createItem("communities", buildBody, {
      fields: ["*"],
    })
  );

  // update commuinities
  if (!_.isNil(profile)) {
    // get exist organizations
    const existUser = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        readItem("users", profile.id, {
          fields: ["id", "organizaitons"],
        }),
        0
      )
    );

    const existOrganizationids: any[] = !_.isNil(existUser.organizaitons) ? existUser.organizaitons : [];

    const orgId = _.get(res, "organization", null);

    if (!_.isNil(orgId))
      existOrganizationids.push({
        users_id: profile.id,
        organizations_id: orgId,
      });

    await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        updateItem("users", profile.id, {
          organizaitons: existOrganizationids,
        }),
        0
      )
    );
  }

  return res;
}

async function updateCommunity(id: number, body: CreateCommunityBody, profile: Profile, isApproveRequest = false) {
  // get exist community
  const communities = await cmsApi.request<Community[]>(
    withRevalidate(
      //@ts-ignore
      readItems("communities", {
        fields: [
          "*",
          "organization.*",
          "tourism_activities.title",
          "tourism_products.title",
          "food_menus.title",
          "galleries.directus_files_id.*",
          "presentations.directus_files_id",
          "awards.awards_id.translations.*",
          "traveling_recommended_during.months_id",
          "attraction_type.*",
          "facilities.facility",
          "facilities.size",
          "facilities.quantity",
          "tourist_target_groups.*",
          "tourist_travel_types.*",
          "tourist_travel_countries.*",
          "tourist_travel_regions.*",
        ],
        filter: {
          id: {
            _eq: id,
          },
          user_created: {
            user_info: {
              id: profile.id,
            },
          },
        },
      }),
      0
    )
  );

  const community = _.get(communities, [0], null);

  if (!_.isNil(community) && !_.isNil(community.organization) && typeof community.organization === "object") {
    body.organization = community.organization.id;
  }

  const buildBody = await buildCommunityBody(body, isApproveRequest);

  // console.log("community", community);

  // const resCreateOrg = await cmsApi.request(
  //   updateItem("organizations", Number(community?.organization), {
  //     title: body.title,
  //     address_1: body.address_info.address,
  //     province: body.address_info.province_id,
  //     district: body.address_info.district_id,
  //     subdistrict: body.address_info.sub_district_id,
  //     postal_code: body.address_info.postal_code,
  //   })
  // );

  const res = await cmsApi.request(updateItem("communities", id, buildBody));

  return buildBody;
}

async function listCommunityByStatus(profile: Profile, status: string) {
  let filterStatus = {};
  if (status == COMMUNITY_STATUS.ALL) {
    filterStatus = {
      status: {
        _in: [COMMUNITY_STATUS.PUBLISHED, COMMUNITY_STATUS.PENDING, COMMUNITY_STATUS.REJECT, COMMUNITY_STATUS.DRAFT],
      },
    };
  } else {
    filterStatus = {
      status: {
        _eq: status,
      },
    };
  }

  const communities = await cmsApi.request<Community[]>(
    withRevalidate(
      //@ts-ignore
      readItems("communities", {
        fields: [
          "id",
          "title",
          "status",
          "approve_request_at",
          "reject_reason",
          "user_created",
          "date_created",
          "date_updated",
        ],
        filter: {
          // status: {
          //   _eq: status,
          // },
          ...filterStatus,
          user_created: {
            user_info: {
              id: profile.id,
            },
          },
        },
        limit: -1,
      }),
      0
    )
  );

  return communities;
}

async function fetchCommunityFormById(profile: Profile, id: number, languageCode = "th-TH") {
  const communities = await cmsApi.request<Community[]>(
    withRevalidate(
      //@ts-ignore
      readItems("communities", {
        fields: [
          "*",
          "organization.*",
          "tourism_activities.title",
          "tourism_products.title",
          "food_menus.title",
          "galleries.directus_files_id.*",
          "presentations.directus_files_id",
          "awards.awards_id.translations.*",
          "traveling_recommended_during.months_id",
          "attraction_type.*",
          "facilities.facility",
          "facilities.size",
          "facilities.quantity",
          "tourist_target_groups.*",
          "tourist_travel_types.*",
          "tourist_travel_countries.*",
          "tourist_travel_regions.*",
          "featured_image.*",
        ],
        filter: {
          id: {
            _eq: id,
          },
          user_created: {
            user_info: {
              id: profile.id,
            },
          },
        },
      }),
      0
    )
  );

  const community = _.get(communities, [0], null);
  const galleries: string[] = [];
  const galleryInfos: { id: number | null; url: string | null; type: string | null }[] = [];
  const videos: string[] = [];
  const videoInfos: { id: number | null; url: string | null; type: string | null }[] = [];
  const attractionType: number[] = [];
  const touristTargetGroups: number[] = [];
  const touristTravelTypes: number[] = [];
  const countryList: number[] = [];
  const regionList: number[] = [];

  if (_.isNil(community)) throw new Error("community-not-found");

  const organization: Organization | null = typeof community.organization == "object" ? community.organization : null;

  let feturedImage = null;
  if (!_.isNil(community.featured_image)) {
    feturedImage = {
      id: _.get(community, ["featured_image", "id"], null),
      url: _.get(community, ["featured_image", "filename_disk"], null),
      type: _.get(community, ["featured_image", "type"], null),
    };
  }
  if (!_.isNil(community.galleries)) {
    community.galleries.forEach((item) => {
      const directusFile = _.get(item, ["directus_files_id"], null);

      if (!_.isNil(directusFile)) {
        // is image
        if (directusFile.type.indexOf("image") > -1) {
          galleries.push(directusFile.id);
          galleryInfos.push({
            id: directusFile.id,
            url: directusFile.filename_disk,
            type: directusFile.type,
          });
        } else {
          videos.push(directusFile.id);
          videoInfos.push({
            id: directusFile.id,
            url: directusFile.filename_disk,
            type: directusFile.type,
          });
        }
      }
    });
  }

  if (!_.isNil(community.attraction_type)) {
    community.attraction_type.forEach((item) => {
      if (typeof item == "object") attractionType.push(Number(item.community_tourist_attraction_type_id));
    });
  }

  if (!_.isNil(community.tourist_target_groups)) {
    community.tourist_target_groups.forEach((item) => {
      if (typeof item == "object") touristTargetGroups.push(Number(item.tourist_target_groups_id));
    });
  }

  if (!_.isNil(community.tourist_travel_types)) {
    community.tourist_travel_types.forEach((item) => {
      if (typeof item == "object") touristTravelTypes.push(Number(item.tourist_travel_type_id));
    });
  }

  if (!_.isNil(community.tourist_travel_countries)) {
    community.tourist_travel_countries.forEach((item) => {
      if (typeof item == "object") countryList.push(Number(item.countries_id));
    });
  }

  if (!_.isNil(community.tourist_travel_regions)) {
    community.tourist_travel_regions.forEach((item) => {
      if (typeof item == "object") regionList.push(Number(item.regions_id));
    });
  }

  return {
    contact_points: community.contacts,
    title: community.title,
    description: community.description,
    address_info: !_.isNil(organization)
      ? {
          address: organization.address_1,
          province_id: organization.province,
          district_id: organization.district,
          sub_district_id: organization.subdistrict,
          postal_code: organization.postal_code,
        }
      : {
          address: null,
          province_id: null,
          district_id: null,
          sub_district_id: null,
          postal_code: null,
        },
    tourism_activities:
      !_.isNil(community.tourism_activities) && typeof community.tourism_activities == "object"
        ? community.tourism_activities.map((item) => ({
            title: typeof item == "object" ? item.title : null,
          }))
        : null,
    tourism_products:
      !_.isNil(community.tourism_products) && typeof community.tourism_products == "object"
        ? community.tourism_products.map((item) => ({
            title: typeof item == "object" ? item.title : null,
          }))
        : null,
    food_menus:
      !_.isNil(community.food_menus) && typeof community.food_menus == "object"
        ? community.food_menus.map((item) => ({
            title: typeof item == "object" ? item.title : null,
          }))
        : null,
    awards:
      !_.isNil(community.awards) && typeof community.awards == "object"
        ? community.awards.map((item) => {
            const translations = parseTranslation(_.get(item, ["awards_id", "translations"], []), languageCode);

            return {
              title: _.get(translations, [0, "title"], null),
            };
          })
        : null,
    traveling_recommended_during:
      !_.isNil(community.traveling_recommended_during) && typeof community.traveling_recommended_during == "object"
        ? community.traveling_recommended_during.map((item) => {
            return _.get(item, ["months_id"], null);
          })
        : null,
    tourism_activities_prices: community.tourism_activities_prices,
    tourist_accomodate_min: community.tourist_accomodate_min,
    tourist_accomodate_max: community.tourist_accomodate_max,
    community_way_of_life: community.community_way_of_life,
    highlight: community.highlight,
    community_local_language: community.community_local_language,
    tour_agents: community.tour_agent,
    featured_image: feturedImage,
    galleries,
    gallery_infos: galleryInfos,
    videos,
    video_infos: videoInfos,
    presentation_video: community.presentation_video,
    presentation_facebook: community.presentation_facebook,
    presentation_instagram: community.presentation_instagram,
    presentation_tiktok: community.presentation_tiktok,
    presentations: _.get(community, ["presentations", 0, "directus_files_id"]),
    presentation_other: community.presentation_other,
    attraction_type: attractionType,
    facilities: community.facilities,
    tourist_target_groups: touristTargetGroups,
    tourist_travel_types: touristTravelTypes,
    tourist_travel_countries: countryList,
    tourist_travel_regions: regionList,
  };
}

async function listCommunity() {
  const communities = await cmsApi.request<Community[]>(
    withRevalidate(
      //@ts-ignore
      readItems("communities", {
        fields: [
          "id",
          "title",
          "organization",
          "organization.*",
          "organization.province.*",
          "organization.district.*",
          "organization.subdistrict.*",
        ],
        filter: {
          status: {
            _eq: "published",
          },
        },
        limit: -1,
      }),
      0
    )
  );

  return _.isEmpty(communities)
    ? []
    : communities.map((community) => {
        return {
          id: community.id,
          title: community.title,
          province_id: _.get(community, ["organization", "province", "id"], null),
          province_title: _.get(community, ["organization", "province", "title"], null),
          district_id: _.get(community, ["organization", "district", "id"], null),
          district_title: _.get(community, ["organization", "district", "title"], null),
          subdistrict_id: _.get(community, ["organization", "subdistrict", "id"], null),
          subdistrict_title: _.get(community, ["organization", "subdistrict", "title"], null),
          postal_code: _.get(community, ["organization", "postal_code"], null),
          latitude: _.get(community, ["organization", "latitude"], null),
          longitude: _.get(community, ["organization", "longitude"], null),
          organizations: community.organization ?? null,
        };
      });
}

export { createCommunity, fetchCommunityFormById, listCommunity, listCommunityByStatus, updateCommunity };
