import { WarningCirleIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { AppContext } from "@/contexts/App.context";
import { AlbumDetail } from "@/models/photo-bank/photo-bank-albums";
import { PhotoBankMyAlbumsSchema } from "@/schemas/forms/photo-bank/my-albums/photo-bank-my-albums-schema";
import { PhotoBankCategoryJSONData, Regions } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import PhotoBankMyAlbumsTagsInput from "./components/PhotoBankMyAlbumsTagsInput";

type PhotoBankMyAlbumsDetailFormProps = {
  photoCategories: PhotoBankCategoryJSONData[];
  regions: Regions[];
  albumDetail?: AlbumDetail | null;
  areFieldsDisabled: boolean;
};

const PhotoBankMyAlbumsDetailForm = (props: PhotoBankMyAlbumsDetailFormProps) => {
  const { photoCategories, regions, albumDetail, areFieldsDisabled } = props;
  const t = useTranslations("common");
  const { communities } = useContext(AppContext);

  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<PhotoBankMyAlbumsSchema>();

  useEffect(() => {
    if (!albumDetail) return;
    albumDetail.name && setValue("name", albumDetail.name);
    albumDetail.description && setValue("description", albumDetail.description);
    albumDetail.organization && setValue("organization", albumDetail.organization);
    albumDetail.tag_words && setValue("tags", albumDetail.tag_words as any);
    albumDetail.region && setValue("region", albumDetail.region as any);

    const community = communities.find((value) => value.id == albumDetail.community);
    community && setValue("community", community!);

    albumDetail.categories &&
      photoCategories.map((value, index) => {
        setValue(`categories.${index}.value`, albumDetail.categories!.includes(value.id));
      });
  }, [albumDetail]);

  return (
    <div className="flex flex-col gap-4">
      {albumDetail?.status == "draft" && (
        <div className="flex flex-row items-center gap-2">
          <WarningCirleIcon className="h-8 w-8 text-smart-cbt-orange" />
          <div className="text-base font-normal text-smart-cbt-orange">
            {t("photoBank.myAlbums.create.status.reviewing")}
          </div>
        </div>
      )}
      {albumDetail?.status == "published" && (
        <div className="flex flex-row items-center gap-2">
          <WarningCirleIcon className="h-8 w-8 text-smart-cbt-green" />
          <div className="text-base font-normal text-smart-cbt-green">
            {t("photoBank.myAlbums.create.status.approved")}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2">
        <div className="text-base font-normal">{t("photoBank.myAlbums.create.description")}</div>
        <Form.TextArea
          intent={areFieldsDisabled ? "disabled" : null}
          disabled={areFieldsDisabled}
          rows={3}
          placeholder={t("photoBank.myAlbums.create.descriptionPlaceholder")}
          {...register("description")}
        />
        <FormFieldError error={errors.description?.message} />
      </div>
      <div className="rounded-md border border-smart-cbt-medium-grey p-4">
        {t("photoBank.myAlbums.create.category")}
        {photoCategories.map((value, index) => (
          <Form.Checkbox
            disabled={areFieldsDisabled}
            key={index}
            id="categories"
            name={`categories.${index}.value`}
            control={control}
            label={value.title}
          />
        ))}
      </div>
      <FormFieldError error={errors.categories?.root?.message} />
      <div className="flex flex-col gap-2">
        <div className="text-base font-normal">{t("photoBank.myAlbums.create.community")}</div>
        <Form.FloatingDropSearch
          name="community"
          values={communities}
          idKey="id"
          displayKey="title"
          title={""}
          className="p-0"
          inputClassName="border-smart-cbt-medium-grey focus:border-smart-cbt-very-dark-grey"
          filterKey={"title"}
          placeholder={t("photoBank.myAlbums.create.communityPlaceholder")}
          control={control}
          hideLabel
          disabled={areFieldsDisabled}
        />
        <FormFieldError error={errors.community?.message} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-base font-normal">{t("photoBank.myAlbums.create.region")}</div>
        <Form.FloatingDropSearch
          name="region"
          values={regions}
          idKey="id"
          displayKey="title"
          title={""}
          className="p-0"
          inputClassName="border-smart-cbt-medium-grey focus:border-smart-cbt-very-dark-grey"
          filterKey={"title"}
          placeholder={t("photoBank.myAlbums.create.regionPlaceholder")}
          control={control}
          hideLabel
          disabled={areFieldsDisabled}
        />
        <FormFieldError error={errors.community?.message} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-base font-normal">{t("photoBank.myAlbums.create.organization")}</div>
        <Form.Input
          intent={areFieldsDisabled ? "disabled" : null}
          disabled={areFieldsDisabled}
          placeholder={t("photoBank.myAlbums.create.organizationPlaceholder")}
          {...register(`organization`)}
        />
        <FormFieldError error={errors.organization?.message} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-base font-normal">{t("photoBank.myAlbums.create.tags")}</div>
        <PhotoBankMyAlbumsTagsInput
          placeholder={t("photoBank.myAlbums.create.tagsPlaceholder")}
          control={control}
          name={"tags"}
          disabled={areFieldsDisabled}
        />
        <FormFieldError error={errors.tags?.message} />
      </div>
    </div>
  );
};

export default PhotoBankMyAlbumsDetailForm;
