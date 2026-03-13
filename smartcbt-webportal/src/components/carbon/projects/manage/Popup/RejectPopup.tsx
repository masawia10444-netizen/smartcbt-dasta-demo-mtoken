import { CARBON_PROGRAM_STATUS } from "@/utils/cms/adapters/website/constants";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import DonePopup from "./DonePopup";
import FailPopup from "./FailPopup";
import RejectInputStep from "./RejectInputStep";

export enum RejectProjectPopupStep {
  input = "Input",
  done = "Done",
  fail = "Fail",
}

type RejectPopupProps = {
  isOpen: boolean;
  id?: number;
  onClose: (isOpen: boolean) => void;
};

const RejectPopup = (props: RejectPopupProps) => {
  const t = useTranslations("common");
  const [step, setStep] = useState(RejectProjectPopupStep.input);

  const close = () => {
    props.onClose(false);
  };

  const renderStep = () => {
    switch (step) {
      case RejectProjectPopupStep.input:
        return <RejectInputStep id={props.id} setStep={setStep} close={close} />;
      case RejectProjectPopupStep.done:
        return (
          <DonePopup
            title={t("carbon.rejectPopup.successTitle")}
            description={t("carbon.rejectPopup.successDescription")}
            onClose={props.onClose}
            redirectPath={`/carbon-footprint/projects/manage?status=${CARBON_PROGRAM_STATUS.REJECTED}`}
          />
        );
      case RejectProjectPopupStep.fail:
        return <FailPopup onClose={props.onClose} />;
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

export default RejectPopup;
