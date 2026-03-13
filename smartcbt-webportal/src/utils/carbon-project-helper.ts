import { FilterType } from "@/components/carbon/overview/CarbonFootprintOverview";
import { ChartData, ChartDataset, ChartOptions, ScriptableChartContext } from "chart.js";
import _ from "lodash";
import { FootprintDashboardCalculationResultWithKeys } from "./carbon-project-form-helper";
import {
  GroupMapCarbon,
  GroupMapCarbonJson,
  TableCarbon,
  TableCarbonByRegion,
} from "./cms/adapters/website/carbon/types";

export enum Region {
  North = "ภาคเหนือ",
  West = "ภาคตะวันตก",
  NorthEast = "ภาคตะวันออกเฉียงเหนือ",
  Central = "ภาคกลาง",
  East = "ภาคตะวันออก",
  South = "ภาคใต้",
}

export function colorForRegion(region: Region) {
  switch (region) {
    case Region.North:
      return { bg: "bg-[#08979C]", color: "#08979C", text: "text-[#08979C]" };
    case Region.West:
      return { bg: "bg-[#73D13D]", color: "#73D13D", text: "text-[#73D13D]" };
    case Region.NorthEast:
      return { bg: "bg-[#FFC53D]", color: "#FFC53D", text: "text-[#FFC53D]" };
    case Region.Central:
      return { bg: "bg-[#6BBC90]", color: "#6BBC90", text: "text-[#6BBC90]" };
    case Region.East:
      return { bg: "bg-[#C6DC96]", color: "#C6DC96", text: "text-[#C6DC96]" };
    case Region.South:
      return { bg: "bg-[#5CDBD3]", color: "#5CDBD3", text: "text-[#5CDBD3]" };
  }
}

export const covertGroupMapCarbonRegionsMaker = (groupMapCarbon: GroupMapCarbon, region: Region) => {
  const data = groupMapCarbon.find((g) => g.name == region);
  if (!data) return;
  return {
    value: data?.value,
    key: data?.key,
    name: data?.name,
    color: colorForRegion(region).color,
    position: data?.position,
  };
};

export const covertGroupMapCarbonProvincesMaker = (groupMapCarbon: GroupMapCarbonJson) => {
  return {
    value: groupMapCarbon?.value,
    key: groupMapCarbon?.key,
    name: groupMapCarbon?.name,
    color: "#73D13D",
    position: groupMapCarbon?.position,
  };
};

const transformData = (input: { [key: string]: number }): { [key: string]: number } => {
  const transformedData: { [key: string]: number } = {};

  Object.entries(input).forEach(([date, value]) => {
    const [day, month, year] = date.split("/").map(Number);
    const monthName = new Date(year, month - 1, day).toLocaleString("th-TH", { month: "short" });
    const monthYear = `${monthName} ${year}`;

    if (transformedData[monthYear]) {
      transformedData[monthYear] += value;
    } else {
      transformedData[monthYear] = value;
    }
  });

  return transformedData;
};

export function convertTableCarbon(type: FilterType, tableCarbon: TableCarbon) {
  const result: { [key: string]: number } = {};

  tableCarbon?.forEach((item) => {
    const month = item.program_start;
    const value = item.sum_carbon;
    if (!result[month]) {
      result[month] = 0;
    }
    result[month] += value;
  });

  if (type == FilterType.month) {
    return Object.entries(transformData(result)).map(([label, value]) => ({ label, value }));
  } else {
    return Object.entries(result).map(([label, value]) => ({ label, value }));
  }
}

export function chartNationalLevelGraphData(values: ReturnType<typeof convertTableCarbon>): {
  data: ChartData<"line", any, any>;
  options: ChartOptions<"line">;
} {
  const dataArray = values.map((v) => v.value);
  const datasets: ChartDataset<"line", any>[] = [
    {
      tension: 0.3,
      data: dataArray,
      fill: true,
      borderWidth: 1,
      borderColor: "#73D13D",
      pointBackgroundColor: "#73D13D",
      backgroundColor: (context: ScriptableChartContext) => {
        if (!context.chart.chartArea) return;
        const {
          ctx,
          chartArea: { top, bottom },
        } = context.chart;
        const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
        gradientBg.addColorStop(0, "rgba(44, 194, 19, 0.28)");
        gradientBg.addColorStop(1, "rgba(117, 206, 75, 0.00)");
        return gradientBg;
      },
    },
  ];
  const maxValue = _.max(dataArray);
  return {
    data: { datasets, labels: values.map((v) => v.label) },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          display: false,
        },
      },
      scales: {
        x: { ticks: { color: "#A3A3A3", font: { size: 14 } } },
        y: {
          beginAtZero: true,
          suggestedMax: maxValue ? maxValue * 1.1 : undefined,
          ticks: {
            maxTicksLimit: 6,
            font: {
              size: 14,
            },
            color: "#A3A3A3",
          },
        },
      },
      elements: {},
    },
  };
}

