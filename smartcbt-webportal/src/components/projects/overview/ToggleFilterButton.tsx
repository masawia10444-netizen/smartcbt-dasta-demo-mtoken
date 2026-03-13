import { FilterIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import FormSortToggleButton from "@/components/form/FormSortToggleButton";
import FormYearPicker from "@/components/form/FormYearPicker";
import { AppContext, SiaSroiContext } from "@/contexts/App.context";
import { ProjectOverviewSearchSchema } from "@/schemas/forms/projects/project-overview-search-schema";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
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
  const { provinces, communities } = useContext(AppContext);
  const { dastaWorkingArea } = useContext(SiaSroiContext);

  const statusDisplayName = (status: (null | PROJECT_STATUS)[]) =>
    status === null || (status && status.length > 0 && status.at(0) === null)
      ? t("global.allValues")
      : t(`project.status.${status}`);

  const dastaWorkingAreaDisplayName = (dastaWorkingArea: (null | { key: string; value: string; label: string })[]) =>
    dastaWorkingArea === null || (dastaWorkingArea && dastaWorkingArea.length > 0 && dastaWorkingArea.at(0) === null)
      ? t("global.allValues")
      : dastaWorkingArea.at(0)?.label ?? "";

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
      <Form.SelectDropDown
        name="status"
        values={[null, ...Object.values(PROJECT_STATUS)]}
        idKey={null}
        buttonDisplayFunction={(v) => `${t("project.status.title")} : ${statusDisplayName(v)}`}
        displayFunction={(v) => statusDisplayName(v)}
        intent="filter"
        plainArrow
        placeholder={t("project.status.title")}
        control={control}
        className="bg-white"
      />
      <FormYearPicker
        title={t("project.year")}
        startYear={2000}
        endYear={new Date().getFullYear() + 20}
        name={"year"}
        control={control}
        showPagination
        className="bg-white"
        useThaiYear
      />
      <Form.SelectDropDown
        name="projectLocations"
        values={[null, ...communities]}
        idKey="id"
        buttonDisplayFunction={(v) => `${t("project.community")} : ${communityDisplayName(v)}`}
        displayFunction={(v) => communityDisplayName(v)}
        intent="filter"
        plainArrow
        placeholder={t("project.community")}
        className="bg-white"
        control={control}
      />
      <Form.SelectDropDown
        name="dastaWorkingArea"
        values={[null, ...dastaWorkingArea]}
        idKey="key"
        buttonDisplayFunction={(v) => `${t("project.dastaWorkingArea")} : ${dastaWorkingAreaDisplayName(v)}`}
        displayFunction={(v) => dastaWorkingAreaDisplayName(v)}
        intent="filter"
        plainArrow
        placeholder={t("project.dastaWorkingArea")}
        className="bg-white"
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
        className="bg-white"
        control={control}
      />
      <FormSortToggleButton name={"npvSort.npv"} label={t("project.npv")} control={control} className="bg-white" />
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
