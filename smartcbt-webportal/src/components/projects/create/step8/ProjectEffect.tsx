import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { viewMode } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import CollapseSection from "../../../CollapseSection";
import ProjectEffectForm from "./ProjectEffectForm";
import ProjectEffectHeader from "./ProjectEffectHeader";

interface ProjectEffectProps {
  index: number;
  subindex: number;
  title: string;
}

const ProjectEffect = (props: ProjectEffectProps) => {
  const t = useTranslations("common");
  const { index, subindex, title } = props;
  const { getValues } = useFormContext<CreateProjectSchema>();
  const { viewOnly } = viewMode(getValues());

  return (
    <CollapseSection title={`${index + 1}.${subindex + 1} ${title}`} defaultOpen>
      <CollapseSection title={t("project.create.step8.effect.attribution")} defaultOpen>
        <div className="flex flex-col gap-4">
          <ProjectEffectHeader title={t("project.create.step8.effect.attribution")} type={"Attribution (%)"} />
          {getValues(`step6.sections.${index}.value.${subindex}.benefitDetails`).map((_, i) => (
            <ProjectEffectForm
              key={i}
              index={index}
              subindex={subindex}
              formIndex={i}
              type={"attribution"}
              viewOnly={viewOnly}
            />
          ))}
        </div>
      </CollapseSection>
      <CollapseSection title={t("project.create.step8.effect.deadweight")} defaultOpen>
        <div className="flex flex-col gap-4">
          <ProjectEffectHeader title={t("project.create.step8.effect.deadweight")} type={"Deadweight (%)"} />
          {getValues(`step6.sections.${index}.value.${subindex}.benefitDetails`).map((_, i) => (
            <ProjectEffectForm
              key={i}
              index={index}
              subindex={subindex}
              formIndex={i}
              type={"deadweight"}
              viewOnly={viewOnly}
            />
          ))}
        </div>
      </CollapseSection>
      <CollapseSection title={t("project.create.step8.effect.displacement")} defaultOpen>
        <div className="flex flex-col gap-4">
          <ProjectEffectHeader title={t("project.create.step8.effect.displacement")} type={"Displacement (%)"} />
          {getValues(`step6.sections.${index}.value.${subindex}.benefitDetails`).map((_, i) => (
            <ProjectEffectForm
              key={i}
              index={index}
              subindex={subindex}
              formIndex={i}
              type={"displacement"}
              viewOnly={viewOnly}
            />
          ))}
        </div>
      </CollapseSection>
    </CollapseSection>
  );
};

export default ProjectEffect;
