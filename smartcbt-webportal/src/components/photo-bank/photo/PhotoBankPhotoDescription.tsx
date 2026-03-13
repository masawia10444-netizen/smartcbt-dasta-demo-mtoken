"use client";

import { DownloadIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import Image from "@/components/image";
import { PhotoBankAlbumsFileDetailJSONData } from "@/utils/cms/adapters/website/photo-bank/albums";
import { useTranslations } from "next-intl";
import { Button } from "../../Button";

type PhotoBankPhotoDescriptionProps = {
  photo: PhotoBankAlbumsFileDetailJSONData;
};

const PhotoBankPhotoDescription = (props: PhotoBankPhotoDescriptionProps) => {
  const t = useTranslations("common");
  const { photo } = props;

  const fileExtension = photo.type.split("/")[1];

  const date = new Date(photo.uploaded_on);
  const dateFormatted = date?.toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return (
    <div className="mt-6 flex flex-col gap-5 lg:mt-0">
      <div className="text-2xl font-medium">{photo.album_name}</div>
      <table className="w-fit table-auto">
        <tbody className="">
          <tr>
            <td className="mt-2 text-end text-base font-normal text-smart-cbt-medium-grey">
              {t("photoBank.detail.id")}
            </td>
            <td>{photo.image_id}</td>
          </tr>
          <tr>
            <td className="text-end text-base font-normal text-smart-cbt-medium-grey">
              {t("photoBank.detail.category")}
            </td>
            <td>{photo.categories}</td>
          </tr>
          <tr>
            <td className="text-end text-base font-normal text-smart-cbt-medium-grey">
              {t("photoBank.detail.community")}
            </td>
            <td>{photo.community}</td>
          </tr>
          <tr>
            <td className="text-end text-base font-normal text-smart-cbt-medium-grey">
              {t("photoBank.detail.organization")}
            </td>
            <td>{photo.organization}</td>
          </tr>
          <tr>
            <td className="text-end text-base font-normal text-smart-cbt-medium-grey">
              {t("photoBank.detail.fileType")}
            </td>
            <td></td>
          </tr>
          <tr>
            <td className="text-end text-base font-normal text-smart-cbt-medium-grey">
              {t("photoBank.detail.photographer")}
            </td>
            <td>
              <div className="flex flex-row items-center gap-3">
                <Image
                  className="rounded-full"
                  src={"/images/photo-bank/mock/profile-picture.png"}
                  alt={"DASTA"}
                  width={32}
                  height={32}
                />
                <div className="text-base font-normal text-smart-cbt-green">{photo.created_by}</div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="text-end text-base font-normal text-smart-cbt-medium-grey">
              {t("photoBank.detail.uploaderAt", { date: dateFormatted })}
            </td>
            <td>{dateFormatted}</td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-row gap-4">
        {photo.tag_words &&
          photo.tag_words.map((value: string, index: number) => (
            <Button key={index} intent="secondary" size="small" disabled={true}>
              #{value}
            </Button>
          ))}
      </div>
      <NextLink
        className="w-full"
        intent="primaryButton"
        href={`${process.env.NEXT_PUBLIC_CMS_URL}/assets/${photo.url}&download`}
        size={"medium"}
        icon={<DownloadIcon />}
      >
        {t("photoBank.detail.download")}
      </NextLink>
    </div>
  );
};

export default PhotoBankPhotoDescription;
