import { useTranslations } from "next-intl";
import Image from "@/components/image";
import PhotoOptionsDropDown from "./PhotoOptionsDropDown";

type PhotoGridItemProps = {
  isCoverPhoto?: boolean;
  src: string;
  photoName: string;
  alt?: string;
  canSetHasCover: boolean;
  deleteAction: () => void;
  setCoverPhoto: (fileName?: string) => void;
};

export const PhotoGridItem = ({
  isCoverPhoto,
  src,
  alt,
  photoName,
  canSetHasCover,
  deleteAction,
  setCoverPhoto,
}: PhotoGridItemProps) => {
  return (
    <div className="relative h-[215px] w-full rounded-xl border border-smart-cbt-light-grey">
      <Image src={src} alt={alt ?? ""} fill style={{ objectFit: "cover", borderRadius: "0.75rem" , width: "100%" }} />
      <div className="absolute bottom-1 flex w-full items-center justify-between px-2 py-2">
        {isCoverPhoto ? <BadgeIsCover /> : <div />}
        <PhotoOptionsDropDown
          isCoverPhoto={isCoverPhoto}
          deleteAction={deleteAction}
          canSetHasCover={canSetHasCover}
          photoName={photoName}
          setCoverPhoto={setCoverPhoto}
        />
      </div>
    </div>
  );
};

export const BadgeIsCover = () => {
  const t = useTranslations("common");
  return (
    <div className="rounded-full bg-smart-cbt-green px-4 py-1 text-xs text-white">
      {t("carbon.create.photo.useToCoverPhoto")}
    </div>
  );
};
