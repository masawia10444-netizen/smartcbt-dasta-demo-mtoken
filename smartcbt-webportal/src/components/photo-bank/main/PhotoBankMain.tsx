"use client";

import Image from "@/components/image";
import { AppContext } from "@/contexts/App.context";
import { PhotoBankAlbumsFileJSONData, PhotoBankCategoryJSONData } from "@/utils/cms/adapters/website/photo-bank/albums";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useContext } from "react";
import Masonry from "react-masonry-css";
import PhotoBankNoData from "../PhotoBankNoData";
import PhotoBankSearchByKeywordForm from "./PhotoBankSearchByKeywordForm";

type PhotoBankMainProps = {
  photoCategories: PhotoBankCategoryJSONData[];
  photoBankAlbumsFiles: PhotoBankAlbumsFileJSONData[];
};

const PhotoBankMain = (props: PhotoBankMainProps) => {
  const t = useTranslations("common");
  const { provinces, communities } = useContext(AppContext);
  const { photoCategories, photoBankAlbumsFiles } = props;

  const breakpointColumnsObj = {
    default: 4,
    1024: 3,
    640: 2,
  };

  return (
    <div>
      <div className="relative h-[256px] w-full md:h-[344px] lg:h-[480px]">
        <div className="absolute left-5 right-5 top-1/2 z-20 -translate-y-1/2 text-white md:container md:mx-auto">
          <div className="flex flex-col items-center gap-1 text-white md:gap-2 lg:gap-2">
            <h1 className="text-4xl font-semibold drop-shadow-md lg:text-7xl"> {t("photoBank.main.title")}</h1>
            <h3 className="text-center text-lg font-medium lg:text-xl">{t("photoBank.main.subTitle")}</h3>
            <PhotoBankSearchByKeywordForm />
          </div>
        </div>
        <Image src="/images/photo-bank/photo-bank-bg.png" fill alt="DASTA" style={{ objectFit: "cover" }} />
      </div>
      {/* <div className="bg-smart-cbt-border-green px-5 py-4 md:py-8 lg:py-12">
        <div className="flex flex-col gap-6 md:container md:mx-auto">
          <h3 className="text-lg font-medium lg:text-xl">{t("photoBank.main.category")}</h3>
          <div className="flex flex-row gap-4 overflow-x-auto lg:grid lg:grid-cols-2 xl:grid xl:grid-cols-4">
            {photoCategories.map((value, index) => (
              <Link key={index} href={`/photo-bank/search?type=category&categoryId=${value.id}`}>
                <PhotoBankMainCategoryMenu title={value.title} backgroundImage={value.thumbnail.url} />
              </Link>
            ))}
          </div>
        </div>
      </div> */}
      <div className="px-5 py-4 md:py-8 lg:py-12">
        <div className="flex flex-col gap-6 md:container md:mx-auto">
          {photoBankAlbumsFiles.length == 0 ? (
            <PhotoBankNoData />
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="masonry-grid"
              columnClassName="masonry-grid_column"
            >
              {photoBankAlbumsFiles.map((value, index) => (
                <div key={index} className="gap-4 overflow-hidden rounded-2xl">
                  <Link href={`/photo-bank/photos/${value.id}`}>
                    <picture>
                      <img src={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.url}`} alt={""} />
                    </picture>
                  </Link>
                </div>
              ))}
            </Masonry>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoBankMain;
