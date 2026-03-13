import { fetchBusinessMatchingCount } from "@/utils/cms/cms-api-adapter";
import { Collection } from "@/utils/cms/cms-type";
import { ScheduleStatus } from "../../constants";

export type Organization = Collection["organizations"];
export type Community = Collection["communities"];
export type CommunityAttractionType = Collection["community_tourist_attraction_type"];
export type BusinessAppointmentSlot = Collection["business_appointment_slots"];
export type BusinessCommunitySchedule = Collection["business_community_schedules"];
export type BusinessCommunityCountList = Awaited<ReturnType<typeof fetchBusinessMatchingCount>>;
export type Schedule = {
  id: number;
  start_time: string;
  end_time: string;
  date: string;
  request_by?: string;
  organization_by_community?: number;
  community_id: number;
  community: string;
  organization_id: number;
  organization: string;
  meeting_link: string | null;
  status: ScheduleStatus;
  is_owner: boolean;
  has_change_slot: boolean;
  note: string | null;
  rating: number;
  province: string | null;
  slot: Collection["business_appointment_slots"];
};

export type FacilityOption = {
  id: number;
  title: string;
  group_title: string | null;
  quantity_flag: boolean;
  size_flag: boolean;
  unit_quantity_title: string | null;
  unit_size_title: string | null;
};

export type OrganizationRecommend = {
  id: number;
  status: string;
  title: string;
  province: string;
  attraction_types: AttractionTypeInfo[];
  score?: number;
};

export type AttractionTypeInfo = {
  community_tourist_attraction_type_id: number;
};

export type CommunityRecommend = {
  id?: number;
  status?: string;
  organization:
    | {
        title: string;
        province: string;
        attraction_types: AttractionTypeInfo[];
      }
    | {};
  projects: object; // FIXME: not use now,
  description?: string | null;
  score?: number;
  featured_image:
    | {
        src: string;
        title: string;
        alt: string;
      }
    | {};
  link:
    | {
        presentation_asset: string;
        video_url: string;
      }
    | {};
};
