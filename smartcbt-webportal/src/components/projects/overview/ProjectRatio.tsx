import { useTranslations } from "next-intl";

export interface YearRatio {
  startedAt?: number;
  endedAt?: number;
  ratio: number;
}
export interface ProjectRatio {
  exAnte?: YearRatio;
  exPost?: YearRatio;
}

const ProjectRatio = (props: ProjectRatio) => {
  const { exAnte, exPost } = props;
  const t = useTranslations("common");

  const exAnteStartAt = exAnte?.startedAt;
  const exAnteEndAt = exAnte?.endedAt;
  const exPostStartAt = exPost?.startedAt;
  const exPostEndAt = exPost?.endedAt;

  return (
    <div className="flex w-fit flex-col gap-1 text-base md:mx-4">
      <span className="flex flex-row items-center gap-2 text-smart-cbt-green ">
        <p className="text-smart-cbt-green"> {t("project.exAnte")}</p>
        {exAnteStartAt && exAnteEndAt ? (
          <p className="text-sm text-smart-cbt-green">
            ( {exAnteStartAt} - {exAnteEndAt} )
          </p>
        ) : (
          <span></span>
        )}
        {exAnte && exAnte?.ratio ? (
          <p className="font-medium text-smart-cbt-green">
            {exAnte?.ratio.toFixed(2) ?? "-"} {t("project.ratioTime")}
          </p>
        ) : (
          <>{"-"}</>
        )}
      </span>
      <span className="flex flex-row items-center gap-2">
        <p className="text-smart-cbt-medium-grey"> {t("project.exPost")} </p>
        {exPostStartAt && exPostEndAt ? (
          <p className="pl-1 text-sm text-smart-cbt-medium-grey">
            ( {exPostStartAt} - {exPostEndAt} )
          </p>
        ) : (
          <span className="w-[5px]"></span>
        )}
        {exPost && exPost?.ratio ? (
          <p className="font-medium text-smart-cbt-dark-grey">
            {exPost?.ratio.toFixed(2)} {t("project.ratioTime")}
          </p>
        ) : (
          <>{"-"}</>
        )}
      </span>
      <span className="text-right text-[8px] text-smart-cbt-orange">{t("project.overview.remark")}</span>
    </div>
  );
};

export default ProjectRatio;
