import { useState } from "react";
import ConfirmRescheduleCheckConfirmStep from "./ConfirmRescheduleConfirmStep";
import ConfirmRescheduleDoneStep from "./ConfirmRescheduleDoneStep";
import ConfirmRescheduleFailStep from "./ConfirmRescheduleFailStep";

export enum ConfirmReschedulePopupStep {
  confirm = "Confirm",
  done = "Done",
  fail = "Fail",
}

type ConfirmReschedulePopupProps = {
  onClose: (didConfirm: boolean) => void;
  scheduleId: string | number;
  date?: string | undefined;
  time?: string | undefined;
  activity?: string | undefined;
  entrepreneur?: string | undefined;
  type?: "community" | "organization";
  businessType?: string | undefined | null;
};

const ConfirmReschedulePopup = (props: ConfirmReschedulePopupProps) => {
  const [step, setStep] = useState(ConfirmReschedulePopupStep.confirm);

  const close = () => {
    props.onClose(false);
  };

  const renderStep = () => {
    switch (step) {
      case ConfirmReschedulePopupStep.confirm:
        return <ConfirmRescheduleCheckConfirmStep close={close} setStep={setStep} {...props} />;
      case ConfirmReschedulePopupStep.done:
        return <ConfirmRescheduleDoneStep onClose={props.onClose} />;
      case ConfirmReschedulePopupStep.fail:
        return <ConfirmRescheduleFailStep onClose={props.onClose} />;
    }
  };

  return (
    <div className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 p-4">
        {/* The actual dialog panel  */}
        <div className="relative mx-auto flex max-h-full min-h-fit min-w-[350px] max-w-[42rem] flex-col gap-5 rounded-xl bg-white p-8 font-prompt ">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default ConfirmReschedulePopup;
