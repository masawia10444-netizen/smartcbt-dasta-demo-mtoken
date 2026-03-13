import { TBody, Table, Td, Tr } from "@/components/data-table/data-table-cva";

import { useTranslations } from "next-intl";
import BulletList from "./BulletList";

interface TheoryOfChangeDocumentDocumentProps {
  title: string;
  beneficiaryGroup: string[];
  benefits: string[];
  longTermEffects: string[];
}

const TheoryOfChangeDocument = (props: TheoryOfChangeDocumentDocumentProps) => {
  const { title, beneficiaryGroup, benefits, longTermEffects } = props;
  const t = useTranslations("common");
  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">{t("project.documents.theoryOfChange.title")}</h1>
      <Table className="py-4">
        <TBody>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">
                {t("project.documents.theoryOfChange.projectName")}
              </label>
            </Td>
            <Td className="border px-3 py-1">
              <label className="text-2xs text-black">{title}</label>
            </Td>
          </Tr>
          <Tr>
            <Td className="border px-2 py-1">
              <label className=" text-2xs text-smart-cbt-dark-green">
                {t("project.documents.theoryOfChange.beneficiaryGroup")}
              </label>
            </Td>
            <Td className="border px-3 py-1">
              <BulletList items={beneficiaryGroup} listDecimal />
            </Td>
          </Tr>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">
                {t("project.documents.theoryOfChange.benefits")}
              </label>
            </Td>
            <Td className="border px-3 py-1">
              <BulletList items={benefits} listDecimal />
            </Td>
          </Tr>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">
                {t("project.documents.theoryOfChange.longTermEffects")}
              </label>
            </Td>
            <Td className="border px-3 py-1">
              <BulletList items={longTermEffects} listDecimal />
            </Td>
          </Tr>
        </TBody>
      </Table>
    </div>
  );
};

export default TheoryOfChangeDocument;
