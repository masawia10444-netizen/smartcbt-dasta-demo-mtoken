import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

type EmissionProxySavePopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
  setRefresh: (refresh?: string | number | null) => void;
};

export const EmissionProxySavePopup = (props: EmissionProxySavePopupProps) => {
  const timeout = useRef<NodeJS.Timeout>();
  const t = useTranslations("common");

  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      props.onClose(false);
      props.setRefresh(null);
    }, 3000);
  }, []);

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("carbon.emissionProxy.popupSaved.title")}
    />
  );
};
