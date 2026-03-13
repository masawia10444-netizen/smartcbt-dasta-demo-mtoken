import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from 'react'

type RequestNegotiationDoneStepProps = {
  onClose: (didConfirm: boolean) => void;
  type: "community" | "organization";
};

const RequestNegotiationDoneStep = (props: RequestNegotiationDoneStepProps) => {
  const tm1 = useRef<NodeJS.Timeout>()
  const tm2 = useRef<NodeJS.Timeout>()
  const router = useRouter();
  const t = useTranslations("common");

  useEffect(() => {
    clearTimeout(tm1.current)
    clearTimeout(tm2.current)
    tm1.current = setTimeout(() => props.onClose(false), 3000);
    tm2.current = setTimeout(() => {
      if (props.type === "organization") router.push("/travel-mart/business-negotiation/community?tab=waiting-accept");
      if (props.type === "community") router.push("/travel-mart/business-negotiation/entrepreneur?tab=waiting-accept");
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <CheckCircleIcon className="h-20 w-20 text-smart-cbt-green" />
      <p className="max-w-sm text-center text-smart-cbt-dark-green">
        {t("travelMart.matchingPopup.requestNegotiation.descriptionDone")}
      </p>
    </div>
  );
};

export default RequestNegotiationDoneStep;
