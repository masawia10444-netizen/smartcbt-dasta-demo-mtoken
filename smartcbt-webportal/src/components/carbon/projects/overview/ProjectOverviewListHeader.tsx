"use client";

import { useEffect, useState } from "react";

import ToggleSearchButton from "@/components/ToggleSearchButton";
import {
  ProjectOverviewSearchSchema,
  projectOverviewSearchSchema,
} from "@/schemas/forms/carbon/projects/project-overview-search-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";
import ToggleFilterButton from "./ToggleFilterButton";

interface ProjectOverviewListHeaderProps {
  onSearch: (params: any) => void;
}

type ProjectOverviewListHeaderMode = "filter" | "search";

const ProjectOverviewListHeader = (props: ProjectOverviewListHeaderProps) => {
  const { onSearch } = props;

  const t = useTranslations("common");

  const formContext = useForm<ProjectOverviewSearchSchema>({
    defaultValues: { programOwner: null, province: null, q: null },
    resolver: zodResolver(projectOverviewSearchSchema),
  });

  const [mode, setMode] = useState<ProjectOverviewListHeaderMode>("filter");

  useEffect(() => {
    const subscription = formContext.watch((value) => {
      const params = {
        province: value.province ?? undefined,
        // status: value.status ?? undefined,
        programOwner: value.programOwner ?? undefined,
        q: value.q,
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
      <div className="flex flex-col gap-2 lg:flex-row">
        <ToggleSearchButton
          placeholder={t("project.searchPlacehlder")}
          name={"q"}
          showClearButton={true}
          control={formContext.control}
          onClick={toggleMode}
          isExpanded={mode == "search"}
        />
        <ToggleFilterButton onClick={toggleMode} isExpanded={mode == "filter"} />
      </div>
    </FormProvider>
  );
};
export default ProjectOverviewListHeader;
