import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { useFormContext } from "react-hook-form";
import CollapseSection from "../../../CollapseSection";
import ProjectEffect from "./ProjectEffect";

const CreateProjectStep8 = () => {
  const { setValue, watch, register, control } = useFormContext<CreateProjectSchema>();
  const step8 = watch("step6");

  return (
    <div className="flex flex-col">
      {step8.sections.map((section, i) => {
        return (
          <CollapseSection key={i} title={`${i + 1}. ${section.title}`} defaultOpen>
            {section.value.map((value, j) => {
              return <ProjectEffect key={j} title={value.title} index={i} subindex={j} />;
            })}
          </CollapseSection>
        );
      })}
    </div>
  );
};

export default CreateProjectStep8;
