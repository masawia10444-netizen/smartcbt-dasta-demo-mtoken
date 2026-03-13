import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartContextProvider from "@/components/context-provider/TravelMartContextProvider";
import TravelMartEntrepreneurRecommendList from "@/components/travel-mart/recommend/entrepreneur/TravelMartEntrepreneurRecommendList";
import {
  fetchAttractionType,
  fetchCommunityAttractionType,
  fetchCommunityScheduleRequest,
  fetchProvinces,
  fetchRegions,
} from "@/utils/cms/cms-api-adapter";
import { getSession } from "@/utils/session";

export default async function TravelMartEntrepreneurRecommendListPage() {
  const session = await getSession();
  const profile = session?.user;
  const organization = profile?.organizations?.find((or) => or);
  const community = profile?.communities?.find((or) => or);
  const organizationId = organization?.id;
  const communityId = community?.id;


  const [provinces, requestNotifications, attractionTypes, regions, communityAttractionTypes] = await Promise.all([
    fetchProvinces(),
    fetchCommunityScheduleRequest(organizationId ?? 0),
    fetchAttractionType(),
    fetchRegions(),
    fetchCommunityAttractionType(communityId ?? 0),
  ]);

  return (
    <AppContextProvider provinces={provinces}>
      <TravelMartContextProvider attractionTypes={attractionTypes} regions={regions}>
        <TravelMartEntrepreneurRecommendList
          organizationId={organizationId}
          requestNotifications={requestNotifications}
          communityAttractionTypes={communityAttractionTypes}
        />
      </TravelMartContextProvider>
    </AppContextProvider>
  );
}
