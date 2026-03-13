"use client";

import { CarbonJson } from "@/utils/cms/adapters/website/carbon/types";
import { CARBON_PROGRAM_STATUS } from "@/utils/cms/adapters/website/constants";
import { CreateProjectMainForm } from "../create/CreateProjectMainForm";
import ProjectDetail from "./ProjectDetail";
import ProjectRounds from "./ProjectRound";

type ProjectMainDetailPageProps = {
  carbonProgram?: CarbonJson | null;
  emissionFactorTypes: Record<string, any>;
  isViewOnly: boolean;
};

const ProjectMainDetailPage = ({ carbonProgram, emissionFactorTypes, isViewOnly }: ProjectMainDetailPageProps) => {
  switch (carbonProgram?.status) {
    case CARBON_PROGRAM_STATUS.DRAFT:
      return <CreateProjectMainForm carbonProgram={carbonProgram} />;
    case CARBON_PROGRAM_STATUS.APPROVAL:
      return (
        <ProjectRounds
          carbonProgram={carbonProgram}
          emissionFactorTypes={emissionFactorTypes}
          isViewOnly={isViewOnly}
        />
      );
    case CARBON_PROGRAM_STATUS.REJECTED:
      return <CreateProjectMainForm carbonProgram={carbonProgram} />;
    default:
      return (
        <ProjectDetail
          carbonProgram={carbonProgram}
          emissionFactorTypes={emissionFactorTypes}
          isViewOnly={isViewOnly}
        />
      );
  }
};

export default ProjectMainDetailPage;
