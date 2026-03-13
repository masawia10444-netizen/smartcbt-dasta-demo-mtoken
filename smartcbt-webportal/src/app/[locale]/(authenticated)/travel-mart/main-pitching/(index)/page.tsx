import TravelMartSell from "@/components/travel-mart/sell/TravelMartSell";
import useCookies from "@/hooks/useCookies";
import { fetchPitching, getProfile } from "@/utils/cms/cms-api-adapter";

export default async function TravelMartSellPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  const businessPitchingData = await fetchPitching();

  return <TravelMartSell businessPitching={businessPitchingData} />;
}
