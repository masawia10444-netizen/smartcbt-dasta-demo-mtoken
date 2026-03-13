import AppContextProvider from "@/components/context-provider/AppContextProvider";
import SiaSroiContextProvider from "@/components/context-provider/SiaSroiContextProvider";
import Image from "@/components/image";
import { ViewProjectSummary } from "@/components/projects/view/ViewProjectSummary";
import useCookies from "@/hooks/useCookies";
import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import {
  fetchOrganizations,
  fetchProjectDetail,
  fetchProvinces,
  getDataProject,
  getDiscountRate,
  listCbtProject as getListCBTProject,
  getProfile,
} from "@/utils/cms/cms-api-adapter";
import { fetchListProject } from "../../../action";

export default async function ProjectOverviewDetail({ params }: { params: { id: string } }) {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);

  const [provinces, districts, subdistricts, discountRates] = await Promise.all([
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
    getDiscountRate(),
  ]);

  const [project, projects, step2, listCBTProject, organizations] = await Promise.all([
    getDataProject(Number(params.id)),
    fetchListProject().then((projects) => projects.filter((project) => project.status == PROJECT_STATUS.APPROVAL)),
    fetchProjectDetail(),
    getListCBTProject(profile),
    fetchOrganizations(),
  ]);

  if (!project) throw new Error("Failed to fetch project data.");
  if (!projects) throw new Error("Failed to fetch all projects data.");
  if (!step2) throw new Error("Failed to fetch step2 data.");

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <SiaSroiContextProvider discountRates={discountRates} listCBTProject={listCBTProject}>
        <div className="h-full ">
          <div className="fixed inset-0 -z-10">
            <Image
              src="/images/sia/create-project-bg.jpg"
              fill
              alt="Create project background"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="fixed inset-0 -z-[9] bg-gradient-to-t from-[#EEF6E7] to-white/0"></div>
          <ViewProjectSummary project={project} step2={step2} projects={projects} organizations={organizations ?? []} />
        </div>
      </SiaSroiContextProvider>
    </AppContextProvider>
  );
}
