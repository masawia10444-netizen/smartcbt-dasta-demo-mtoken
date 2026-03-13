import { useState } from "react";
import ConfirmCancelNegotiationConfirmStep from "./ConfirmCancelNegotiationConfirmStep";
import ConfirmCancelNegotiationDoneStep from "./ConfirmCancelNegotiationDoneStep";
import ConfirmCancelNegotiationFailStep from "./ConfirmCancelNegotiationFailStep";

export enum ConfirmCancelNegotiationPopupStep {
  confirm = "Confirm",
  done = "Done",
  fail = "Fail",
}

type ConfirmCancelNegotiationPopupProps = {
  onClose: (didConfirm: boolean) => void;
  scheduleId: string | number;
};

const ConfirmCancelNegotiationPopup = (props: ConfirmCancelNegotiationPopupProps) => {
  const [step, setStep] = useState(ConfirmCancelNegotiationPopupStep.confirm);

  const close = () => {
    props.onClose(false);
  };

  const renderStep = () => {
    switch (step) {
      case ConfirmCancelNegotiationPopupStep.confirm:
        return <ConfirmCancelNegotiationConfirmStep close={close} setStep={setStep} {...props} />;
      case ConfirmCancelNegotiationPopupStep.done:
        return <ConfirmCancelNegotiationDoneStep onClose={props.onClose} />;
      case ConfirmCancelNegotiationPopupStep.fail:
        return <ConfirmCancelNegotiationFailStep onClose={props.onClose} />;
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

export default ConfirmCancelNegotiationPopup;
