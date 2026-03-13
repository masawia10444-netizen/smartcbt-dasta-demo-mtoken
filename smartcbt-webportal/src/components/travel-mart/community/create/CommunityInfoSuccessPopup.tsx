import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type CommunityInfoSuccessPopupProps = {
  isOpen: boolean;
  message: string;
  onClose: () => void;
};

export const CommunityInfoSuccessPopup = (props: CommunityInfoSuccessPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={props.message}
      actionButtonTitle={t("global.ok")}
    />
  );
};
