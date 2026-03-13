import { PCRTypes } from "@/models/emission-factor-proxy";
import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { footprintCalculation } from "@/utils/carbon-project-form-helper";
import { useFormContext } from "react-hook-form";
import TravelPlanGraphSummaryContainer from "./TravelPlanGraphSummaryContainer";
import TravelPlanPCRSummary from "./TravelPlanPCRSummaty";

const TravelPlanSummary = ({ dataOutSide }: { dataOutSide?: TravelProgramSchema | null }) => {
  const { watch } = useFormContext<TravelProgramSchema>();
  const travelProgram = watch();
  const data = footprintCalculation(dataOutSide ? dataOutSide : travelProgram);

  return (
    <div className="mt-6 flex gap-5">
      <TravelPlanGraphSummaryContainer {...data} />
      <div className="grid flex-grow grid-cols-2 gap-5">
        <TravelPlanPCRSummary
          type={PCRTypes.Transportation}
          grandTotal={data.transportations.grandTotal}
          proportion={data.transportations.proportion}
        />
        <TravelPlanPCRSummary
          type={PCRTypes.Food}
          grandTotal={data.foods.grandTotal}
          proportion={data.foods.proportion}
        />
        <TravelPlanPCRSummary
          type={PCRTypes.Accomodation}
          grandTotal={data.accomodations.grandTotal}
          proportion={data.accomodations.proportion}
        />
        <TravelPlanPCRSummary
          type={PCRTypes.Waste}
          grandTotal={data.wastes.grandTotal}
          proportion={data.wastes.proportion}
        />
      </div>
    </div>
  );
};

export default TravelPlanSummary;
