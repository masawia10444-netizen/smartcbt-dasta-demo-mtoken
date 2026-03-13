import ProjectOverviewList from "@/components/carbon/projects/overview/ProjectOverviewList";
import AppContextProvider from "@/components/context-provider/AppContextProvider";
import CarbonContextProvider from "@/components/context-provider/CarbonContextProvider";
import useCookies from "@/hooks/useCookies";
import { fetchAllOrganizations, fetchProvinces, listCbtProject as getListCBTProject, getProfile } from "@/utils/cms/cms-api-adapter";

export default async function ProjectOverView() {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);

  const [provinces, listCBTProject, listCommunity] = await Promise.all([
    fetchProvinces(),
    getListCBTProject(profile),
    fetchAllOrganizations(),
  ]);

  return (
    <AppContextProvider provinces={provinces}>
      <CarbonContextProvider listCBTProject={listCBTProject} listCommunity={listCommunity}>
        <ProjectOverviewList />
      </CarbonContextProvider>
    </AppContextProvider>
  );
}
