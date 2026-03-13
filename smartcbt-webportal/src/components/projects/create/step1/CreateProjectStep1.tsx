import { uploadFileAction } from "@/app/[locale]/(authenticated)/sia-sroi/projects/action";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { AddPlusIcon, CheckIconCircle, DeleteIcon } from "@/components/Icon";
import { MenuDropDown } from "@/components/MenuDropDown";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import Image from "@/components/image";
import { SiaSroiContext } from "@/contexts/App.context";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { CbtProjectSchema } from "@/schemas/forms/projects/create/step1-schema";
import { FileSchema } from "@/schemas/forms/shard-schema";
import { CommunitySIAJson } from "@/utils/cms/adapters/website/sia/types/project";
import { cn } from "@/utils/cn";
import { convertFileToFormData } from "@/utils/helper";
import { viewMode } from "@/utils/project-create-form-helper";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import AddPictureIcon from "public/images/sia/add-picture-icon.png";
import AddPictureSmallIcon from "public/images/sia/add-picture-small-icon.png";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { FieldArrayWithId, useFieldArray, useFormContext } from "react-hook-form";
import { CreateCBTProject, CreateCBTProjectFromType } from "./CreateCBTProject";

const CreateProjectStep1 = ({
  isLoading,
  setIsLoading,
}: {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const t = useTranslations("common");

  const [showCreateCBTProjectForm, setShowCreateCBTProjectForm] = useState<boolean>(false);
  const {
    control,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<CreateProjectSchema>();
  const { viewOnly } = viewMode(getValues());

  const { listCBTProject } = useContext(SiaSroiContext);

  const handleSelectedCBTProject = (data: any, next: (p: any) => void) => {
    next(data);
  };

  const handleNewCBTProjectCreate = () => {
    setShowCreateCBTProjectForm(true);
  };

  const handleOnSubmitCBTProjectCreate = (cbtProject: CbtProjectSchema, createdOrganization: CommunitySIAJson[]) => {
    const createdCBTProject = getValues("step1.createdCBTProject");
    const newCreatedCBTProject = [...(createdCBTProject ?? []), cbtProject];

    setValue("step1.createdOrganization", (createdOrganization as any) ?? []);
    setValue("step1.createdCBTProject", (newCreatedCBTProject as any) ?? []);
    setValue("step1.cbtProject", cbtProject);
    setShowCreateCBTProjectForm(false);
  };

  const step1 = getValues("step1");
  const allListOrganization = step1?.createdCBTProject
    ? [...listCBTProject, ...step1?.createdCBTProject]
    : [...listCBTProject];

  useEffect(() => {
    setValue("step1.cbtProject", step1.cbtProject);
    setValue("step1.album", step1.album);
  }, [step1]);

  return (
    <div>
      <div className="flex flex-col items-center gap-6">
        <CoverContainer viewOnly={viewOnly} setIsLoading={setIsLoading} />
        <div className="w-full">
          <Form.DropDownSearch
            values={[null, ...allListOrganization]}
            idKey="id"
            disabled={isLoading || viewOnly}
            title=""
            nullDisplay=""
            filterKey="title"
            displayKey="title"
            placeholder={t("project.create.step1.projectName")}
            itemDisplayFunction={(item) =>
              item ? (
                <div key={item.title} className="p-2">
                  {item.title}
                </div>
              ) : (
                <div
                  key="createNewProject"
                  className="flex h-full w-full items-center gap-4 bg-white p-2 text-smart-cbt-blue"
                >
                  <AddPlusIcon />
                  {t("project.create.step1.newProject")}
                </div>
              )
            }
            onChangeInterceptor={(v, next) => {
              v ? handleSelectedCBTProject(v, next) : handleNewCBTProjectCreate();
            }}
            inputEditable={true}
            name={`step1.cbtProject`}
            control={control}
            fixed={false}
          />
          <FormFieldError error={errors.step1?.cbtProject?.message} />
        </div>
        <AlbumContainer viewOnly={viewOnly} isLoading={isLoading} onLoading={setIsLoading} />
      </div>
      {showCreateCBTProjectForm && (
        <CreateCBTProject
          onClose={() => setShowCreateCBTProjectForm(false)}
          onSubmit={handleOnSubmitCBTProjectCreate}
          isOpen={showCreateCBTProjectForm != null}
          listCBTProject={listCBTProject}
          id={null}
          fromType={CreateCBTProjectFromType.sia}
        />
      )}
    </div>
  );
};

export default CreateProjectStep1;

const CoverContainer = ({
  viewOnly,
  setIsLoading,
}: {
  viewOnly: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const t = useTranslations("common");

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<CreateProjectSchema>();

  const handleFiles = async (files: { file: File }[]) => {
    if (files.length == 0) return;
    setIsLoading(true);
    const formData = convertFileToFormData(files[0].file);
    const response = await uploadFileAction(formData);
    if (!response) return;
    const file = { file: { id: response.id, url: response.filename_disk ?? "", type: response.type ?? "" } };
    setValue("step1.coverPicture", file, { shouldValidate: true });
    setIsLoading(false);
  };

  const coverPicture = watch("step1.coverPicture");
  const hasCoverPicture = coverPicture != null;

  return (
    <>
      <div className="relative h-[180px] w-full overflow-auto rounded-lg lg:w-[434px]">
        {hasCoverPicture ? (
          <>
            <Image
              style={{ objectFit: "cover" }}
              src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${coverPicture.file.url}`}
              fill
              alt=""
            />
            <ImagePickerButton
              disabled={viewOnly}
              id="cover"
              icon={<Image src={AddPictureSmallIcon} alt="Change cover" />}
              title=""
              onFiles={handleFiles}
              className="absolute bottom-2 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-smart-cbt-very-light-grey bg-white"
            />
          </>
        ) : (
          <ImagePickerButton
            disabled={viewOnly}
            id="cover"
            onFiles={handleFiles}
            className="h-full flex-col justify-center gap-2 rounded-lg border border-dashed border-smart-cbt-medium-grey bg-smart-cbt-light-grey text-smart-cbt-dark-grey "
            icon={<PlusIcon className="h-5 w-5" />}
            title={t("project.create.step1.uploadCoverPicture")}
          />
        )}
      </div>
      <FormFieldError error={errors.step1?.coverPicture?.message} />
    </>
  );
};

const AlbumContainer = ({
  viewOnly,
  isLoading,
  onLoading,
}: {
  viewOnly: boolean;
  isLoading: boolean;
  onLoading: (isLoading: boolean) => void;
}) => {
  const t = useTranslations("common");

  const { watch, getValues, setValue, control } = useFormContext<CreateProjectSchema>();
  const [didToggleAlbumCreate, setDidToggleAlbumCreate] = useState(getValues("step1.album").length != 0);
  const [mode, setMode] = useState<"delete" | "add">("add");
  const [selectedPictures, setSelectedPictures] = useState<Set<FileSchema>>(new Set());

  const album = watch("step1.album");
  const hasAlbum = album.length != 0 || didToggleAlbumCreate;

  const { append, fields } = useFieldArray({ control, name: "step1.album" });

  const handleRemove = () => {
    setValue(
      "step1.album",
      album.filter((f) => !selectedPictures.has(f.file)),
      { shouldValidate: true }
    );
    setSelectedPictures(new Set());
  };

  const handleFiles = async (files: { file: File }[]) => {
    if (files.length == 0) return;
    const formData = convertFileToFormData(files[0].file);
    onLoading(true);
    const response = await uploadFileAction(formData);
    onLoading(false);
    if (!response) return;
    const file = { file: { id: response.id, url: response.filename_disk ?? "", type: response.type ?? "" } };
    append(file);
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <p>{t("project.create.step1.photoAlbum")}</p>
        {hasAlbum && (
          <div className="item-center flex gap-4">
            {mode == "add" && !viewOnly && (
              <>
                {album.length > 0 && (
                  <Button
                    onClick={() => setMode("delete")}
                    size="small"
                    intent="text"
                    className="text-smart-cbt-dark-grey"
                    icon={<DeleteIcon />}
                    disabled={isLoading}
                  >
                    {t("project.create.step1.deletePhoto")}
                  </Button>
                )}
                <ImagePickerButton
                  disabled={viewOnly || isLoading}
                  id="album"
                  className="h-10 border-smart-cbt-green bg-white capitalize text-smart-cbt-green hover:bg-smart-cbt-green hover:text-white"
                  multiple
                  onFiles={handleFiles}
                  icon={<PlusIcon className="h-5 w-5" />}
                  title={t("project.create.step1.addPhoto")}
                />
              </>
            )}
            {mode == "delete" && !viewOnly && (
              <>
                <Button onClick={() => setMode("add")} size="small" intent="text" className="text-smart-cbt-dark-grey">
                  {t("global.cancel")}
                </Button>
                <Button
                  onClick={handleRemove}
                  disabled={selectedPictures.size == 0}
                  intent="danger"
                  size="small"
                  icon={<DeleteIcon />}
                >
                  {t("project.create.step1.deletePhoto")}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      {hasAlbum ? (
        <div className="grid grid-cols-3 gap-4">
          {fields.map((field, index) => (
            <AlbumGridItem
              viewOnly={viewOnly}
              key={field.id}
              field={field}
              checked={selectedPictures.has(field.file)}
              onChecked={(file) => {
                const newSelectedPictures = new Set(selectedPictures);
                newSelectedPictures.has(file) ? newSelectedPictures.delete(file) : newSelectedPictures.add(file);
                setSelectedPictures(newSelectedPictures);
              }}
              onSetAsCover={(file) => setValue("step1.coverPicture", { file }, { shouldValidate: true })}
              onDelete={(file) => {
                setValue(
                  "step1.album",
                  album.filter((f) => f.file != file),
                  { shouldValidate: true }
                );
              }}
              selectMode={mode == "delete"}
            />
          ))}
        </div>
      ) : (
        <button
          disabled={viewOnly}
          onClick={() => setDidToggleAlbumCreate(true)}
          className="mx-auto flex h-[180px] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-smart-cbt-medium-grey bg-smart-cbt-light-grey lg:w-[272px]"
        >
          <Image src={AddPictureIcon} alt="Create album" />
          <p className="text-smart-cbt-dark-grey">{t("project.create.step1.createPhotoAlbum")}</p>
        </button>
      )}
    </div>
  );
};

const AlbumGridItem = ({
  field,
  checked,
  onChecked,
  onSetAsCover,
  onDelete,
  selectMode,
  viewOnly,
}: {
  field: FieldArrayWithId<CreateProjectSchema, "step1.album">;
  checked: boolean;
  onChecked: (file: FileSchema) => void;
  onSetAsCover: (file: FileSchema) => void;
  onDelete: (file: FileSchema) => void;
  selectMode: boolean;
  viewOnly: boolean;
}) => {
  const t = useTranslations("common");

  const menuItems = [
    {
      key: "setAsCover",
      label: t("project.create.step1.setAsCover"),
      icon: <CheckIconCircle />,
      onClick: () => onSetAsCover(field.file),
    },
    {
      key: "delete",
      label: t("project.manage.action.delete"),
      icon: <DeleteIcon />,
      onClick: () => onDelete(field.file),
    },
  ];
  return (
    <div className="relative h-[215px]">
      <Image
        className="rounded-lg"
        style={{ objectFit: "cover" }}
        src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${field.file.url}`}
        fill
        alt=""
      />
      <Checkbox
        className="absolute left-3 top-2 h-4 w-4"
        id={field.id}
        checked={checked}
        onChange={() => onChecked(field.file)}
        hideCheckbox={!selectMode}
        label=""
      />
      {!viewOnly && (
        <MenuDropDown
          className="absolute bottom-2 right-3 h-5 w-5 whitespace-nowrap text-white"
          itemsClassName="overflow-auto rounded-xl"
          menuItems={menuItems}
        />
      )}
      ;
    </div>
  );
};

export const ImagePickerButton = ({
  onFiles,
  multiple,
  className,
  icon,
  title,
  id,
  disabled,
}: {
  onFiles: (files: { file: File }[]) => void;
  multiple?: boolean;
  className: string;
  icon: JSX.Element;
  title: string;
  id: string;
  disabled: boolean;
}) => {
  const t = useTranslations("common");

  const handleOnChange = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      const formattedFiles = fileArray.map((file) => ({ file }));
      onFiles(formattedFiles);
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className={cn(
          "min-w-fit-content flex cursor-pointer items-center gap-2 rounded-md border p-2",
          disabled && "cursor-auto",
          className
        )}
      >
        {icon}
        {title}
      </label>
      <input
        disabled={disabled}
        type="file"
        id={id}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e.target.files)}
        className="hidden"
        multiple={multiple}
      />
    </>
  );
};
