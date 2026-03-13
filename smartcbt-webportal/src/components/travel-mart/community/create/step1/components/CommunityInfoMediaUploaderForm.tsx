import { uploadFile } from "@/app/[locale]/(authenticated)/travel-mart/community-infos/action";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import {
  CheckIconCircle,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  CloseIcon,
  DeleteIcon,
  WarningIcon,
} from "@/components/Icon";
import { FormLabel } from "@/components/form/FormLabel";
import { FileSchema, FilesSchema } from "@/schemas/forms/community-info/create/community-info-create-schema-step1";
import { cn } from "@/utils/cn";
import { Dialog } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { useState } from "react";
import { FieldValues, UseControllerProps, useController } from "react-hook-form";
import ReactPlayer from "react-player/lazy";

enum Mode {
  Add,
  Delete,
}

type CommunityInfoMediaUploaderFormProps<T extends FieldValues> = {
  maximumFiles?: number;
  mediaType: "image" | "video";
  disabled?: boolean;
} & UseControllerProps<T>;

const CommunityInfoMediaUploaderForm = <T extends FieldValues>(props: CommunityInfoMediaUploaderFormProps<T>) => {
  const t = useTranslations("common");
  const { maximumFiles, ...controller } = props;
  const { field } = useController(controller);
  const [mode, setMode] = useState<Mode>(Mode.Add);
  const [selectedFiles, setSelectedFiles] = useState<Set<FileSchema>>(new Set());
  const [selectedAllFiles, setSelectedAllFiles] = useState<boolean>(false);
  const [showDeleteFileConfirmPopup, setShowDeleteFileConfirmPopup] = useState(false);
  const [showDeletionSuccessPopup, setShowDeletionSuccessPopup] = useState(false);
  const [showPreviewFilesPopup, setShowPreviewFilesPopup] = useState<number | null>();
  const [showDeletePreviewFileConfirmPopup, setShowDeletePreviewFileConfirmPopup] = useState<FileSchema | null>();
  const fieldValue = field.value as FilesSchema;
  const allowedImageFileTypes = "image/*";
  const allowedVideoFileTypes = "video/mp4,video/x-m4v,video/*";

  const handleRemove = () => {
    const remainingImages = fieldValue.filter((image) => !selectedFiles.has(image));
    field.onChange(remainingImages);
    setSelectedFiles(new Set());
    setShowDeletionSuccessPopup(true);
  };

  const handleRemoveByFile = (file: FileSchema) => {
    const remainingImages = fieldValue.filter((image) => image.id != file.id);
    field.onChange(remainingImages);
    setSelectedFiles(new Set());
    setShowPreviewFilesPopup(null);
    setShowDeletionSuccessPopup(true);
  };

  const toggleMode = () => {
    setMode(mode == Mode.Add ? Mode.Delete : Mode.Add);
    setSelectedFiles(new Set());
    setSelectedAllFiles(false);
  };

  const toggleFileSelection = (file: FileSchema) => {
    const newSet = new Set(selectedFiles);
    if (newSet.has(file)) newSet.delete(file);
    else newSet.add(file);
    setSelectedFiles(newSet);
    setSelectedAllFiles(newSet.size == fieldValue.length);
  };

  const toggleAllFilesSelection = () => {
    setSelectedAllFiles(!selectedAllFiles);
    const newSet = new Set<FileSchema>();
    if (!selectedAllFiles) {
      for (const field of fieldValue) {
        newSet.add(field);
      }
    }
    setSelectedFiles(newSet);
  };

  const uploadImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const formData = new FormData();
    formData.append("file", new Blob([file], { type: file.type }), file.name);

    const result = await uploadFile(formData);
    if (!result) return;

    fieldValue.push({ id: result.id, url: result.filename_disk ?? "", type: result.type ?? "" });
    field.onChange(fieldValue);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-2">
      <div className="flex items-center justify-between ">
        <FormLabel>
          {props.mediaType == "image"
            ? t("community.info.create.step1.imageSizeLimitDescription")
            : t("community.info.create.step1.videoSizeLimitDescription")}
        </FormLabel>
        <div className="item-center flex gap-4">
          {mode == Mode.Add && fieldValue.length > 0 && (
            <Button
              onClick={toggleMode}
              size="small"
              intent="tertiary"
              className="border-smart-cbt-red text-smart-cbt-red"
              icon={<DeleteIcon />}
            >
              {props.mediaType == "image"
                ? t("community.info.create.step1.deleteImageLabel")
                : t("community.info.create.step1.deleteVideoLabel")}
            </Button>
          )}
          {mode == Mode.Delete && (
            <>
              <Button onClick={toggleMode} size="small" intent="text" className="text-smart-cbt-dark-grey">
                {t("global.cancel")}
              </Button>
              <Checkbox
                checked={selectedAllFiles}
                onChange={() => toggleAllFilesSelection()}
                label={t("community.info.create.step1.deleteAll")}
                hideCheckbox={false}
              />
              <Button
                onClick={() => setShowDeleteFileConfirmPopup(true)}
                disabled={selectedFiles.size == 0}
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
        {fieldValue.map((field, index) => (
          <div key={index} className={`relative h-[104px] w-[104px]`}>
            {props.mediaType == "image" ? (
              <Image
                style={{ objectFit: "cover" }}
                src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${field.url}`}
                fill
                alt=""
                onClick={() => {
                  if (mode == Mode.Add) setShowPreviewFilesPopup(index);
                }}
              />
            ) : (
              <ReactPlayer
                width={104}
                height={104}
                url={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${field.url}`}
                onClick={() => {
                  if (mode == Mode.Add) setShowPreviewFilesPopup(index);
                }}
              />
            )}
            <Checkbox
              className="absolute left-2 top-2 h-4 w-4"
              id={index.toString()}
              checked={selectedFiles.has(field)}
              onChange={() => toggleFileSelection(field)}
              hideCheckbox={mode == Mode.Add}
              label=""
            />
          </div>
        ))}
        {mode == Mode.Add && (maximumFiles == null || fieldValue.length < maximumFiles) && (
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
              accept={props.mediaType == "image" ? allowedImageFileTypes : allowedVideoFileTypes}
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
        <PreviewFilesPopup
          files={fieldValue}
          isOpen={showPreviewFilesPopup != null}
          mediaType={props.mediaType}
          position={showPreviewFilesPopup}
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
            handleRemoveByFile(showDeletePreviewFileConfirmPopup);
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

type PreviewFilesPopupProps = {
  files: FilesSchema;
  isOpen: boolean;
  mediaType: "image" | "video";
  position: number;
  onCloseButtonClicked: () => void;
  onDeleteButtonClicked: (file: FileSchema) => void;
};

export const PreviewFilesPopup = (props: PreviewFilesPopupProps) => {
  const [position, setPosition] = useState<number>(props.position);
  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50" onClick={() => props.onCloseButtonClicked()}>
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="flex max-h-[80%] max-w-[90%] flex-col justify-center gap-4">
          <div className="flex flex-row justify-end gap-2">
            <DeleteIcon
              className="h-8 w-8 text-white hover:cursor-pointer"
              onClick={() => props.onDeleteButtonClicked(props.files[position])}
            />
            <CloseIcon
              className="h-8 w-8 text-white hover:cursor-pointer"
              onClick={() => props.onCloseButtonClicked()}
            />
          </div>
          <div className="flex flex-row gap-2 ">
            <ChevronLeftCircleIcon
              className={`mr-4 h-auto w-8 hover:cursor-pointer ${position == 0 ? "invisible" : ""}`}
              onClick={() => setPosition(position - 1)}
            />
            {props.mediaType == "image" ? (
              <div className="relative h-[624px] w-[832px]">
                <Image
                  key={position}
                  style={{ objectFit: "cover" }}
                  src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${props.files[position].url}`}
                  fill
                  alt=""
                />
              </div>
            ) : (
              <ReactPlayer
                key={position}
                url={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${props.files[position].url}`}
                controls={true}
              />
            )}
            <ChevronRightCircleIcon
              className={`ml-4 h-auto w-8 hover:cursor-pointer ${
                position == props.files.length - 1 ? "invisible" : ""
              }`}
              onClick={() => setPosition(position + 1)}
            />
          </div>
          <div className="flex flex-row justify-center text-white">
            {position + 1} / {props.files.length}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CommunityInfoMediaUploaderForm;
