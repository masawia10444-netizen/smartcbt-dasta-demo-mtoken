import { useTranslations } from "next-intl";
import Image from "@/components/image";

type TargetGridItemProps = {
  title: string;
  image: string;
};

const TargetGridItem = ({ image, title }: TargetGridItemProps) => {
  const t = useTranslations("common");
  return (
    <div className="flex h-[255px] w-fit flex-col items-center justify-center gap-7 hover:cursor-pointer">
      <div className="relative h-40 w-40">
        <Image className="rounded-full bg-white p-4" src={image} fill alt={title} style={{ objectFit: "cover" }} />
      </div>
      <span className="text-center">{t(title)}</span>
    </div>
  );
};

export default TargetGridItem;