export function chartGraphSummaryData(calculation: FootprintDashboardCalculationResultWithKeys): {
  data: ChartData<"polarArea", any, any>;
  options: ChartOptions<"polarArea">;
} {
  const data = [
    calculation.travel_cf.proportion,
    calculation.waste_cf.proportion,
    calculation.food_cf.proportion,
    calculation.accommodation_cf.proportion,
  ];
  const datasets = [
    {
      data: data,
      backgroundColor: [
        "rgba(24, 144, 255, 1)",
        "rgba(192, 53, 81, 1)",
        "rgba(242, 145, 0, 1)",
        "rgba(65, 204, 154, 1)",
      ],
    },
  ];

  return {
    data: { datasets },
    options: {
      layout: { padding: 60 },
      scales: {
        r: {
          startAngle: -10,
          grid: { display: false },
          beginAtZero: true,
          pointLabels: { display: false },
          ticks: { display: false },
        },
      },
      plugins: {
        datalabels: {
          formatter(value, context) {
            return "";
          },
        },
      },
      elements: {
        arc: {
          angle: datasets[0].data.map((d) => (360 * d) / 100),
          spacing: 0,
          borderWidth: 0,
        } as any,
      },
    },
  };
}

export function getRegionalGraphData(type: FilterType, data?: TableCarbonByRegion | null): { data: any; labels: any } {
  return {
    data: [
      convertDataByRegion(type, Region.West, data),
      convertDataByRegion(type, Region.Central, data),
      convertDataByRegion(type, Region.North, data),
      convertDataByRegion(type, Region.East, data),
      convertDataByRegion(type, Region.South, data),
      convertDataByRegion(type, Region.NorthEast, data),
    ],
    labels: getLabelsRegionalGraph(type, data),
  };
};

function convertDataByRegion (type: FilterType, region: Region, tableCarbonByRegion?: TableCarbonByRegion | null) {
  const dataByRegion = (tableCarbonByRegion ?? []).filter((d) => d.region == region);
  const data = dataByRegion.flatMap((is) => is.data);
  var prepareData: { [key: string]: number } = {};

  data.forEach((item) => {
    const date = item.program_start;
    const value = item.sum_carbon;
    if (!prepareData[date]) prepareData[date] = 0;
    prepareData[date] += value;
  });

  if (type == FilterType.month) {
    const transformedData: { [key: string]: number } = {};
    Object.entries(prepareData).forEach(([date, value]) => {
      const [day, month, year] = date.split("/").map(Number);
      const monthName = new Date(year, month - 1, day).toLocaleString("th-TH", { month: "short" });
      const monthYear = `${monthName} ${year}`;

      if (transformedData[monthYear]) transformedData[monthYear] += value;
      else transformedData[monthYear] = value;
    });
    prepareData = transformedData;
  }

  return {
    color: colorForRegion(region),
    region,
    data: Object.values(prepareData),
  };
};

function getLabelsRegionalGraph(type: FilterType, data?: TableCarbonByRegion | null): string[] {
  const result: string[] = [];
  data?.[0].data?.forEach((value) => result.push(value.program_start));

  if (type == FilterType.month) {
    const monthYearLabels: string[] = [];
    result.forEach((value) => {
      const [day, month, year] = value.split("/").map(Number);
      const monthName = new Date(year, month - 1, day).toLocaleString("th-TH", { month: "short" });
      const monthYear = `${monthName} ${year}`;
      if (!monthYearLabels.includes(monthYear)) monthYearLabels.push(monthYear);
    });
    return monthYearLabels;
  } else {
    return result;
  }
}
