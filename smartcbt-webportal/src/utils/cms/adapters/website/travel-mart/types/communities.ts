import {
  fetchAttractionType,
  fetchCommunities,
  fetchCommunityScheduleSlotsByCommunityId,
  fetchCommunityScheduleSlotsByOrganizationId,
} from "@/utils/cms/cms-api-adapter";
import { COMMUNITY_STATUS } from "../../constants";

export type CommunityAttractionTypeJSON = Pick<Awaited<ReturnType<typeof fetchAttractionType>>[number], "id" | "title">;
export type CommunityJSON = Pick<Awaited<ReturnType<typeof fetchCommunities>>[number], "id" | "title">;
export type CommunityScheduleSlotsByCommunityIdJSON = Awaited<
  ReturnType<typeof fetchCommunityScheduleSlotsByCommunityId>
>;
export type CommunityScheduleSlotsByOrganizationIdJSON = Awaited<
  ReturnType<typeof fetchCommunityScheduleSlotsByOrganizationId>
>;

export type CreateCommunityBody = {
  organization?: number;
  contact_points?: {
    firstname: string;
    lastname: string;
    mobile: string;
    email: string;
    line: string | null;
  }[];
  title: string;
  description?: string;
  address_info: {
    province_id: number;
    district_id: number;
    sub_district_id: number;
    postal_code: string;
    address?: string;
    latitude?: string;
    longitude?: string;
  };
  tourism_activities?:
    | null
    | {
        title: string;
      }[];
  tourism_products?:
    | null
    | {
        title: string;
      }[];
  food_menus?:
    | null
    | {
        title: string;
      }[];
  awards?:
    | null
    | {
        title: string;
      }[];
  traveling_recommended_during?: number[];
  tourism_activities_prices?: number;
  tourist_accomodate_min?: number | null;
  tourist_accomodate_max?: number | null;
  community_way_of_life?: string | null;
  highlight?: string | null;
  community_local_language?: string | null;
  featured_image?: string | null;
  tour_agents?: {
    firstname: string;
    lastname: string | null;
    mobile: string | null;
  }[];
  galleries?: string[];
  gallery_infos?:
    | {
        id: string | null;
        url: string | null;
        type: string | null;
      }[]
    | null;
  videos?: string[];
  video_infos?:
    | {
        id: string | null;
        url: string | null;
        type: string | null;
      }[]
    | null;
  presentation_video?: string | null;
  presentation_facebook?: string | null;
  presentation_instagram?: string | null;
  presentation_tiktok?: string | null;
  presentations?: string | null;
  presentation_other?: string | null;
  attraction_type?: number[] | null;
  facilities?:
    | {
        facility: number;
        quantity: number | null;
        size: number | null;
      }[]
    | null;
  tourist_target_groups?: number[];
  tourist_travel_types?: number[];
  tourist_travel_countries?: number[];
  tourist_travel_regions?: number[];
};

export type COMMUNITY_STATUS_KEY = keyof typeof COMMUNITY_STATUS;
export type COMMUNITY_STATUS_VALUE = (typeof COMMUNITY_STATUS)[COMMUNITY_STATUS_KEY];
