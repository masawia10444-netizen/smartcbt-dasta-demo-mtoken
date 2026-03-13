import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type ProfilePhotoBankOnboardingSuccessPopupProps = {
  isOpen: boolean;
  message: string;
  onClose: (didConfirm: boolean) => void;
};

export const ProfilePhotoBankOnboardingSuccessPopup = (props: ProfilePhotoBankOnboardingSuccessPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={props.message}
    />
  );
};
