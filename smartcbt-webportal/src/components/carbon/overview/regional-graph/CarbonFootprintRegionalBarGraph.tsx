"use client";

import { colorForRegion } from "@/utils/carbon-project-helper";
import { cn } from "@/utils/cn";
import {
  BarController,
  BarElement,
  CategoryScale,
  ChartData,
  ChartDataset,
  Chart as ChartJS,
  ChartOptions,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import _ from "lodash";
import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { RegionalGraphProps, TooltipCallback } from "./CarbonFootprintRegionalGraphContainer";
ChartJS.register(Title, BarElement, LinearScale, CategoryScale, PointElement, BarController, Tooltip);

const CarbonFootprintRegionalBarGraph = (props: RegionalGraphProps) => {
  const [tooltipContent, setTooltipContent] = useState<TooltipCallback | null>(null);
  const handleTooltipUpdate = (data: TooltipCallback) => {
    setTooltipContent(data);
  };
  const data = chartData(props.data, props.labels, handleTooltipUpdate);
  const graph = useMemo(() => <Bar options={data.options} data={data.data} />, [props.forceRefreshKey]);
  const region = props.data[tooltipContent?.regionIndex ?? 0].region;

  return (
    <div className="relative h-full">
      <div
        style={{
          top: tooltipContent?.position.top,
          left: tooltipContent?.position.left,
          color: colorForRegion(region).color,
        }}
        className={cn(
          `absolute rounded-2xl bg-white px-3 py-2 shadow-2xl transition-all duration-100 ease-in`,
          tooltipContent?.position && tooltipContent.position.opacity == 1 ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="text-xs text-smart-cbt-medium-grey">{tooltipContent?.month}</p>
        <p>{region}</p>
        <p>{tooltipContent?.value?.toFixed(2)} kgCO2eq</p>
      </div>
      {graph}
    </div>
  );
};

export default CarbonFootprintRegionalBarGraph;

const chartData = (
  values: { data: number[]; color: { bg: string; color: string } }[],
  labels: string[],
  onTooltipUpdate: (data: TooltipCallback) => void
): { data: ChartData<"bar", any, any>; options: ChartOptions<"bar"> } => {
  const max = _.max(values.map((v) => _.max(v.data)));
  const datasets: ChartDataset<"bar", any>[] = values.map((set) => ({
    data: set.data,
    maxBarThickness: 5,
    categoryPercentage: 0.7,
    backgroundColor: set.color.color,
    borderRadius: 5,
    grouped: true,
  }));
  return {
    data: { datasets, labels },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          display: false,
        },
        tooltip: {
          enabled: false,
          position: "nearest",
          external(context) {
            const { chart, tooltip } = context;
            const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
            onTooltipUpdate({
              position: {
                left: positionX + tooltip.caretX,
                top: positionY + tooltip.caretY,
                opacity: tooltip.opacity,
              },
              month: tooltip.title[0],
              regionIndex: tooltip.dataPoints[0].datasetIndex,
              value: tooltip.dataPoints[0].raw as number,
            });
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: "#A3A3A3", font: { size: 14 } },
          suggestedMax: max ? max * 1.1 : undefined,
        },
        y: {
          grid: {
            display: false,
          },
          beginAtZero: true,
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
};
