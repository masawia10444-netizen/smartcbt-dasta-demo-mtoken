"use client";

import { BarGraphIcon, LineGraphIcon } from "@/components/Icon";
import { Region, getRegionalGraphData } from "@/utils/carbon-project-helper";
import { TableCarbonByRegion } from "@/utils/cms/adapters/website/carbon/types";
import { Tab } from "@headlessui/react";
import { CategoryScale, Chart as ChartJS, Filler, LineElement, LinearScale, PointElement, Title } from "chart.js";
import { useTranslations } from "next-intl";
import { FilterType } from "../CarbonFootprintOverview";
import CarbonFootprintRegionalBarGraph from "./CarbonFootprintRegionalBarGraph";
import CarbonFootprintRegionalLineGraph from "./CarbonFootprintRegionalLineGraph";
import CarbonFootprintRegionalGraphTab from "./CarbonFootprintRegionalGraphTab";
import CarbonFootprintRegionalLegend from "./CarbonFootprintRegionalLegend";
ChartJS.register(Title, LineElement, LinearScale, CategoryScale, PointElement, Filler);

export type RegionalGraphProps = {
  type: FilterType;
  data: {
    color: { bg: string; color: string };
    data: number[];
    region: Region;
  }[];
  labels: string[];
  forceRefreshKey?: number | string;
};

export type TooltipCallback = {
  position: {
    top: number;
    left: number;
    opacity: number;
  };
  month: string;
  regionIndex: number;
  value: number;
};

type CarbonFootprintRegionalGraphContainerProps = {
  type: FilterType;
  tableCarbonByRegion?: TableCarbonByRegion | null;
  forceRefreshKey?: number | string;
};

const CarbonFootprintRegionalGraphContainer = ({
  type,
  tableCarbonByRegion,
  forceRefreshKey,
}: CarbonFootprintRegionalGraphContainerProps) => {
  const t = useTranslations("common");
  const data = getRegionalGraphData(type, tableCarbonByRegion);

  return (
    <div className="flex h-full flex-col gap-3">
      <Tab.Group>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-medium text-smart-cbt-dark-green">{t("carbon.overview.regionalLevel")}</p>
          <Tab.List className="flex flex-wrap items-center gap-2 md:gap-4">
            <CarbonFootprintRegionalGraphTab title={t("carbon.overview.barChart")} Icon={<BarGraphIcon />} />
            <CarbonFootprintRegionalGraphTab title={t("carbon.overview.lineChart")} Icon={<LineGraphIcon />} />
          </Tab.List>
        </div>
        <div className="flex flex-grow flex-col w-full min-w-0">
          <p className="ml-6 text-sm text-smart-cbt-medium-grey">kgCO2eq</p>
          <Tab.Panels className="flex flex-grow flex-col">
            <Tab.Panel className="flex flex-grow flex-col w-full min-w-0">
              <div className="relative flex-grow w-full min-w-0">
                <CarbonFootprintRegionalBarGraph
                  type={type}
                  data={data.data}
                  labels={data.labels}
                  forceRefreshKey={forceRefreshKey}
                />
              </div>
              <CarbonFootprintRegionalLegend data={data.data} />
            </Tab.Panel>
            <Tab.Panel className="flex flex-grow flex-col w-full min-w-0">
              <div className="relative flex-grow w-full min-w-0">
                <CarbonFootprintRegionalLineGraph
                  type={type}
                  data={data.data}
                  labels={data.labels}
                  forceRefreshKey={forceRefreshKey}
                />
              </div>
              <CarbonFootprintRegionalLegend data={data.data} />
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
};

export default CarbonFootprintRegionalGraphContainer;
