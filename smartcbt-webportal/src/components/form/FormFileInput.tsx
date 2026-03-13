import { FileSchema } from "@/schemas/forms/shard-schema";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { ChangeEvent, useCallback, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { DeleteIcon, MaterialSymbolsUploadRounded, SolarPaperclipBold } from "../Icon";
import { uploadFile, uploadFileForFinancialProxy } from "./FormFileInputAction";

type FormFileInputProps<T extends FieldValues> = {
  id?: string;
  onLoading: (isLoading: boolean) => void;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  icon?: JSX.Element;
  iconClassName?: string;
  hideTitle?: boolean;
  title?: string;
  labelText?: string;
  required?: boolean;
  folderName?: string;
  isSiaProxy?: boolean;
} & UseControllerProps<T>;

const IMAGE_UPLOAD = "imageUpload";
const ImageInputForm = <T extends FieldValues>(props: FormFileInputProps<T>) => {
  const {
    id,
    onLoading,
    className,
    labelClassName,
    labelText,
    hideTitle,
    icon,
    iconClassName,
    disabled,
    title,
    folderName,
    ...controller
  } = props;
  const t = useTranslations("common");
  const [isLoading, setIsLoading] = useState(false);

  const { field } = useController(controller);
  const value = field.value as FileSchema[];
  const isDisabled = isLoading || disabled;

  const handleOnChange = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      if (!folderName) return;
      onLoading(true);

      const file = files[0];
      const formData = new FormData();
      formData.append("file", new Blob([file], { type: file.type }), file.name);

      const result = props.isSiaProxy
        ? await uploadFileForFinancialProxy(folderName, formData)
        : await uploadFile(folderName, formData);

      if (!result) return;
      field.onChange([
        ...value,
        { id: result.id, url: result.filename_disk ?? "", type: result.type ?? "", title: result.title ?? "" },
      ]);
      onLoading(false);
    },
    [value]
  );

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-center gap-4">
        {!hideTitle && (
          <label className={cn("text-base text-black", labelClassName)}>
            {title ? title : t("global.uploadReferenceFile")}
            {props.required && <span className="text-smart-cbt-red"> *</span>}
          </label>
        )}
        <label
          htmlFor={props.id ?? IMAGE_UPLOAD}
          className={cn(
            "flex h-10 w-fit gap-2 rounded-lg border border-smart-cbt-medium-grey p-2 text-base text-black",
            disabled ? "text-smart-cbt-light-green-grey cursor-not-allowed" : "cursor-pointer text-black",
            labelClassName
          )}
        >
          {icon ? icon : <MaterialSymbolsUploadRounded className={cn("text-smart-cbt-medium-grey", iconClassName)} />}
          {labelText ? labelText : t("global.upload")}
        </label>
        <input
          type="file"
          id={props.id ?? IMAGE_UPLOAD}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.files)}
          className="hidden"
          disabled={disabled}
          multiple
        />
      </div>
      {value.map((file, i) => (
        <div className="flex items-center justify-between gap-4 bg-smart-cbt-light-grey px-2" key={i}>
          <div className="flex items-center">
            <SolarPaperclipBold className="min-w-[20px] text-smart-cbt-medium-grey" />
            <Link
              className="p-2 text-smart-cbt-blue hover:underline"
              href={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${file.url}`}
              target="_blank"
            >
              {file.title}
            </Link>
          </div>
          <DeleteIcon
            className="min-w-[20px] text-smart-cbt-medium-grey hover:cursor-pointer"
            onClick={() => {
              const newFiles = [...value];
              newFiles.splice(i, 1);
              field.onChange(newFiles);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageInputForm;
