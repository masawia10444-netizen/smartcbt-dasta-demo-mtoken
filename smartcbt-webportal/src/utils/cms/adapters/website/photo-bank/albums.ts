"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { Collection, components } from "@/utils/cms/cms-type";
import { deleteFile, deleteItem, readItem, readItems } from "@directus/sdk";
import jsonata from "jsonata";
import { flatten, get, isNil, omit, pick } from "lodash";
import { Profile } from "../../authen";
type CommunityAttractionType = Collection["community_tourist_attraction_type"];
type PhotoBankAlbumsFiles = Collection["photo_bank_albums_files"];
type PhotoBankAlbums = Collection["photo_bank_albums"];

export type PhotoBankCategoryJSONData = Pick<
  Awaited<ReturnType<typeof fetchPhotoCategory>>[number],
  "id" | "title" | "thumbnail"
>;

export type PhotoBankAlbumsFileJSONData = Pick<Awaited<ReturnType<typeof fetchImages>>[number], "id" | "url">;

export type PhotoBankAlbumsFileDetailJSONData = Pick<
  Awaited<ReturnType<typeof fetchImageById>>[number],
  | "id"
  | "album_id"
  | "album_name"
  | "image_id"
  | "title"
  | "url"
  | "type"
  | "community"
  | "organization"
  | "categories"
  | "tag_words"
  | "uploaded_on"
  | "created_by"
>;

async function fetchPhotoCategory() {
  // call fetch type
  const res: CommunityAttractionType[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("community_tourist_attraction_type", {
        fields: ["*", "thumbnail.*"],
        // sort: "sort, -score, -date_created",
        limit: "-1",
      }),
      0
    )
  );

  return transformCategory(res);
  // return await transformAttractionType(res);
}

