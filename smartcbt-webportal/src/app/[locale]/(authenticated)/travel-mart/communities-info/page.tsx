import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartContextProvider from "@/components/context-provider/TravelMartContextProvider";
import TravelMartCommunityRecommendHeaderList from "@/components/travel-mart/recommend/recommend/TravelMartCommunityRecommendList";
import {
  fetchAttractionType,
  fetchCommunityScheduleRequest,
  fetchProvinces,
  fetchRegions,
} from "@/utils/cms/cms-api-adapter";
import { getSession } from "@/utils/session";

export default async function CommunityListPage() {
  const session = await getSession();
  const profile = session?.user;
  const organization = profile?.organizations?.find((or) => or);
  const organizationId = organization?.id;

  const [provinces, attractionTypes, regions, requestNotifications] = await Promise.all([
    fetchProvinces(),
    fetchAttractionType(),
    fetchRegions(),
    fetchCommunityScheduleRequest(organizationId ?? 0),
  ]);

  return (
    <AppContextProvider provinces={provinces}>
      <TravelMartContextProvider attractionTypes={attractionTypes} regions={regions}>
        <TravelMartCommunityRecommendHeaderList
          organizationId={organizationId}
          requestNotifications={requestNotifications}
          isAppointmentRequestButtonHidden={true}
        />
      </TravelMartContextProvider>
    </AppContextProvider>
  );
}
