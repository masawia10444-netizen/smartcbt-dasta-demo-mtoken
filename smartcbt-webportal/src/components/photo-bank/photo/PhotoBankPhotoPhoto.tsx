"use client";

import { PhotoBankAlbumsFileDetailJSONData } from "@/utils/cms/adapters/website/photo-bank/albums";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { useState } from "react";
import PhotoBankPhotoPreviewPopup from "./PhotoBankPhotoPreviewPopup";

type PhotoBankPhotoPhotoProps = {
  photo: PhotoBankAlbumsFileDetailJSONData;
};

const PhotoBankPhotoPhoto = (props: PhotoBankPhotoPhotoProps) => {
  const t = useTranslations("common");
  const { photo } = props;
  const [showPreviewPhotoPopup, setShowPreviewPhotoPopup] = useState<string | null>();

  const date = new Date(photo.uploaded_on);
  const dateFormatted = date?.toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
        <Image
          className="hover:cursor-pointer"
          src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${photo.url}`}
          alt={"DASTA"}
          style={{ objectFit: "cover" }}
          fill
          onClick={() => setShowPreviewPhotoPopup(photo.url)}
        />
      </div>
      {showPreviewPhotoPopup != null && (
        <PhotoBankPhotoPreviewPopup
          filePath={photo.url}
          isOpen={showPreviewPhotoPopup != null}
          onCloseButtonClicked={() => setShowPreviewPhotoPopup(null)}
        />
      )}
    </div>
  );
};

export default PhotoBankPhotoPhoto;
