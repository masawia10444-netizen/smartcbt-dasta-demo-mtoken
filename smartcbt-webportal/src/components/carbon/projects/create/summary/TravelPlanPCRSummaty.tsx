import { CarbonAccomodationIcon, CarbonFoodIcon, CarbonTransportationIcon, CarbonWasteIcon } from "@/components/Icon";
import { PCRTypes } from "@/models/emission-factor-proxy";
import { FootprintCalculationResult } from "@/utils/carbon-project-form-helper";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

function themeForType(type: PCRTypes) {
  switch (type) {
    case "transportations":
      return {
        titleKey: "carbon.create.carbonFootprint.transportations",
        border: "border-smart-cbt-blue-2",
        text: "text-smart-cbt-blue-2",
        lightText: "text-smart-cbt-light-blue",
        icon: <CarbonTransportationIcon />,
      };
    case "foods":
      return {
        titleKey: "carbon.create.carbonFootprint.foods",
        border: "border-smart-cbt-orange",
        text: "text-smart-cbt-orange",
        lightText: "text-smart-cbt-orange-2",
        icon: <CarbonFoodIcon />,
      };
    case "accomodations":
      return {
        titleKey: "carbon.create.carbonFootprint.accomodations",
        border: "border-smart-cbt-green-2",
        text: "text-smart-cbt-green-2",
        lightText: "text-smart-cbt-green-3",
        icon: <CarbonAccomodationIcon />,
      };
    case "wastes":
      return {
        titleKey: "carbon.create.carbonFootprint.wastes",
        border: "border-smart-cbt-red-3",
        text: "text-smart-cbt-red-3",
        lightText: "text-smart-cbt-light-red",
        icon: <CarbonWasteIcon />,
      };
  }
}

type TravelPlanPCRSummaryProps = { type: PCRTypes } & FootprintCalculationResult;

const TravelPlanPCRSummary = ({ type, grandTotal, proportion }: TravelPlanPCRSummaryProps) => {
  const t = useTranslations("common");
  const theme = themeForType(type)!;

  return (
    <div className={cn("flex items-center gap-3 overflow-scroll rounded-2xl border p-4 px-6", theme?.border)}>
      <div className={cn("flex flex-col items-center justify-center gap-3", theme?.text)}>
        <div className={cn("flex h-24 w-24 items-center justify-center rounded-full border", theme?.border)}>
          {theme.icon}
        </div>
        {t(theme.titleKey)}
      </div>
      <div className={cn("flex flex-grow gap-8", theme.lightText)}>
        <div className="flex flex-1 flex-col items-end gap-4">
          <p>{t("carbon.create.grandTotal")}:</p>
          <p>{t("carbon.create.proportion")}:</p>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <p className={theme.text}>
            <span className="font-medium">{grandTotal.toFixed(2)}</span>
            <span className={theme.lightText}> kgCO2eq</span>
          </p>
          <p className={theme.text}>
            <span className="font-medium">{proportion.toFixed(2)}</span>
            <span className={theme.lightText}> %</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanPCRSummary;
