export enum BusinessContactStatus {
  Draft = "draft",
  Published = "published",
}

export interface BusinessContact {
  id: number;
  sort: number | null;
  department: string | null;
  phone: string | null;
  email: string | null;
  position: string | null;
  first_name: string | null;
  last_name: string | null;
  status: BusinessContactStatus | null;
  date_updated: Date | null;
  date_created: Date | null;
}
