import { Button } from "@/components/Button";
import { WarningIcon } from "@/components/Icon";
import { adminChangeStatusCarbonProgram } from "@/utils/cms/adapters/website/carbon/program";
import { CARBON_PROGRAM_STATUS } from "@/utils/cms/adapters/website/constants";
import { useTranslations } from "next-intl";
import { ApproveProjectPopupStep } from "./ApprovePopup";

type ApproveChoiceStepProps = {
  id?: number;
  setStep: (step: ApproveProjectPopupStep) => void;
  onClose: (didConfirm: boolean) => void;
};

const ApproveChoiceStep = ({ setStep, id, onClose }: ApproveChoiceStepProps) => {
  const t = useTranslations("common");

  const approve = async () => {
    if (!id) return;
    try {
      await adminChangeStatusCarbonProgram(id, CARBON_PROGRAM_STATUS.APPROVAL);
      setStep(ApproveProjectPopupStep.done);
    } catch (error) {
      console.log(error);
      setStep(ApproveProjectPopupStep.fail);
    }
  };

  const close = () => onClose(false);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <WarningIcon className="h-14 w-14 text-smart-cbt-orange" />
      <h1 className="text-xl">{t("carbon.approvePopup.title")}</h1>
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
            intent={"primary"}
            type={"button"}
            className="w-full items-center sm:min-w-full sm:max-w-full"
            size={"small"}
            onClick={approve}
          >
            {t("global.confirm")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ApproveChoiceStep;
