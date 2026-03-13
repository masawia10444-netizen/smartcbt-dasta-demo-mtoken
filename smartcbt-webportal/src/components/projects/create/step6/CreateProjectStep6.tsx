import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { viewMode } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Step6NestedTextField from "./Step6NestedTextField";

const CreateProjectStep6 = () => {
  const { setValue, getValues, register, control } = useFormContext<CreateProjectSchema>();
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("common");

  const { viewOnly } = viewMode(getValues());

  const project = getValues();

  useEffect(() => {
    const field = project.step2[14].value;
    const existingValues = project.step6.sections;
    const step6Sections = field.map((title, index) => {
      return {
        ...existingValues[index],
        title,
      };
    });

    setValue("step6.sections", step6Sections);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col gap-4" {...{ inert: viewOnly ? "" : undefined }}>
      {project.step6.sections.map((section, i) => {
        return (
          <div key={i}>
            <div className="bg-smart-cbt-light-green px-3 py-2 text-smart-cbt-dark-green">
              {t("project.create.step6.benefitNo")} {`${i + 1} `}
              {section.title}
            </div>
            <div className="flex items-center justify-between gap-2 p-2" key={i}>
              <Step6NestedTextField index={i} control={control} register={register} getValues={getValues} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CreateProjectStep6;
