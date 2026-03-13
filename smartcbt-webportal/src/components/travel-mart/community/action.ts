"use server";
import useCookies from "@/hooks/useCookies";
import { CommunityForm } from "@/models/travel-mart/travel-mart-community";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { createCommunity, updateCommunity } from "@/utils/cms/adapters/website/travel-mart/communities/communities";

export async function createCommunityAction(communityForm: CommunityForm, isApproveRequest: boolean) {
  // Add the two lines of code below to prevent the forbidden case
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);
  try {
    return { response: await createCommunity(convertToCreateCommunityBody(communityForm), isApproveRequest, profile) };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

export async function updateCommunityAction(id: number, communityForm: CommunityForm, isApproveRequest: boolean) {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);
  try {
    return {
      response: await updateCommunity(id, convertToCreateCommunityBody(communityForm), profile, isApproveRequest),
    };
  } catch (error) {
    return { error: JSON.stringify(error) };
  }
}

function convertToCreateCommunityBody(communityForm: CommunityForm) {
  const {
    contact_points,
    title,
    description,
    address_info,
    tourism_activities,
    tourism_products,
    food_menus,
    awards,
    featured_image,
    traveling_recommended_during,
    tourism_activities_prices,
    tourist_accomodate_min,
    tourist_accomodate_max,
    community_way_of_life,
    highlight,
    community_local_language,
    tour_agents,
    gallery_infos,
    video_infos,
    presentation_video,
    presentation_facebook,
    presentation_instagram,
    presentation_tiktok,
    presentations,
    presentation_other,
    facilities,
    tourist_target_groups,
    attraction_type,
    tourist_travel_countries,
    tourist_travel_regions,
  } = communityForm;

  return {
    contact_points: contact_points
      ? contact_points.map((value) => ({
          firstname: value.firstname || "",
          lastname: value.lastname || "",
          mobile: value.mobile || "",
          email: value.email || "",
          line: value.line || "",
        }))
      : [],
    title: title || "",
    description: description || "",
    address_info: address_info
      ? {
          address: address_info.address || "",
          province_id: address_info.province_id || 0,
          district_id: address_info.district_id || 0,
          sub_district_id: address_info.sub_district_id || 0,
          postal_code: address_info.postal_code || "",
        }
      : {
          address: "",
          province_id: 0,
          district_id: 0,
          sub_district_id: 0,
          postal_code: "",
        },
    tourism_activities: tourism_activities
      ? tourism_activities.map((activity) => ({ title: activity.title || "" }))
      : [],
    tourism_products: tourism_products ? tourism_products.map((value) => ({ title: value.title || "" })) : [],
    food_menus: food_menus ? food_menus.map((value) => ({ title: value.title || "" })) : [],
    awards: awards ? awards.map((value) => ({ title: value.title || "" })) : [],
    traveling_recommended_during: traveling_recommended_during || [],
    tourism_activities_prices: tourism_activities_prices || 0,
    tourist_accomodate_min: tourist_accomodate_min || null,
    tourist_accomodate_max: tourist_accomodate_max || null,
    community_way_of_life: community_way_of_life || null,
    highlight: highlight || null,
    community_local_language: community_local_language || null,
    tour_agents: tour_agents
      ? tour_agents.map((value) => ({
          firstname: value.firstname || "",
          lastname: value.lastname || "",
          mobile: value.mobile || "",
        }))
      : [],
    featured_image: featured_image?.id,
    galleries: gallery_infos ? gallery_infos.map((value) => value.id ?? "") : [],
    videos: video_infos ? video_infos.map((value) => value.id ?? "") : [],
    presentation_video: presentation_video || null,
    presentation_facebook: presentation_facebook || null,
    presentation_instagram: presentation_instagram || null,
    presentation_tiktok: presentation_tiktok || null,
    presentations: presentations || null,
    presentation_other: presentation_other || null,
    facilities: facilities
      ? facilities.map((value) => ({
          facility: value.facility || 0,
          quantity: value.quantity,
          size: value.size,
        }))
      : [],
    tourist_target_groups: tourist_target_groups || [],
    attraction_type: attraction_type || [],
    tourist_travel_countries: tourist_travel_countries || [],
    tourist_travel_regions: tourist_travel_regions || [],
  };
}
