"use client";

import {
  ProjectOverviewSearchSchema,
  projectOverviewSearchSchema,
} from "@/schemas/forms/projects/project-overview-search-schema";
import { useEffect, useState } from "react";

import { Checkbox } from "@/components/Checkbox";
import { IconParkOutlineSettingConfig } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import ToggleSearchButton from "@/components/ToggleSearchButton";
import { sortValues } from "@/components/form/FormSortToggleButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import ToggleFilterButton from "./ToggleFilterButton";

interface ProjectOverviewListHeaderProps {
  toggleProjectSelection: (selected: boolean) => void;
  onSearch: (params: any) => void;
}

type ProjectOverviewListHeaderMode = "filter" | "search";

const ProjectOverviewListHeader = (props: ProjectOverviewListHeaderProps) => {
  const { toggleProjectSelection, onSearch } = props;
  const formContext = useForm<ProjectOverviewSearchSchema>({
    resolver: zodResolver(projectOverviewSearchSchema),
    defaultValues: {
      npvSort: {
        npv: sortValues[0],
      },
    },
  });
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [mode, setMode] = useState<ProjectOverviewListHeaderMode>("filter");
  const t = useTranslations("common");

  useEffect(() => {
    toggleProjectSelection(isSelectionMode);
  }, [isSelectionMode, toggleProjectSelection]);

  useEffect(() => {
    const subscription = formContext.watch((value) => {
      const params = {
        status: value.status ?? undefined,
        startYear: value.year?.startYear ?? undefined,
        endYear: value.year?.endYear ?? undefined,
        projectLocations: value.projectLocations ?? undefined,
        dastaWorkingArea: value.dastaWorkingArea ?? undefined,
        province: value.province ?? undefined,
        npvSort: value.npvSort ?? undefined,
        search: value.search ?? undefined,
      };
      onSearch(params);
    });
    return () => subscription.unsubscribe();
  }, [formContext.watch, onSearch]);

  const toggleMode = () => {
    setMode((current) => (current == "filter" ? "search" : "filter"));
  };

  useEffect(() => {
    formContext.reset();
  }, [mode]);

  return (
    <FormProvider {...formContext}>
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col justify-between gap-2 lg:flex-row">
          <ToggleSearchButton
            placeholder={t("project.searchPlacehlder")}
            name={"search"}
            showClearButton={true}
            control={formContext.control}
            onClick={toggleMode}
            isExpanded={true}
            className="border border-smart-cbt-medium-grey bg-white"
          />
          <div className="flex flex-col items-start justify-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <Checkbox
              label={t("project.overview.toggleProjectSelection")}
              hideCheckbox={false}
              checked={isSelectionMode}
              onChange={() => setIsSelectionMode(!isSelectionMode)}
              id="toggleProjectSelection"
            />
            <NextLink intent={"primaryButton"} icon={<IconParkOutlineSettingConfig />} href="/sia-sroi/projects/manage">
              {t("project.manageProject")}
            </NextLink>
          </div>
        </div>
        <div className="flex flex-grow flex-wrap gap-2">
          <ToggleFilterButton onClick={toggleMode} isExpanded={true} />
        </div>
      </div>
    </FormProvider>
  );
};
export default ProjectOverviewListHeader;
