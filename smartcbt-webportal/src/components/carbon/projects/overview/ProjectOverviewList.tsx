"use client";

import { fetchListCarbon } from "@/app/[locale]/(authenticated)/carbon-footprint/projects/actions";
import BreadCrumb from "@/components/Breadcrumb";
import { IconParkOutlineSettingConfig } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ProjectOverviewSearchSchema } from "@/schemas/forms/carbon/projects/project-overview-search-schema";
import { CarbonListJson } from "@/utils/cms/adapters/website/carbon/types";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import ProjectGridItem from "./ProjectGridItem";
import ProjectOverviewListHeader from "./ProjectOverviewListHeader";

const ProjectOverviewList = () => {
  const t = useTranslations("common");

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "carbon-footprint/overview",
    },
    {
      name: t("menus.allProjects"),
      slug: "carbon-footprint/projects/overview",
    },
  ];

  const [data, setData] = useState<CarbonListJson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<ProjectOverviewSearchSchema>({
    programOwner: null,
    province: null,
    q: null,
  });

  const onSearch = (params: any) => {
    setSearchParams(params);
  };

  const renderProjects = () => {
    return data.map((project: CarbonListJson) => {
      return <ProjectGridItem project={project} key={project.id} />;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const programOwner = searchParams?.programOwner?.id ?? undefined;
        const province = searchParams?.province?.id ?? undefined;
        const search = searchParams?.q ?? undefined;
        const carbonList = await fetchListCarbon("approved", programOwner, province, search);
        setData(carbonList);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  return (
    <div>
      <div className="flex w-full flex-1 flex-col gap-4 px-2">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-medium">{t("carbon.overview.title")}</h1>
            <BreadCrumb links={breadCrumbLinks} />
          </div>
          <NextLink
            intent="primaryButton"
            icon={<IconParkOutlineSettingConfig />}
            href="/carbon-footprint/projects/manage"
          >
            {t("carbon.overview.managePrograms")}
          </NextLink>
        </div>
        <ProjectOverviewListHeader onSearch={onSearch} />
        {isLoading ? (
          <LoadingSpinner className="h-screen" />
        ) : (
          <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {renderProjects()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectOverviewList;
