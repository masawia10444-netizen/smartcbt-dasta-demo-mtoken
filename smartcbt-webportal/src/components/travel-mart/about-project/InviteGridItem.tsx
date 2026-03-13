import { useTranslations } from "next-intl";
import Image from "@/components/image";

type InviteGridItemProps = {
  index: number;
  image: string;
  title: string;
  description: string;
  key: string;
};

const InviteGridItem = ({ index, description, key, image, title }: InviteGridItemProps) => {
  const t = useTranslations("common");

  return (
    <div
      className={`flex w-full flex-col items-center ${
        index % 2 == 0 ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-4 lg:gap-10`}
    >
      <div className="flex-1">
        <div className="relative h-[300px] w-[70vw] lg:h-[380px] lg:w-full">
          <Image className="rounded-2xl bg-white" src={image} fill alt={key} style={{ objectFit: "cover" }} />
        </div>
      </div>
      <div className="flex-1">
        <h3 className="mb-4 text-lg font-medium">{t(title)}</h3>
        <span>
          {t.rich(description, {
            ul: (chunk) => (
              <ul className="relative ml-6 list-outside list-disc space-y-4 indent-0 text-sm md:text-base">{chunk}</ul>
            ),
            li: (chunk) => <li>{chunk}</li>,
          })}
        </span>
      </div>
    </div>
  );
};

export default InviteGridItem;
