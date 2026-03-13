import { CommunityDetail } from "@/components/travel-mart/community/detail/CommunityDetail";
import useCookies from "@/hooks/useCookies";
import cmsApi from "@/utils/cms/cms-api";
import { fetchCommunityProjectById, fetchCommunityRatingByCommunityId, fetchCommunityScheduleSlotsByCommunityId } from "@/utils/cms/cms-api-adapter";

export default async function CommunityInfoFormPage({ params }: { params: { id: number } }) {
  const { token } = useCookies();
  if (token != "") await cmsApi.setToken(token);

  const [community, communityScheduleSlotsByCommunityId, communityRating] = await Promise.all([
    fetchCommunityProjectById(params.id),
    fetchCommunityScheduleSlotsByCommunityId(params.id ?? 0),
    fetchCommunityRatingByCommunityId(params.id),
  ]);

  return (
    <CommunityDetail
      community={community}
      communityScheduleSlotsByCommunityId={communityScheduleSlotsByCommunityId}
      isPreviewMode={false}
      isAppointmentRequestButtonHidden={false}
      rating={communityRating}
    />
  );
}
