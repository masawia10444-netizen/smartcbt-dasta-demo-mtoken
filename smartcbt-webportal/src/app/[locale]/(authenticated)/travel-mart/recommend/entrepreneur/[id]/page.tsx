import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartProfileEntrepreneur from "@/components/travel-mart/profile/TravelMartProfileEntrepreneur";
import useCookies from "@/hooks/useCookies";
import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import cmsApi from "@/utils/cms/cms-api";
import {
  fetchCommunityScheduleSlotsByOrganizationId,
  fetchOrganizationById,
  fetchOrganizationRatingByOrganizationId,
  fetchProvinces,
  getProfile,
} from "@/utils/cms/cms-api-adapter";
import { fetchCheckOrganization } from "./action";

export default async function EntrepreneurDetailPage({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { community: string };
}) {
  console.log("hellooo");
  const { token, appCode } = useCookies();
  if (token != "") await cmsApi.setToken(token);
  const profile = await getProfile(token, appCode);

  const [organization, communityScheduleSlotsByOrganizationId, checkOrganization, ratingOrganization] =
    await Promise.all([
      fetchOrganizationById(params.id),
      fetchCommunityScheduleSlotsByOrganizationId(params.id ?? 0),
      fetchCheckOrganization(profile, params.id, searchParams.community),
      fetchOrganizationRatingByOrganizationId(params.id),
    ]);

  const [provinces, districts, subdistricts] = await Promise.all([
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
  ]);

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <TravelMartProfileEntrepreneur
        organization={organization}
        checkOrganization={checkOrganization}
        communityScheduleSlotsByOrganizationId={communityScheduleSlotsByOrganizationId}
        rating={ratingOrganization}
      />
    </AppContextProvider>
  );
}
