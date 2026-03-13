import { fetchListProject } from "@/app/[locale]/(authenticated)/sia-sroi/action";
import { ProjectOverviewSearchSchema } from "@/schemas/forms/projects/project-overview-search-schema";
import { Project } from "@/utils/cms/adapters/website/sia/types/project";
import { handleAPIError } from "@/utils/helper";
import { useEffect, useState } from "react";
import ProjectGridItem from "./ProjectGridItem";
import ProjectOverviewListHeader from "./ProjectOverviewListHeader";
import { YearRatio } from "./ProjectRatio";

interface ProjectOverviewListProps {
  setSummary: (exAnte: YearRatio | undefined, exPost: YearRatio | undefined) => void;
}

const ProjectOverviewList = (props: ProjectOverviewListProps) => {
  const { setSummary } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [data, setData] = useState<Project[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<Project[]>([]);
  const [searchParams, setSearchParams] = useState<
    Omit<ProjectOverviewSearchSchema, "year"> & { startYear?: number; endYear?: number }
  >();

  const onSearch = (params: any) => {
    setSearchParams(params);
  };

  useEffect(() => {
    const exAnteRatio =
      selectedProjects
        .map((s) => s.project_summary_ex_ante.sroi_ratio)
        .reduce((acc, currentValue) => acc + currentValue, 0) / selectedProjects.length;
    const exAnteStartYear =
      selectedProjects.length === 0
        ? undefined
        : Math.max(...selectedProjects.map((s) => s.project_start_year)) ?? undefined;
    const exAnteEndYear =
      selectedProjects.length === 0
        ? undefined
        : Math.max(...selectedProjects.map((s) => s.project_end_year)) ?? undefined;
    const exPostRatio =
      selectedProjects
        .map((s) =>
          !s.project_summary_ex_post || Object.keys(s.project_summary_ex_post).length === 0
            ? 0
            : s.project_summary_ex_post.sroi_ratio
        )
        .reduce((acc, currentValue) => acc + currentValue, 0) / selectedProjects.length;
    const exPostStartYear =
      selectedProjects.length === 0 ? undefined : Math.max(...selectedProjects.map((s) => s.project_start_year));
    const exPostEndYear =
      selectedProjects.length === 0 ? undefined : Math.max(...selectedProjects.map((s) => s.project_end_year));
    setSummary(
      { ratio: exAnteRatio, startedAt: exAnteStartYear, endedAt: exAnteEndYear },
      { ratio: exPostRatio, startedAt: exPostStartYear, endedAt: exPostEndYear }
    );
  }, [selectedProjects]);

  const handleProjectToggle = (project: Project) => {
    setSelectedProjects((prevSelectedProjects) => {
      const isSelected = prevSelectedProjects.includes(project);
      return isSelected
        ? prevSelectedProjects.filter((prevProject) => prevProject.id !== project.id)
        : [...prevSelectedProjects, project];
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const status = searchParams?.status;
        const startYear = searchParams?.startYear ? (searchParams?.startYear + 543)?.toString() : undefined;
        const endYear = searchParams?.endYear ? (searchParams?.endYear + 543)?.toString() : undefined;
        const npvSort = searchParams?.npvSort.npv.value;
        const dastaWorkingArea = searchParams?.dastaWorkingArea?.value
          ? Number(searchParams?.dastaWorkingArea?.value)
          : undefined;
        const projectLocations = searchParams?.projectLocations?.id;
        const province = searchParams?.province?.id;
        const search = searchParams?.search;

        const res = await fetchListProject(
          status,
          startYear,
          endYear,
          projectLocations,
          dastaWorkingArea,
          province,
          npvSort,
          search
        );
        setData(res);
        setIsLoading(false);
      } catch (error) {
        handleAPIError(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchParams]);

  const renderProjects = () => {
    return data.map((project: Project, i: number) => {
      return (
        <ProjectGridItem isSelectionMode={isSelectionMode} project={project} key={i} onChange={handleProjectToggle} />
      );
    });
  };

  return (
    <div>
      <ProjectOverviewListHeader onSearch={onSearch} toggleProjectSelection={setIsSelectionMode} />
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green" />
        </div>
      ) : (
        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{renderProjects()}</div>
      )}
    </div>
  );
};

export default ProjectOverviewList;
