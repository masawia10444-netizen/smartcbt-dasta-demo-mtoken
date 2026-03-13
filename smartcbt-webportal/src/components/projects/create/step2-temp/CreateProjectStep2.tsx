import { QuestionSchema, QuestionWithSubQuestionSchema } from "@/schemas/forms/projects/question-schema";

import FormCollapsibleQuestion from "@/components/form/questions/FormCollapsibleQuestion";
import FormGroupedSubQuestion from "@/components/form/questions/FormGroupedSubQuestion";
import FormTextQuestion from "@/components/form/questions/FormTextFieldQuestion";
import { OrganizationJson, ProjectJson } from "@/utils/cms/adapters/website/sia/types/project";
import { viewMode } from "@/utils/project-create-form-helper";
import { useFormContext } from "react-hook-form";
import QuestionSection from "../QuestionSection";
import NewProjectOrContinueForm from "./NewProjectOrContinueForm";
import ProjectBudgetForm from "./ProjectBudgetForm";
import ProjectLocationForm from "./ProjectLocationForm";
import ProjectOrganizationForm from "./ProjectOranizationForm";

const CreateProjectStep2 = ({
  projects,
  organizations,
}: {
  projects: ProjectJson[];
  organizations: OrganizationJson[];
}) => {
  const { control, getValues, formState } = useFormContext<any>();
  const { viewOnly } = viewMode(getValues());
  return (
    <div className="flex flex-col gap-2 bg-white text-sm" {...{ inert: viewOnly ? "" : undefined }}>
      <QuestionSection label={getValues("step2.1")?.label} shadow control={control} name="step2.1">
        {(getValues("step2.1.questions") as QuestionSchema[]).map((q, i) => {
          const qWithSub = getValues(`step2.1.questions[${i}]`) as QuestionWithSubQuestionSchema;
          if (qWithSub?.subQuestions && qWithSub?.subQuestions.length > 0) {
            return (
              <QuestionSection
                key={i}
                label={getValues(`step2.1.questions[${i}]`)?.label}
                control={control}
                name={`step2.1.questions[${i}]`}
              >
                <FormGroupedSubQuestion name={`step2.1.questions[${i}]`} control={control} />
              </QuestionSection>
            );
          }
          return <FormCollapsibleQuestion key={i} control={control} name={`step2.1.questions[${i}]`} />;
        })}
      </QuestionSection>
      <FormCollapsibleQuestion control={control} name="step2.2" shadow />
      <FormCollapsibleQuestion control={control} name="step2.3" shadow />
      <QuestionSection label={getValues("step2.4")?.label} shadow control={control} name="step2.4">
        <div className="flex flex-col gap-2 py-4">
          <NewProjectOrContinueForm projects={projects} />
        </div>
      </QuestionSection>
      <QuestionSection label={getValues("step2.5")?.label} shadow control={control} name="step2.5">
        <div className="flex flex-col gap-2 py-4">
          <ProjectLocationForm />
        </div>
      </QuestionSection>
      <QuestionSection
        label={getValues("step2.6")?.label}
        description={getValues("step2.6")?.description}
        shadow
        control={control}
        name="step2.6"
      >
        <FormGroupedSubQuestion name={`step2.6`} control={control} />
      </QuestionSection>
      <QuestionSection label={getValues("step2.7")?.label} shadow control={control} name="step2.7">
        <div className="flex flex-col gap-2 py-4">
          <ProjectOrganizationForm organizations={organizations} />
        </div>
      </QuestionSection>
      <QuestionSection label={getValues("step2.8")?.label} shadow control={control} name="step2.8">
        <div className="flex flex-col gap-2 py-4">
          {(getValues("step2.8.questions") as QuestionSchema[]).map((q, i) => (
            <FormTextQuestion key={i} control={control} name={`step2.8.questions[${i}]`} isSubQuestion />
          ))}
        </div>
      </QuestionSection>
      <QuestionSection label={getValues("step2.9")?.label} shadow control={control} name="step2.9">
        <div className="flex flex-col gap-2 py-4">
          {(getValues("step2.9.questions") as QuestionSchema[]).map((q, i) => (
            <FormTextQuestion key={i} control={control} name={`step2.9.questions[${i}]`} isSubQuestion />
          ))}
        </div>
      </QuestionSection>
      <QuestionSection label={getValues("step2.10")?.label} shadow control={control} name="step2.10">
        <div className="flex flex-col gap-2 py-4">
          <ProjectBudgetForm />
        </div>
      </QuestionSection>
      <FormCollapsibleQuestion control={control} name="step2.11" shadow />
      <FormCollapsibleQuestion control={control} name="step2.12" shadow />
      <FormCollapsibleQuestion control={control} name="step2.13" shadow />
      <FormCollapsibleQuestion control={control} name="step2.14" shadow />
      <FormCollapsibleQuestion control={control} name="step2.15" shadow />
      <FormCollapsibleQuestion control={control} name="step2.16" shadow />
    </div>
  );
};

export default CreateProjectStep2;
