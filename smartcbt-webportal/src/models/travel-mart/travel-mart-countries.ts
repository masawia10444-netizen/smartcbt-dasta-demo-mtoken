import { Collection } from "@/utils/cms/cms-type";

export enum CountryStatus {
  Published = "published",
  Draft = "draft",
}

export type District = Collection["district"];
export type Provinces = Collection["provinces"];
export type Subdistrict = Collection["subdistrict"];
