import { useEffect, useState } from "react";

import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { TextArrayQuestionSchema } from "@/schemas/forms/projects/question-schema";
import { viewMode } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import QuestionSection from "../QuestionSection";

const CreateProjectStep4 = () => {
  const t = useTranslations("common");
  const { setValue, getValues, watch, register } = useFormContext<CreateProjectSchema>();
  const [isLoading, setIsLoading] = useState(true);

  const { viewOnly } = viewMode(getValues());
  const project = getValues();

  useEffect(() => {
    const existingValues = getValues("step4") ?? [];
    const step4 = (project.step2[14] as TextArrayQuestionSchema)?.value?.map((title, index) => {
      const currentValues = existingValues.at(index) ?? {
        with: {
          economic: "",
          social: "",
          environment: "",
        },
        without: {
          economic: "",
          social: "",
          environment: "",
        },
      };
      return {
        ...currentValues,
        title,
      };
    });
    setValue("step4", step4);
    setIsLoading(false);
  }, []);

  return (
    <div
      className="font-medium-lg flex flex-col gap-2 rounded border bg-white p-4 text-sm shadow-md lg:rounded-none lg:border-0 lg:shadow-none"
      {...{ inert: viewOnly ? "" : undefined }}
    >
      <div className="hidden items-center justify-center lg:flex  lg:h-10">
        <div className="flex h-full flex-1 items-center justify-center bg-smart-cbt-light-green">
          <h3 className="whitespace-nowrap text-center text-base text-smart-cbt-dark-green">
            {t("project.create.step4.with")}
          </h3>
        </div>
        <div className="flex h-full flex-1 items-center justify-center bg-smart-cbt-yellow-2">
          <h3 className="whitespace-nowrap text-center text-base text-smart-cbt-brown">
            {t("project.create.step4.without")}
          </h3>
        </div>
      </div>
      {project.step4?.map((item, index) => {
        return (
          <QuestionSection label={item.title} description={""} key={index} {...register("step4")}>
            <div className="flex w-full flex-col items-start justify-center lg:flex-row">
              <div className="flex w-full flex-1 flex-col justify-start gap-2 p-2">
                <div className="flex h-full w-full flex-col gap-4">
                  <label className="text-sm text-smart-cbt-dark-green">{t("project.create.step4.economic")}</label>
                  <textarea
                    disabled={viewOnly}
                    className="rounded-lg border border-smart-cbt-medium-grey p-2"
                    {...register(`step4.${index}.with.economic`)}
                    rows={10}
                  />
                </div>
              </div>
              <div className="flex w-full flex-1 flex-col gap-2 p-2">
                <div className="flex w-full flex-col gap-4">
                  <label className="text-sm text-smart-cbt-brown">{t("project.create.step4.economic")}</label>
                  <textarea
                    disabled={viewOnly}
                    rows={10}
                    className="rounded-lg border border-smart-cbt-medium-grey p-2"
                    {...register(`step4.${index}.without.economic`)}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-center lg:flex-row">
              <div className="flex w-full flex-1 flex-col justify-start gap-2 p-2">
                <div className="flex h-full w-full flex-col gap-4">
                  <label className="text-sm text-smart-cbt-dark-green">{t("project.create.step4.social")}</label>
                  <textarea
                    disabled={viewOnly}
                    rows={10}
                    className="rounded-lg border border-smart-cbt-medium-grey p-2"
                    {...register(`step4.${index}.with.social`)}
                  />
                </div>
              </div>
              <div className="flex w-full flex-1 flex-col gap-2 p-2">
                <div className="flex w-full flex-col gap-4">
                  <label className="text-sm text-smart-cbt-brown">{t("project.create.step4.social")}</label>
                  <textarea
                    disabled={viewOnly}
                    rows={10}
                    className="rounded-lg border border-smart-cbt-medium-grey p-2"
                    {...register(`step4.${index}.without.social`)}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col items-start justify-center lg:flex-row">
              <div className="flex w-full flex-1 flex-col justify-start gap-2 p-2">
                <div className="flex h-full w-full flex-col gap-4">
                  <label className="text-sm text-smart-cbt-dark-green">{t("project.create.step4.environment")}</label>
                  <textarea
                    disabled={viewOnly}
                    rows={10}
                    {...register(`step4.${index}.with.environment`)}
                    className="rounded-lg border border-smart-cbt-medium-grey p-2"
                  />
                </div>
              </div>
              <div className="flex w-full flex-1 flex-col gap-2 p-2">
                <div className="flex w-full flex-col gap-4">
                  <label className="text-sm text-smart-cbt-brown">{t("project.create.step4.environment")}</label>
                  <textarea
                    disabled={viewOnly}
                    rows={10}
                    className="rounded-lg border border-smart-cbt-medium-grey p-2"
                    {...register(`step4.${index}.without.environment`)}
                  />
                </div>
              </div>
            </div>
          </QuestionSection>
        );
      })}
    </div>
  );
};

export default CreateProjectStep4;
