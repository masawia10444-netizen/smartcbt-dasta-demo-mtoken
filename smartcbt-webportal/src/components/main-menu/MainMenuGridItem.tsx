"use client";

import Image from "@/components/image";
import { MainMenusType } from "@/models/main-menu";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

type MainMenuGridItemProps = MainMenusType & {
  className?: string;
};

const MainMenuGridItem: React.FC<MainMenuGridItemProps> = ({
  title,
  image,
  width = 80,
  height = 80,
  href,
  className,
  disabled,
}: MainMenuGridItemProps) => {
  const t = useTranslations("common");
  return (
    <Link className={disabled ? "pointer-events-none" : ""} href={href ?? ""} aria-disabled={disabled}>
      <div
        className={cn(
          "flex h-[255px] w-[255px] flex-col items-center justify-center gap-7 rounded-2xl bg-white drop-shadow-xl hover:cursor-pointer",
          disabled && "bg-smart-cbt-very-light-grey hover:cursor-not-allowed",
          className
        )}
      >
        <Image
          src={image}
          alt={title}
          width={width}
          height={height}
          style={{
            objectFit: "contain",
          }}
        />
        <span className="whitespace-pre-line text-center text-md font-medium">{t(title)}</span>
      </div>
    </Link>
  );
};

export default MainMenuGridItem;
