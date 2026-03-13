import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from 'react'

type AcceptNegotiationFailStepProps = {
  onClose: (didConfirm: boolean) => void;
};

const AcceptNegotiationFailStep = (props: AcceptNegotiationFailStepProps) => {
  const timeout = useRef<NodeJS.Timeout>()
  const t = useTranslations("common");

  useEffect(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => props.onClose(false), 3000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <XCircleIcon className="h-20 w-20 text-smart-cbt-red" />
      <p className="max-w-sm text-center text-smart-cbt-red-3">
        {t("travelMart.matchingPopup.acceptNegotiation.descriptionFail")}
      </p>
    </div>
  );
};

export default AcceptNegotiationFailStep;
