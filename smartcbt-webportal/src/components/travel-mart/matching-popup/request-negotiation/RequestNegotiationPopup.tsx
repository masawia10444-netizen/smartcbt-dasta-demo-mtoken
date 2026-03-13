import { handleMatchingBusiness } from "@/app/[locale]/(authenticated)/travel-mart/communities/[id]/detail/action";
import { TravelMartRequestNegotiationSchema } from "@/schemas/forms/travel-mart/matching/travel-mart-matching-popup-schema";
import { REQUEST_BY } from "@/utils/cms/adapters/website/constants";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import RequestNegotiationCheckInformationStep from "./RequestNegotiationCheckInformationStep";
import RequestNegotiationDoneStep from "./RequestNegotiationDoneStep";
import RequestNegotiationFailStep from "./RequestNegotiationFailStep";
import RequestNegotiationSelectStep from "./RequestNegotiationSelectStep";

enum RequestNegotiationPopupStep {
  select = "Selection",
  check = "Check",
  done = "Done",
  fail = "Fail",
}

export interface RangeTime {
  id: string;
  dateTime: string;
  status: string;
}
export interface Round {
  title: string;
  timeRange: RangeTime[];
}
export interface DateSection {
  title: string;
  rounds: Round[];
}

type RequestNegotiationPopupProps = {
  onClose: (didConfirm: boolean) => void;
  id: number | string;
  eventName: string;
  province: string;
  dateSection: DateSection[];
  type: "community" | "organization";
  communityId?: number;
  organizationId?: number;
};

const RequestNegotiationPopup = (props: RequestNegotiationPopupProps) => {
  const t = useTranslations("common");

  const [step, setStep] = useState(RequestNegotiationPopupStep.select);

  const formContext = useForm<TravelMartRequestNegotiationSchema>({
    defaultValues: {
      dateSelect: {
        date: undefined,
        round: undefined,
        needGuide: false,
        time: { dateTime: undefined, id: undefined, status: undefined },
      },
    },
  });

  const { control, watch, handleSubmit } = formContext;

  const close = () => {
    props.onClose(false);
  };

  const handleNextStep = () => {
    setStep(RequestNegotiationPopupStep.check);
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (props.type == "community") {
        await handleMatchingBusiness(
          { ...data, organizationId: props.organizationId, communityId: props.id },
          REQUEST_BY.ORGANIZATION
        );
      }
      if (props.type == "organization") {
        await handleMatchingBusiness(
          { ...data, communityId: props.communityId, organizationId: props.id },
          REQUEST_BY.COMMUNITY
        );
      }
      setStep(RequestNegotiationPopupStep.done);
    } catch (error) {
      setStep(RequestNegotiationPopupStep.fail);
    }
  });

  const canNext = watch("dateSelect").time != undefined;

  const renderStep = () => {
    switch (step) {
      case RequestNegotiationPopupStep.select:
        return (
          <RequestNegotiationSelectStep
            canNext={canNext}
            handleNextStep={handleNextStep}
            dateSection={props.dateSection}
            name="dateSelect"
            control={control}
            close={close}
          />
        );
      case RequestNegotiationPopupStep.check:
        return (
          <RequestNegotiationCheckInformationStep
            onSubmit={onSubmit}
            eventName={props.eventName}
            province={props.province}
            canNext={canNext}
            close={close}
            type={props.type}
          />
        );
      case RequestNegotiationPopupStep.done:
        return <RequestNegotiationDoneStep onClose={props.onClose} type={props.type} />;
      case RequestNegotiationPopupStep.fail:
        return <RequestNegotiationFailStep onClose={props.onClose} />;
    }
  };

  return (
    <div className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 p-4">
        {/* The actual dialog panel  */}
        <FormProvider {...formContext}>
          <div className="relative mx-auto flex max-h-full min-h-fit min-w-[350px] max-w-[42rem] flex-col gap-5 rounded-xl bg-white p-8 font-prompt ">
            {renderStep()}
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default RequestNegotiationPopup;
