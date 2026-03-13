import Image from "@/components/image";
import {
  ImageView,
  TravelProgramSchema,
  isImageView,
  isPictureSchema,
} from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { PictureSchema } from "@/schemas/forms/shard-schema";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { carbonPhotoEvidenceCategories } from "../photos/PhotographicEvidences";

const CarbonProjectRecapPictures = ({ dataCarbonSummaryOutSide }: { dataCarbonSummaryOutSide?: CarbonSummaryData }) => {
  const { watch } = useFormContext<TravelProgramSchema>();

  const photos = dataCarbonSummaryOutSide
    ? dataCarbonSummaryOutSide.photos
    : watch("photographic") ?? {
        isCover: undefined,
        cover: null,
        accommodation: [],
        documents: [],
        foods: [],
        travel: [],
        wastes: [],
      };

  const t = useTranslations("common");

  return carbonPhotoEvidenceCategories?.map((category) => {
    return (
      <Fragment key={category.id}>
        <p className="my-4 text-smart-cbt-dark-green">
          {category.id == 0 ? t("carbon.summary.coverPhoto") : t(category.title)}
        </p>
        <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {category.key == "cover" ? (
            <div className="relative h-[215px] overflow-hidden rounded-xl">
              <Photo photo={photos?.cover} />
            </div>
          ) : (
            (photos as any)?.[category.key]?.map((value: any, i: number) => {
              return (
                <div key={i} className="relative h-[215px] overflow-hidden rounded-xl">
                  <Photo photo={value} />
                </div>
              );
            })
          )}
        </div>
      </Fragment>
    );
  });
};

const Photo = ({ photo }: { photo?: ImageView | PictureSchema | File | null }) => {
  if (!photo) return <div />;

  let src;
  if (photo instanceof File) {
    src = URL.createObjectURL(photo);
  } else if (isPictureSchema(photo)) {
    src = URL.createObjectURL(photo.file);
  } else if (isImageView(photo)) {
    src = `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${photo.url}`;
  }

  return src ? <Image fill style={{ objectFit: "cover" }} alt="" src={src} /> : <div />;
};

export default CarbonProjectRecapPictures;
