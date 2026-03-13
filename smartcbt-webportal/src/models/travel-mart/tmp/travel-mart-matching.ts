export enum MatchingScheduleStatus {
  Draft = "draft",
  Published = "published",
}

export interface MatchingScheduleData {
  id: number;
  end_time: string;
  start_time: string;
  date: string;
  meeting_link: string;
  schedule_status?: string;
  status: string;
  organization_request?: OrganizationRequest;
  community?: Community;
}

export interface OrganizationRequest {
  id: string;
  dasta_business_type: any;
  business_type: any;
  district: any;
  subdistrict: any;
  province: any;
  organization_type: number;
  sort: any;
  abbreviation: string;
  title: string;
  status: string;
  tiktok_id: any;
  website: any;
  instagram_id: any;
  facebook_id: any;
  line_id: any;
  business_period_unit: any;
  business_period: any;
  registered_no: any;
  postal_code: any;
  address_2: any;
  address_1: any;
  date_created: string;
  date_updated: string;
  user_created: string;
  user_updated: string;
  communities: any[];
}

export interface Community {
  organization: string;
  id: number;
  sort: any;
  description: any;
  contacts: any;
  tour_agent: any;
  community_way_of_life: any;
  community_local_language: any;
  tourist_accomodate_max: number;
  tourism_activities_prices: any;
  tourist_accomodate_min: any;
  highlight: any;
  presentation_other: any;
  presentation_instagram: any;
  presentation_facebook: any;
  presentation_tiktok: any;
  title: string;
  presentation_video: any;
  status: string;
  date_updated: string;
  date_created: string;
  smartcbt_recommended: any;
  featured_image: string;
  user_updated: string;
  user_created: string;
  presentations: number[];
  awards: any[];
  tourism_products: string[];
  traveling_recommended_during: number[];
  attraction_type: number[];
  projects: any[];
  tourism_activities: string[];
  food_menus: string[];
  galleries: any[];
  facilities: any[];
}
