"use client";

import Image from "@/components/image";
import { unit } from "@/models/carbon-project";
import { CarbonListJson } from "@/utils/cms/adapters/website/carbon/types";
import { getCmsMedia } from "@/utils/cms/api-helpers";
import { capitalizeFirstLetter, convertDateStringToDateFormat } from "@/utils/helper";
import { Settings } from "luxon";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

Settings.defaultLocale = "th";
Settings.defaultOutputCalendar = "buddhist";

type ProjectGridItemProps = {
  project: CarbonListJson;
};

const ProjectGridItem = (props: ProjectGridItemProps) => {
  const { project } = props;
  const t = useTranslations("common");

  const { title } = project.cbt_project;
  const { cover_image, id, summary_cf, status, summary_cf_all, approve_date } = project;

  return (
    <Link
      href={`/carbon-footprint/projects/view/${id}`}
      className="relative flex flex-col overflow-hidden rounded-2xl bg-white drop-shadow-xl"
    >
      <div className="relative h-40">
        <Image src={getCmsMedia(cover_image?.url)} alt={title} fill />
      </div>
      <div className="flex flex-col gap-4 p-4">
        {/* <div className="mt-2 h-6 w-fit rounded-[20px] bg-smart-cbt-light-green px-2 text-smart-cbt-green">
          {t(`status.${status}`)}
        </div> */}
        <h3 className="h-[72px] overflow-hidden">{title}</h3>
        <p className="text-xs text-smart-cbt-medium-grey">{t("carbon.overview.footprintPersonDay")}</p>
        <p className="text-sm text-smart-cbt-dark-grey">
          {summary_cf?.toLocaleString()} {unit}
        </p>
        <div className="flex items-baseline justify-between text-xs text-smart-cbt-medium-grey">
          <p>{t("carbon.overview.totalFootprint")}</p>
          {status && <p>{capitalizeFirstLetter(t(`carbon.overview.status.${status}`))}</p>}
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-xl font-medium text-[#7DC395]">
            {summary_cf_all?.toLocaleString()} {unit}
          </p>
          {approve_date && (
            <p className="text-sm text-smart-cbt-dark-grey">{convertDateStringToDateFormat(approve_date)}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProjectGridItem;
