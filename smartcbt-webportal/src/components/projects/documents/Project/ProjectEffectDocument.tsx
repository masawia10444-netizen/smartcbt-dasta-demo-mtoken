import { TBody, Table, Td, Tr } from "@/components/data-table/data-table-cva";
import { ProjectImpactDocument } from "@/utils/project-create-form-helper";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface ProjectEffectDocumentProps {
  projectImpactDocument: ProjectImpactDocument;
}

const ProjectEffectDocument = (props: ProjectEffectDocumentProps) => {
  const { projectImpactDocument } = props;
  const { allAttributions, allDeadweights, allDisplacements } = projectImpactDocument;

  const t = useTranslations("common");

  return (
    <div className="flex flex-col">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">{t("project.documents.projectEffect.title")}</h1>
      <Table>
        <TBody>
          <Tr>
            <Td className="h-7 px-4 py-1 text-2xs font-normal text-black" colSpan={4}>
              {t("project.documents.projectEffect.attribution.title")}
            </Td>
          </Tr>
          {allAttributions.map((attribution, i) => (
            <Fragment key={i}>
              <Tr key={i} className="border bg-smart-cbt-very-light-green">
                <Td className="h-7 px-4 py-1 text-2xs text-black" colSpan={3}>
                  {`${attribution.title}`}
                </Td>
                <Td className="h-7 w-36 px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                  {t("project.documents.projectEffect.benefitPercent")}
                </Td>
                <Td className="h-7 w-36 px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                  {t("project.documents.projectEffect.attribution.percent")}
                </Td>
              </Tr>
              {attribution.values.map((detail, j) => (
                <Tr key={j}>
                  <Td className="h-7 w-10 border px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.year}
                  </Td>
                  <Td className="h-7 border px-4 py-1 text-2xs text-black" colSpan={2}>
                    {detail.details}
                  </Td>
                  <Td className="h-7 border px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.benefitPercentage}
                  </Td>
                  <Td className="h-7 border px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.percentage}
                  </Td>
                </Tr>
              ))}
            </Fragment>
          ))}
        </TBody>
      </Table>
      <Table>
        <TBody>
          <Tr>
            <Td className="h-7 px-4 py-1 text-2xs font-normal text-black" colSpan={4}>
              {t("project.documents.projectEffect.deadweight.title")}
            </Td>
          </Tr>
          {allDeadweights.map((deadWeight, i) => (
            <Fragment key={i}>
              <Tr key={i} className="border bg-smart-cbt-very-light-green">
                <Td className="h-7 px-4 py-1 text-2xs text-black" colSpan={3}>
                  {`${deadWeight.title}`}
                </Td>
                <Td className="h-7 w-36 px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                  {t("project.documents.projectEffect.benefitPercent")}
                </Td>
                <Td className="h-7 w-36 px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                  {t("project.documents.projectEffect.deadweight.percent")}
                </Td>
              </Tr>
              {deadWeight.values.map((detail, j) => (
                <Tr key={j}>
                  <Td className="h-7 w-10 border px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.year}
                  </Td>
                  <Td className="h-7 border px-4 py-1 text-2xs text-black" colSpan={2}>
                    {detail.details}
                  </Td>
                  <Td className="h-7 w-32  border px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.benefitPercentage}
                  </Td>
                  <Td className="h-7 w-32 border  px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.percentage}
                  </Td>
                </Tr>
              ))}
            </Fragment>
          ))}
        </TBody>
      </Table>
      <Table>
        <TBody>
          <Tr>
            <Td className="h-7 px-4 py-1 text-2xs font-normal text-black" colSpan={4}>
              {t("project.documents.projectEffect.displacement.title")}
            </Td>
          </Tr>
          {allDisplacements.map((displacement, i) => (
            <Fragment key={i}>
              <Tr key={i} className="border bg-smart-cbt-very-light-green">
                <Td className="h-7 px-4 py-1 text-2xs text-black" colSpan={3}>
                  {`${displacement.title}`}
                </Td>
                <Td className="h-7 w-32 px-4 py-1 text-2xs text-black" colSpan={1}>
                  {t("project.documents.projectEffect.benefitPercent")}
                </Td>
                <Td className="h-7 w-32 px-4 py-1 text-2xs text-black" colSpan={1}>
                  {t("project.documents.projectEffect.displacement.percent")}
                </Td>
              </Tr>
              {displacement.values.map((detail, j) => (
                <Tr key={j}>
                  <Td className="h-7 w-10 border px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.year}
                  </Td>
                  <Td className="h-7 border px-4 py-1 text-2xs text-black" colSpan={2}>
                    {detail.details}
                  </Td>
                  <Td className="h-7 w-32 border px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.benefitPercentage}
                  </Td>
                  <Td className="h-7 w-32 border px-4 py-1 text-center text-2xs text-black" colSpan={1}>
                    {detail.percentage}
                  </Td>
                </Tr>
              ))}
            </Fragment>
          ))}
        </TBody>
      </Table>
      <div className="break-after-page"></div>
    </div>
  );
};

export default ProjectEffectDocument;
