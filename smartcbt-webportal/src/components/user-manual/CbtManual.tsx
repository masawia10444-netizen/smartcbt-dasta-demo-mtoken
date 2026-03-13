"use client";

import Image from "@/components/image";
import { CbtManual } from "@/models/manual";
import { useTranslations } from "next-intl";
import UserManualMenu from "./UserManualMenu";

type CbtManualProps = {
  title?: string;
  image?: string;
  manuals: { [key: string]: CbtManual[] };
};

const CbtManual = (props: CbtManualProps) => {
  const title = props?.title || "userManual.title";
  const t = useTranslations("common");
  const keys = Object.keys(props.manuals);

  return (
    <div className="px-10 py-20 md:px-4 md:py-32">
      <div className="flex h-full flex-col items-center justify-center">
        {props.image && (
          <Image
            src={"/images/shared/cbt-thailand.png"}
            alt={"cbt-thailand"}
            width={200}
            height={100}
            style={{
              objectFit: "contain",
            }}
          />
        )}
        <h1 className="text-5xl font-semibold text-smart-cbt-dark-green drop-shadow-lg md:text-5xl mt-[19px]">{t(title)}</h1>
        <div className="space-y-[57px] mt-[38px]">
          {keys.map((key, idx) => (
            <div key={`${key}-${idx}`}>
              <h2 className="text-3xl font-semibold text-smart-cbt-dark-green drop-shadow-lg md:text-3xl w-full text-left">
                {t(`userManual.type.${key}`)}
              </h2>
              <div
                className="grid grid-cols-1 items-center gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-2 xl:gap-x-8 xl:gap-y-12 mt-[30px]"
              >
                {props.manuals[key].map((manual) => (
                  <UserManualMenu
                    key={manual.id}
                    title={manual.title ?? ""}
                    width={manual.width ?? 120}
                    height={manual.width ?? 120}
                    href={manual.manual?.url ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${manual.manual?.url}` : ""}
                    image={manual.icon?.url ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${manual.icon?.url}` : ""}
                    updatedAt={manual.date_updated ?? ""}
                    className="h-auto min-h-[200px]"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CbtManual;
