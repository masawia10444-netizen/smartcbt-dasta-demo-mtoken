import Image from "@/components/image";
import { getCmsMedia } from "@/utils/cms/api-helpers";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

type TravelMartPitchingGridItemProps = {
  image: string;
  alt: string;
  title: string;
  province: string;
  link: string;
};

const TravelMartPitchingGridItem = ({ link, image, province, title }: TravelMartPitchingGridItemProps) => {
  const t = useTranslations("common");

  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-2xl bg-white drop-shadow-xl">
      <div className="relative flex h-60 w-full items-center justify-center">
        <Link href={link}>
          <Image src={getCmsMedia(image)} alt={title} fill />
        </Link>
      </div>
      <Link className="flex flex-col gap-4 px-6 py-4" href={link}>
        <p className="line-clamp-3 text-xl font-medium text-smart-cbt-dark-green">{title}</p>
        {province && (
          <div>
            <span>{t("project.province")}</span>
            <span>{province}</span>
          </div>
        )}
      </Link>
    </div>
  );
};

export default TravelMartPitchingGridItem;
