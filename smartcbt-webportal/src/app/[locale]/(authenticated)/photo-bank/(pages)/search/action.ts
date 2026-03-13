"use server";

import { fetchImages } from "@/utils/cms/cms-api-adapter";

export async function getPhotoBankBySearchAction(
  q: string | null | undefined,
  provinceId: number | null | undefined,
  communityId: number | null | undefined,
  categoryId: number | null | undefined
) {
  var body = {};
  if (q && q.length > 0) body = { ...body, keyword: q };
  if (provinceId) body = { ...body, provinceId: Number(provinceId) };
  if (communityId) body = { ...body, communityId: Number(communityId) };
  if (categoryId) body = { ...body, categoryId: Number(categoryId) };

  return await fetchImages(body);
}
