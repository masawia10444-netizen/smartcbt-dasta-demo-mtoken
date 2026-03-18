"use client";

import {
  getGroupMapCarbonProgramAction,
  getPieChartCarbonProgramAction,
  getSummaryCarbonProgramAction,
  getTableCarbonProgramAction,
  getTableCarbonProgramByRegionAction,
} from "@/app/[locale]/(authenticated)/carbon-footprint/overview/action";
import { IconParkOutlineSettingConfig } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  GroupMapCarbon,
  PieChartCarbon,
  SummaryCarbon,
  TableCarbon,
  TableCarbonByRegion,
} from "@/utils/cms/adapters/website/carbon/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CarbonFootprintMap from "./CarbonFootprintMap";
import CarbonFootprintNationalLevelGraph from "./CarbonFootprintNationalLevelGraph";
import CarbonFootprintOverviewCard from "./CarbonFootprintOverviewCard";
import CarbonFootprintSummaryGraph from "./CarbonFootprintSummaryGraph";
import CarbonFootprintRegionalGraphContainer from "./regional-graph/CarbonFootprintRegionalGraphContainer";
import { CarbonFootprintFilterPopup } from "./CarbonFootprintFilterPopup";

export enum FilterType {
  day = "day",
  month = "month",
}

const CarbonFootprintOverview = () => {
  const t = useTranslations("common");

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterStartDate, setFilterStartDate] = useState<Date | null>();
  const [filterEndDate, setFilterEndDate] = useState<Date | null>();
  const [filterType, setFilterType] = useState<FilterType>(FilterType.day);
  const [showFilterPopup, setShowFilterPopup] = useState<boolean>(false);
  const [summaryCarbonData, setSummaryCarbonData] = useState<SummaryCarbon | null>();
  const [groupMapCarbonData, setGroupMapCarbonData] = useState<GroupMapCarbon | null>();
  const [pieChartCarbonData, setPieChartCarbonData] = useState<PieChartCarbon | null>();
  const [tableCarbonData, setTableCarbonData] = useState<TableCarbon | null>();
  const [tableCarbonByRegionData, setTableCarbonByRegionData] = useState<TableCarbonByRegion | null>();
  const [forceRefreshKey, setForceRefreshKey] = useState<number | string>();

  const fetchData = async (startDate: Date, endDate: Date) => {
    setIsLoading(true);
    setForceRefreshKey(0);
    const [summary, map, piechart, carbonProgram, carbonProgramByRegion] = await Promise.all([
      getSummaryCarbonProgramAction(),
      getGroupMapCarbonProgramAction(),
      getPieChartCarbonProgramAction(),
      getTableCarbonProgramAction({
        startDate: filterType == FilterType.day ? startDate : null,
        endDate: filterType == FilterType.day ? endDate : null,
        startMonth: filterType == FilterType.month ? startDate : null,
        endMonth: filterType == FilterType.month ? endDate : null,
      }),
      getTableCarbonProgramByRegionAction({
        startDate: filterType == FilterType.day ? startDate : null,
        endDate: filterType == FilterType.day ? endDate : null,
        startMonth: filterType == FilterType.month ? startDate : null,
        endMonth: filterType == FilterType.month ? endDate : null,
      }),
    ]);
    summary.response && setSummaryCarbonData(summary.response);
    map.response && setGroupMapCarbonData(map.response);
    piechart.response && setPieChartCarbonData(piechart.response);
    carbonProgram.response && setTableCarbonData(carbonProgram.response);
    carbonProgramByRegion.response && setTableCarbonByRegionData(carbonProgramByRegion.response);
    setIsLoading(false);
    setForceRefreshKey(startDate.getDate() + endDate.getDate());
  };

  useEffect(() => {
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 13);
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
  }, []);

  useEffect(() => {
    if (!filterStartDate || !filterEndDate) return;
    setSummaryCarbonData(null);
    setGroupMapCarbonData(null);
    setPieChartCarbonData(null);
    setTableCarbonData(null);
    setTableCarbonByRegionData(null);
    fetchData(filterStartDate, filterEndDate);
  }, [filterStartDate, filterEndDate]);

  if (isLoading) return <LoadingSpinner />;
  else
    return (
      <div className="relative h-full min-h-full">
        <div className="flex lg:h-full flex-col gap-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 shrink-0">
            <h1 className="text-2xl font-medium text-smart-cbt-dark-green shrink-0">{t("carbon.carbonFootprint")}</h1>
            <NextLink
              intent="primarySimple"
              icon={<IconParkOutlineSettingConfig />}
              href="/carbon-footprint/projects/overview"
            >
              {t("carbon.viewAllProjectInformation")}
            </NextLink>
          </div>
          <div className="flex flex-col lg:flex-row lg:h-full gap-6 px-0 md:px-0">
            <div className="flex w-full lg:w-[342px] flex-col gap-6 shrink-0 lg:shrink">
              <CarbonFootprintOverviewCard className="flex flex-col items-end gap-6 px-6 font-medium shrink-0 lg:shrink">
                <p className=" text-smart-cbt-medium-grey">{t("carbon.overview.totalFootprint")}</p>
                <p className="text-3xl text-smart-cbt-green">{summaryCarbonData?.totalCarbon.toFixed(4)} kgCO2eq</p>
              </CarbonFootprintOverviewCard>
              <CarbonFootprintOverviewCard className="flex w-full min-h-[400px] lg:h-full lg:flex-grow flex-col items-end gap-6 overflow-hidden p-0">
                <CarbonFootprintMap groupMapCarbon={groupMapCarbonData ?? []} />
              </CarbonFootprintOverviewCard>
            </div>
            <div className="flex flex-grow flex-col gap-6 overflow-hidden shrink-0 lg:shrink">
              <div className="flex flex-col lg:flex-row flex-1 gap-6 shrink-0 lg:shrink">
                <CarbonFootprintOverviewCard className="flex-grow w-full overflow-hidden">
                  <CarbonFootprintNationalLevelGraph
                    type={filterType}
                    tableCarbon={tableCarbonData ?? []}
                    isLoading={isLoading}
                    onOpenFilterPopup={() => setShowFilterPopup(true)}
                  />
                </CarbonFootprintOverviewCard>
                <CarbonFootprintOverviewCard className="flex w-full min-h-[300px] lg:w-[342px] overflow-hidden">
                  <CarbonFootprintSummaryGraph pieChartCarbon={pieChartCarbonData} />
                </CarbonFootprintOverviewCard>
              </div>
              <CarbonFootprintOverviewCard className="flex-1 w-full overflow-hidden">
                <CarbonFootprintRegionalGraphContainer
                  type={filterType}
                  tableCarbonByRegion={tableCarbonByRegionData}
                  forceRefreshKey={forceRefreshKey}
                />
              </CarbonFootprintOverviewCard>
            </div>
          </div>
          {showFilterPopup && filterStartDate && filterEndDate && (
            <CarbonFootprintFilterPopup
              isOpen={showFilterPopup}
              initialStartDate={filterStartDate}
              initialEndDate={filterEndDate}
              type={filterType}
              onClose={setShowFilterPopup}
              onDateRangeSelected={(startDate: Date, endDate: Date, type: FilterType) => {
                setFilterStartDate(startDate);
                setFilterEndDate(endDate);
                setFilterType(type);
                setShowFilterPopup(false);
              }}
            />
          )}
        </div>
      </div>
    );
};

export default CarbonFootprintOverview;
