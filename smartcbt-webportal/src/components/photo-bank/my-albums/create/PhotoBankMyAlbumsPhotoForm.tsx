import { FormFieldError } from "@/components/form/FormFieldError";
import { Image } from "@/models/photo-bank/photo-bank-albums";
import { PhotoBankMyAlbumsSchema } from "@/schemas/forms/photo-bank/my-albums/photo-bank-my-albums-schema";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import PhotoBankMyAlbumsPhotoUploader from "./components/PhotoBankMyAlbumsPhotoUploader";

type PhotoBankMyAlbumsPhotoFormProps = {
  images?: Image[] | null;
  areFieldsDisabled: boolean;
};

const PhotoBankMyAlbumsPhotoForm = (props: PhotoBankMyAlbumsPhotoFormProps) => {
  const t = useTranslations("common");
  const { images, areFieldsDisabled } = props;

  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<PhotoBankMyAlbumsSchema>();

  useEffect(() => {
    images && setValue("files", images.map((value) => ({ id: value.id, type: value.type, url: value.url })) as any);
  }, []);

  return (
    <div className="flex flex-col">
      <PhotoBankMyAlbumsPhotoUploader control={control} name="files" disabled={areFieldsDisabled} />
      <FormFieldError error={errors.files?.message} />
    </div>
  );
};

export default PhotoBankMyAlbumsPhotoForm;
