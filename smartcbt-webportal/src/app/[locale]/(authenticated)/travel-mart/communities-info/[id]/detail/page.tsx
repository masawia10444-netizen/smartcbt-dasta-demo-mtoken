import { CommunityDetail } from "@/components/travel-mart/community/detail/CommunityDetail";
import useCookies from "@/hooks/useCookies";
import { fetchCommunityProjectById } from "@/utils/cms/adapters/website/travel-mart/communities";
import cmsApi from "@/utils/cms/cms-api";
import { fetchCommunityRatingByCommunityId, fetchCommunityScheduleSlotsByCommunityId, getProfile } from "@/utils/cms/cms-api-adapter";
import { fetchCheckCommunity } from "./action";

export default async function CommunityDetailPage({ params }: { params: { id: number } }) {
  const { token, appCode } = useCookies();
  if (token != "") await cmsApi.setToken(token);
  const profile = await getProfile(token, appCode);

  const [community, communityScheduleSlotsByCommunityId, checkCommunity, communityRating] = await Promise.all([
    fetchCommunityProjectById(params.id),
    fetchCommunityScheduleSlotsByCommunityId(params.id ?? 0),
    fetchCheckCommunity(profile, params.id),
    fetchCommunityRatingByCommunityId(params.id),
  ]);

  return (
    <CommunityDetail
      community={community}
      checkCommunity={checkCommunity}
      communityScheduleSlotsByCommunityId={communityScheduleSlotsByCommunityId}
      isPreviewMode={false}
      isAppointmentRequestButtonHidden={true}
      rating={communityRating}
    />
  );
}
