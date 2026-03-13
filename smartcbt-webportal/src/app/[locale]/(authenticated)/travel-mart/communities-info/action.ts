import { fetchCommunityProjects } from "@/utils/cms/adapters/website/travel-mart/communities";

export async function getCommunitiesByQuery(
  projectTitle?: string | null,
  provinceId?: number | null,
  attractionType?: string | null,
  regionId?: number | null
) {
  const filter = {
    projectTitle: projectTitle ?? null,
    provinceId: provinceId ?? null,
    attractionType: attractionType ?? null,
    regionId: regionId ?? null,
  };
  const response = await fetchCommunityProjects({ filter });
  if (Array.isArray(response)) {
    return response?.sort((a, b) => (a.score ?? 0) - (b.score ?? 0)) ?? [];
  }
  return response ?? [];
}
