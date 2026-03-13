import { useState } from "react";
import AcceptNegotiationCheckInformationStep from "./AcceptNegotiationCheckStep";
import AcceptNegotiationDoneStep from "./AcceptNegotiationDoneStep";
import AcceptNegotiationFailStep from "./AccpetNegotiationFailStep";

export enum AcceptNegotiationPopupStep {
  check = "Check",
  done = "Done",
  fail = "Fail",
}

type AcceptNegotiationPopupProps = {
  onClose: (didConfirm: boolean) => void;
  id: string | number;
  scheduleId?: string | number;
  eventName: string;
  type?: string;
  entrepreneur?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
};

const AcceptNegotiationPopup = (props: AcceptNegotiationPopupProps) => {
  const [step, setStep] = useState(AcceptNegotiationPopupStep.check);

  const close = () => {
    props.onClose(false);
  };

  const renderStep = () => {
    switch (step) {
      case AcceptNegotiationPopupStep.check:
        return <AcceptNegotiationCheckInformationStep close={close} setStep={setStep} {...props} />;
      case AcceptNegotiationPopupStep.done:
        return <AcceptNegotiationDoneStep onClose={props.onClose} />;
      case AcceptNegotiationPopupStep.fail:
        return <AcceptNegotiationFailStep onClose={props.onClose} />;
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

export default AcceptNegotiationPopup;
