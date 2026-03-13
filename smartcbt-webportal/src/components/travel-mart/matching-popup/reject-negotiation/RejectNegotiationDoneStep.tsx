import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from 'react'

type RejectNegotiationDoneStepProps = {
  onClose: (didConfirm: boolean) => void;
};

const RejectNegotiationDoneStep = (props: RejectNegotiationDoneStepProps) => {
  const timeout = useRef<NodeJS.Timeout>()
  const t = useTranslations("common");

  useEffect(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => props.onClose(false), 3000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <CheckCircleIcon className="h-20 w-20 text-smart-cbt-green" />
      <p className="max-w-sm text-center text-smart-cbt-dark-green">
        {t("travelMart.matchingPopup.rejectNegotiation.descriptionDone")}
      </p>
    </div>
  );
};

export default RejectNegotiationDoneStep;
