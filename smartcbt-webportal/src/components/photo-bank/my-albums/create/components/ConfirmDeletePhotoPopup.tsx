import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";

type ConfirmDeletePhotoPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const ConfirmDeletePhotoPopup = (props: ConfirmDeletePhotoPopupProps) => {
  const t = useTranslations("common");

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="cross"
      actionButtonStyle="red"
      title={t("photoBank.myAlbums.popupConfirmDelete.title")}
      actionButtonTitle={t("global.confirm")}
      cancelButtonTitle={t("global.cancel")}
    />
  );
};
