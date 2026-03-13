import { Image } from "@/models/photo-bank/photo-bank-albums";

export type PhotographerInfo = {
  id?: number | null;
  photographer_organization_title?: string | null;
  photographer_mobile?: string | null;
  photographer_lastname?: string | null;
  photographer_firstname?: string | null;
  date_updated?: string | null;
  date_created?: string;
  user_updated?: string | null;
  user_created?: string | null;
  consents?: number[];
  photographer_profile_image?: string | null;
  photographer_attachment?: string | null;
  status?: string;
  photographer_profile_image_info?: Image | null;
  photographer_attachment_info?: Image | null;
};
