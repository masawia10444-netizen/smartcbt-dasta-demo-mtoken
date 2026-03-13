import { TBody, Table, Td, Tr } from "@/components/data-table/data-table-cva";

import { ProjectDetailsDocument } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";
import BulletList from "./BulletList";

interface ProjectDetailsAndRelatedPlansDocumentProps {
  projectDetailsDocument: ProjectDetailsDocument;
}
const ProjectDetailsAndRelatedPlansDocument = (props: ProjectDetailsAndRelatedPlansDocumentProps) => {
  const { projectDetailsDocument } = props;
  const { ans1, ans2 } = projectDetailsDocument;

  const projectTypes: string[] = ans1.projectTypes ? (ans1.projectTypes as string[]) : [];

  const t = useTranslations("common");
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">{t("project.documents.projectDetails.title")}</h1>
      <Table className="py-4">
        <TBody>
          <Tr className="bg-smart-cbt-light-green">
            <Td className="px-2 py-2 text-2xs font-normal text-smart-cbt-dark-green" colSpan={6}>
              {t("project.documents.projectDetails.question.1")}
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-2xs font-normal" colSpan={2}>
              {t("project.documents.projectDetails.question.1dot1")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              {ans1.oneDotOne}
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-2xs font-normal" colSpan={2}>
              {t("project.documents.projectDetails.question.1dot2")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              {ans1.oneDotTwo.map((item, index) => (
                <BulletList title={item.label} items={[item.items]} key={index} />
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-2xs font-normal" colSpan={2}>
              {t("project.documents.projectDetails.question.1dot3")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              <BulletList items={ans1.oneDotThree} />
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-2xs font-normal" colSpan={2}>
              {t("project.documents.projectDetails.question.1dot4")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              {ans1.oneDotFour.map((item, index) => (
                <BulletList title={item.label} items={[item.items]} key={index} />
              ))}
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-2xs font-normal" colSpan={2}>
              {t("project.documents.projectDetails.question.1dot5")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              <BulletList listNone items={ans1.oneDotFive} />
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-2xs font-normal" colSpan={2}>
              {t("project.documents.projectDetails.question.1dot6")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              <BulletList items={ans1.oneDotSix} />
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-2xs font-normal" colSpan={2}>
              {t("project.documents.projectDetails.question.1dot7")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              <BulletList items={ans1.oneDotSeven} />
            </Td>
          </Tr>
          {/* step 2 */}
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.2")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              <BulletList title={ans2.type} items={[]} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.3")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              <BulletList items={projectTypes} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.4")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              <BulletList
                title={t("project.documents.projectDetails.projectStatus." + ans1.projectStatus)}
                items={[]}
              />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.5")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              <BulletList title={ans1.projectLocations} items={[]} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.6")}
            </Td>
            <Td className="border px-3 py-1" colSpan={4}>
              {/* <BulletList title={"ส่วนกลาง"} items={[]} /> */}
              <BulletList title={"พื้นที่พิเศษ"} items={ans1.dastaWorkingArea} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.7")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              {""}
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.7dot1")}
            </Td>
            <Td className="border p-2 text-left text-2xs font-normal" colSpan={4}>
              {ans2.projectAgency}
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.7dot2")}
            </Td>
            <Td className="border p-2 text-left text-2xs font-normal" colSpan={4}>
              {ans2.organization}
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.8")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              {ans2.duration}
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-right text-2xs font-normal text-black" colSpan={2}>
              {t("project.documents.projectDetails.question.8dot1")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              {ans2.startYear}
            </Td>
          </Tr>
          <Tr>
            <Td className="border p-2 text-right text-2xs font-normal text-black" colSpan={2}>
              {t("project.documents.projectDetails.question.8dot2")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              {ans2.endYear}
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.9")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              {ans2.onGoing}
            </Td>
          </Tr>
          <Tr className="break-after-page">
            <Td className="border p-2 text-right text-2xs font-normal text-black" colSpan={2}>
              {t("project.documents.projectDetails.question.9dot1")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={6}>
              {ans2.onGoingEndYear}
            </Td>
          </Tr>
          <Tr className="h-7">
            <Td
              className="h-7 border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.10")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              <></>
            </Td>
          </Tr>
          {ans2.budget.budgetYears.map((budgetYear, index) => (
            <Fragment key={index}>
              <Tr>
                <Td className="border p-2 text-2xs font-semibold text-black" colSpan={4}>
                  {t("global.year")} {budgetYear.year}
                </Td>
              </Tr>
              {budgetYear.budgetList.map((budgetList, index) => (
                <Fragment key={index}>
                  <Tr>
                    <Td className="border p-2 text-right text-2xs font-normal text-black" colSpan={4}>
                      {budgetList.description}
                    </Td>
                    <Td className="border p-2 text-2xs font-normal text-black" colSpan={4}>
                      {budgetList.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                  </Tr>
                </Fragment>
              ))}
              <Tr className="bg-smart-cbt-light-grey">
                <Td className="border p-2 text-right text-2xs font-normal text-black" colSpan={4}>
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
            <Td className="border p-2 text-right text-2xs font-normal text-smart-cbt-orange" colSpan={4}>
              {t("project.documents.summary.sia.total")}
            </Td>
            <Td className="border p-2 text-2xs font-normal text-smart-cbt-orange">
              {ans2.budget.grandTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.11")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              <BulletList listDecimal items={ans2.objectives} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.12")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              <BulletList listDecimal items={ans2.actitivies} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.13")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              <BulletList listDecimal items={ans2.output} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.14")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              <BulletList listDecimal items={ans2.outcomes} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.15")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              <BulletList listDecimal items={ans2.beneficiaries} />
            </Td>
          </Tr>
          <Tr>
            <Td
              className="border bg-smart-cbt-light-green p-2 text-2xs font-normal text-smart-cbt-dark-green"
              colSpan={2}
            >
              {t("project.documents.projectDetails.question.16")}
            </Td>
            <Td className="border px-3 py-1 text-2xs font-normal" colSpan={4}>
              <BulletList listNone items={ans2.sdgs} />
            </Td>
          </Tr>
        </TBody>
      </Table>
      <div className="break-after-page"></div>
    </div>
  );
};

export default ProjectDetailsAndRelatedPlansDocument;
