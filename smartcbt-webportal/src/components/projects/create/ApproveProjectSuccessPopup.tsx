import { BasePopup } from "@/components/popup/BasePopup";

type ApproveProjectSuccessPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
  title: string;
  subTitle: string;
};

export const ApproveProjectSuccessPopup = (props: ApproveProjectSuccessPopupProps) => {
  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={props.title}
      subTitle={props.subTitle}
    />
  );
};
