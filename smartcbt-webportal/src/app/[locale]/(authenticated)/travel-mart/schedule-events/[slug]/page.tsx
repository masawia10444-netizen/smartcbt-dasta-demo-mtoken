import TravelMartScheduleEvent from "@/components/travel-mart/schedule-event/TravelMartScheduleEvent";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/manage-api";
import { getBusinessActivitiesDataBySlug } from "./actions";

export default async function TravelMartScheduleEvents({ params }: { params: { slug: string } }) {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  const data = await getBusinessActivitiesDataBySlug(params.slug);
  return <TravelMartScheduleEvent scheduleEvent={data} />;
}
