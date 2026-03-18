"use client";

import { TableCarbon } from "@/utils/cms/adapters/website/carbon/types";
import { CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, Title } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";
import { Button } from "@/components/Button";
import { AddPlusIcon } from "@/components/Icon";
import { chartNationalLevelGraphData, convertTableCarbon } from "@/utils/carbon-project-helper";
import { useTranslations } from "next-intl";
import { Line } from "react-chartjs-2";
import { FilterType } from "./CarbonFootprintOverview";
ChartJS.register(Title, LineElement, LinearScale, CategoryScale, PointElement, Filler);

type CarbonFootprintNationalLevelGraphProps = {
  type: FilterType;
  tableCarbon: TableCarbon;
  isLoading: boolean;
  onOpenFilterPopup: () => void;
};

const CarbonFootprintNationalLevelGraph = ({
  type,
  tableCarbon,
  isLoading,
  onOpenFilterPopup,
}: CarbonFootprintNationalLevelGraphProps) => {
  const t = useTranslations("common");
  const data = chartNationalLevelGraphData(convertTableCarbon(type, tableCarbon));

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <p className="font-medium text-smart-cbt-dark-green">{t("carbon.overview.nationalLevel")}</p>
        <Button
          type="button"
          onClick={onOpenFilterPopup}
          intent={isLoading ? "disabled" : "secondary"}
          size="small"
          icon={<AddPlusIcon />}
          disabled={isLoading}
        >
          {t("carbon.overview.filter")}
        </Button>
      </div>
      <div className="flex flex-grow flex-col w-full min-w-0">
        <p className="ml-6 text-sm text-smart-cbt-medium-grey">kgCO2eq</p>
        <div className="relative flex-grow w-full min-w-0">
          <Line options={data.options} data={data.data} />
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintNationalLevelGraph;
