import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import Form from "@/components/form/Form";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

const CreateProjectStep5 = () => {
  const t = useTranslations("common");

  const { getValues } = useFormContext<CreateProjectSchema>();

  const project = getValues();

  const grandTotal = project.step2[10].value.reduce(
    (acc, value) => (acc += value.values.reduce((acc, value) => (acc += value.amount), 0)),
    0
  );

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>{t("project.create.step5.fiscalYear")}</Th>
          <Th>{t("project.create.step5.mainActivities")}</Th>
          <Th>{t("project.create.step5.listOfCosts")}</Th>
          <Th>{t("project.create.step5.budget")}</Th>
        </Tr>
      </Thead>
      <TBody className="text-center">
        {project.step2[10].value.map((budgetYear, byi) => {
          const total = budgetYear.values.reduce((acc, by) => (acc += by.amount), 0);
          return (
            <Fragment key={byi}>
              {budgetYear.values.map((budgetYearDetail, bydi) => (
                <Tr key={bydi}>
                  <Td>{bydi == 0 ? budgetYear.year : ""}</Td>
                  <Td>{bydi == 0 ? project.step1.name : ""}</Td>
                  <Td>{budgetYearDetail.description}</Td>
                  <Td>
                    <Form.NumberInput displayType="text" fixedValue={budgetYearDetail.amount} />
                  </Td>
                </Tr>
              ))}
              <Tr className="bg-smart-cbt-light-grey">
                <Td>{""}</Td>
                <Td>{""}</Td>
                <Td>{t("project.create.step5.totalBudgetForYear", { year: byi + 1 })}</Td>
                <Td>
                  <Form.NumberInput displayType="text" fixedValue={total} />
                </Td>
              </Tr>
            </Fragment>
          );
        })}
        <Tr className="text-smart-cbt-orange">
          <Td>{}</Td>
          <Td>{}</Td>
          <Td>{t("project.create.step5.totalBudget")}</Td>
          <Td>
            <Form.NumberInput displayType="text" fixedValue={grandTotal} />
          </Td>
        </Tr>
      </TBody>
    </Table>
  );
};

export default CreateProjectStep5;
