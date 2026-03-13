import {
  handleChangeSlot,
  handleReject,
} from "@/app/[locale]/(authenticated)/travel-mart/communities/[id]/detail/action";
import { Button } from "@/components/Button";
import { WarningCircle } from "@/components/Icon";
import FormDateSelection from "@/components/form/appointment-negotiate/FormDateSelection";
import {
  RejectNegotiationSelect,
  TravelMartRejectNegotiationSelectionSchema,
} from "@/schemas/forms/travel-mart/matching/travel-mart-matching-reject-popup-schema";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { RejectNegotiationPopupStep } from "./RejectNegotiationPopup";

type RejectNegotiationSelectStepProps = {
  dateSection: any[];
  close: () => void;
  scheduleId?: string | number;
  setStep: (step: RejectNegotiationPopupStep) => void;
};

const RejectNegotiationSelectStep = ({ dateSection, close, setStep, scheduleId }: RejectNegotiationSelectStepProps) => {
  const t = useTranslations("common");

  const { control, watch, handleSubmit, register } = useForm<TravelMartRejectNegotiationSelectionSchema>({
    defaultValues: {
      changeTime: {
        date: undefined,
        round: undefined,
        time: undefined,
      },
      other: undefined,
    },
  });

  const typeSelected = watch("selected");
  const canSubmit =
    typeSelected == RejectNegotiationSelect.changeTime
      ? watch("changeTime").time != undefined
      : watch("other") != undefined && watch("other") != "";

  const checked = watch("selected");

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (data.selected == RejectNegotiationSelect.changeTime) {
        await handleChangeSlot(data, scheduleId);
      } else {
        await handleReject(data, scheduleId);
      }
      setStep(RejectNegotiationPopupStep.done);
    } catch (error) {
      setStep(RejectNegotiationPopupStep.fail);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-4 flex flex-col items-center gap-4">
        <WarningCircle className="h-20 w-20 text-smart-cbt-red" />
        <h3 className="text-center text-xl font-medium text-smart-cbt-red">
          {t("travelMart.matchingPopup.rejectNegotiation.title")}
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <input
            id={`changeTime`}
            className="form-radio !ring-smart-cbt-red checked:text-smart-cbt-red hover:cursor-pointer hover:text-smart-cbt-red hover:!ring-smart-cbt-red focus:!ring-smart-cbt-red"
            type="radio"
            value={RejectNegotiationSelect.changeTime}
            checked={checked == RejectNegotiationSelect.changeTime}
            {...register("selected")}
          />
          <label className="hover:cursor-pointer" htmlFor={`changeTime`}>
            {t("travelMart.matchingPopup.rejectNegotiation.changeTime")}
          </label>
        </div>
        {checked == RejectNegotiationSelect.changeTime && (
          <div className="max-h-[70vh] overflow-y-auto scroll-smooth px-4 py-2">
            <FormDateSelection name="changeTime" danger showBorder control={control} dateSection={dateSection} />
          </div>
        )}
        <div className="flex flex-row items-center gap-2">
          <input
            id={`other`}
            className="form-radio !ring-smart-cbt-red checked:text-smart-cbt-red hover:cursor-pointer hover:text-smart-cbt-red hover:!ring-smart-cbt-red focus:!ring-smart-cbt-red"
            type="radio"
            value={RejectNegotiationSelect.other}
            checked={checked == RejectNegotiationSelect.other}
            {...register("selected")}
          />
          <label className="hover:cursor-pointer" htmlFor={`other`}>
            {t("travelMart.matchingPopup.rejectNegotiation.other")}
          </label>
        </div>
        {checked == RejectNegotiationSelect.other && (
          <textarea
            id="message"
            rows={4}
            className="block w-full rounded-lg border border-smart-cbt-medium-grey bg-white p-2 text-sm focus:border-smart-cbt-red focus:ring-smart-cbt-red"
            placeholder={t("travelMart.matchingPopup.rejectNegotiation.other")}
            {...register("other")}
          />
        )}
        <div className="flex w-full flex-row gap-4">
          <div className="w-full flex-1">
            <Button
              intent={"text"}
              type="button"
              className="w-full items-center text-black hover:underline sm:min-w-full sm:max-w-full"
              onClick={close}
            >
              {t("global.cancel")}
            </Button>
          </div>
          <div className="w-full flex-1">
            <Button
              intent={canSubmit ? "danger" : "disabled"}
              type={"submit"}
              className="w-full items-center sm:min-w-full sm:max-w-full"
              disabled={!canSubmit}
            >
              {t("travelMart.matchingPopup.rejectNegotiation.confirm")}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RejectNegotiationSelectStep;
