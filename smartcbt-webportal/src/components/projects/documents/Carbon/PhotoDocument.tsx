import { BadgeIsCover } from "@/components/carbon/projects/create/photos/PhotoGridItem";
import { carbonPhotoEvidenceCategories } from "@/components/carbon/projects/create/photos/PhotographicEvidences";
import { ImageView } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { PictureSchema } from "@/schemas/forms/shard-schema";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import { Fragment } from "react";

interface GraphDocumentProps {
  data: CarbonSummaryData;
}

const PhotoDocument = (props: GraphDocumentProps) => {
  const { data } = props;
  const { photos } = data;
  const t = useTranslations("common");

  const photoCover = photos.cover;

  const viewMode = photoCover && (photoCover as ImageView)?.id != undefined;

  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-2xs font-medium text-smart-cbt-dark-green">{t("carbon.document.8.title")}</label>
      {carbonPhotoEvidenceCategories.map((category) => (
        <Fragment key={category.id}>
          <p className="my-4 text-2xs text-smart-cbt-dark-green">
            {category.id == 0 ? t("carbon.summary.coverPhoto") : t(category.title)}
          </p>
          <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {category.key == "cover"
              ? photoCover && (
                  <div className="relative h-[215px] overflow-hidden rounded-xl">
                    <Image
                      fill
                      style={{ objectFit: "cover" }}
                      alt=""
                      src={
                        viewMode
                          ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${(photoCover as ImageView)?.url}`
                          : URL.createObjectURL((photoCover as PictureSchema)?.file)
                      }
                    />
                    <div className="absolute bottom-1 flex w-full items-center justify-between px-2 py-2">
                      <BadgeIsCover />
                    </div>
                  </div>
                )
              : (photos as any)[category.key]?.map((value: any, i: number) => {
                  return (
                    <div key={i} className="relative h-[215px] overflow-hidden rounded-xl">
                      <Image
                        fill
                        style={{ objectFit: "cover" }}
                        alt=""
                        src={
                          viewMode
                            ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${value.url}`
                            : URL.createObjectURL(value)
                        }
                      />
                    </div>
                  );
                })}
          </div>
        </Fragment>
      ))}
      <div className="break-after-page"></div>
    </div>
  );
};

export default PhotoDocument;
