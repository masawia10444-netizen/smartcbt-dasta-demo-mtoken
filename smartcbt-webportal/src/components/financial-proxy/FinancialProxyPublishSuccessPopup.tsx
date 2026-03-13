import { useTranslations } from "next-intl";
import { BasePopup } from "../popup/BasePopup";

type FinancialProxyPublishSuccessPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const FinancialProxyPublishSuccessPopup = (props: FinancialProxyPublishSuccessPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("financialProxy.popupSuccessStatus.title")}
      subTitle={t("financialProxy.popupSuccessStatus.subTitle")}
    />
  );
};
