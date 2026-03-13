"use client";

import { footprintDashboardCalculation } from "@/utils/carbon-project-form-helper";
import { PieChartCarbon } from "@/utils/cms/adapters/website/carbon/types";
import { CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, Title } from "chart.js";
import { useTranslations } from "next-intl";
import CarbonFootprintGraphSummary from "./CarbonFootprintGraphSummary";

ChartJS.register(Title, LineElement, LinearScale, CategoryScale, PointElement, Filler);

type CarbonFootprintSummaryGraphProps = {
  pieChartCarbon?: PieChartCarbon | null;
};

const CarbonFootprintSummaryGraph = ({ pieChartCarbon }: CarbonFootprintSummaryGraphProps) => {
  const t = useTranslations("common");
  const footprintSummaryData = pieChartCarbon ? footprintDashboardCalculation(pieChartCarbon) : null;

  return (
    <div className="flex w-full flex-col gap-3 ">
      <p className="text-center text-smart-cbt-dark-grey">{t("carbon.create.totalCarbonFootprint")}</p>
      <div className="relative flex h-full flex-grow items-center justify-center">
        {footprintSummaryData && <CarbonFootprintGraphSummary {...footprintSummaryData} />}
      </div>
    </div>
  );
};

export default CarbonFootprintSummaryGraph;
