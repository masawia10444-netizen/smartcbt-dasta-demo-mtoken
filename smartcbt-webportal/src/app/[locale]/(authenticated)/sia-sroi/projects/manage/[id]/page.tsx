import AppContextProvider from "@/components/context-provider/AppContextProvider";
import SiaSroiContextProvider from "@/components/context-provider/SiaSroiContextProvider";
import Image from "@/components/image";
import { CreateProjectMainForm } from "@/components/projects/create/CreateProjectMainForm";
import useCookies from "@/hooks/useCookies";
import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { getDataProject } from "@/utils/cms/adapters/website/sia/project";
import {
  fetchOrganizations,
  fetchProjectDetail,
  fetchProjectTypes,
} from "@/utils/cms/adapters/website/sia/project-strategies";
import {
  fetchProvinces,
  getDiscountRate,
  listCbtProject as getListCBTProject,
  listCommunity as getListCommunity,
  getProfile,
} from "@/utils/cms/cms-api-adapter";
import { fetchListProject } from "../../../action";

export default async function ProjectManage({ params }: { params: { id: string } }) {
  const { token, appCode } = useCookies();
  const profile = await getProfile(token, appCode);
  const siaRole = profile?.roles.find((value) => value.app_code == "SIA/SROI") ?? null;
  const isSiaAdminRole = siaRole?.role == "super_admin" || siaRole?.role == "manager";

  const [project, projects, step2, listCBTProject, listCommunity, projectTypes, organizations] = await Promise.all([
    getDataProject(Number(params.id)),
    fetchListProject().then((projects) => projects.filter((project) => project.status == PROJECT_STATUS.APPROVAL)),
    fetchProjectDetail(),
    getListCBTProject(profile),
    getListCommunity(),
    fetchProjectTypes(),
    fetchOrganizations(["organization_type", "-id"]),
  ]);

  const [provinces, districts, subdistricts, discountRates] = await Promise.all([
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
    getDiscountRate(),
  ]);

  if (!project) throw new Error("Failed to fetch project data.");
  if (!projects) throw new Error("Failed to fetch all projects data.");
  if (!step2) throw new Error("Failed to fetch step2 data.");

  // if (!isSiaAdminRole && project.status == PROJECT_STATUS.PENDING_FOR_APPROVAL)
  // throw new Error("Not allow to edit the project data.");
  // if (project.status == PROJECT_STATUS.PENDING_FOR_APPROVAL) throw new Error("Not allow to edit the project data.");

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <SiaSroiContextProvider
        discountRates={discountRates}
        listCBTProject={listCBTProject}
        listCommunity={listCommunity}
        projectTypes={projectTypes}
      >
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
          <CreateProjectMainForm
            project={project}
            projects={projects ?? []}
            step2={step2}
            organizations={organizations ?? []}
            isAdmin={isSiaAdminRole}
          />
        </div>
      </SiaSroiContextProvider>
    </AppContextProvider>
  );
}
