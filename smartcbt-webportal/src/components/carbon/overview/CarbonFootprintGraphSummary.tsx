import Image from "@/components/image";
import { FootprintDashboardCalculationResultWithKeys } from "@/utils/carbon-project-form-helper";
import { chartGraphSummaryData } from "@/utils/carbon-project-helper";
import { ShadowPlugin } from "@/utils/graph-helper";
import { ArcElement, Chart as ChartJS, RadialLinearScale, Title } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTranslations } from "next-intl";
import { StaticImageData } from "next/image";
import AccommodationIcon from "public/images/carbon-footprint/accommodation-icon.png";
import FactoryIcon from "public/images/carbon-footprint/factory-icon.png";
import FoodIcon from "public/images/carbon-footprint/food-icon.png";
import VehicleIcon from "public/images/carbon-footprint/vehicle-icon.png";
import { PolarArea } from "react-chartjs-2";
ChartJS.register(RadialLinearScale, ArcElement, Title, ChartDataLabels);

const CarbonFootprintGraphSummary = (props: FootprintDashboardCalculationResultWithKeys) => {
  const t = useTranslations("common");
  const data = chartGraphSummaryData(props);

  const PercentLabel = ({ value }: { value: number }) => {
    return <div className="text-lg font-medium">{`${Math.round(value)} %`}</div>;
  };

  const GraphLabel = ({ title, icon }: { title: string; icon: StaticImageData }) => {
    return (
      <div className="flex flex-row gap-2 text-sm font-normal">
        <Image src={icon} alt="" /> {title}
      </div>
    );
  };

  const ValueLabel = ({ value }: { value: number }) => {
    return <div className="text-sm font-normal">{`${Math.round(value)} kgCO2eQ`}</div>;
  };

  return (
    <div className="relative w-[342px] max-w-full mx-auto min-w-0">
      <div className="absolute left-0 top-0 flex flex-col gap-1 text-center text-smart-cbt-green-2 z-10 scale-[0.65] sm:scale-100 origin-top-left">
        <PercentLabel value={props.accommodation_cf.proportion} />
        <GraphLabel title={t("carbon.summary.type.accomodations")} icon={AccommodationIcon} />
        <ValueLabel value={props.accommodation_cf.grandTotal} />
      </div>
      <div className="absolute right-0 top-0 flex flex-col gap-1 text-center text-smart-cbt-blue z-10 scale-[0.65] sm:scale-100 origin-top-right">
        <PercentLabel value={props.travel_cf.proportion} />
        <GraphLabel title={t("carbon.summary.type.transportations")} icon={VehicleIcon} />
        <ValueLabel value={props.travel_cf.grandTotal} />
      </div>
      <div className="absolute bottom-0 left-0 flex flex-col gap-1 text-center text-smart-cbt-orange z-10 scale-[0.65] sm:scale-100 origin-bottom-left -translate-y-4 sm:translate-y-0">
        <PercentLabel value={props.food_cf.proportion} />
        <GraphLabel title={t("carbon.summary.type.foods")} icon={FoodIcon} />
        <ValueLabel value={props.food_cf.grandTotal} />
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col gap-1 text-center text-smart-cbt-red-3 z-10 scale-[0.65] sm:scale-100 origin-bottom-right -translate-y-4 sm:translate-y-0">
        <PercentLabel value={props.waste_cf.proportion} />
        <GraphLabel title={t("carbon.summary.type.wastes")} icon={FactoryIcon} />
        <ValueLabel value={props.waste_cf.grandTotal} />
      </div>
      <PolarArea options={data.options} data={data.data} plugins={ShadowPlugin} />
    </div>
  );
};
export default CarbonFootprintGraphSummary;
