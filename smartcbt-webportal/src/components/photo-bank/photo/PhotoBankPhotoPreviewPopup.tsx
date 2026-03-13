import { CloseIcon } from "@/components/Icon";
import { Dialog } from "@headlessui/react";
import Image from "@/components/image";

type PhotoBankPhotoPreviewPopupProps = {
  filePath: string;
  isOpen: boolean;
  onCloseButtonClicked: () => void;
};

export const PhotoBankPhotoPreviewPopup = (props: PhotoBankPhotoPreviewPopupProps) => {
  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50" onClick={() => props.onCloseButtonClicked()}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="flex max-h-[80%] max-w-[90%] flex-col justify-center gap-4">
          <div className="flex flex-row justify-end gap-2">
            <CloseIcon
              className="h-8 w-8 text-white hover:cursor-pointer"
              onClick={() => props.onCloseButtonClicked()}
            />
          </div>
          <div className="flex flex-row gap-2 ">
            <div className="relative h-[624px] w-[832px]">
              <Image
                style={{ objectFit: "cover" }}
                src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${props.filePath}`}
                fill
                alt=""
              />
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PhotoBankPhotoPreviewPopup;
