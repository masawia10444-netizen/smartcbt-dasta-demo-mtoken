import { TBody, Table, Td, Tf, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { ProjectbudgetDocument } from "@/utils/project-create-form-helper";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface ProjectBudgetDocumentProps {
  projectbudgetDocument: ProjectbudgetDocument;
}
const ProjectBudgetDocument = (props: ProjectBudgetDocumentProps) => {
  const { projectbudgetDocument } = props;
  const t = useTranslations("common");

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">{t("project.documents.projectBudget.title")}</h1>
      <Table>
        <Thead>
          <Tr className="border-b">
            <Th className="p-2 text-2xs font-normal text-smart-cbt-dark-green">
              {t("project.documents.projectBudget.year")}
            </Th>
            <Th className="p-2 text-2xs font-normal text-smart-cbt-dark-green">
              {t("project.documents.projectBudget.activity")}
            </Th>
            <Th className="p-2 text-2xs font-normal text-smart-cbt-dark-green">
              {t("project.documents.projectBudget.details")}
            </Th>
            <Th className="p-2 text-2xs font-normal text-smart-cbt-dark-green">
              {t("project.documents.projectBudget.budget")}
            </Th>
          </Tr>
        </Thead>
        <TBody className="border-x border-l border-t">
          {projectbudgetDocument.budgetYears.map((budgetYear, i) => (
            <Fragment key={i}>
              {budgetYear.budgetList.map((cost, j) => (
                <Tr key={j} className="border-y-transparent align-top">
                  <Td className="h-7 border-r px-4 py-1 text-center text-2xs text-black">
                    {j == 0 ? budgetYear.year : ""}
                  </Td>
                  <Td className="border-r px-4 py-1 text-left text-2xs text-black">
                    {j == 0 ? budgetYear.projectName : ""}
                  </Td>
                  <Td className="border-r px-4 py-1 text-right text-2xs text-black">{cost.description}</Td>
                  <Td className="h-7 px-4 py-1 text-right text-2xs text-black">
                    {cost.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </Td>
                </Tr>
              ))}
              <Tr className="">
                <Td className="bg-smart-cbt-light-grey">
                  <></>
                </Td>
                <Td className="bg-smart-cbt-light-grey">
                  <></>
                </Td>
                <Td className="h-7 bg-smart-cbt-light-grey px-4 py-1 text-right text-2xs font-semibold">
                  {t("project.documents.projectBudget.totalYear")} {i + 1}
                </Td>
                <Td className="h-7 bg-smart-cbt-light-grey px-4 py-1 text-right text-2xs font-semibold">
                  {budgetYear.totalForYear?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Td>
              </Tr>
            </Fragment>
          ))}
        </TBody>
        <Tf className="border-b border-l border-r">
          <Tr className="">
            <Td>
              <></>
            </Td>
            <Td>
              <></>
            </Td>
            <Td className="h-7 px-4 py-1 text-right text-2xs font-semibold text-smart-cbt-orange">
              {t("project.documents.projectBudget.total")}
            </Td>
            <Td className="h-7 px-4 py-1 text-right text-2xs font-semibold text-smart-cbt-orange">
              {projectbudgetDocument.grandTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Td>
          </Tr>
        </Tf>
      </Table>
      <div className="break-after-page"></div>
    </div>
  );
};

export default ProjectBudgetDocument;
