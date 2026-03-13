import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

type EmissionProxyPublishSuccessPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const EmissionProxyPublishSuccessPopup = (props: EmissionProxyPublishSuccessPopupProps) => {
  const timeout = useRef<NodeJS.Timeout>();
  const t = useTranslations("common");

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => props.onClose(false), 3000);
  }, []);

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("carbon.emissionProxy.popupSuccessStatus.title")}
    />
  );
};
