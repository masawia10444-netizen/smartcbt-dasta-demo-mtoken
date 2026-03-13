export type PhotoGrapherOnBoardingBody = {
  photographer_firstname: string;
  photographer_lastname: string;
  photographer_mobile: string;
  photographer_organization_title: string;
  photographer_attachment: string | null;
  photographer_profile_image: string | null;
  consents: number[];
};

export type CreateAlbumBody = {
  name: string;
  community: number;
  organization: string;
  categories: number[];
  tag_words: string[];
  images: string[] | null;
  description?: string | null;
};
