import CollapseSection from "@/components/CollapseSection";
import { TBody, Table, Td, Tr } from "@/components/data-table/data-table-cva";
import { CarbonProjectStatus } from "@/models/carbon-project";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import TravelActivitySummary from "./TravelActivitySummary";

interface TravelProgramSummaryProps {
  data: CarbonSummaryData;
}

const TravelProgramSummary = (props: TravelProgramSummaryProps) => {
  const t = useTranslations("common");
  const { data } = props;
  const { name, company, numberOfTourist, scope, unit, registrationDate, remark, status } = data;

  return (
    <CollapseSection
      className="bg-smart-cbt-very-light-green px-2 text-smart-cbt-dark-green"
      title={t("carbon.summary.generalInformation.title")}
      defaultOpen={true}
    >
      <Table className="py-4 text-base">
        <TBody bodyIntent={"withoutDivider"}>
          <Tr>
            <Td className="px-2 py-2 text-smart-cbt-dark-green">{t("carbon.summary.generalInformation.name")}</Td>
            <Td className="px-2 py-2 text-black">{name}</Td>
          </Tr>
          <Tr>
            <Td className="px-2 py-2 text-smart-cbt-dark-green">
              {t("carbon.summary.generalInformation.companyName")}
            </Td>
            <Td className="px-2 py-2 text-black">{company}</Td>
            <Td className="px-2 py-2 text-smart-cbt-dark-green">
              {t("carbon.summary.generalInformation.numberOfTourist")}
            </Td>
            <Td className="px-2 py-2 text-black">{numberOfTourist}</Td>
          </Tr>
          <Tr>
            <Td className="px-2 py-2 text-smart-cbt-dark-green">{t("carbon.summary.generalInformation.scope")}</Td>
            <Td className="px-2 py-2 text-black">{scope?.title}</Td>
            <Td className="px-2 py-2 text-smart-cbt-dark-green">{t("carbon.summary.generalInformation.unit")}</Td>
            <Td className="px-2 py-2 text-black">{unit}</Td>
          </Tr>
          {status == CarbonProjectStatus.Rejected ? (
            <Tr>
              <Td className="px-2 py-2 text-smart-cbt-dark-green">
                {t("carbon.summary.generalInformation.registrationDate")}
              </Td>
              <Td className="px-2 py-2 text-black">{registrationDate}</Td>
              <Td className="px-2 py-2 text-smart-cbt-dark-green">
                {t("carbon.summary.generalInformation.rejectReason")}
              </Td>
              <Td className="px-2 py-2 text-black">{remark}</Td>
            </Tr>
          ) : (
            <Tr>
              <Td className="px-2 py-2 text-smart-cbt-dark-green">
                {t("carbon.summary.generalInformation.registrationDate")}
              </Td>
              <Td className="px-2 py-2 text-black">{registrationDate}</Td>
            </Tr>
          )}
        </TBody>
      </Table>
      <TravelActivitySummary data={data} />
    </CollapseSection>
  );
};

export default TravelProgramSummary;
