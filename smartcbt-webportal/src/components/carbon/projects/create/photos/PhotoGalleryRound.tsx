import { ImageView } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { cn } from "@/utils/cn";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { PhotoGridItem } from "./PhotoGridItem";

const IMAGE_UPLOAD = "imageUpload";

type PhotoGalleryRoundProps<T extends FieldValues> = {
  canSetHasCover: boolean;
  setCoverPhoto: (fileName?: string) => void;
  coverPhotoName?: string;
} & UseControllerProps<T>;

const PhotoGalleryRound = <T extends FieldValues>({
  setCoverPhoto,
  canSetHasCover,
  coverPhotoName,
  ...control
}: PhotoGalleryRoundProps<T>) => {
  const {
    field: { onChange, value },
  } = useController(control);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = [...value, ...files];
      onChange(newFiles);
    }
  };
  const t = useTranslations("common");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full justify-end">
        <label
          htmlFor={IMAGE_UPLOAD}
          className={cn(
            "flex h-10 w-fit cursor-pointer gap-2 rounded-lg border border-smart-cbt-green p-2 text-base text-smart-cbt-green"
            //   disabled ? "text-smart-cbt-light-green-grey cursor-not-allowed" : "cursor-pointer text-black",
            //   labelClassName
          )}
        >
          <PlusIcon className={cn("h-6 w-6 text-smart-cbt-green")} />
          {t("carbon.create.photo.createAlbum")}
        </label>
        <input type="file" id={IMAGE_UPLOAD} onChange={handleFileChange} className="hidden" multiple />
      </div>
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {value?.map((photo: File | ImageView, i: number) => {
            const deleteAction = () => {
              const newFiles = [...value];
              newFiles.splice(i, 1);
              onChange(newFiles);
            };

            const isImageView = (photo as ImageView)?.id && (photo as ImageView)?.url;

            return (
              <PhotoGridItem
                key={i}
                src={
                  isImageView
                    ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${(photo as ImageView)?.url}`
                    : photo instanceof File
                    ? URL.createObjectURL(photo)
                    : ""
                }
                alt={isImageView ? (photo as ImageView)?.title : (photo as File).name}
                photoName={isImageView ? (photo as ImageView)?.title : (photo as File).name}
                canSetHasCover={canSetHasCover}
                setCoverPhoto={setCoverPhoto}
                deleteAction={deleteAction}
                isCoverPhoto={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryRound;
