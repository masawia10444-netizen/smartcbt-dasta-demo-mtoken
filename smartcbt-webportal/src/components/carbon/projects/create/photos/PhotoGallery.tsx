import { ImageView, isImageView } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { cn } from "@/utils/cn";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { PhotoGridItem } from "./PhotoGridItem";

const IMAGE_UPLOAD = "imageUpload";

type PhotoGalleryProps<T extends FieldValues> = {
  canSetHasCover: boolean;
  setCoverPhoto: (fileName?: string) => void;
  coverPhotoName?: string;
} & UseControllerProps<T>;

const PhotoGallery = <T extends FieldValues>({
  setCoverPhoto,
  canSetHasCover,
  coverPhotoName,
  ...control
}: PhotoGalleryProps<T>) => {
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
      <div className="f lex justify-center">
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {value?.map((photo: ImageView | File, i: number) => {
            const deleteAction = () => {
              const newFiles = [...value];
              newFiles.splice(i, 1);
              onChange(newFiles);
            };

            let url = "";
            let name = "";
            if (isImageView(photo)) {
              const imageView = photo as ImageView;
              url = `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${imageView.url}`;
              name = imageView.title;
            } else {
              const file = photo as File;
              url = URL.createObjectURL(file);
              name = file.name;
            }

            const checkIsCover = name === coverPhotoName;

            return (
              <PhotoGridItem
                key={i}
                src={url}
                alt={name}
                photoName={name}
                canSetHasCover={canSetHasCover}
                setCoverPhoto={setCoverPhoto}
                deleteAction={deleteAction}
                isCoverPhoto={checkIsCover}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
