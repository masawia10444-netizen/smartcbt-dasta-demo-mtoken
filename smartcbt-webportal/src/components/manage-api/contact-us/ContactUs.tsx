"use client";

import BreadCrumb from "@/components/Breadcrumb";
import { useTranslations } from "next-intl";

export default function ManageApiContactUs() {
  const t = useTranslations("common");
  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "mapi",
    },
    {
      name: t("menus.contactUs"),
      slug: `mapi/contact`,
    },
  ];

  return (
    <div className="flex min-h-full flex-col gap-4 bg-[url('/images/manage-api/contact-bg.png')] bg-[length:50%_auto] bg-right-bottom bg-no-repeat p-4 md:container  md:mx-auto">
      <BreadCrumb links={breadCrumbLinks} />
      <div className="mt-4 flex flex-col gap-2">
        <div className="mb-3 text-3xl font-medium text-smart-cbt-dark-green">{t("manageApi.contactUs.h1")}</div>
        <div className="mb-3 text-xl font-medium text-smart-cbt-dark-green">{t("manageApi.contactUs.h2")}</div>

        <div className="mb-3 text-smart-cbt-dark-green">{t("manageApi.contactUs.p1")}</div>
        <div
          className="flex text-smart-cbt-dark-green"
          dangerouslySetInnerHTML={{ __html: t("manageApi.contactUs.contact") }}
        />
      </div>
    </div>
  );
}
