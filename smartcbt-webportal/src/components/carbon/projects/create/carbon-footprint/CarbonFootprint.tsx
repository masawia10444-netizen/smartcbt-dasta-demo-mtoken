import CollapseSection from "@/components/CollapseSection";
import { RoundSchema, TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import CarbonFootprintActivity from "./CarbonFootprintActivity";
import CarbonFootprintActivityRound from "./CarbonFootprintActivityRound";

interface CarbonFootprintProps {
  dataOutSide?: RoundSchema;
  selectedIndex?: number;
}

const CarbonFootprint = (props: CarbonFootprintProps) => {
  const { dataOutSide, selectedIndex } = props;
  const t = useTranslations("common");
  const { getValues } = useFormContext<TravelProgramSchema>();

  const travelPlans = dataOutSide ? dataOutSide.travelPlans : getValues("travelPlans");

  return (
    <div className="flex flex-col">
      {travelPlans?.map((travelPlan, travelPlanIndex) => (
        <CollapseSection key={travelPlanIndex} title={`${t("carbon.create.day")} ${travelPlanIndex + 1}`} defaultOpen>
          {travelPlan?.activities?.map((activity, activityIndex) =>
            dataOutSide && selectedIndex ? (
              <CarbonFootprintActivityRound
                key={activityIndex}
                selectedIndex={selectedIndex}
                activityIndex={activityIndex}
                travelPlanIndex={travelPlanIndex}
              />
            ) : (
              <CarbonFootprintActivity
                travelPlanIndex={travelPlanIndex}
                activityIndex={activityIndex}
                key={activityIndex}
              />
            )
          )}
        </CollapseSection>
      ))}
    </div>
  );
};

export default CarbonFootprint;
