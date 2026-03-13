import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { ProjectBenefitDocument } from "@/utils/project-create-form-helper";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface ProjectBenefitTableDocumentProps {
  projectBenefitDocument: ProjectBenefitDocument;
}

const ProjectBenefitTableDocument = (props: ProjectBenefitTableDocumentProps) => {
  const { projectBenefitDocument } = props;
  const t = useTranslations("common");
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">
        {t("project.documents.projectBenefit.benefitTable.title")}
      </h1>
      <Table>
        <Thead>
          <Tr>
            <Th className="p-2 text-2xs font-normal text-smart-cbt-dark-green">
              {t("project.documents.projectBenefit.benefitTable.title")}
            </Th>
            {projectBenefitDocument.allYears.map((year, index) => (
              <Th key={index} className="p-2 pl-6 text-left text-2xs font-normal">
                {year}
              </Th>
            ))}
          </Tr>
        </Thead>
        <TBody>
          {projectBenefitDocument.benefits.map((benefit, sectionIndex) => {
            return (
              <Fragment key={benefit.title}>
                <Tr className="border">
                  <Td className="p-2 text-2xs font-normal" colSpan={benefit.values.length + 1}>
                    {`${sectionIndex + 1} ${benefit.title}`}
                  </Td>
                </Tr>
                {benefit.values.map((sectionValue, sectionValueIndex, items) => (
                  <Tr key={sectionValue.title}>
                    <Td className="border p-2 pl-5 text-left text-2xs font-normal ">{`${sectionIndex + 1}.${
                      sectionValueIndex + 1
                    } ${sectionValue.title}`}</Td>
                    {sectionValue.values.map((benefitDetail, benefitDetailIndex) => {
                      return (
                        <Td key={benefitDetailIndex} className="w-20 border p-2 text-right text-2xs font-normal">
                          {benefitDetail.netBenefit?.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </Fragment>
            );
          })}
        </TBody>
      </Table>
      <div className="break-after-page"></div>
    </div>
  );
};

export default ProjectBenefitTableDocument;
