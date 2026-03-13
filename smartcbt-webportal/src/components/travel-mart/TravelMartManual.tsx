"use client";

import { Manual } from "@/models/manual";
import { useTranslations } from "next-intl";
import UserManualMenu from "../user-manual/UserManualMenu";

type CbtManualProps = {
  title?: string;
  manuals: Manual[];
};

const TravelMartManual = (props: CbtManualProps) => {
  const title = props?.title || "userManual.title";
  const t = useTranslations("common");
  const keys = Object.keys(props.manuals);

  return (
    <div className="px-10 py-20 md:px-4 md:py-32">
      <div className="flex h-full flex-col items-center justify-center">
        <h1 className="mt-[19px] text-5xl font-semibold text-smart-cbt-dark-green drop-shadow-lg md:text-5xl">
          {t(title)}
        </h1>
        <div className="mt-[30px] grid grid-cols-1 items-center gap-x-4 gap-y-4 md:grid-cols-2 xl:grid-cols-2 xl:gap-x-8 xl:gap-y-12">
          {props.manuals.map((manual) => (
            <UserManualMenu
              key={manual.id}
              title={manual.title ?? ""}
              width={70}
              height={70}
              href={
                manual.application_manual?.url
                  ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${manual.application_manual?.url}`
                  : ""
              }
              image={manual.icon?.url ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${manual.icon?.url}` : ""}
              updatedAt={manual.date_updated ?? ""}
              className="h-auto min-h-[100]"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelMartManual;
