import { useFormContext } from "react-hook-form";

import { DeleteIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { BudgetSchema } from "@/schemas/forms/projects/question-schema";
import { viewMode } from "@/utils/project-create-form-helper";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Fragment, useEffect } from "react";
import { NumericFormat } from "react-number-format";

const ProjectBudgetForm = () => {
  const { register, getValues, setValue, watch } = useFormContext<CreateProjectSchema>();
  const t = useTranslations("common");

  const fieldValue = watch("step2.10.value");

  const { viewOnly } = viewMode(getValues());

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name?.startsWith("step2.8")) {
        const data: BudgetSchema[] = [];
        const availableYears: string[] = [];
        const step28Data = value.step2![8] as any;
        for (let year = step28Data.questions[1].value; year <= step28Data.questions[2].value; year++) {
          availableYears.push(year.toString());
        }
        availableYears.forEach((year, yi) => {
          data.push({ year, values: [{ description: "", amount: 0, unit: "บาท" }] });
        });
        setValue(`step2.10.value`, data);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const total = fieldValue.reduce(
    (acc, value) => (acc += value.values.reduce((acc, value) => (acc += value.amount), 0)),
    0
  );

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <div className="flex items-center gap-5">
        <p className="flex-[15%] text-center">{t("project.budget.fiscalYear")}</p>
        <p className="flex-[50%]">{t("project.budget.description")}</p>
        <p className="flex-[20%]">{t("project.budget.amount")}</p>
        <p className="flex-[10%]">{t("global.unit")}</p>
        <p className="flex-[5%]" />
      </div>
      {fieldValue.map((valueForYear, yi) => {
        const budgetForYear = fieldValue.at(yi);
        if (!budgetForYear) return <></>;
        const totalForYear = budgetForYear.values.reduce((acc, value) => (acc += value.amount), 0) ?? 0;
        return (
          <Fragment key={yi}>
            {budgetForYear.values.map((yearValue, yvi) => (
              <div key={yvi} className="flex gap-5 ">
                {yvi == 0 ? (
                  <Form.Input
                    value={valueForYear.year}
                    className="flex-[15%] bg-smart-cbt-light-grey text-center"
                    disabled
                  />
                ) : (
                  <div className="flex-[15%]" />
                )}
                <Form.Input
                  disabled={viewOnly}
                  defaultValue={""}
                  className="flex-[50%]"
                  {...register(`step2.10.value.${yi}.values.${yvi}.description`)}
                />
                <NumericFormat
                  disabled={viewOnly}
                  defaultValue={0}
                  customInput={Form.Input}
                  thousandSeparator={","}
                  className="flex-[20%] text-right"
                  onValueChange={(v) =>
                    setValue(`step2.10.value.${yi}.values.${yvi}.amount`, v.floatValue ?? 0, { shouldValidate: true })
                  }
                  value={getValues(`step2.10.value.${yi}.values.${yvi}.amount`)}
                />
                <Form.Input value={yearValue.unit} className="flex-[10%] bg-smart-cbt-light-grey text-right" disabled />
                {budgetForYear.values.length >= 2 ? (
                  <button
                    type="button"
                    className="flex flex-[5%] items-center justify-center text-smart-cbt-red"
                    onClick={() => {
                      const newValues = budgetForYear.values;
                      newValues.splice(yvi, 1);
                      setValue(`step2.10.value.${yi}.values`, newValues, { shouldValidate: true });
                    }}
                  >
                    <DeleteIcon />
                  </button>
                ) : (
                  <div className="flex-[5%]" />
                )}
              </div>
            ))}
            <div className="flex items-center gap-5">
              <div className="flex-[15%]" />
              <div className="flex flex-[50%] items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    const newValue = [...budgetForYear.values, { description: "", amount: 0, unit: t("global.baht") }];
                    setValue(`step2.10.value.${yi}.values`, newValue, { shouldValidate: true });
                  }}
                  className="flex items-center justify-center gap-2 rounded-md border border-dashed p-2 text-smart-cbt-dark-grey"
                >
                  <PlusIcon className="h-6 w-6" />
                  {t("project.create.step2.addDetails")}
                </button>
                <p className="ml-3 text-right">{t("project.create.step2.totalBudgetForYear", { yearIndex: yi + 1 })}</p>
              </div>

              <Form.NumberInput
                fixedValue={totalForYear}
                className="flex-[20%] bg-smart-cbt-light-grey text-right"
                disabled
              />
              <Form.Input value={t("global.baht")} className="flex-[10%] bg-smart-cbt-light-grey text-right" disabled />
              <div className="flex-[5%]" />
            </div>
          </Fragment>
        );
      })}
      <div className="mt-4 flex items-center gap-5 text-smart-cbt-orange">
        <div className="flex-[15%]" />
        <p className="ml-3 flex-[50%] text-right">{t("project.create.step2.totalBudget")}</p>

        <Form.NumberInput fixedValue={total} displayType="text" className="flex-[20%] text-right" disabled />
        <p className="ml-3 flex-[10%] pr-2 text-right">{t("global.baht")}</p>
        <p className="flex-[5%]" />
      </div>
    </div>
  );
};

export default ProjectBudgetForm;
