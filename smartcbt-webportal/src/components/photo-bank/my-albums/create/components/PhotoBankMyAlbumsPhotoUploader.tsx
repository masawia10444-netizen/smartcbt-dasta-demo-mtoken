import { DeleteIcon } from "@/components/Icon";
import LoadingSpinner from "@/components/LoadingSpinner";
import { uploadFile } from "@/components/form/FormFileInputAction";
import Image from "@/components/image";
import { ApproveDeleteProjectPopup } from "@/components/projects/create/ApproveDeleteProjectPopup";
import { FileSchema } from "@/schemas/forms/shard-schema";
import { deleteFileById } from "@/utils/cms/cms-api-adapter";
import { toastError, toastSuccess } from "@/utils/helper";
import PlusIcon from "@heroicons/react/24/outline/PlusIcon";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type PhotoBankMyAlbumsPhotoUploaderProps<T extends FieldValues> = {
  maximumFiles?: number;
  disabled?: boolean;
} & UseControllerProps<T>;

const PhotoBankMyAlbumsPhotoUploader = <T extends FieldValues>(props: PhotoBankMyAlbumsPhotoUploaderProps<T>) => {
  const t = useTranslations("common");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFileIndex, setSelectedFileIndex] = useState(-1);

  const { maximumFiles, disabled, ...controller } = props;
  const { field } = useController(controller);
  const value = field.value as FileSchema[];
  const allowedImageFileTypes = "image/*";
  const folderName = "Photo Bank";

  const upload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const formData = new FormData();
    formData.append("file", new Blob([file], { type: file.type }), file.name);
    const result = await uploadFile(folderName, formData);
    if (!result) return;
    field.onChange([...value, { id: result.id, url: result.filename_disk ?? "", type: result.type ?? "" }]);
  };

  const remove = (fileIndex: number) => {
    setSelectedFileIndex(fileIndex);
    setShowDeletePopup(true);
  };

  const handleRemove = async (disConfirm: boolean) => {
    setIsLoading(true);

    if (!disConfirm || selectedFileIndex == -1) {
      setSelectedFileIndex(-1);
      setShowDeletePopup(false);
      return;
    }

    const file = value[selectedFileIndex];
    const fileId = file.url.split(".")[0];

    try {
      await deleteFileById(fileId);
      toastSuccess(t("photoBank.myAlbums.deleteSuccessMessage"));
      const remainingImages: any = value.filter((value) => value.id != file.id);
      field.onChange(remainingImages);
    } catch (e) {
      toastError(t("photoBank.myAlbums.deleteFailedMessage"));
    } finally {
      setSelectedFileIndex(-1);
      setShowDeletePopup(false);
      setIsLoading(false);
    }
  };

  const renderUploadButton = () => (
    <label
      htmlFor={field.name}
      className={`flex h-60 w-full flex-col items-center justify-center border-2 border-dashed border-smart-cbt-green text-center hover:cursor-pointer`}
    >
      <Image src={"/images/photo-bank/image-plus.png"} alt={"DASTA"} width={80} height={80} />
      <div className="flex flex-row gap-2">
        <div className="text-base font-normal text-smart-cbt-green">
          {t("photoBank.myAlbums.create.uploadByClicked")}
        </div>
        <div className="text-base font-normal">{t("photoBank.myAlbums.create.uploadByDragged")}</div>
      </div>
      <input
        id={field.name}
        type="file"
        className="hidden"
        accept={allowedImageFileTypes}
        disabled={disabled}
        onChange={(e) => upload(e.target.files)}
      />
    </label>
  );

  const renderImageGrid = () => (
    <div className="grid grid-cols-4 gap-4">
      {showDeletePopup && <ApproveDeleteProjectPopup isOpen={showDeletePopup} onClose={handleRemove} />}
      {value.map((value, index) => (
        <div key={index} className={`relative h-36 w-full overflow-hidden rounded-xl`}>
          <Image
            style={{ objectFit: "cover" }}
            src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.url}`}
            fill
            alt=""
          />
          <DeleteIcon
            className="absolute bottom-2 right-2 h-10 w-10 rounded-full bg-black bg-opacity-60 p-2 text-white hover:cursor-pointer"
            onClick={() => (!disabled ? remove(index) : () => {})}
          />
        </div>
      ))}
      <label
        htmlFor={field.name}
        className={`flex h-36 w-full flex-col items-center justify-center rounded-xl bg-smart-cbt-light-grey hover:cursor-pointer`}
      >
        <PlusIcon className="h-5 w-5" />
      </label>
      <input
        id={field.name}
        type="file"
        className="hidden"
        accept={allowedImageFileTypes}
        disabled={disabled}
        onChange={(e) => upload(e.target.files)}
      />
    </div>
  );

  // return <div>{value.length === 0 ? renderUploadButton() : renderImageGrid()}</div>;
  return (
    <div className="h-60">
      {isLoading ? <LoadingSpinner /> : value.length === 0 ? renderUploadButton() : renderImageGrid()}
    </div>
  );
};

export default PhotoBankMyAlbumsPhotoUploader;
