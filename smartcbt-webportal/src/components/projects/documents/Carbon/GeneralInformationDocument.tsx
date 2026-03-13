import { TBody, Table, Td, Tr } from "@/components/data-table/data-table-cva";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";

interface GeneralInformationDocumentProps {
  data: CarbonSummaryData;
}

const GeneralInformationDocument = (props: GeneralInformationDocumentProps) => {
  const { data } = props;
  const { name, company, numberOfTourist, scope, unit, registrationDate } = data;
  const t = useTranslations("common");
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-2xs font-medium text-smart-cbt-dark-green">{t("carbon.document.1.title")}</label>
      <Table className="py-4">
        <TBody>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">{t("carbon.document.1.name")}</label>
            </Td>
            <Td className="border px-3 py-1">
              <label className="text-2xs text-black">{name}</label>
            </Td>
          </Tr>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">{t("carbon.document.1.company")}</label>
            </Td>
            <Td className="border px-3 py-1">
              <label className="text-2xs text-black">{company}</label>
            </Td>
          </Tr>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">{t("carbon.document.1.numberOfTourist")}</label>
            </Td>
            <Td className="border px-3 py-1">
              <label className="text-2xs text-black">{numberOfTourist}</label>
            </Td>
          </Tr>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">{t("carbon.document.1.scope")}</label>
            </Td>
            <Td className="border px-3 py-1">
              <label className="text-2xs text-black">{scope?.title}</label>
            </Td>
          </Tr>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">{t("carbon.document.1.unit")}</label>
            </Td>
            <Td className="border px-3 py-1">
              <label className="text-2xs text-black">{unit}</label>
            </Td>
          </Tr>
          <Tr>
            <Td className="border px-2 py-1">
              <label className="text-2xs text-smart-cbt-dark-green">{t("carbon.document.1.registrationDate")}</label>
            </Td>
            <Td className="border px-3 py-1">
              <label className="text-2xs text-black">{registrationDate}</label>
            </Td>
          </Tr>
        </TBody>
      </Table>
      <div className="break-after-page"></div>
    </div>
  );
};

export default GeneralInformationDocument;
