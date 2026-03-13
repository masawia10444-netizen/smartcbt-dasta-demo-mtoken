import CommunityList from "@/components/travel-mart/community/CommunityList";
import { COMMUNITY_STATUS } from "@/utils/cms/adapters/website/constants";
import { listCommunityByStatus } from "@/utils/cms/adapters/website/travel-mart/communities/communities";
import { getSession } from "@/utils/session";

export default async function CommunityInfoPage() {
  const session = await getSession();
  const profile = session?.user;
  if (!profile) return;

  const [draftCommunities, pendingCommunities, publishedCommunities, rejectCommunities] = await Promise.all([
    listCommunityByStatus(profile!, COMMUNITY_STATUS.DRAFT),
    listCommunityByStatus(profile!, COMMUNITY_STATUS.PENDING),
    listCommunityByStatus(profile!, COMMUNITY_STATUS.PUBLISHED),
    listCommunityByStatus(profile!, COMMUNITY_STATUS.REJECT),
  ]);

  return (
    <CommunityList
      draftCommunities={draftCommunities}
      pendingCommunities={pendingCommunities}
      publishedCommunities={publishedCommunities}
      rejectCommunities={rejectCommunities}
    />
  );
}
