import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type EmissionProxyConfirmPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const EmissionProxyConfirmPopup = (props: EmissionProxyConfirmPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("carbon.emissionProxy.popupUpdateStatusConfirm.title")}
      actionButtonTitle={t("global.confirm")}
      cancelButtonTitle={t("global.cancel")}
    />
  );
};
