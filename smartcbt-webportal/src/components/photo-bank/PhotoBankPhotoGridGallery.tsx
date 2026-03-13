import { Button } from "@/components/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { PhotoBankCategorySearchSchema } from "@/schemas/forms/photo-bank/photo-bank-category-search-schema";
import { PhotoBankAlbumsFileJSONData } from "@/utils/cms/adapters/website/photo-bank/albums";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Masonry from "react-masonry-css";
import PhotoBankNoData from "./PhotoBankNoData";

type PhotoBankPhotoGridGalleryProps = {
  title?: string | null | undefined;
  data?: PhotoBankAlbumsFileJSONData[] | null | undefined;
  isDataLoading?: boolean | null | undefined;
};

const PhotoBankPhotoGridGallery = ({ title, data, isDataLoading }: PhotoBankPhotoGridGalleryProps) => {
  const t = useTranslations("common");
  const { register, setValue } = useForm<PhotoBankCategorySearchSchema>();
  const [isLoading, setIsLoading] = useState(isDataLoading);
  const [groupData, setGroupData] = useState<PhotoBankAlbumsFileJSONData[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const visibleAlbumPerPage = 16;

  const breakpointColumnsObj = {
    default: 4,
    1024: 2,
    640: 1,
  };

  useEffect(() => {
    setValue("page", currentPage + 1);
    if (data == null) return;
    const result: PhotoBankAlbumsFileJSONData[][] = [];
    for (let i = 0; i < data.length; i += visibleAlbumPerPage) {
      const batch = data.slice(i, i + visibleAlbumPerPage);
      result.push(batch);
    }
    setGroupData(result);
    setIsLoading(isDataLoading);
  }, [data, isLoading]);

  const goToPage = (newPage: number) => {
    setCurrentPage(newPage);
    setValue("page", newPage + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div>{title}</div>
        <div className="flex flex-row gap-4">
          <div className="text-smart-cbt-dark-grey">{t("photoBank.search.searchResultNumber")}</div>
          <div>
            {t("photoBank.search.searchResultNumberRecords", {
              number: (data?.length ?? 0) < visibleAlbumPerPage ? data?.length ?? 0 : visibleAlbumPerPage,
              total: data?.length,
            })}
          </div>
        </div>
      </div>
      {isLoading && <div className="my-4 ml-2 mr-4 h-2 w-full animate-pulse rounded bg-gray-200" />}
      {!isLoading && groupData.length == 0 ? (
        <PhotoBankNoData />
      ) : (
        <Masonry breakpointCols={breakpointColumnsObj} className="masonry-grid" columnClassName="masonry-grid_column">
          {groupData[currentPage]?.map((value, index) => (
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
      <div className="flex flex-row justify-between">
        <div className="w-full flex-1" />
        <div className="flex w-full flex-1 flex-row items-center justify-center gap-4">
          {currentPage !== 0 && (
            <Button
              onClick={() => goToPage(currentPage - 1)}
              intent={isLoading || currentPage == 0 ? "disabled" : "tertiary"}
              disabled={isLoading || currentPage == 0}
              size="small"
              iconRight={<ArrowLeftIcon />}
              className="border-smart-cbt-green text-smart-cbt-green"
            />
          )}
          <Button
            className="w-44"
            onClick={() => goToPage(currentPage + 1)}
            intent={isLoading || groupData.length == 0 || currentPage === groupData.length - 1 ? "disabled" : "primary"}
            disabled={isLoading || groupData.length == 0 || currentPage === groupData.length - 1}
            size="small"
            iconRight={<ArrowRightIcon className="text-white" />}
          >
            {t("photoBank.category.nextPage")}
          </Button>
        </div>
        <div className="flex w-full flex-1 flex-row items-center justify-end gap-4">
          <div>{t("photoBank.category.page")}</div>
          <Form.Input className="w-20" type="number" disabled={true} {...register("page", { valueAsNumber: true })} />
          <div>{t("photoBank.category.totalPage", { total: isLoading ? "-" : groupData.length })}</div>
        </div>
      </div>
    </div>
  );
};

export default PhotoBankPhotoGridGallery;
