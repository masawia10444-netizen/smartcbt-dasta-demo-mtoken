import { ProjectBenefitDocument } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface ProjectBenefitFromImplementationProps {
  projectBenefitDocument: ProjectBenefitDocument;
}

const ProjectBenefitFromImplementation = (props: ProjectBenefitFromImplementationProps) => {
  const { projectBenefitDocument } = props;
  const t = useTranslations("common");
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">
        {t("project.documents.projectBenefit.fromImplementation.title")}
      </h1>
      {projectBenefitDocument.benefits.map((benefit, i) => (
        <Fragment key={i}>
          <ul key={i}>
            <div className="h-7 bg-smart-cbt-light-green px-2">
              <label className="text-2xs font-normal  text-smart-cbt-dark-green">{`${i + 1} ${benefit.title}`}</label>
            </div>
            {benefit.values.map((v, j) => (
              <li key={j} className="py-2 pl-4 text-2xs font-normal text-black">
                {`${i + 1}.${j + 1} ${v.title}`}
              </li>
            ))}
          </ul>
        </Fragment>
      ))}
    </div>
  );
};

export default ProjectBenefitFromImplementation;
