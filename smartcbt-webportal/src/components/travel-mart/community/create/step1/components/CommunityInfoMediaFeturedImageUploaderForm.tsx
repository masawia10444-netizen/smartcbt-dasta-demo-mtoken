import { uploadFile } from "@/app/[locale]/(authenticated)/travel-mart/community-infos/action";
import { Button } from "@/components/Button";
import {
  CheckIconCircle,
  CloseIcon,
  DeleteIcon,
  WarningIcon,
} from "@/components/Icon";
import { FormLabel } from "@/components/form/FormLabel";
import { FileSchema } from "@/schemas/forms/community-info/create/community-info-create-schema-step1";
import { cn } from "@/utils/cn";
import { Dialog } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import { isEmpty } from "lodash";

enum Mode {
  Add,
  Delete,
}

type CommunityInfoMediaFeturedImageUploaderFormProps<T extends FieldValues> = {
  mediaType: "image" | "video";
  disabled?: boolean;
} & UseControllerProps<T>;

const CommunityInfoMediaFeturedImageUploaderForm = <T extends FieldValues>(
  props: CommunityInfoMediaFeturedImageUploaderFormProps<T>
) => {
  const t = useTranslations("common");
  const { ...controller } = props;
  const { field } = useController(controller);
  const [mode, setMode] = useState<Mode>(Mode.Add);
  const [showDeleteFileConfirmPopup, setShowDeleteFileConfirmPopup] = useState(false);
  const [showDeletionSuccessPopup, setShowDeletionSuccessPopup] = useState(false);
  const [showPreviewFilesPopup, setShowPreviewFilesPopup] = useState<number | null>();
  const [showDeletePreviewFileConfirmPopup, setShowDeletePreviewFileConfirmPopup] = useState<FileSchema | null>();
  let fieldValue = field.value as FileSchema;
  const allowedImageFileTypes = "image/*";


  const handleRemove = () => {
    field.onChange(null);
    setShowDeletionSuccessPopup(true);
    toggleMode();
  };
  const toggleMode = () => {
    setMode(mode == Mode.Add ? Mode.Delete : Mode.Add);
  };



  const uploadImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", new Blob([file], { type: file.type }), file.name);

    const result = await uploadFile(formData);
    if (!result) return;
    fieldValue = {
      id: result.id,
      url: result.filename_disk ?? "",
      type: result.type ?? "",
    }
    field.onChange(fieldValue);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="flex items-center justify-between ">
        <FormLabel>{ t("community.info.create.step1.featuredImage")}</FormLabel>
        <div className="item-center flex gap-4">
          {mode == Mode.Add && !isEmpty(fieldValue) && (
            <Button
              onClick={toggleMode}
              size="small"
              intent="tertiary"
              className="border-smart-cbt-red text-smart-cbt-red"
              icon={<DeleteIcon />}
            >
              {t("community.info.create.step1.deleteImageLabel")}
            </Button>
          )}
          {mode == Mode.Delete && (
            <>
              <Button onClick={toggleMode} size="small" intent="text" className="text-smart-cbt-dark-grey">
                {t("global.cancel")}
              </Button>
              <Button
                onClick={() => setShowDeleteFileConfirmPopup(true)}
                intent="danger"
                size="small"
                icon={<DeleteIcon />}
              >
                {props.mediaType == "image"
                  ? t("community.info.create.step1.deleteImageLabel")
                  : t("community.info.create.step1.deleteVideoLabel")}
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-4 ">
        {!isEmpty(fieldValue) && (
          <div className={`relative h-[104px] w-[104px]`}>
            <Image
              style={{ objectFit: "cover" }}
              src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${fieldValue.url}`}
              fill
              alt=""
              onClick={() => {
                if (mode == Mode.Add) setShowPreviewFilesPopup(1);
              }}
            />
          </div>
        )}
        {mode == Mode.Add && fieldValue == null && (
          <>
            <label
              htmlFor={field.name}
              className={cn(
                `flex h-[104px] w-[104px] flex-col items-center justify-center border-2 border-dashed border-smart-cbt-green text-center text-smart-cbt-green`,
                props.disabled
                  ? "text-smart-cbt-grey border-smart-cbt-medium-grey bg-smart-cbt-light-grey"
                  : "hover:cursor-pointer"
              )}
            >
              <PlusIcon className="h-5 w-5" />
              {t("community.info.create.step1.uploadImageLabel")}
            </label>
            <input
              id={field.name}
              type="file"
              className="hidden"
              accept={allowedImageFileTypes}
              disabled={props.disabled}
              onChange={(e) => uploadImages(e.target.files)}
            />
          </>
        )}
      </div>
      {showDeleteFileConfirmPopup && (
        <ConfirmPopup
          icon={<WarningIcon className="h-10 w-10 text-smart-cbt-orange" />}
          title={
            props.mediaType == "image"
              ? t("community.info.popup.deleteImageConfirm.title")
              : t("community.info.popup.deleteVideoConfirm.title")
          }
          confirmButtonText={
            props.mediaType == "image"
              ? t("community.info.popup.deleteImageConfirm.confirmButton")
              : t("community.info.popup.deleteVideoConfirm.confirmButton")
          }
          cancelButtonText={t("global.cancel")}
          isDeleted={true}
          isOpen={showDeleteFileConfirmPopup}
          onCancelButtonClicked={() => setShowDeleteFileConfirmPopup(false)}
          onConfirmButtonClicked={() => {
            setShowDeleteFileConfirmPopup(false);
            handleRemove();
          }}
        />
      )}
      {showDeletionSuccessPopup && (
        <ConfirmPopup
          icon={<CheckIconCircle className="h-10 w-10 text-smart-cbt-green" />}
          title={
            props.mediaType == "image"
              ? t("community.info.popup.deleteImageSuccess.title")
              : t("community.info.popup.deleteVideoSuccess.title")
          }
          confirmButtonText={t("global.ok")}
          isOpen={showDeletionSuccessPopup}
          onConfirmButtonClicked={() => setShowDeletionSuccessPopup(false)}
        />
      )}
      {showPreviewFilesPopup != null && (
        <PreviewFilePopup
          file={fieldValue}
          isOpen={showPreviewFilesPopup != null}
          mediaType={props.mediaType}
          onCloseButtonClicked={() => setShowPreviewFilesPopup(null)}
          onDeleteButtonClicked={(file) => {
            setShowDeletePreviewFileConfirmPopup(file);
          }}
        />
      )}
      {showDeletePreviewFileConfirmPopup != null && (
        <ConfirmPopup
          icon={<WarningIcon className="h-10 w-10 text-smart-cbt-orange" />}
          title={
            props.mediaType == "image"
              ? t("community.info.popup.deleteImageConfirm.title")
              : t("community.info.popup.deleteVideoConfirm.title")
          }
          confirmButtonText={
            props.mediaType == "image"
              ? t("community.info.popup.deleteImageConfirm.confirmButton")
              : t("community.info.popup.deleteVideoConfirm.confirmButton")
          }
          cancelButtonText={t("global.cancel")}
          isDeleted={true}
          isOpen={showDeletePreviewFileConfirmPopup != null}
          onCancelButtonClicked={() => setShowDeletePreviewFileConfirmPopup(null)}
          onConfirmButtonClicked={() => {
            handleRemove();
            setShowDeletePreviewFileConfirmPopup(null);
          }}
        />
      )}
    </div>
  );
};

type ConfirmPopupProps = {
  icon: JSX.Element;
  title: string;
  confirmButtonText: string;
  cancelButtonText?: string;
  isDeleted?: boolean;
  isOpen: boolean;
  onConfirmButtonClicked: () => void;
  onCancelButtonClicked?: () => void;
};

export const ConfirmPopup = (props: ConfirmPopupProps) => {
  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto flex max-h-[90%] min-w-[400px] max-w-[80%] flex-col items-center gap-5 rounded-xl bg-white p-8">
          {props.icon}
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-xl font-medium">{props.title}</h3>
          </div>
          <div className="flex gap-4">
            {props.cancelButtonText && props.onCancelButtonClicked && (
              <Button
                intent={"text"}
                size={"small"}
                className="px-6 text-black"
                onClick={() => props.onCancelButtonClicked!()}
              >
                {props.cancelButtonText}
              </Button>
            )}
            <Button
              intent={props.isDeleted ? "danger" : "primary"}
              size={"small"}
              className="px-6 "
              onClick={() => props.onConfirmButtonClicked()}
            >
              {props.confirmButtonText}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

type PreviewFilePopupProps = {
  file: FileSchema;
  isOpen: boolean;
  mediaType: "image" | "video";
  onCloseButtonClicked: () => void;
  onDeleteButtonClicked: (file: FileSchema) => void;
};

export const PreviewFilePopup = (props: PreviewFilePopupProps) => {
  console.log("PreviewFilePopup", props.file);
  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50" onClick={() => props.onCloseButtonClicked()}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="flex max-h-[80%] max-w-[90%] flex-col justify-center gap-4">
          <div className="flex flex-row justify-end gap-2">
            <DeleteIcon
              className="h-8 w-8 text-white hover:cursor-pointer"
              onClick={() => props.onDeleteButtonClicked(props.file)}
            />
            <CloseIcon
              className="h-8 w-8 text-white hover:cursor-pointer"
              onClick={() => props.onCloseButtonClicked()}
            />
          </div>
          <div className="flex flex-row gap-2 ">
            {props.mediaType == "image" && (
              <div className="relative h-[624px] w-[832px]">
                <Image
                  style={{ objectFit: "cover" }}
                  src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${props.file?.url}`}
                  fill
                  alt=""
                />
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CommunityInfoMediaFeturedImageUploaderForm;
