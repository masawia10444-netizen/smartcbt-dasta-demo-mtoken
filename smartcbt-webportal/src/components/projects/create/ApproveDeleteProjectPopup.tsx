import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type ApproveDeleteProjectPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const ApproveDeleteProjectPopup = (props: ApproveDeleteProjectPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="cross"
      actionButtonStyle="red"
      title={t("project.create.popupApproveDelete.title")}
      actionButtonTitle={t("global.confirm")}
      cancelButtonTitle={t("global.cancel")}
    />
  );
};
