import AppContextProvider from "@/components/context-provider/AppContextProvider";
import SiaSroiContextProvider from "@/components/context-provider/SiaSroiContextProvider";
import Image from "@/components/image";
import { CreateProjectMainForm } from "@/components/projects/create/CreateProjectMainForm";
import useCookies from "@/hooks/useCookies";
import { FinancialProxyStatus } from "@/models/financial-proxy";
import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import {
  fetchOrganizations,
  fetchProjectDetail,
  fetchProjectTypes,
  fetchProvinces,
  getDiscountRate,
  listCbtProject as getListCBTProject,
  listCommunity as getListCommunity,
  getListManageFinancialProxy,
  getProfile,
} from "@/utils/cms/cms-api-adapter";
import { fetchListProject } from "../../action";

export default async function ProjectCreate() {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);
  const siaRole = profile?.roles.find((value) => value.app_code == "SIA/SROI") ?? null;
  const isSiaAdminRole = siaRole?.role == "super_admin" || siaRole?.role == "manager";

  const [
    projects,
    step2,
    publishedProxies,
    provinces,
    districts,
    subdistricts,
    discountRates,
    listCBTProject,
    listCommunity,
    projectTypes,
    organizations,
  ] = await Promise.all([
    fetchListProject().then((projects) => projects.filter((project) => project.status == PROJECT_STATUS.APPROVAL)),
    fetchProjectDetail(),
    getListManageFinancialProxy(profile).then((proxies) =>
      proxies.filter((proxy) => proxy.status === FinancialProxyStatus.Publish)
    ),
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
    getDiscountRate(),
    getListCBTProject(profile),
    getListCommunity(),
    fetchProjectTypes(),
    fetchOrganizations(["organization_type", "-id"]),
  ]);

  if (!step2) throw new Error("Failed to fetch step2 data.");

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <SiaSroiContextProvider
        discountRates={discountRates}
        listCBTProject={listCBTProject}
        listCommunity={listCommunity}
        projectTypes={projectTypes}
      >
        <div className="h-full ">
          <div className="fixed inset-0 -z-10 ">
            <Image
              src="/images/sia/create-project-bg.jpg"
              fill
              alt="Create project background"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="fixed inset-0 -z-[9] bg-white md:bg-white/0 md:bg-gradient-to-t md:from-[#EEF6E7] md:to-white/0 " />
          <CreateProjectMainForm
            project={null}
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
