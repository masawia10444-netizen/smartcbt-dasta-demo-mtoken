import ProjectMainDetailPage from "@/components/carbon/projects/manage/ProjectMainDetailPage";
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
import {
  getEmissionFactorProxy,
  listEmissionFactorProxy as getListEmissionFactorProxy,
} from "@/utils/cms/adapters/website/carbon/emission-factor-proxy";
import { getCarbonProgram } from "@/utils/cms/adapters/website/carbon/program";
import cmsApi from "@/utils/cms/cms-api";
import {
  fetchAllOrganizations,
  fetchProvinces,
  fetchRegionsWithProvince,
  listCbtProject as getListCBTProject,
} from "@/utils/cms/cms-api-adapter";

export default async function ProjectManage({ params }: { params: { id: number } }) {
  const { token, appCode } = useCookies();
  if (token != "") await cmsApi.setToken(token);
  const profile = await getProfile(token, appCode);

  const [listCBTProject, carbonUnitOption, scopeAssessments, carbonProgram, listEmissionFactorProxy, listCommunity] =
    await Promise.all([
      getListCBTProject(profile),
      getCarbonUnitOption(),
      getScopeAssessmentOption(),
      getCarbonProgram(params.id),
      getListEmissionFactorProxy(profile),
      fetchAllOrganizations(),
    ]);
  const [regionsWithProvince, provinces, districts, subdistricts, emissionFactorUnits] = await Promise.all([
    fetchRegionsWithProvince(),
    fetchProvinces(),
    fetchDistricts(),
    fetchSubDistricts(),
    emissionFactorUnit(),
  ]);

  const emissionFactorTypes: Record<string, any> = {};

  const emissionTypeIds = new Set();

  carbonProgram.round &&
    carbonProgram.round.map((round: any, index1: number) => {
      round.program_round_activity.map((programRoundActivity: any, index2: number) => {
        programRoundActivity.program_activity_detail.map(async (programActivityDetail: any, index3: number) => {
          const id = programActivityDetail.emission_factor_type;
          if (id != null) {
            emissionTypeIds.add(id);
            // emissionFactorTypes[id] = await getEmissionFactorProxy(id);
          }
        });
      });
    });

  const idsFromSet = Array.from(emissionTypeIds);

  for (let id of idsFromSet) {
    emissionFactorTypes[id as any] = await getEmissionFactorProxy(id as any);
  }

  return (
    <AppContextProvider provinces={provinces} districts={districts} subdistricts={subdistricts}>
      <CarbonContextProvider
        listEmissionFactorProxy={listEmissionFactorProxy}
        listCommunity={listCommunity}
        regionsWithProvince={regionsWithProvince}
        carbonUnitOption={carbonUnitOption}
        scopeAssessments={scopeAssessments}
        listCBTProject={listCBTProject}
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
          <ProjectMainDetailPage
            carbonProgram={carbonProgram}
            emissionFactorTypes={emissionFactorTypes}
            isViewOnly={false}
          />
        </div>
      </CarbonContextProvider>
    </AppContextProvider>
  );
}
