import { NextLink } from "@/components/Link";
import Image from "@/components/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "../../Button";
import VideoModal from "./VideoModal";

type TravelMartTrainingItemProps = {
  detail: string | null;
  index: number;
  image: string | null;
  alt: string | null;
  title: string | null;
  startDateFormatted: string;
  displayName: string;
  displayPosition: string;
  endTimeFormatted: string;
  startTimeFormatted: string;
  videoType: string | null;
  videoUrl: string | null;
  link: string | null;
};

const TravelMartTrainingItem = ({
  alt,
  detail,
  displayName,
  displayPosition,
  endTimeFormatted,
  image,
  index,
  link,
  startDateFormatted,
  startTimeFormatted,
  title,
  videoType,
  videoUrl,
}: TravelMartTrainingItemProps) => {
  const t = useTranslations("common");
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div
      className={`flex max-w-fit flex-col items-center gap-20 md:items-start ${
        index % 2 == 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <VideoModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} videoUrl={videoUrl as string} />
      <div className="relative h-44 w-44 lg:h-60 lg:w-60">
        <Image
          className="aspect-square rounded-full align-middle shadow-lg "
          src={image ? `https://dmc.smartcbt.dasta.or.th/assets/${image}` : ""}
          alt={alt ?? ""}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex max-w-2xl flex-col gap-6 sm:max-w-md lg:min-w-[32rem] lg:max-w-2xl">
        {title && <h3 className="text-xl">{title}</h3>}
        {detail && (
          <div className="flex flex-col">
            <h4 className="text-lg">{t("travelMart.training.topic")}</h4>
            <div dangerouslySetInnerHTML={{ __html: detail }} className="training break-words text-sm" />
          </div>
        )}
        <div className="flex flex-row justify-between">
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-xl">{t("travelMart.training.lecturer")}</h3>
            <span className="text-sm">{displayName}</span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="text-xl">{t("travelMart.training.date")}</h3>
            <span className="text-sm">{startDateFormatted}</span>
            <span className="text-sm">
              {t("travelMart.training.time", { start: startTimeFormatted, end: endTimeFormatted })}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-lg">{t("travelMart.training.position")}</h4>
          <span className="text-sm">{displayPosition}</span>
        </div>
        {videoType == "url" && link && (
          <NextLink
            intent={link ? "primaryButton" : "disabledButton"}
            href={link ?? ""}
            className="w-full justify-center sm:min-w-full sm:max-w-full"
          >
            {t("travelMart.training.link")}
          </NextLink>
        )}
        {videoType == "file" && videoUrl && (
          <Button
            intent={"primary"}
            onClick={() => setModalOpen(true)}
            className="col-span-2 h-10 w-full rounded-md font-medium sm:min-w-full"
          >
            {t("travelMart.training.link")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default TravelMartTrainingItem;
