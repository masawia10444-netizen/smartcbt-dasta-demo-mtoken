"use client";

import BreadCrumb from "@/components/Breadcrumb";
import { AddPlusIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { Album } from "@/models/photo-bank/photo-bank-albums";
import { useTranslations } from "next-intl";
import PhotoBankMyAlbumsEmpty from "./PhotoBankMyAlbumsEmpty";
import PhotoBankMyAlbumsGrid from "./PhotoBankMyAlbumsGrid";

type PhotoBankMyAlbumsProps = {
  albums: Album[];
};

const PhotoBankMyAlbums = (props: PhotoBankMyAlbumsProps) => {
  const t = useTranslations("common");
  const { albums } = props;

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "photo-bank",
    },
    {
      name: t("photoBank.main.menus.myAlbums"),
      slug: `photo-bank/my-albums`,
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 md:container md:mx-auto">
      <BreadCrumb links={breadCrumbLinks} />
      <div className="flex flex-col gap-2 divide-y-2 ">
        <div className="flex flex-row items-center justify-between ">
          {t("photoBank.myAlbums.title")}
          {albums.length > 0 && (
            <NextLink intent="primaryButton" icon={<AddPlusIcon />} href="/photo-bank/my-albums/create">
              {t("photoBank.myAlbums.createAlbum")}
            </NextLink>
          )}
        </div>
        {albums.length > 0 ? <PhotoBankMyAlbumsGrid albums={albums} /> : <PhotoBankMyAlbumsEmpty />}
      </div>
    </div>
  );
};

export default PhotoBankMyAlbums;
