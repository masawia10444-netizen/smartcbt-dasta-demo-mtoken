"use client";

import { getPhotoBankBySearchAction } from "@/app/[locale]/(authenticated)/photo-bank/(pages)/search/action";
import BreadCrumb from "@/components/Breadcrumb";
import { AppContext } from "@/contexts/App.context";
import { PhotoBankAlbumsFileJSONData, PhotoBankCategoryJSONData } from "@/utils/cms/adapters/website/photo-bank/albums";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import PhotoBankListBySearchHeader from "./PhotoBankListBySearchHeader";
import PhotoBankPhotoGridGallery from "./PhotoBankPhotoGridGallery";
import PhotoBankSearchInput from "./PhotoBankSearchInput";

type PhotoBankListBySearchProps = {
  type: "search" | "category";
  q?: string | null;
  provinceId?: number | null;
  communityId?: number | null;
  photoBankCategory?: PhotoBankCategoryJSONData;
};

const PhotoBankListBySearch = (props: PhotoBankListBySearchProps) => {
  const t = useTranslations("common");
  const { type, q, provinceId, communityId, photoBankCategory } = props;
  const { provinces, communities } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(true);
  const [searchViewType, setSearchViewType] = useState<"search" | "category">(type);
  const [forceRefreshKey, setForceRefreshKey] = useState<number | string>();
  const [searchKeyword, setSearchKeyword] = useState<string | null | undefined>(q);
  const [searchProvinceId, setSearchProvinceId] = useState<number | null | undefined>(provinceId);
  const [searchCommunityId, setSearchCommunityId] = useState<number | null | undefined>(communityId);
  const [title, setTitle] = useState<string>(photoBankCategory?.title);
  const [data, setData] = useState<PhotoBankAlbumsFileJSONData[]>([]);

  const getPhotoBankAlbums = async (
    q: string | null | undefined,
    provinceId: number | null | undefined,
    communityId: number | null | undefined,
    categoryId: number | null | undefined
  ) => {
    setData([]);
    setIsLoading(true);
    setData(await getPhotoBankBySearchAction(q, provinceId, communityId, categoryId));
    setIsLoading(false);
  };

  useEffect(() => {
    const renderPhotoBankAlbums = async () =>
      getPhotoBankAlbums(searchKeyword, searchProvinceId, searchCommunityId, photoBankCategory?.id);
    renderPhotoBankAlbums();
  }, [forceRefreshKey]);

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "photo-bank",
    },
    {
      name: t("photoBank.main.menus.search"),
      slug: "photo-bank/search",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-4 md:container md:mx-auto">
      <BreadCrumb links={breadCrumbLinks} />
      <PhotoBankSearchInput
        keyword={q}
        placeholder={t("photoBank.search.searchPlaceholder")}
        onSearch={(value) => {
          if (searchViewType == "category") {
            setSearchViewType("search");
            setTitle("");
          }
          setSearchKeyword(value);
          setForceRefreshKey(value);
        }}
      />
      {searchViewType == "search" && (
        <div className="flex flex-col gap-4">
          {searchKeyword && (
            <div className="flex flex-row justify-center gap-4">
              <div className="text-2xl font-normal text-smart-cbt-dark-grey">{t("photoBank.search.searchResult")}</div>
              <div className="text-2xl font-medium text-black">{searchKeyword}</div>
            </div>
          )}
          <PhotoBankListBySearchHeader
            provinces={provinces}
            communities={communities}
            provinceId={provinceId}
            communityId={communityId}
            onSearch={async (value) => {
              setSearchProvinceId(value.provinceId);
              setSearchCommunityId(value.communityId);
              setForceRefreshKey(value);
            }}
          />
        </div>
      )}
      <PhotoBankPhotoGridGallery title={title} data={data} isDataLoading={isLoading} />
    </div>
  );
};

export default PhotoBankListBySearch;
