import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { carbonSummary } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import CarbonFootprintSummary from "./CarbonFootprintSummary";
import TravelProgramSummary from "./TravelProgramSummary";

interface CarbonSummaryProps {
  showOnlyGraphSummary?: boolean
}

const CarbonSummary = (props: CarbonSummaryProps) => {
  const t = useTranslations("common");
  const { getValues } = useFormContext<TravelProgramSchema>();
  const travelProgram = getValues();
  const data = carbonSummary(travelProgram);

  return (
    <div className="flex break-after-all flex-col gap-2">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">{t("carbon.summary.title")}</h1>
      <TravelProgramSummary data={data} />
      <CarbonFootprintSummary data={data} />
    </div>
  );
};

export default CarbonSummary;
