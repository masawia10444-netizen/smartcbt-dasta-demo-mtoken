import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from 'react'

type FinancialProxySavedPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const FinancialProxySavedPopup = (props: FinancialProxySavedPopupProps) => {
  const timeout = useRef<NodeJS.Timeout>()
  const t = useTranslations("common");

  const router = useRouter();

  useEffect(() => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      props.onClose(false);
      router.refresh();
    }, 3000);
  }, []);

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("financialProxy.popupSaved.title")}
      subTitle={t("financialProxy.popupSaved.subTitle")}
    />
  );
};
