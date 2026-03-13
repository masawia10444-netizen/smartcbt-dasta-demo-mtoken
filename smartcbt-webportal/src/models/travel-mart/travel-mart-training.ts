export enum TrainingStatus {
  open = "OPEN",
  close = "CLOSED",
}
export enum StatusOfTraining {
  Daft = "daft",
  Published = "published",
}

export type BusinessExpertiseTraining = {
  id: number;
  sort: number | null;
  profile: string | null;
  title: string | null;
  nick_name: string | null;
  organization: string | null;
  job_position: string | null;
  job_title: string | null;
  middle_name: string | null;
  last_name: string | null;
  first_name: string | null;
  status: StatusOfTraining;
  date_updated: string | null;
  date_created: string | null;
  photo: {
    filesize: string | null;
    duration: string | null;
    height: number | null;
    width: number | null;
    tags: string | null;
    location: string | null;
    description: string | null;
    type: string | null;
    filename_download: string | null;
    filename_disk: string | null;
  };
};

export type Lecturer = {
  id: number;
  business_expertises_id: BusinessExpertiseTraining;
  business_trainings_id: TrainingData;
};

export type TrainingData = {
  sort: number;
  detail: string | null;
  tags: string | null;
  type: string | null;
  training_status: TrainingStatus;
  video_type: string | null;
  preview_link: string | null;
  business_trainings_video: {
    type: string;
    title: string;
    filename_download: string;
    filename_disk: string;
    id: string;
  };
  slug: string;
  title: string | null;
  status: StatusOfTraining;
  end_at: string | null;
  start_at: string | null;
  date_updated: string | null;
  date_created: string | null;
  id: string;
  lecturers: Lecturer[];
};
