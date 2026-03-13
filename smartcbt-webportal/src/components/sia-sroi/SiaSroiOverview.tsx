"use client";

import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import BreadCrumb from "../Breadcrumb";
import ProjectOverviewList from "../projects/overview/ProjectOverviewList";
import ProjectRatio, { YearRatio } from "../projects/overview/ProjectRatio";

type SiaSroiOverviewProps = {};

const SiaSroiOverview = ({}: SiaSroiOverviewProps) => {
  const t = useTranslations("common");
  const [exAnte, setExAnte] = useState<YearRatio | undefined>();
  const [exPost, setExPost] = useState<YearRatio | undefined>();

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "main-menus",
    },
    {
      name: t("menus.allProjects"),
      slug: "sia-sroi/projects/overview",
    },
  ];

  return (
    <Fragment>
      <div className="flex flex-col justify-between gap-5 sm:flex-row">
        <div>
          <h1 className="text-xl font-bold text-smart-cbt-dark-green">{t("project.allProjects")}</h1>
          <BreadCrumb links={breadCrumbLinks} />
        </div>
        <ProjectRatio exAnte={exAnte} exPost={exPost} />
      </div>
      <ProjectOverviewList
        setSummary={(selectedExAnte, selectedExPost) => {
          setExAnte(selectedExAnte);
          setExPost(selectedExPost);
        }}
      />
    </Fragment>
  );
};

export default SiaSroiOverview;
