import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type CancelProjectPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const CancelProjectPopup = (props: CancelProjectPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="warningCircle"
      actionButtonStyle="red"
      title={t("project.create.popupCancelProject.title")}
      subTitle={t("project.create.popupCancelProject.subTitle")}
      cancelButtonTitle={t("project.create.popupCancelProject.cancelButtonTitle")}
      actionButtonTitle={t("project.create.popupCancelProject.actionButtonTitle")}
    />
  );
};
