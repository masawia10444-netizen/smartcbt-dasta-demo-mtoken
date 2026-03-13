import { TBody, Table, Td, Tr } from "@/components/data-table/data-table-cva";

import { cn } from "@/utils/cn";
import { SIADocument } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import BulletList from "./BulletList";

interface SIASummaryDocumentProps {
  siaDocument: SIADocument;
}
const SIASummaryDocument = (props: SIASummaryDocumentProps) => {
  const { siaDocument } = props;
  const {
    projectName,
    duration,
    startYear,
    projectAgency,
    organization,
    beneficiaries,
    actitivies,
    outcomes,
    effects,
    budget,
  } = siaDocument.sia;
  const t = useTranslations("common");

  return (
    <div className="flex break-after-all flex-col gap-2">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">{t("project.documents.summary.title")}</h1>
      <Table className="py-4">
        <TBody>
          <Tr>
            <Td className="py-2 pl-0 text-2xs font-medium text-smart-cbt-dark-green" colSpan={6}>
              {t("project.documents.summary.sia.title")}
            </Td>
          </Tr>
          <Tr>
            <Td className="w-44 border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green">
              {t("project.documents.summary.sia.projectName")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-black" colSpan={4}>
              {projectName}
            </Td>
          </Tr>
          <Tr>
            <Td className="w-48 border bg-smart-cbt-light-green p-2 text-left text-2xs font-normal text-smart-cbt-dark-green ">
              {t("project.documents.summary.sia.year")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-black" colSpan={4}>
              {duration}
            </Td>
          </Tr>
          <Tr>
            <Td className="w-44 border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green">
              {t("project.documents.summary.sia.startYear")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-black" colSpan={4}>
              {startYear}
            </Td>
          </Tr>
          {/* Budget */}
          {budget.budgetYears.map((budgetYear, index) => (
            <Fragment key={index}>
              <Tr>
                <Td className="border p-2 text-2xs font-semibold text-black" colSpan={6}>
                  {budgetYear.year}
                </Td>
              </Tr>
              {budgetYear.budgetList.map((budgetList, index) => (
                <Fragment key={index}>
                  <Tr>
                    <Td className="border p-2 text-2xs font-normal text-black">{budgetList.description}</Td>
                    <Td className="border p-2 text-2xs font-normal text-black">
                      {budgetList.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                  </Tr>
                </Fragment>
              ))}
              <Tr className="bg-smart-cbt-light-grey">
                <Td className="border p-2 text-2xs font-normal text-black">
                  {t("project.documents.summary.sia.totalYear", { year: index + 1 })}
                </Td>
                <Td className="border p-2 text-2xs font-normal text-black">
                  {budgetYear.totalForYear?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Td>
              </Tr>
            </Fragment>
          ))}
          <Tr>
            <Td className="border p-2 text-right text-2xs font-normal text-smart-cbt-orange">
              {t("project.documents.summary.sia.total")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-smart-cbt-orange">
              {budget.grandTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Td>
          </Tr>
          {/* Budget */}
          <Tr className="border">
            <Td className="w-48 border bg-smart-cbt-light-green p-2 text-left text-2xs font-normal text-smart-cbt-dark-green ">
              {t("project.documents.summary.sia.institution")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-black" colSpan={4}>
              {organization}
            </Td>
          </Tr>
          <Tr className="border">
            <Td className="w-48 border bg-smart-cbt-light-green p-2 text-left text-2xs font-normal text-smart-cbt-dark-green ">
              {t("project.documents.summary.sia.beneficiary")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-black" colSpan={4}>
              <BulletList listDecimal items={beneficiaries} />
            </Td>
          </Tr>
          <Tr className="border">
            <Td className="w-48 border bg-smart-cbt-light-green p-2 text-left text-2xs font-normal text-smart-cbt-dark-green ">
              {t("project.documents.summary.sia.activity")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-black" colSpan={4}>
              <BulletList listDecimal items={actitivies} />
            </Td>
          </Tr>
          <Tr className="border">
            <Td className="w-48 border bg-smart-cbt-light-green p-2 text-left text-2xs font-normal text-smart-cbt-dark-green ">
              {t("project.documents.summary.sia.outcome")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-black" colSpan={4}>
              <BulletList listDecimal items={outcomes} />
            </Td>
          </Tr>
          <Tr className="border">
            <Td className="w-48 border bg-smart-cbt-light-green p-2 text-left text-2xs font-normal text-smart-cbt-dark-green ">
              {t("project.documents.summary.sia.impact.title")}
            </Td>
            <Td className="border p-0 text-2xs font-normal text-black" colSpan={4}>
              {/* Effect */}
              {effects.map((effect, index) => (
                <div key={index}>
                  <div className={cn("h-full w-full border-b p-2", index > 0 && "border-t")}>
                    <label className="font-medium">{effect.title}</label>
                  </div>
                  <div className="flex flex-col gap-4 p-2">
                    <BulletList
                      listDecimal
                      title={t("project.documents.summary.sia.impact.economic")}
                      items={[effect.with.economic]}
                    />
                    <BulletList
                      listDecimal
                      title={t("project.documents.summary.sia.impact.social")}
                      items={[effect.with.social]}
                    />
                    <BulletList
                      listNone
                      title={t("project.documents.summary.sia.impact.environment")}
                      items={[effect.with.environment]}
                    />
                  </div>
                </div>
              ))}
              {/* Effect */}
            </Td>
          </Tr>
        </TBody>
      </Table>
    </div>
  );
};

export default SIASummaryDocument;
