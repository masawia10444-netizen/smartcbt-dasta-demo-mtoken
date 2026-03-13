import TravelMartTraining from "@/components/travel-mart/training/TravelMartTraining";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/cms-api-adapter";
import { getTrainingData } from "./actions";

export default async function TravelMartTrainingPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  const data = await getTrainingData();

  return <TravelMartTraining trainingData={data} />;
}
