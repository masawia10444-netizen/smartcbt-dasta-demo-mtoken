export enum PitchingScheduleStatus {
  Draft = "draft",
  Published = "published",
}

export interface MockPitchingTable {
  id: string;
  name: string;
  province: string;
  date: Date;
  link: string;
}

export interface Schedule {
  id: string;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string | null;
  user_updated: string | null;
  date_updated: string | null;
  pitching_group_id: string | null;
  start_at: string;
  end_at: string;
  meeting_link: string | null;
  user: {
    id: string;
    firstname: string | null;
    lastname: string | null;
    organizaitons: {
      organizations_id: {
        province: {
          title: string;
        };
      };
    }[];
  };
  title: string | null;
  note: string | null;
  ordering: number | null;
}

export interface Expertise {
  id: number;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string | null;
  user_updated: string | null;
  date_updated: string | null;
  title: string | null;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  job_title: string;
  profile: string;
  photo: {
    filename_disk: string;
    type: string;
  };
}

export interface PitchingGroup {
  id: string;
  status: string;
  sort: number | null;
  user_created: string | null;
  date_created: string | null;
  user_updated: string | null;
  date_updated: string | null;
  pitching_id: number | null;
  title: string;
  ordering: number;
  expertise: Expertise;
  schedules: Schedule[];
}

export interface PitchingData {
  id: number;
  status: string;
  sort: number | null;
  user_created: string;
  date_created: string;
  user_updated: string | null;
  date_updated: string | null;
  title: string;
  criteria: string;
  start_date: string;
  end_date: string;
  description: string | null;
  slug: string | null;
  groups: PitchingGroup[];
  featured_image: { filename_disk: string; type: string } | null;
}
