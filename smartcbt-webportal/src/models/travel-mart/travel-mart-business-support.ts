import { Collection } from "@/utils/cms/cms-type";

export enum StatusOfBusinessSupport {
  Daft = "daft",
  Archived = "archived",
}

export type BusinessSupport = Collection["business_supports"];
