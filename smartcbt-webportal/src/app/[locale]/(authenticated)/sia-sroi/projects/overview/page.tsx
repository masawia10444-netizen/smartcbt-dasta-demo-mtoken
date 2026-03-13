import AppContextProvider from "@/components/context-provider/AppContextProvider";
import SiaSroiContextProvider from "@/components/context-provider/SiaSroiContextProvider";
import SiaSroiOverview from "@/components/sia-sroi/SiaSroiOverview";
import { fetchCommunities, fetchDastaWorkingArea, fetchProvinces } from "@/utils/cms/cms-api-adapter";

export default async function ProjectOverView() {
  const [provinces, communities, dastaWorkingArea] = await Promise.all([
    fetchProvinces(),
    fetchCommunities(),
    fetchDastaWorkingArea(),
  ]);

  return (
    <AppContextProvider communities={communities} provinces={provinces}>
      <SiaSroiContextProvider dastaWorkingArea={dastaWorkingArea}>
        <div className="flex w-full flex-1 flex-col gap-5 px-2">
          <SiaSroiOverview />
        </div>
      </SiaSroiContextProvider>
    </AppContextProvider>
  );
}
