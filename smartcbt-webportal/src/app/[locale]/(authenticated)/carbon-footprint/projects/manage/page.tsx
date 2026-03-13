import ProjectList from "@/components/carbon/projects/manage/ProjectList";
import { countProjectStatus } from "@/utils/helper";
import { fetchListCarbon } from "../actions";

export default async function ProjectManage() {
  const projects = await fetchListCarbon();
  const statusCounts = countProjectStatus(projects);

  return <ProjectList statusCounts={statusCounts} />;
}
