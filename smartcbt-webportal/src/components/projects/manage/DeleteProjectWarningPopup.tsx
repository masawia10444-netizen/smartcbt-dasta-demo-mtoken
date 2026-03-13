import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type DeleteProjectWarningPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const DeleteProjectWarningPopup = (props: DeleteProjectWarningPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="cross"
      actionButtonStyle="red"
      title={t("project.manage.popupWarningDelete.title")}
      subTitle={t("project.manage.popupWarningDelete.subTitle")}
      actionButtonTitle={t("global.confirm")}
      cancelButtonTitle={t("global.cancel")}
    />
  );
};
