import { Button } from "@/components/Button";
import { WarningIcon } from "@/components/Icon";
import { adminChangeStatusCarbonProgram } from "@/utils/cms/adapters/website/carbon/program";
import { CARBON_PROGRAM_STATUS } from "@/utils/cms/adapters/website/constants";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DonePopup from "./DonePopup";
import FailPopup from "./FailPopup";

export enum ConfirmDeletePopupStep {
  confirm = "Confirm",
  done = "Done",
  fail = "Fail",
}

type ConfirmDeletePopupProps = {
  isOpen: boolean;
  id?: number;
  onClose: (isOpen: boolean) => void;
  isDeleted?: boolean;
};

const ConfirmDeletePopup = (props: ConfirmDeletePopupProps) => {
  const t = useTranslations("common");
  const [step, setStep] = useState(ConfirmDeletePopupStep.confirm);

  const close = () => props.onClose(false);

  const confirmDelete = async () => {
    if (!props.id) return;
    try {
      await adminChangeStatusCarbonProgram(
        props.id,
        props.isDeleted ? CARBON_PROGRAM_STATUS.DELETED : CARBON_PROGRAM_STATUS.REQUEST_TO_DELETE
      );
      setStep(ConfirmDeletePopupStep.done);
    } catch (error) {
      console.log(error);
      setStep(ConfirmDeletePopupStep.fail);
    }
  };

  const renderStep = () => {
    switch (step) {
      case ConfirmDeletePopupStep.confirm:
        return (
          <div className="flex w-full flex-col items-center gap-6">
            <WarningIcon className="h-14 w-14 text-smart-cbt-red" />
            <h1 className="text-xl">{t("carbon.confirmDeletePopup.title")}</h1>
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
                  intent={"danger"}
                  type={"button"}
                  className="w-full items-center sm:min-w-full sm:max-w-full"
                  size={"small"}
                  onClick={confirmDelete}
                >
                  {t("global.confirm")}
                </Button>
              </div>
            </div>
          </div>
        );
      case ConfirmDeletePopupStep.done:
        return (
          <DonePopup
            title={t("carbon.confirmDeletePopup.successTitle")}
            description={t("carbon.confirmDeletePopup.successDescription")}
            onClose={() => close()}
            redirectPath={
              props.isDeleted
                ? `/carbon-footprint/projects/manage?status=all`
                : `/carbon-footprint/projects/manage?status=${CARBON_PROGRAM_STATUS.REQUEST_TO_DELETE}`
            }
          />
        );
      case ConfirmDeletePopupStep.fail:
        return <FailPopup onClose={close} />;
    }
  };

  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
          {renderStep()}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmDeletePopup;
