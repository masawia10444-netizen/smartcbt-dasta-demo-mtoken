import { Collection } from "@/utils/cms/cms-type";

export enum StatusOfScheduleEvent {
  Daft = "daft",
  Published = "published",
}

export enum ScheduleStatus {
  InProgress = "IN-PROGRESS",
  Closed = "CLOSED",
}

export type BusinessActivities = Collection["business_activities"];
export type ScheduleEvent = Collection["business_activity_schedules"];
