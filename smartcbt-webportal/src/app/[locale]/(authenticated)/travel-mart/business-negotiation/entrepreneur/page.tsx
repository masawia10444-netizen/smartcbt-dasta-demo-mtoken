import TravelMartEntrepreneurBusinessNegotiationList from "@/components/travel-mart/business-negotiation/entrepreneur/TravelMartEntrepreneurBusinessNegotiationList";
import useCookies from "@/hooks/useCookies";
import {
  Schedule,
  fetchBusinessMatchingCount,
  fetchCommunityScheduleAccepted,
  fetchCommunityScheduleHistory,
  fetchCommunityScheduleRequest,
  fetchCommunityScheduleWaitingAccept,
  getProfile,
} from "@/utils/cms/cms-api-adapter";

export default async function EntrepreneurBusinessNegotiationListPage() {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);

  const organization = profile?.organizations?.find((or) => or);
  const organizationId = organization?.id ?? 0;

  const [countList, requests, waitingAccept, accepted, histories] = await Promise.all([
    fetchBusinessMatchingCount(organizationId),
    fetchCommunityScheduleRequest(organizationId),
    fetchCommunityScheduleWaitingAccept(organizationId),
    fetchCommunityScheduleAccepted(organizationId),
    fetchCommunityScheduleHistory(organizationId),
  ]);

  return (
    <TravelMartEntrepreneurBusinessNegotiationList
      countList={countList}
      requests={requests}
      waitingAccept={waitingAccept}
      accepted={accepted}
      histories={histories as Schedule[]}
    />
  );
}
