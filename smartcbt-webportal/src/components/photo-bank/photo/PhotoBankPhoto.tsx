"use client";

import { PhotoBankAlbumsFileDetailJSONData } from "@/utils/cms/adapters/website/photo-bank/albums";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import BreadCrumb from "../../Breadcrumb";
import Flex from "../../Flex";
import PhotoBankSearchInput from "../PhotoBankSearchInput";
import PhotoBankPhotoDescription from "./PhotoBankPhotoDescription";
import PhotoBankPhotoOtherPhotos from "./PhotoBankPhotoOtherPhotos";
import PhotoBankPhotoPhoto from "./PhotoBankPhotoPhoto";

type PhotoBankPhotoProps = {
  photo: PhotoBankAlbumsFileDetailJSONData;
  otherPhotos: PhotoBankAlbumsFileDetailJSONData[];
};

const PhotoBankPhoto = (props: PhotoBankPhotoProps) => {
  const t = useTranslations("common");
  const { photo, otherPhotos } = props;
  const router = useRouter();

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "photo-bank",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 md:container md:mx-auto">
      <BreadCrumb links={breadCrumbLinks} />
      <PhotoBankSearchInput
        keyword={""}
        placeholder={t("photoBank.search.searchPlaceholder")}
        onSearch={(value) => {
          if (value.length > 0) router.push(`/photo-bank/search?type=search&q=${value}`);
        }}
      />
      <Flex.Container>
        <Flex.Element>
          <PhotoBankPhotoPhoto photo={photo} />
        </Flex.Element>
        <Flex.Element>
          <PhotoBankPhotoDescription photo={photo} />
        </Flex.Element>
      </Flex.Container>
      <PhotoBankPhotoOtherPhotos otherPhotos={otherPhotos} />
    </div>
  );
};

export default PhotoBankPhoto;
