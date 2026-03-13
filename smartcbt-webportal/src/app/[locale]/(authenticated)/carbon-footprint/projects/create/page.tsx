import { CreateProjectMainForm } from "@/components/carbon/projects/create/CreateProjectMainForm";
import AppContextProvider from "@/components/context-provider/AppContextProvider";
import CarbonContextProvider from "@/components/context-provider/CarbonContextProvider";
import Image from "@/components/image";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { fetchDistricts } from "@/utils/cms/adapters/master-data/geolocation/districts";
import { fetchSubDistricts } from "@/utils/cms/adapters/master-data/geolocation/subDistricts";
import {
  emissionFactorUnit,
  carbonUnitOption as getCarbonUnitOption,
  scopeAssessmentOption as getScopeAssessmentOption,
} from "@/utils/cms/adapters/website/carbon/carbon-option";
import { listEmissionFactorProxy as getListEmissionFactorProxy } from "@/utils/cms/adapters/website/carbon/emission-factor-proxy";
import {
  fetchAllOrganizations,
  fetchProvinces,
  fetchRegionsWithProvince,
  listCbtProject as getListCBTProject,
} from "@/utils/cms/cms-api-adapter";

export default async function ProjectCreate() {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);

  const [
    carbonProgram,
    scopeAssessments,
    listEmissionFactorProxy,
    carbonUnitOption,
    listCommunity,
    regionsWithProvince,
    emissionFactorUnits,
    provinces,
    districts,
    subdistricts,
  ] = await Promise.all([
    getListCBTProject(profile),
    getScopeAssessmentOption(),
    getListEmissionFactorProxy(profile),
    getCarbonUnitOption(),
    fetchAllOrganizations(),
    fetchRegionsWithProvince(),
    emissionFactorUnit(),
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
  ]);

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <CarbonContextProvider
        listEmissionFactorProxy={listEmissionFactorProxy}
        listCommunity={listCommunity}
        regionsWithProvince={regionsWithProvince}
        carbonUnitOption={carbonUnitOption}
        listCBTProject={carbonProgram}
        scopeAssessments={scopeAssessments}
        emissionFactorUnits={emissionFactorUnits}
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
          <div className="fixed inset-0 -z-[9] bg-gradient-to-t from-[#EEF6E7] to-white/0" />
          <CreateProjectMainForm carbonProgram={null} />
        </div>
      </CarbonContextProvider>
    </AppContextProvider>
  );
}
