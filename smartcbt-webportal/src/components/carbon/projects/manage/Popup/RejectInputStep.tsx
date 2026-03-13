import { Button } from "@/components/Button";
import { ProjectRejectPopupSchema } from "@/schemas/forms/carbon/projects/project-reject-popup-schema";
import { adminChangeStatusCarbonProgram } from "@/utils/cms/adapters/website/carbon/program";
import { CARBON_PROGRAM_STATUS } from "@/utils/cms/adapters/website/constants";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { RejectProjectPopupStep } from "./RejectPopup";

type RejectInputStepProps = {
  id?: number;
  setStep: (step: RejectProjectPopupStep) => void;
  close: () => void;
};

const RejectInputStep = ({ id, setStep, close }: RejectInputStepProps) => {
  const t = useTranslations("common");

  const { control, watch, getValues, register } = useForm<ProjectRejectPopupSchema>({
    defaultValues: {
      reason: undefined,
    },
  });

  const canSubmit = watch("reason") != undefined;

  const onSubmit = async () => {
    if (!id) return;
    const data = getValues();
    try {
      await adminChangeStatusCarbonProgram(id, CARBON_PROGRAM_STATUS.REJECTED, data.reason);
      setStep(RejectProjectPopupStep.done);
    } catch (error) {
      console.log(error);
      setStep(RejectProjectPopupStep.fail);
    }
  };

  return (
    <form className="mb-4 flex w-full flex-col items-center gap-4" onSubmit={onSubmit}>
      <XCircleIcon className="h-1w-14 w-14 text-smart-cbt-red" />
      <h1 className="text-xl">{t("carbon.rejectPopup.title")}</h1>
      <h3 className="text-lg font-thin text-[#8C8C8C]">{t("carbon.rejectPopup.description")}</h3>
      <textarea
        className="w-full border border-smart-cbt-medium-grey p-2"
        {...register("reason")}
        rows={5}
        placeholder={t("carbon.rejectPopup.description")}
      />
      <div className="flex w-full flex-row gap-4">
        <div className="w-full flex-1">
          <Button
            intent={"tertiary"}
            type="button"
            className="w-full items-center text-black hover:underline sm:min-w-full sm:max-w-full"
            onClick={close}
            size={"small"}
          >
            {t("global.cancel")}
          </Button>
        </div>
        <div className="w-full flex-1">
          <Button
            intent={canSubmit ? "danger" : "disabled"}
            type={"button"}
            onClick={onSubmit}
            className="w-full items-center sm:min-w-full sm:max-w-full"
            disabled={!canSubmit}
            size={"small"}
          >
            {t("global.confirm")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default RejectInputStep;
