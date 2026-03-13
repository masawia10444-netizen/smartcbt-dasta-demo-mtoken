import { Button } from "@/components/Button";
import FormDateSelection from "@/components/form/appointment-negotiate/FormDateSelection";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { DateSection } from "./RequestNegotiationPopup";

type RequestNegotiationSelectStepProps<T extends FieldValues> = {
  dateSection: DateSection[];
  handleNextStep: () => void;
  close: () => void;
  canNext: boolean;
} & UseControllerProps<T>;

const RequestNegotiationSelectStep = <T extends FieldValues>({
  dateSection,
  canNext,
  close,
  handleNextStep,
  ...controller
}: RequestNegotiationSelectStepProps<T>) => {
  const t = useTranslations("common");

  return (
    <Fragment>
      <h3 className="w-full text-center text-xl font-medium text-smart-cbt-dark-green">
        {t("travelMart.matchingPopup.requestNegotiation.title")}
      </h3>
      <p className="w-full">{t("travelMart.matchingPopup.requestNegotiation.description")}</p>
      <div className="max-h-[70vh] overflow-y-auto scroll-smooth px-2">
        <FormDateSelection dateSection={dateSection} {...controller} />
      </div>
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
            intent={canNext ? "primary" : "disabled"}
            type={"button"}
            onClick={handleNextStep}
            className="w-full items-center sm:min-w-full sm:max-w-full"
            disabled={!canNext}
          >
            {t("travelMart.matchingPopup.requestNegotiation.send")}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default RequestNegotiationSelectStep;
