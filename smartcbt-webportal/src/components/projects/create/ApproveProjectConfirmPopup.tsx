import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type ApproveProjectConfirmPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const ApproveProjectConfirmPopup = (props: ApproveProjectConfirmPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("project.create.popupConfirmApproval.title")}
      subTitle={t("project.create.popupConfirmApproval.subTitle")}
      actionButtonTitle={t("project.create.popupConfirmApproval.submit")}
      cancelButtonTitle={t("global.cancel")}
    />
  );
};
