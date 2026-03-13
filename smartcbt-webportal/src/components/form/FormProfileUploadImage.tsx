import Image from "@/components/image";
import { FileSchema } from "@/schemas/forms/shard-schema";
import { cn } from "@/utils/cn";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { ChangeEvent, useCallback } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { uploadFile } from "./FormFileInputAction";

type FormProfileUploadImageProps<T extends FieldValues> = {
  id?: string;
  disabled?: boolean;
  onLoading: (isLoading: boolean) => void;
  folderName: string;
} & UseControllerProps<T>;

const FormProfileUploadImage = <T extends FieldValues>({
  id,
  disabled,
  onLoading,
  folderName,
  ...controller
}: FormProfileUploadImageProps<T>) => {
  const defaultId = "imageUpload";
  const t = useTranslations("common");
  const { field } = useController(controller);

  const value = field.value as FileSchema;

  const handleOnChange = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const formData = new FormData();
      formData.append("file", new Blob([file], { type: file.type }), file.name);
      const result = await uploadFile(folderName, formData);
      if (!result) return;
      field.onChange({ id: result.id, url: result.filename_disk ?? "", type: result.type ?? "" });
    },
    [value]
  );

  return (
    <label
      htmlFor={id ?? defaultId}
      className={cn(
        "relative flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-full bg-smart-cbt-light-grey p-5 text-center hover:cursor-pointer",
        disabled && "hover:cursor-not-allowed"
      )}
    >
      {value != null ? (
        <>
          <Image
            key={value.id}
            src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.url}`}
            alt={value.id}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-full"
          />
          {!disabled && (
            <XMarkIcon
              className="absolute right-7 top-5 z-10 h-6 w-6 text-smart-cbt-red hover:cursor-pointer"
              onClick={() => field.onChange(null)}
            />
          )}
        </>
      ) : (
        <>
          <input
            type="file"
            id={id ?? defaultId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.files)}
            className="hidden"
            disabled={disabled}
            multiple
          />
          <PlusIcon className="h-5 w-5" />
          <span className="text-sm">{t("global.profileUpload")}</span>
        </>
      )}
    </label>
  );
};

export default FormProfileUploadImage;
