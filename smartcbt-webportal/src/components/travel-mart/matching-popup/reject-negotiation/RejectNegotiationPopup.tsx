import { useState } from "react";
import RejectNegotiationDoneStep from "./RejectNegotiationDoneStep";
import RejectNegotiationSelectStep from "./RejectNegotiationSelectStep";
import RejectNegotiationFailStep from "./RejectNegotiationFailStep";

export enum RejectNegotiationPopupStep {
  select = "Select",
  done = "Done",
  fail = "Fail",
}

type RejectNegotiationPopupProps = {
  onClose: (didConfirm: boolean) => void;
  id: string | number;
  scheduleId?: string | number;
  eventName: string;
  province: string;
  dateSection: any[];
};

const RejectNegotiationPopup = (props: RejectNegotiationPopupProps) => {
  const [step, setStep] = useState(RejectNegotiationPopupStep.select);

  const close = () => {
    props.onClose(false);
  };

  const renderStep = () => {
    switch (step) {
      case RejectNegotiationPopupStep.select:
        return (
          <RejectNegotiationSelectStep
            scheduleId={props.scheduleId}
            close={close}
            dateSection={props.dateSection}
            setStep={setStep}
          />
        );
      case RejectNegotiationPopupStep.done:
        return <RejectNegotiationDoneStep onClose={props.onClose} />;
      case RejectNegotiationPopupStep.fail:
        return <RejectNegotiationFailStep onClose={props.onClose} />;
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
          <div className="overflow-y-auto">{renderStep()}</div>
        </div>
      </div>
    </div>
  );
};

export default RejectNegotiationPopup;
