import TravelMartMatching from "@/components/travel-mart/tmp/matching/TravelMartMatching";
import { MatchingScheduleData } from "@/models/travel-mart/tmp/travel-mart-matching";
import { revalidatePath } from "next/cache";

async function getData(id: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_CMS_URL}/items/business_community_schedules_temp?fields=*.*.*&limit=-1`;
    const data = await fetch(url, { next: { revalidate: 3600 } });
    const json: { data: MatchingScheduleData[] } = await data.json();
    return json.data;
  } catch (error) {
    console.error(error);
    revalidatePath(`/travel-mart`);
  }
}

export default async function TravelMartMatchingPage({ params }: { params: { matchingId: string } }) {
  const allData = await getData(params.matchingId);
  return <TravelMartMatching id={params.matchingId} data={allData} />;

  // TODO: need to change wait fetcher
  // const id = Number(params.matchingId);
  // const allData = await getData(params.matchingId);
  // const data = allData?.find((d) => d.id == id);
  // return <TravelMartMatching id={id} data={data} />;
}
