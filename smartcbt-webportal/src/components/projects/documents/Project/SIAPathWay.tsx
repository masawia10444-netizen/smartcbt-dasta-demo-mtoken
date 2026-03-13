import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";

import { SocialImpactPathwayXLXS } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";

interface SIAPathWayProps {
  id?: string;
  socialImpactPathwayXLXS: SocialImpactPathwayXLXS;
}

const SIAPathWay = (props: SIAPathWayProps) => {
  const { id, socialImpactPathwayXLXS } = props;
  const t = useTranslations("common");
  return (
    <Table id={id} className="hidden table-fixed py-4">
      <Thead>
        <Tr>
          <Th
            className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green"
            colSpan={9}
          >
            {t("project.documents.socialImpactPathway.title")}
          </Th>
        </Tr>
        <Tr>
          <Th
            className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green"
            colSpan={2}
          >
            {t("project.documents.socialImpactPathway.headers.input")}
          </Th>
          <Th className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green">
            {t("project.documents.socialImpactPathway.headers.project")}
          </Th>
          <Th className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green">
            {t("project.documents.socialImpactPathway.headers.output")}
          </Th>
          <Th className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green">
            {t("project.documents.socialImpactPathway.headers.activity")}
          </Th>
          <Th className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green">
            {t("project.documents.socialImpactPathway.headers.user")}
          </Th>
          <Th className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green">
            {t("project.documents.socialImpactPathway.headers.outcome")}
          </Th>
          <Th
            className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green"
            colSpan={2}
          >
            {t("project.documents.socialImpactPathway.headers.impact")}
          </Th>
        </Tr>
      </Thead>
      <TBody>
        {socialImpactPathwayXLXS.map((d, i) => (
          <Tr key={i}>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-center text-2xs font-normal text-smart-cbt-dark-green">
              {d.inputTitle}
            </Td>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-center text-2xs font-normal text-smart-cbt-dark-green">
              {d.input}
            </Td>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-center text-2xs font-normal text-smart-cbt-dark-green">
              {d.projectName}
            </Td>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-center text-2xs font-normal text-smart-cbt-dark-green">
              {d.activity}
            </Td>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-center text-2xs font-normal text-smart-cbt-dark-green">
              {d.output}
            </Td>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green">
              {d.beneficiary}
            </Td>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-2xs font-normal text-smart-cbt-dark-green">
              {d.outcome}
            </Td>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-center text-2xs font-normal text-smart-cbt-dark-green">
              {d.impactTitle}
            </Td>
            <Td className="smart-cbt-very-light-green h-7 px-2 py-1 text-center text-2xs font-normal text-smart-cbt-dark-green">
              {d.impact}
            </Td>
          </Tr>
        ))}
      </TBody>
    </Table>
  );
};

export default SIAPathWay;
