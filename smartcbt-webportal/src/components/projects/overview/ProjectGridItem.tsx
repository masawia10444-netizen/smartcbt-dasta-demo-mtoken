"use client";

import Image from "@/components/image";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { Project } from "@/utils/cms/adapters/website/sia/types/project";
import get from "lodash/get";
import moment from "moment";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";
import { Checkbox } from "../../Checkbox";
import { Ribbon } from "./Ribbon";

type ProjectGridItemProps = {
  project: Project;
  isSelectionMode: boolean;
  isSelected?: boolean;
  onChange: (project: Project) => void;
};

const ProjectGridItem = (props: ProjectGridItemProps) => {
  const { isSelectionMode, isSelected, project, onChange } = props;
  const t = useTranslations("common");

  const {
    project_summary_ex_ante: exAnte,
    project_summary_ex_post: exPost,
    date_updated: updatedAt,
    project_locations,
  } = project;

  const title = get(project, ["cbt_project", "title"], "-");
  const status = project.status;
  const community = project.project_owner?.title;
  const province = project_locations?.province?.title;
  const exAnteNPV = exAnte?.npv_sroi;
  const exAnteSROIRatio = exAnte?.sroi_ratio;
  const exPostNPV = exPost?.npv_sroi;
  const exPostSROIRatio = exPost?.sroi_ratio;
  const startYear = project?.project_start_year;
  const endYear = project?.project_end_year;
  const updateDate = updatedAt ? moment(updatedAt).format("DD MMM YYYY") : "-";

  const provinceTitle = project_locations?.province?.title;
  const districtTitle = project_locations?.district?.title;
  const subdistrictTitle = project_locations?.subdistrict?.title;
  const location = `${provinceTitle ?? ""} ${districtTitle ?? ""} ${subdistrictTitle ?? ""}`;

  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-white drop-shadow-xl">
      <div className="relative flex h-40 w-full items-center justify-center">
        <Link href={`/sia-sroi/projects/overview/${project.id}`} className="block w-full">
          <div className="relative flex aspect-[480/160] items-center justify-center">
            <Image
              src={
                project.featured_image?.url
                  ? `${process.env.NEXT_PUBLIC_CMS_URL}/assets/${project.featured_image.url}`
                  : "/images/sia/default-image.jpg"
              }
              alt={title}
              className="max-h-full object-cover object-center"
              sizes="480px"
              {...(project.featured_image?.url
                ? { fill: true }
                : { style: { objectFit: "contain" }, width: 480, height: 160 })}
            />
          </div>
        </Link>
        <div className="absolute left-0 right-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/60 to-transparent">
          <Ribbon status={status}>
            <span className="flex flex-1">
              <Checkbox
                id={project.id}
                checked={isSelected}
                onChange={(e) => onChange && onChange(project)}
                label={t(`project.status.${status}`)}
                hideCheckbox={!isSelectionMode}
              />
              {status === PROJECT_STATUS.IN_PROGRESS && (
                <div className="mr-3 whitespace-nowrap rounded-xl bg-white px-2 text-smart-cbt-orange">On Going</div>
              )}
            </span>
          </Ribbon>
          <Link
            className="h-8 w-fit px-4 py-2 text-right text-sm text-white"
            href={`/sia-sroi/projects/overview/${project.id}`}
          >
            {t("project.projectDuration")} {startYear} - {endYear}
          </Link>
        </div>
      </div>
      <Link className="flex flex-col gap-4 p-4" href={`/sia-sroi/projects/overview/${project.id}`}>
        {/* <div className="mt-2 h-6 w-fit rounded-[20px] bg-smart-cbt-light-green px-2 text-smart-cbt-green">
          {t(`project.status.${status}`)}
        </div> */}
        {/* <p className="mt-4 text-sm text-smart-cbt-dark-green">โครงการ: {title}</p> */}
        <div className="mt-6 flex w-full flex-row gap-6 text-sm font-medium text-smart-cbt-dark-green">
          <div>
            <span>{t("project.project")} : </span>
            <span>{title}</span>
          </div>
        </div>
        <div className="flex w-full flex-row gap-6 text-sm font-medium text-smart-cbt-dark-green">
          <div>
            <span>{t("project.community")} : </span>
            <span>{community}</span>
          </div>
        </div>
        <div className="flex w-full flex-row gap-6 text-sm font-medium text-smart-cbt-dark-green">
          <div>
            <span>{t("project.location")} : </span>
            <span>{location}</span>
          </div>
          <div>
            <span>{t("project.province")}</span>
            <span>{province}</span>
          </div>
        </div>
        <div className="mb-3 flex h-20 w-full flex-1 gap-2 divide-x divide-smart-cbt-light-grey">
          <div className="flex max-w-[50%] flex-1 flex-col gap-1 px-1">
            <div className="mb-2 h-6 w-fit rounded-[20px] bg-smart-cbt-light-green px-2 text-smart-cbt-green">
              {t("project.exAnte")}
            </div>
            <div className="ml-2 flex justify-between text-xs text-smart-cbt-green">
              <div className="flex flex-col gap-2">
                <p className="text-[#C5E9B0]">{t("project.npvSROI")}</p>
                <p className="font-medium">{exAnteNPV?.toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-2 text-right">
                <p className="text-[#C5E9B0]">{t("project.sroiRatio")}</p>
                <p className="font-medium">
                  {exAnteSROIRatio} {t("project.ratioTime")}
                </p>
              </div>
            </div>
          </div>
          {Object.keys(exPost).length != 0 && (
            <div className="flex flex-1 flex-col gap-1 pl-3 pr-1">
              <div className="ml-2 flex justify-between ">
                <div className="flex flex-col gap-2">
                  <div className="mb-2 h-6 w-fit rounded-[20px] bg-smart-cbt-light-grey px-2 text-smart-cbt-dark-grey">
                    {t("project.exPost")}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ">
                  <p className="text-2xs text-smart-cbt-dark-grey">{t("global.updatedAt")}</p>
                  <p className="text-xs font-medium text-smart-cbt-orange">{updateDate}</p>
                </div>
              </div>
              <div className="ml-2 flex justify-between text-xs text-smart-cbt-dark-grey">
                <div className="flex flex-col gap-2">
                  <p>{t("project.npvSROI")}</p>
                  <p className="font-medium text-[#262626]">{exPostNPV?.toLocaleString()}</p>
                </div>
                <div className="flex flex-col gap-2 ">
                  <p>{t("project.sroiRatio")}</p>
                  <p className="font-medium text-[#262626]">
                    {exPostSROIRatio} {t("project.ratioTime")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProjectGridItem;
