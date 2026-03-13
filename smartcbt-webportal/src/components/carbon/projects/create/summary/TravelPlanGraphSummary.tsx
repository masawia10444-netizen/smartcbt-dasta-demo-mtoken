import { FootprintCalculationResultWithKeys } from "@/utils/carbon-project-form-helper";
import { ShadowPlugin } from "@/utils/graph-helper";
import { ArcElement, ChartData, Chart as ChartJS, ChartOptions, RadialLinearScale, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { PolarArea } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, ArcElement, Title, ChartDataLabels);

const TravelPlanGraphSummary = (props: FootprintCalculationResultWithKeys) => {
  const data = chartData(props);
  return (
    <div className="relative">
      <PolarArea options={data.options} data={data.data} plugins={ShadowPlugin} />
      <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
    </div>
  );
};
export default TravelPlanGraphSummary;

export const chartData = (
  calculation: FootprintCalculationResultWithKeys
): { data: ChartData<"polarArea", any, any>; options: ChartOptions<"polarArea"> } => {
  const datasets = [
    {
      data: [
        calculation.transportations.proportion,
        calculation.wastes.proportion,
        calculation.foods.proportion,
        calculation.accomodations.proportion,
      ],
      backgroundColor: [
        "rgba(24, 144, 255, 1)",
        "rgba(192, 53, 81, 1)",
        "rgba(242, 145, 0, 1)",
        "rgba(65, 204, 154, 1)",
      ],
    },
  ];
  return {
    data: { datasets, labels: datasets[0].data.map((d) => d.toFixed(2)) },
    options: {
      plugins: {
        tooltip: { enabled: false },
        datalabels: {
          //   color: "rgba(255,255,255,1)",
          //   formatter(value, context) {
          //     return `${(value as number).toFixed(0)} %`;
          //   },
          labels: {
            value: {
              color: "rgba(255,255,255,1)",
              formatter(value, context) {
                return `${(value as number).toFixed(0)} %`;
              },
            },
            // title: {
            //   align: "end",
            //   offset: 80,
            //   color: "rgba(0,0,0,1)",
            //   formatter(value, context) {
            //     return `${(value as number).toFixed(0)} %`;
            //   },
            // },
          },
        },
      },
      scales: {
        // options: 180,
        r: {
          startAngle: -10,
          grid: { display: false },
          beginAtZero: true,
          pointLabels: { display: false },
          ticks: { display: false },
          //   min: -100,
        }, // if need to scale the low value a bit, we can use  min: -40 or something
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
};
