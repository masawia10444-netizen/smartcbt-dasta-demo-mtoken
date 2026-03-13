import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type PhotoBankAlbumErrorPopupProps = {
  isOpen: boolean;
  message: string;
  onClose: (didConfirm: boolean) => void;
};

export const PhotoBankAlbumErrorPopup = (props: PhotoBankAlbumErrorPopupProps) => {
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
