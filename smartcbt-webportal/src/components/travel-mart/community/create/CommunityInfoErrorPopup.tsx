import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type CommunityInfoErrorPopupProps = {
  isOpen: boolean;
  message: string;
  onClose: (didConfirm: boolean) => void;
};

export const CommunityInfoErrorPopup = (props: CommunityInfoErrorPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="cross"
      actionButtonStyle="red"
      title={props.message}
      actionButtonTitle={t("global.ok")}
    />
  );
};
