import { XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from 'react'

type FailPopupProps = {
  message?: string;
  onClose: (didConfirm: boolean) => void;
};

const FailPopup = (props: FailPopupProps) => {
  const timeout = useRef<NodeJS.Timeout>()
  const t = useTranslations("common");

  useEffect(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => props.onClose(false), 3000);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <XCircleIcon className="h-20 w-20 text-smart-cbt-red" />
      <p className="text-center text-xl text-smart-cbt-red-3">
        {props.message ? props.message : t("carbon.rejectPopup.failMessage")}
      </p>
    </div>
  );
};

export default FailPopup;
