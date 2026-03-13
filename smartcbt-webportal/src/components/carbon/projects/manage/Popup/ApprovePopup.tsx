import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ApproveChoiceStep from "./ApproveChoiceStep";
import DonePopup from "./DonePopup";
import FailPopup from "./FailPopup";
import { CARBON_PROGRAM_STATUS } from "@/utils/cms/adapters/website/constants";

export enum ApproveProjectPopupStep {
  select = "Select",
  done = "Done",
  fail = "Fail",
}

type ApprovePopupProps = {
  isOpen: boolean;
  id?: number;
  onClose: (isOpen: boolean) => void;
};

const ApprovePopup = (props: ApprovePopupProps) => {
  const t = useTranslations("common");
  const [step, setStep] = useState(ApproveProjectPopupStep.select);

  const close = () => props.onClose(false);

  const renderStep = () => {
    switch (step) {
      case ApproveProjectPopupStep.select:
        return <ApproveChoiceStep id={props.id} setStep={setStep} onClose={close} />;
      case ApproveProjectPopupStep.done:
        return (
          <DonePopup
            title={t("carbon.approvePopup.successTitle")}
            description={t("carbon.approvePopup.successDescription")}
            onClose={() => close()}
            redirectPath={`/carbon-footprint/projects/manage?status=${CARBON_PROGRAM_STATUS.APPROVAL}`}
          />
        );
      case ApproveProjectPopupStep.fail:
        return <FailPopup onClose={close} />;
    }
  };

  return (
    <Dialog open={props.isOpen} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
          {renderStep()}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ApprovePopup;
