import CollapseSection from "@/components/CollapseSection";
import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { carbonSummary } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import CarbonFootprintSummary from "../summary/CarbonFootprintSummary";
import TravelPlanSummary from "../summary/TravelPlanSummary";
import TravelProgramSummary from "../summary/TravelProgramSummary";
import CarbonProjectRecapPictures from "./CarbonProjectRecapPictures";

const CarbonProjectRecapDetail = ({
  isHideTravelPlanSummary,
  dataOutSide,
}: {
  isHideTravelPlanSummary?: boolean;
  dataOutSide?: TravelProgramSchema | null;
}) => {
  const t = useTranslations("common");
  const { watch } = useFormContext<TravelProgramSchema>();
  const getCarbonSummary = dataOutSide ? dataOutSide : carbonSummary(watch());

  return (
    <div className="flex flex-col gap-4">
      <TravelProgramSummary data={dataOutSide ? carbonSummary(dataOutSide) : (getCarbonSummary as any)} />
      <CarbonFootprintSummary data={dataOutSide ? carbonSummary(dataOutSide) : (getCarbonSummary as any)} />
      {!isHideTravelPlanSummary && (
        <CollapseSection
          className="bg-smart-cbt-very-light-green px-2 text-smart-cbt-dark-green"
          title={`3. ${t("carbon.create.totalCarbonFootprint")}`}
          defaultOpen={true}
        >
          <TravelPlanSummary dataOutSide={dataOutSide} />
        </CollapseSection>
      )}
      <CollapseSection
        className="bg-smart-cbt-very-light-green px-2 text-smart-cbt-dark-green"
        title={`${isHideTravelPlanSummary ? "3" : "4"}. ${t("carbon.summary.photographicEvidence")}`}
        defaultOpen={true}
      >
        <CarbonProjectRecapPictures
          dataCarbonSummaryOutSide={dataOutSide ? carbonSummary(dataOutSide) : (getCarbonSummary as any)}
        />
      </CollapseSection>
    </div>
  );
};

export default CarbonProjectRecapDetail;