async function transformCategory(communityAttractionType: CommunityAttractionType[]) {
  // console.log("transform", _communities);
  const expression = jsonata(`
    $.{
      'id': id,
      'title': titleshort,
      'thumbnail' : thumbnail ? {
        'id': thumbnail.id,
        'url': thumbnail.filename_disk,
        'type': thumbnail.type
      } : null
    }
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(communityAttractionType);
  // console.log(result);
  return result;
}

async function fetchImages(
  body: {
    keyword?: string;
    provinceId?: number;
    communityId?: number;
    categoryId?: number;
    albumId?: number;
    limit?: number;
    userId?: string;
    status?: string | null;
  } = { limit: -1, status: "published" }
) {
  let filter: {
    id?: Record<string, any>;
    community?: Record<string, any>;
    status?: Record<string, any>;
    categories?: Record<string, any>;
    _or?: Record<string, any>[];
  } | null = {};


  if (!isNil(body.status)) {
    filter = {
      status: {
        _eq: body.status,
      },
    };
  } else {
    filter = {
      status: {
        _neq: "archived",
      },
    };
  }

  if (!isNil(body.categoryId)) {
    filter = {
      categories: {
        community_tourist_attraction_type_id: {
          id: {
            _eq: body.categoryId,
          },
        },
      },
    };
  }

  let community: {
    organization?: Record<string, any>;
    id?: Record<string, any>;
  } | null = null;

  if (!isNil(body.provinceId)) {
    community = {
      organization: {
        province: {
          id: {
            _eq: body.provinceId,
          },
        },
      },
    };
  }

  if (!isNil(body.communityId)) {
    if (isNil(community)) {
      community = {
        id: {
          _eq: body.communityId,
        },
      };
    } else {
      community.id = {
        _eq: body.communityId,
      };
    }
  }

  if (!isNil(community)) {
    if (!isNil(filter)) {
      filter.community = community;
    } else {
      filter = {
        community,
      };
    }
  }

  if (!isNil(body.albumId)) {
    if (!isNil(filter)) {
      filter.id = {
        _eq: body.albumId,
      };
    } else {
      filter = {
        id: {
          _eq: body.albumId,
        },
      };
    }
  }

  if (!isNil(body.keyword)) {
    // keyword in province
    if (isNil(filter)) filter = {};

    filter._or = [
      { search_index: { _icontains: body.keyword } },
      {
        categories: {
          community_tourist_attraction_type_id: {
            title: {
              _icontains: body.keyword,
            },
          },
        },
      },
      {
        community: {
          title: {
            _icontains: body.keyword,
          },
        },
      },
      {
        community: {
          title: {
            _icontains: body.keyword,
          },
        },
      },
      {
        community: {
          organization: {
            province: {
              title: {
                _icontains: body.keyword,
              },
            },
          },
        },
      },
      {
        name: {
          _icontains: body.keyword,
        },
      },
    ];
  }

  const res: PhotoBankAlbumsFiles[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("photo_bank_albums", {
        fields: ["*", "images.id", "images.directus_files_id.*"],
        filter,
        sort: ["-date_created"],
        limit: body.limit ?? -1,
      }),
      0
    )
  );

  const images = res.map((item) => get(item, ["images"], null));

  return await transformImagesList(flatten(images));
}

async function transformImagesList(photoBankAlbumsFiles: PhotoBankAlbumsFiles[]) {
  const result = photoBankAlbumsFiles.map((item) => {
    return {
      id: item.id,
      file_id: item.directus_files_id ? get(item.directus_files_id, "id") : null,
      url: item.directus_files_id ? get(item.directus_files_id, "filename_disk") : null,
      type: item.directus_files_id ? get(item.directus_files_id, "type") : null,
      title: item.directus_files_id ? get(item.directus_files_id, "title") : null,
    };
  });
  return result as any[];
}

async function fetchImageById(id: number) {
  const res: PhotoBankAlbumsFiles = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("photo_bank_albums_files", id, {
        fields: [
          "*",
          "directus_files_id.*",
          "photo_bank_albums_id.tag_words",
          "photo_bank_albums_id.*",
          "photo_bank_albums_id.community.title",
          "photo_bank_albums_id.categories.community_tourist_attraction_type_id.*",
        ],
      }),
      0
    )
  );

  return transformImageDetial(res);
}

async function fetchAlbums(profile: Profile) {
  const res: PhotoBankAlbums[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("photo_bank_albums", {
        fields: ["id", "name", "cover.*", "images"],
        filter: {
          user_created: {
            _eq: profile.user_id.id,
          },
        },
        sort: ["-date_created"],
        limit: -1,
      }),
      0
    )
  );

  return transformAlbum(res);
}

async function fethcAlbumById(profile: Profile, albumId: number) {
  const res: PhotoBankAlbums[] = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItems("photo_bank_albums", {
        fields: ["*", "categories.*", "images.id", "images.directus_files_id.*", "region.*"],
        filter: {
          user_created: {
            _eq: profile.user_id.id,
          },
          id: {
            _eq: albumId,
          },
        },
        sort: ["-date_created"],
        limit: -1,
        deep: {
          images: {
            _limit: -1,
          },
        },
      }),
      0
    )
  );

  const albumInfo = get(res, [0], null) as Collection[];
  const images = get(res, [0, "images"], []) as components["schemas"]["ItemsPhotoBankAlbumsFiles"][];
  const categories = get(
    res,
    [0, "categories"],
    []
  ) as components["schemas"]["ItemsPhotoBankAlbumsCommunityTouristAttractionType"][];

  const transformImages = await transformImageList(images);
  return {
    ...omit(albumInfo, ["images", "user_updated", "user_created"]),
    images: transformImages,
    region: pick(get(albumInfo, ["region"], {}), ["id", "title"]),
    categories: categories.map((category) => category.community_tourist_attraction_type_id),
  };
}

async function transformImageList(PhotoBankAlbumsFiles: PhotoBankAlbumsFiles[]) {
  // console.log("transform", _communities);
  const expression = jsonata(`
    $count($) = 1 ? $.[{
      'id': id,
      'file_id': directus_files_id.id,
      'url': directus_files_id.filename_disk,
      'type': directus_files_id.type,
      'title': directus_files_id.title
    }] : $count($) > 1 ? $.{
      'id': id,
      'file_id': directus_files_id.id,
      'url': directus_files_id.filename_disk,
      'type': directus_files_id.type,
      'title': directus_files_id.title
    } : []
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(PhotoBankAlbumsFiles);
  // console.log(result);
  return result;
}

async function transformAlbum(PhotoBankAlbumsFiles: PhotoBankAlbums[]) {
  // console.log("transform", _communities);
  const expression = jsonata(`
    $count($) = 1 ? $.[{
      'id': id,
      'name': name,
      'cover': cover ? {
        'url': cover.filename_disk,
        'type': cover.type,
        'title': cover.title
      } : null,
      'image_count': $count(images)
    }] : $count($) > 1 ? $.{
      'id': id,
      'name': name,
      'cover': cover ? {
        'url': cover.filename_disk,
        'type': cover.type,
        'title': cover.title
      } : null,
      'image_count': $count(images)
    } : []
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(PhotoBankAlbumsFiles);
  // console.log(result);
  return result;
}

async function transformImageDetial(PhotoBankAlbumsFiles: PhotoBankAlbumsFiles) {
  // console.log("transform", _communities);
  const expression = jsonata(`
    {
      'id': id,
      'album_id': photo_bank_albums_id.id,
      'album_name': photo_bank_albums_id.name,
      'image_id': directus_files_id.image_id,
      'title': directus_files_id.title,
      'url': directus_files_id.filename_disk & "?key=watermark",
      'type': directus_files_id.type,
      'community': photo_bank_albums_id.community.title,
      'organization': photo_bank_albums_id.organization ? photo_bank_albums_id.organization : null,
      'categories': photo_bank_albums_id.categories and $count(photo_bank_albums_id.categories) > 0 ? $join(photo_bank_albums_id.categories.community_tourist_attraction_type_id.titleshort, ',') : null,
      'tag_words': photo_bank_albums_id.tag_words and $count(photo_bank_albums_id.tag_words) > 0 ? photo_bank_albums_id.tag_words : null,
      'uploaded_on': directus_files_id.uploaded_on,
      'created_by': photo_bank_albums_id.created_by
    }
  `);

  // const result = await expression.evaluate(_communities);
  const result = await expression.evaluate(PhotoBankAlbumsFiles);
  // console.log(result);
  return result;
}

async function deleteFileById(fileId: string) {
  try {
    await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        deleteFile(fileId),
        0
      )
    );

    return true;
  } catch (e) {
    throw Error("ไม่สามารถลบรูปได้");
  }
}

async function deleteAlbumById(albumId: string) {
  try {
    await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        deleteItem("photo_bank_albums", albumId),
        0
      )
    );

    return true;
  } catch (e) {
    throw Error("ไม่สามารถลบอัลบั้มได้");
  }
}

export {
  deleteAlbumById,
  deleteFileById,
  fetchAlbums,
  fetchImageById,
  fetchImages,
  fetchPhotoCategory,
  fethcAlbumById,
};
