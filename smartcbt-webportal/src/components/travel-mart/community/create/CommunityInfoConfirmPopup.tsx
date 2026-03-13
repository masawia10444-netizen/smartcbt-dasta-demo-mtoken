import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type CommunityInfoConfirmPopupProps = {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
};

export const CommunityInfoConfirmPopup = (props: CommunityInfoConfirmPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="warningTriangle"
      actionButtonStyle="green"
      title={props.message}
      actionButtonTitle={t("global.confirm")}
      cancelButtonTitle={t("global.cancel")}
      onSubmit={props.onConfirm}
    />
  );
};
