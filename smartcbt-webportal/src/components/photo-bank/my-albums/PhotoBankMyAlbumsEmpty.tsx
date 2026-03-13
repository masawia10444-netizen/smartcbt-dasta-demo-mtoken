"use client";

import { AddPlusIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { useTranslations } from "next-intl";
import Image from "@/components/image";

const PhotoBankMyAlbumsEmpty = () => {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col items-center gap-4 p-24">
      <Image src="/images/photo-bank/photo.png" alt="DASTA" width={300} height={300} />
      <NextLink intent="primaryButton" icon={<AddPlusIcon />} href="/photo-bank/my-albums/create">
        {t("photoBank.myAlbums.createAlbum")}
      </NextLink>
    </div>
  );
};

export default PhotoBankMyAlbumsEmpty;
