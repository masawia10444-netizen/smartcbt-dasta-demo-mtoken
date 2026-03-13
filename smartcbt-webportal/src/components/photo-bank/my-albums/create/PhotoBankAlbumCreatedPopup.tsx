import { BasePopup } from "@/components/popup/BasePopup";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

type PhotoBankAlbumCreatedPopupProps = {
  isOpen: boolean;
  onClose: (didConfirm: boolean) => void;
};

export const PhotoBankAlbumCreatedPopup = (props: PhotoBankAlbumCreatedPopupProps) => {
  const t = useTranslations("common");
  const delayInMilliseconds = 3000;

  useEffect(() => {
    setTimeout(() => props.onClose(false), delayInMilliseconds);
  }, []);

  return (
    <BasePopup
      isOpen={props.isOpen}
      onClose={props.onClose}
      iconStyle="checkmark"
      actionButtonStyle="green"
      title={t("photoBank.myAlbums.create.popup.albumCreated.title")}
    />
  );
};
