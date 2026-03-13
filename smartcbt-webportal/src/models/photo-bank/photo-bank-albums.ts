export interface Image {
  id?: number | null;
  title?: string | null;
  url?: string | null;
  type?: string | null;
}

export interface Album {
  id?: number | null;
  name?: string | null;
  cover?: Image | null;
  image_count?: number | null;
}

export interface AlbumDetail {
  id?: number | null;
  community?: number | null;
  description?: string | null;
  tag_words?: string[] | null;
  region?: { id: string; title: string };
  organization?: string | null;
  created_by?: string | null;
  name?: string | null;
  status?: string | null;
  date_updated?: string | null;
  date_created?: string | null;
  cover?: string | null;
  categories?: number[] | null;
  images?: Image[] | null;
  sequence?: boolean | null;
}

export enum MockPhotoBankAlbumStatus {
  InProgress,
  Approved,
}

export interface MockPhotoBankAlbum {
  id: number;
  name: string;
  photos: any[];
  description: string;
  categoriesId: number[];
  communityId: number;
  organization: string;
  tags: string[];
  status: MockPhotoBankAlbumStatus;
}

export const mockPhotoBankAlbums: MockPhotoBankAlbum[] = [
  {
    id: 1,
    name: "สำรวจพื้นที่ชุมชม (รอการตรวจสอบ)",
    photos: [],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat iaculis libero",
    categoriesId: [1, 2, 3],
    communityId: 14,
    organization: "SSA",
    tags: ["แท็ก1", "แท็ก2"],
    status: MockPhotoBankAlbumStatus.InProgress,
  },
  {
    id: 2,
    name: "สำรวจพื้นที่ชุมชม",
    photos: [],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer volutpat iaculis libero",
    categoriesId: [1, 2, 3],
    communityId: 14,
    organization: "SSA",
    tags: ["แท็ก1", "แท็ก2"],
    status: MockPhotoBankAlbumStatus.Approved,
  },
];
