import TravelPlanGraphSummaryContainer from "@/components/carbon/projects/create/summary/TravelPlanGraphSummaryContainer";
import TravelPlanPCRSummary from "@/components/carbon/projects/create/summary/TravelPlanPCRSummaty";
import { PCRTypes } from "@/models/emission-factor-proxy";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";

interface GraphDocumentProps {
  data: CarbonSummaryData;
}

const GraphDocument = (props: GraphDocumentProps) => {
  const { data } = props;
  const { graphData } = data;
  const t = useTranslations("common");
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-2xs font-medium text-smart-cbt-dark-green">{t("carbon.document.7.title")}</label>
      <div className="mt-6 flex flex-col items-center gap-5" id="chart-summary">
        <TravelPlanGraphSummaryContainer {...graphData} />
        <div className="grid flex-grow grid-cols-2 gap-5" id="chart-image">
          <TravelPlanPCRSummary
            type={PCRTypes.Transportation}
            grandTotal={graphData.transportations.grandTotal}
            proportion={graphData.transportations.proportion}
          />
          <TravelPlanPCRSummary
            type={PCRTypes.Food}
            grandTotal={graphData.foods.grandTotal}
            proportion={graphData.foods.proportion}
          />
          <TravelPlanPCRSummary
            type={PCRTypes.Accomodation}
            grandTotal={graphData.accomodations.grandTotal}
            proportion={graphData.accomodations.proportion}
          />
          <TravelPlanPCRSummary
            type={PCRTypes.Waste}
            grandTotal={graphData.wastes.grandTotal}
            proportion={graphData.wastes.proportion}
          />
        </div>
      </div>
      <div className="break-after-page" />
    </div>
  );
};

export default GraphDocument;
