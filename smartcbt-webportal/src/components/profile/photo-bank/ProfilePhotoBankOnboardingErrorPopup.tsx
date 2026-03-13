import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type ProfilePhotoBankOnboardingErrorPopupProps = {
  isOpen: boolean;
  message: string;
  onClose: (didConfirm: boolean) => void;
};

export const ProfilePhotoBankOnboardingErrorPopup = (props: ProfilePhotoBankOnboardingErrorPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="cross"
      actionButtonStyle="green"
      title={props.message}
    />
  );
};
