"use client";

import { Album } from "@/models/photo-bank/photo-bank-albums";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import Image from "@/components/image";

type PhotoBankMyAlbumsProps = {
  albums: Album[];
};

const PhotoBankMyAlbumsGrid = (props: PhotoBankMyAlbumsProps) => {
  const t = useTranslations("common");
  const { albums } = props;

  return (
    <div className="grid grid-cols-1 gap-4 pt-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {albums.map((value, index) => {
        return (
          <Link key={index} href={`/photo-bank/my-albums/${value.id}`}>
            <div className="flex flex-col gap-2">
              <div className="relative h-52">
                <Image src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.cover?.url}`} alt={"DASTA"} fill />
              </div>
              <div className="text-base font-medium">{value.name}</div>
              <div className="text-sm font-normal text-smart-cbt-medium-grey">
                {t("photoBank.myAlbums.recordNumber", { number: value.image_count })}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PhotoBankMyAlbumsGrid;
