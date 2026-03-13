import { FootprintCalculationResultWithKeys } from "@/utils/carbon-project-form-helper";
import { ShadowPlugin } from "@/utils/graph-helper";
import { ArcElement, Chart as ChartJS, RadialLinearScale, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTranslations } from "next-intl";
import TravelPlanGraphSummary from "./TravelPlanGraphSummary";
ChartJS.register(RadialLinearScale, ArcElement, Title, ChartDataLabels, ShadowPlugin);

const TravelPlanGraphSummaryContainer = (props: FootprintCalculationResultWithKeys) => {
  const t = useTranslations("common");
  return (
    <div className="flex w-[320px] flex-col items-center rounded-xl border border-smart-cbt-medium-grey p-5 text-smart-cbt-dark-grey">
      <p>{t("carbon.create.totalCarbonFootprint")}</p>
      <TravelPlanGraphSummary {...props} />
      <div className="flex gap-4">
        <span>{t("carbon.create.grandTotal")} :</span>
        <p>
          <span className="font-medium text-black">{props.total.toFixed(2)} </span>
          <span>kgCO2eq</span>
        </p>
      </div>
    </div>
  );
};
export default TravelPlanGraphSummaryContainer;
