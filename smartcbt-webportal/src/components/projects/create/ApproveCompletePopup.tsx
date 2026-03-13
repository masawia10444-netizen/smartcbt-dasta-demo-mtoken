import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type ApproveDeleteProjectPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const ApproveCompletePopup = (props: ApproveDeleteProjectPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("project.create.popupDone.title")}
      actionButtonTitle={t("global.confirm")}
      cancelButtonTitle={t("global.cancel")}
    />
  );
};
