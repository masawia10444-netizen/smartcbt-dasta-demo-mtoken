"use client";

import { ArrowRightIcon } from "@/components/Icon";
import { PhotoBankAlbumsFileDetailJSONData } from "@/utils/cms/adapters/website/photo-bank/albums";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import Link from "next/link";

type PhotoBankPhotoOtherPhotosProps = {
  otherPhotos: PhotoBankAlbumsFileDetailJSONData[];
};

const PhotoBankPhotoOtherPhotos = (props: PhotoBankPhotoOtherPhotosProps) => {
  const t = useTranslations("common");
  const { otherPhotos } = props;

  return (
    <div>
      {otherPhotos.length != 0 && (
        <div className="flex flex-row gap-4 overflow-x-auto">
          {otherPhotos.map((value, index) => (
            <Link
              key={index}
              className="relative h-44 w-72 flex-none overflow-hidden rounded-2xl"
              href={`/photo-bank/photos/${value.id}`}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.url}`}
                alt={"DASTA"}
                style={{ objectFit: "cover" }}
                fill
              />
            </Link>
          ))}
          {/* TODO: We don't have a design for the 'See More Photos' page, so for now, temporarily redirect to the main photo bank page*/}
          <Link
            className="flex w-72 flex-none flex-row items-center justify-center rounded-2xl bg-smart-cbt-light-grey "
            href={`/photo-bank`}
          >
            <div className="text-base font-normal text-smart-cbt-dark-grey">{t("photoBank.detail.seeMore")}</div>
            <ArrowRightIcon />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PhotoBankPhotoOtherPhotos;
