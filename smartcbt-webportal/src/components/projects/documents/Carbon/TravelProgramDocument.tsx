import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface TravelProgramDocumentProps {
  data: CarbonSummaryData;
}

const TravelProgramDocument = (props: TravelProgramDocumentProps) => {
  const { data } = props;
  const { activities } = data;
  const t = useTranslations("common");
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-2xs font-medium text-smart-cbt-dark-green">
        {t("carbon.document.1.travelPlanDetails")}
      </label>
      <Table className="py-4 text-base">
        <Thead>
          <Tr className="divide-x-2 divide-white">
            <Th className="bg-smart-cbt-yellow-2 p-2 text-2xs font-normal text-smart-cbt-orange">
              {t("carbon.document.activityNo")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 text-2xs font-normal text-smart-cbt-orange">
              {t("carbon.document.activityName")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 text-2xs font-normal text-smart-cbt-orange">
              {t("carbon.document.activityTime")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 text-2xs font-normal text-smart-cbt-orange">
              {t("carbon.document.pcrs")}
            </Th>
          </Tr>
        </Thead>
        <TBody bodyIntent={"withoutDivider"}>
          {activities.map((a, i) => (
            <Fragment key={i}>
              <Tr className="border-t-2 border-white bg-smart-cbt-very-light-grey">
                <Td className="px-2 py-2 text-2xs text-black" colSpan={4}>
                  {t("carbon.summary.generalInformation.date", {
                    date: i + 1,
                  })}
                </Td>
              </Tr>
              {a.activities.map((b, j) => (
                <Tr key={j}>
                  <Td className="px-2 py-2 text-2xs text-black">{j + 1}</Td>
                  <Td className="px-2 py-2 text-2xs text-black">{b.details}</Td>
                  <Td className="px-2 py-2 text-2xs text-black">{b.time}</Td>
                  <Td className="px-2 py-2 text-2xs text-black">{b.pcrs}</Td>
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

export default TravelProgramDocument;
