"use client";

import { useTranslations } from "next-intl";
import Image from "@/components/image";

const PhotoBankNoData = () => {
  const t = useTranslations("common");
  return (
    <div className="flex flex-col items-center justify-center p-12">
      <Image src="/images/photo-bank/photo.png" alt="DASTA" width={300} height={300} />
      {t("global.noData")}
    </div>
  );
};

export default PhotoBankNoData;
