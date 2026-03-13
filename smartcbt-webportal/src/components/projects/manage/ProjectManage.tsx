"use client";

import BreadCrumb from "@/components/Breadcrumb";
import { MaterialSymbolsAddRounded } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import ProjectList from "@/components/projects/manage/ProjectList";
import { useTranslations } from "next-intl";

const ProjectManage = () => {
  const t = useTranslations("common");
  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "main-menus",
    },
    {
      name: t("menus.allProjects"),
      slug: "sia-sroi/projects/manage",
    },
  ];

  return (
    <div className="flex flex-col flex-1 w-full gap-4 px-2">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium"> {t("project.manage.title")}</h1>
          <BreadCrumb links={breadCrumbLinks} />
        </div>
        <div className="flex items-center gap-2 md:justify-end">
          <NextLink intent={"whiteButtonBordered"} href="/sia-sroi/financial-proxy">
            {t("project.manage.action.financialProxy")}
          </NextLink>
          <NextLink intent={"primaryButton"} icon={<MaterialSymbolsAddRounded />} href="/sia-sroi/projects/create">
            {t("project.manage.action.add")}
          </NextLink>
        </div>
      </div>
      <ProjectList />
    </div>
  );
};

export default ProjectManage;
