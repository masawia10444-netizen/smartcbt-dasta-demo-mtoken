import { useTranslations } from "next-intl";
import { BasePopup } from "../popup/BasePopup";

type FinancialProxyConfirmPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const FinancialProxyConfirmPopup = (props: FinancialProxyConfirmPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("financialProxy.popupConfirmStatus.title")}
      subTitle={t("financialProxy.popupConfirmStatus.subTitle")}
      actionButtonTitle={t("financialProxy.popupConfirmStatus.submit")}
      cancelButtonTitle={t("global.cancel")}
    />
  );
};
