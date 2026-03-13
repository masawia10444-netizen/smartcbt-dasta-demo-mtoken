"use client";

import BreadCrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { FormFieldError } from "@/components/form/FormFieldError";
import { AlbumDetail, Image } from "@/models/photo-bank/photo-bank-albums";
import { customZodResolver } from "@/schemas/base-schema";
import {
  PhotoBankMyAlbumsSchema,
  photoBankMyAlbumsSchema,
} from "@/schemas/forms/photo-bank/my-albums/photo-bank-my-albums-schema";
import { Regions } from "@/utils/cms/adapters/master-data/geolocation/regions";
import { PhotoBankCategoryJSONData } from "@/utils/cms/adapters/website/photo-bank/albums";
import * as _ from "lodash";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  createAlbumAction,
  updateAlbumAction,
} from "@/app/[locale]/(authenticated)/photo-bank/(pages)/my-albums/action";
import { CreateAlbumBody } from "@/utils/cms/cms-api-adapter";
import { PhotoBankAlbumCreatedPopup } from "./PhotoBankAlbumCreatedPopup";
import { PhotoBankAlbumErrorPopup } from "./PhotoBankAlbumErrorPopup";
import PhotoBankMyAlbumsDetailForm from "./PhotoBankMyAlbumsDetailForm";
import PhotoBankMyAlbumsPhotoForm from "./PhotoBankMyAlbumsPhotoForm";

type PhotoBankMyAlbumsFormProps = {
  photoCategories: PhotoBankCategoryJSONData[];
  regions: Regions[];
  albumDetail?: AlbumDetail | null;
  images?: Image[] | null;
};

const PhotoBankMyAlbumsForm = (props: PhotoBankMyAlbumsFormProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  const { photoCategories, regions, albumDetail, images } = props;

  const [showAlbumCreatedPopup, setShowAlbumCreatedPopup] = useState(false);
  const [showAlbumErrorPopup, setShowAlbumErrorPopup] = useState<string | null>(null);

  const albumDetailStatus = _.get(albumDetail, ["status"], null);

  const isVerifiedByAdmin = albumDetailStatus != "published" && !!albumDetailStatus;

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "photo-bank",
    },
    {
      name: t("photoBank.main.menus.myAlbums"),
      slug: `photo-bank/my-albums`,
    },
    albumDetail == null
      ? {
          name: t("photoBank.main.menus.createAlbum"),
          slug: `photo-bank/my-albums/create`,
        }
      : {
          name: albumDetail.name ?? "",
          slug: `photo-bank/my-albums/${albumDetail.id}`,
        },
  ];

  const formContext = useForm<PhotoBankMyAlbumsSchema>({
    resolver: customZodResolver(photoBankMyAlbumsSchema),
    defaultValues: {
      files: [],
      tags: [],
      categories: photoCategories.map(({ id, title }) => ({ id, title, value: false })),
    },
  });

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = formContext;

  const onSubmit = handleSubmit(async (data: PhotoBankMyAlbumsSchema) => {
    const body: CreateAlbumBody = {
      name: data.name,
      community: data.community.id,
      organization: data.organization,
      images: data.files.map((value) => value.id),
      categories: data.categories.filter((value) => value.value == true).map((value) => value.id),
      tag_words: data.tags,
      description: data.description,
      region: data.region.id,
    };

    let error;

    if (!_.isEmpty(albumDetail)) {
      const { error: errorResul } = await updateAlbumAction(albumDetail.id as number, body);
      error = errorResul;
    } else {
      const { error: errorResul } = await createAlbumAction(body);
      error = errorResul;
    }

    if (error) {
      setShowAlbumErrorPopup(error);
    } else {
      router.refresh();
      setShowAlbumCreatedPopup(true);
    }
  });

  return (
    <FormProvider {...formContext}>
      <form className="flex flex-col gap-4 p-4 md:container md:mx-auto" onSubmit={onSubmit}>
        <BreadCrumb links={breadCrumbLinks} />
        <div className="flex flex-col gap-2 divide-y-2">
          <div className="flex flex-col">
            <input
              disabled={isVerifiedByAdmin}
              className="border-0"
              placeholder={t("photoBank.myAlbums.create.namePlaceholder")}
              {...register("name")}
            />
            <FormFieldError error={errors.name?.message} />
          </div>
          <div className="flex flex-col gap-4 pt-4 lg:flex-row">
            <div className="w-full lg:w-3/5">
              <PhotoBankMyAlbumsPhotoForm areFieldsDisabled={isVerifiedByAdmin} images={images} />
            </div>
            <div className="flex w-full flex-col gap-4 lg:w-2/5">
              <PhotoBankMyAlbumsDetailForm
                photoCategories={photoCategories}
                regions={regions}
                albumDetail={albumDetail}
                areFieldsDisabled={isVerifiedByAdmin}
              />
              {!isVerifiedByAdmin && (
                <Button className="w-full" intent="primary" size="small" type="submit">
                  {t("photoBank.myAlbums.create.create")}
                </Button>
              )}
            </div>
          </div>
          {showAlbumCreatedPopup && (
            <PhotoBankAlbumCreatedPopup
              isOpen={showAlbumCreatedPopup}
              onClose={() => {
                setShowAlbumCreatedPopup(false);
                router.push("/photo-bank/my-albums");
              }}
            />
          )}
          {showAlbumErrorPopup && (
            <PhotoBankAlbumErrorPopup
              isOpen={showAlbumErrorPopup != null}
              message={showAlbumErrorPopup}
              onClose={() => {
                setShowAlbumErrorPopup(null);
              }}
            />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default PhotoBankMyAlbumsForm;
