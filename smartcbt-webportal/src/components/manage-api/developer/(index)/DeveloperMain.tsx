"use client";
import { MApiDeveloperIcon } from "@/components/Icon";
import { useTranslations } from "next-intl";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function DeveloperMain() {
  const t = useTranslations("common");

  return (
    <>
      <div className="mb-3 flex items-center gap-x-3 text-2xl font-medium text-smart-cbt-dark-green">
        <MApiDeveloperIcon fill="#005E38" />
        {t("manageApi.developer.title")}
      </div>
      <div className="flex text-smart-cbt-very-dark-grey">{t("manageApi.developer.description")}</div>
      <SwaggerUI url="/cms-api.json" />
    </>
  );
}
