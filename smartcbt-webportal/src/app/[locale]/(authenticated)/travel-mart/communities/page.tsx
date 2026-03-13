import AppContextProvider from "@/components/context-provider/AppContextProvider";
import TravelMartContextProvider from "@/components/context-provider/TravelMartContextProvider";
import TravelMartCommunityRecommendHeaderList from "@/components/travel-mart/recommend/recommend/TravelMartCommunityRecommendList";
import {
  fetchAttractionType,
  fetchCommunityScheduleRequest,
  fetchOrganizationAttractionType,
  fetchProvinces,
  fetchRegions,
} from "@/utils/cms/cms-api-adapter";
import { getSession } from "@/utils/session";

export default async function CommunityListPage() {
  const session = await getSession();
  const profile = session?.user;
  const organization = profile?.organizations?.find((or) => or);
  const organizationId = organization?.id;

  const [requestNotifications, provinces, attractionTypes, regions, organizationAttractionTypes] = await Promise.all([
    fetchCommunityScheduleRequest(organizationId),
    fetchProvinces(),
    fetchAttractionType(),
    fetchRegions(),
    fetchOrganizationAttractionType(organizationId),
  ]);

  return (
    <AppContextProvider provinces={provinces}>
      <TravelMartContextProvider attractionTypes={attractionTypes} regions={regions}>
        <TravelMartCommunityRecommendHeaderList
          organizationId={organizationId}
          requestNotifications={requestNotifications}
          isAppointmentRequestButtonHidden={false}
          organizationAttractionTypes={organizationAttractionTypes}
        />
      </TravelMartContextProvider>
    </AppContextProvider>
  );
}
