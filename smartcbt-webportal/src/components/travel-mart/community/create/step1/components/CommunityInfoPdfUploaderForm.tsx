import { uploadFile } from "@/app/[locale]/(authenticated)/travel-mart/community-infos/action";
import { DeleteIcon, MaterialSymbolsUploadRounded, SolarPaperclipBold } from "@/components/Icon";
import { FileSchema } from "@/schemas/forms/community-info/create/community-info-create-schema-step1";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { ChangeEvent, useCallback, useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";

type CommunityInfoPdfUploaderFormProps<T extends FieldValues> = {
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
} & UseControllerProps<T>;

const CommunityInfoPdfUploaderForm = <T extends FieldValues>(props: CommunityInfoPdfUploaderFormProps<T>) => {
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
    ...controller
  } = props;

  const DEFAULT_ID = "pdfUpload";
  const t = useTranslations("common");
  const [isLoading, setIsLoading] = useState(false);

  const { field } = useController(controller);
  const value = field.value as FileSchema;
  const isDisabled = isLoading || disabled;

  const handleOnChange = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const formData = new FormData();
      formData.append("file", new Blob([file], { type: file.type }), file.name);
      setIsLoading(true);
      const result = await uploadFile(formData);
      setIsLoading(false);
      if (!result) return;
      field.onChange({ id: result.id, url: result.filename_disk ?? "", type: result.type ?? "" });
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
          htmlFor={props.id ?? DEFAULT_ID}
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
          id={props.id ?? DEFAULT_ID}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.files)}
          className="hidden"
          disabled={disabled}
          accept={"application/pdf"}
        />
      </div>
      {value && (
        <div className="flex items-center justify-between gap-4 bg-smart-cbt-light-grey px-2">
          <div className="flex items-center">
            <SolarPaperclipBold className="min-w-[20px] text-smart-cbt-medium-grey" />
            <Link
              className="p-2 text-smart-cbt-blue hover:underline"
              href={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.url}`}
              target="_blank"
            >
              {value.url}
            </Link>
          </div>
          <DeleteIcon
            className="min-w-[20px] text-smart-cbt-medium-grey hover:cursor-pointer"
            onClick={() => field.onChange(null)}
          />
        </div>
      )}
    </div>
  );
};

export default CommunityInfoPdfUploaderForm;
