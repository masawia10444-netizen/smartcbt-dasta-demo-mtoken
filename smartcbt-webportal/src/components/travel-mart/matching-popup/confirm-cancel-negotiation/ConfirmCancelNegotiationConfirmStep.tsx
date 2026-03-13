import { handleReject } from "@/app/[locale]/(authenticated)/travel-mart/communities/[id]/detail/action";
import { Button } from "@/components/Button";
import { WarningCircle } from "@/components/Icon";
import { TravelMartMatchingCancelNegotiationSchema } from "@/schemas/forms/travel-mart/matching/travel-mart-matching-cancel-negotiation-schema";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ConfirmCancelNegotiationPopupStep } from "./ConfirmCancelNegotiationPopup";

type ConfirmCancelNegotiationConfirmStepProps = {
  scheduleId: string | number;
  close: () => void;
  setStep: (step: ConfirmCancelNegotiationPopupStep) => void;
};

const ConfirmCancelNegotiationConfirmStep = ({
  close,
  setStep,
  scheduleId,
}: ConfirmCancelNegotiationConfirmStepProps) => {
  const t = useTranslations("common");

  const { control, watch, handleSubmit, register } = useForm<TravelMartMatchingCancelNegotiationSchema>({
    defaultValues: {
      other: undefined,
    },
  });

  const canSubmit = watch("other") != undefined && watch("other") != "";

  const onSubmit = handleSubmit(async (data) => {
    try {
      await handleReject(data, scheduleId);
      setStep(ConfirmCancelNegotiationPopupStep.done);
    } catch (error) {
      setStep(ConfirmCancelNegotiationPopupStep.fail);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col items-center gap-4 mb-4">
        <WarningCircle className="w-20 h-20 text-smart-cbt-red" />
        <h3 className="mt-8 text-xl font-medium text-center text-smart-cbt-red">
          {t("travelMart.matchingPopup.confirmCancelNegotiation.title")}
        </h3>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <textarea
          id="message"
          rows={4}
          className="block w-full p-2 text-sm bg-white border rounded-lg border-smart-cbt-medium-grey focus:border-smart-cbt-red focus:ring-smart-cbt-red"
          placeholder={t("travelMart.matchingPopup.confirmCancelNegotiation.descriptionPlaceholder")}
          {...register("other")}
        />
        <div className="flex flex-row w-full gap-4 mt-5">
          <div className="flex-1 w-full">
            <Button
              intent={"text"}
              type="button"
              className="items-center w-full text-black hover:underline sm:min-w-full sm:max-w-full"
              onClick={close}
            >
              {t("global.cancel")}
            </Button>
          </div>
          <div className="flex-1 w-full">
            <Button
              intent={canSubmit ? "danger" : "disabled"}
              type={"submit"}
              className="items-center w-full sm:min-w-full sm:max-w-full"
              disabled={!canSubmit}
            >
              {t("travelMart.matchingPopup.confirmCancelNegotiation.confirm")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ConfirmCancelNegotiationConfirmStep;
