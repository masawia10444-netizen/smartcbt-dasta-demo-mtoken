import { CommunityDetail } from "@/components/travel-mart/community/detail/CommunityDetail";
import useCookies from "@/hooks/useCookies";
import { fetchCommunityProjectById, fetchCommunityRatingByCommunityId } from "@/utils/cms/adapters/website/travel-mart/communities";
import cmsApi from "@/utils/cms/cms-api";
import { fetchCommunityScheduleSlotsByCommunityId, getProfile } from "@/utils/cms/cms-api-adapter";
import { fetchCheckCommunity } from "./action";

export default async function CommunityDetailPage({ params }: { params: { id: number } }) {
  const { token, appCode } = useCookies();
  if (token != "") await cmsApi.setToken(token);
  const profile = await getProfile(token, appCode);

  console.time("fetchCommunityProjectById");
  const [community, communityScheduleSlotsByCommunityId, checkCommunity, communityRating] = await Promise.all([
    fetchCommunityProjectById(params.id),
    fetchCommunityScheduleSlotsByCommunityId(params.id ?? 0),
    fetchCheckCommunity(profile, params.id),
    fetchCommunityRatingByCommunityId(params.id),
  ]);
  console.timeEnd("fetchCommunityProjectById");
  
  return (
    <CommunityDetail
      community={community}
      checkCommunity={checkCommunity}
      communityScheduleSlotsByCommunityId={communityScheduleSlotsByCommunityId}
      isPreviewMode={false}
      isAppointmentRequestButtonHidden={false}
      rating={communityRating}
    />
  );
}
