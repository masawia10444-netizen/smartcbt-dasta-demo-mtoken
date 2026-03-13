import ProjectMainDetailPage from "@/components/carbon/projects/manage/ProjectMainDetailPage";
import CarbonContextProvider from "@/components/context-provider/CarbonContextProvider";
import Image from "@/components/image";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import {
  emissionFactorUnit,
  carbonUnitOption as getCarbonUnitOption,
} from "@/utils/cms/adapters/website/carbon/carbon-option";
import {
  getEmissionFactorProxy,
  listEmissionFactorProxy as getListEmissionFactorProxy,
} from "@/utils/cms/adapters/website/carbon/emission-factor-proxy";
import { getCarbonProgram } from "@/utils/cms/adapters/website/carbon/program";
import cmsApi from "@/utils/cms/cms-api";

export default async function ProjectManage({ params }: { params: { id: number } }) {
  const { token, appCode } = useCookies();
  if (token != "") await cmsApi.setToken(token);
  const profile = await getProfile(token, appCode);

  const [carbonUnitOption, carbonProgram, listEmissionFactorProxy, emissionFactorUnits] = await Promise.all([
    getCarbonUnitOption(),
    getCarbonProgram(params.id),
    getListEmissionFactorProxy(profile),
    emissionFactorUnit(),
  ]);

  const emissionFactorTypes: Record<string, any> = {};

  carbonProgram.round &&
    carbonProgram.round.map((round: any, index1: number) => {
      round.program_round_activity.map((programRoundActivity: any, index2: number) => {
        programRoundActivity.program_activity_detail.map(async (programActivityDetail: any, index3: number) => {
          const id = programActivityDetail.emission_factor_type;
          if (id != null) emissionFactorTypes[id] = await getEmissionFactorProxy(id);
        });
      });
    });

  return (
    <CarbonContextProvider
      emissionFactorUnits={emissionFactorUnits}
      listEmissionFactorProxy={listEmissionFactorProxy}
      carbonUnitOption={carbonUnitOption}
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
          isViewOnly={true}
        />
      </div>
    </CarbonContextProvider>
  );
}
