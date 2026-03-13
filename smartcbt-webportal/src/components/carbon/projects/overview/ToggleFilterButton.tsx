import { FilterIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { AppContext, CarbonContext } from "@/contexts/App.context";
import { ProjectOverviewSearchSchema } from "@/schemas/forms/carbon/projects/project-overview-search-schema";
import { CommunityJSONData } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";

type ToggleFilterButtonProps = {
  onClick: () => void;
  isExpanded: boolean;
};
const ToggleFilterButton = ({ isExpanded, onClick }: ToggleFilterButtonProps) => {
  const t = useTranslations("common");

  const { control } = useFormContext<ProjectOverviewSearchSchema>();
  const { provinces } = useContext(AppContext);
  const { listCommunity } = useContext(CarbonContext);

  // const statusDisplayName = (status: (null | PzrojectStatus)[]) =>
  //   status === null || (status && status.length > 0 && status.at(0) === null)
  //     ? t("global.allValues")
  //     : t(`project.status.${status}`);

  const communityDisplayName = (community: (null | CommunityJSONData)[]) =>
    community === null || (community && community.length > 0 && community.at(0) === null)
      ? t("global.allValues")
      : community.at(0)?.title ?? "";

  const provinceDisplayName = (province: (null | { title?: string | null })[]) =>
    province === null || (province && province.length > 0 && province.at(0) === null)
      ? t("global.allValues")
      : province.at(0)?.title ?? "";

  return isExpanded ? (
    <>
      {/* <Form.SelectDropDown
        name="status"
        values={[null, ...Object.values(ProjectStatus)]}
        idKey={null}
        buttonDisplayFunction={(v) => `${t("project.status.title")} : ${statusDisplayName(v)}`}
        displayFunction={(v) => statusDisplayName(v)}
        intent="filter"
        plainArrow
        placeholder={t("project.status.title")}
        control={control}
      /> */}
      <Form.SelectDropDown
        name="programOwner"
        values={[null, ...listCommunity]}
        idKey="id"
        buttonDisplayFunction={(v) => `${t("project.community")} : ${communityDisplayName(v)}`}
        displayFunction={(v) => communityDisplayName(v)}
        intent="filter"
        plainArrow
        placeholder={t("project.community")}
        control={control}
      />
      <Form.SelectDropDown
        name="province"
        values={[null, ...provinces]}
        idKey="id"
        buttonDisplayFunction={(v) => `${t("global.province")} : ${provinceDisplayName(v)}`}
        displayFunction={(v) => provinceDisplayName(v)}
        intent="filter"
        plainArrow
        placeholder={t("global.province")}
        control={control}
      />
    </>
  ) : (
    <button
      className="flex h-10 items-center gap-2 rounded-full bg-smart-cbt-light-grey px-4 text-smart-cbt-dark-grey"
      onClick={onClick}
    >
      {t("project.filter")}
      <FilterIcon />
    </button>
  );
};

export default ToggleFilterButton;
