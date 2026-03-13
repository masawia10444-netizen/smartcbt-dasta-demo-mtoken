import TravelMartCommunityBusinessNegotiationList from "@/components/travel-mart/business-negotiation/community/TravelMartCommunityBusinessNegotiationList";
import { Schedule } from "@/utils/cms/adapters/website/travel-mart";
import {
  fetchBusinessMatchingCount,
  fetchCommunityScheduleAccepted,
  fetchCommunityScheduleHistory,
  fetchCommunityScheduleRequest,
  fetchCommunityScheduleWaitingAccept,
} from "@/utils/cms/cms-api-adapter";
import { getSession } from "@/utils/session";

export default async function CommunityIntroductionPage() {
  const session = await getSession();
  const profile = session?.user;
  const organizationId = profile?.organizations?.map((item) => item.id) ?? [];

  const [countList, requests, waitingAccept, accepted, histories] = await Promise.all([
    fetchBusinessMatchingCountResponses(organizationId),
    fetchCommunityScheduleRequestResponses(organizationId),
    fetchCommunityScheduleWaitingAcceptResponses(organizationId),
    fetchCommunityScheduleAcceptedResponses(organizationId),
    fetchCommunityScheduleHistoryResponses(organizationId),
  ]);
  async function fetchBusinessMatchingCountResponses(organizationIdPayload: number[]) {
    const response = await Promise.all(organizationIdPayload.map(async (id) => await fetchBusinessMatchingCount(id)));
    const result = response.reduce(
      (acc, obj) => {
        acc.history += obj.history;
        acc.open += obj.open;
        acc.request += obj.request;
        acc.waiting_accept += obj.waiting_accept;
        return acc;
      },
      { request: 0, waiting_accept: 0, open: 0, history: 0 }
    );
    return result;
  }

  async function fetchCommunityScheduleRequestResponses(organizationIdPayload: number[] | undefined) {
    const response = await Promise.all(
      organizationIdPayload?.map(async (id) => await fetchCommunityScheduleRequest(id)) ?? []
    );
    return response.flat() as Schedule[];
  }

  async function fetchCommunityScheduleWaitingAcceptResponses(organizationIdPayload: number[] | undefined) {
    const response = await Promise.all(
      organizationIdPayload?.map(async (id) => await fetchCommunityScheduleWaitingAccept(id)) ?? []
    );
    return response.flat() as Schedule[];
  }

  async function fetchCommunityScheduleAcceptedResponses(organizationIdPayload: number[] | undefined) {
    const response = await Promise.all(
      organizationIdPayload?.map(async (id) => await fetchCommunityScheduleAccepted(id)) ?? []
    );
    return response.flat() as Schedule[];
  }

  async function fetchCommunityScheduleHistoryResponses(organizationIdPayload: number[]) {
    const response = await Promise.all(
      organizationIdPayload?.map(async (id) => await fetchCommunityScheduleHistory(id)) ?? []
    );
    return response.flat() as unknown as Schedule[];
  }
  return (
    <div className="flex w-full flex-1 flex-col gap-4 px-2">
      <TravelMartCommunityBusinessNegotiationList
        countList={countList}
        requests={requests}
        waitingAccept={waitingAccept}
        accepted={accepted}
        histories={histories as Schedule[]}
      />
    </div>
  );
}
