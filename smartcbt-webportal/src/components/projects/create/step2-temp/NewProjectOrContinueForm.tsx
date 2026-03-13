import { useFormContext } from "react-hook-form";

import FormDropdown from "@/components/form/FormDropdown";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { ProjectJson } from "@/utils/cms/adapters/website/sia/types/project";
import { viewMode } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";

const NewProjectOrContinueForm = ({ projects }: { projects: ProjectJson[] }) => {
  const t = useTranslations("common");

  const { register, getValues, setValue } = useFormContext<CreateProjectSchema>();

  const fieldValue = getValues("step2.4");

  const { viewOnly } = viewMode(getValues());

  const fetchProjects = async (keyword: string) => {
    return projects
      .map((project) => ({ id: project.id, name: project.cbt_project?.title ?? "" }))
      .filter((project) => project.name.toLowerCase().includes(keyword.toLowerCase()));
  };

  return (
    <div className="flex h-fit flex-col gap-4">
      {fieldValue.options.map((option, index, row) => (
        <span className="flex items-start gap-2 md:items-center" key={index}>
          <input
            id={`${fieldValue.key}-${option.key}-${option.value}`}
            className="form-radio checked:bg-smart-cbt-green hover:cursor-pointer"
            type="radio"
            value={option.value}
            checked={fieldValue.value == option.value}
            onChange={(e) => {
              setValue("step2.4.value", option.value as "new" | "continue", { shouldValidate: true });
              setValue("step2.4.project", null, { shouldValidate: true });
            }}
          />
          <div className="flex flex-col items-start lg:flex-row lg:items-center lg:gap-4">
            <label
              htmlFor={`${fieldValue.key}-${option.key}-${option.value}`}
              className="hover:cursor-pointer lg:mb-0 "
            >
              {option.label}
            </label>
            {index + 1 == row.length ? (
              <FormDropdown
                disabled={fieldValue.value == "new" || viewOnly}
                idKey={"id"}
                displayKey={"name"}
                searchFunction={fetchProjects}
                placeholder={t("global.project")}
                nullDisplay=""
                title={t("global.project")}
                inputEditable={true}
                {...register("step2.4.project")}
              />
            ) : (
              <></>
            )}
          </div>
        </span>
      ))}
    </div>
  );
};

export default NewProjectOrContinueForm;
