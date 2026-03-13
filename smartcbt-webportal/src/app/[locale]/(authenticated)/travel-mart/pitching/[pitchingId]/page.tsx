import TravelMartPitching from "@/components/travel-mart/sell/TravelMartPitching";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/manage-api";
import { getDataPitching } from "./actions";

export default async function TravelMartPitchingPage({ params }: { params: { pitchingId: string } }) {
  const id = Number(params.pitchingId);
  const { token, appCode } = useCookies();
  await getProfile(token, appCode);

  const allData = await getDataPitching();
  const data = allData?.find((d) => d.id == id);

  return <TravelMartPitching id={id} data={data} />;
}
