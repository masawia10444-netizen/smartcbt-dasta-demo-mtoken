import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface TravelActivitySummaryProps {
  data: CarbonSummaryData;
}

const TravelActivitySummary = (props: TravelActivitySummaryProps) => {
  const t = useTranslations("common");
  const { data } = props;
  const { activities } = data;

  return (
    <div className="flex w-full flex-col gap-2 p-2">
      <label className="text-sm  text-smart-cbt-dark-green">
        {t("carbon.summary.generalInformation.travelPlanDetails")}
      </label>
      <Table className="py-4 text-base">
        <Thead>
          <Tr className="divide-x-2 divide-white">
            <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
              {t("carbon.summary.generalInformation.activityNo")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
              {t("carbon.summary.generalInformation.activityName")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
              {t("carbon.summary.generalInformation.activityTime")}
            </Th>
          </Tr>
        </Thead>
        <TBody bodyIntent={"withoutDivider"}>
          {activities &&
            activities.map((a, i) => (
              <Fragment key={i}>
                <Tr className="border-t-2 border-white bg-smart-cbt-very-light-grey">
                  <Td className="px-2 py-2 text-smart-cbt-dark-green" colSpan={3}>
                    {t("carbon.summary.generalInformation.date", {
                      date: i + 1,
                    })}
                  </Td>
                </Tr>
                {a.activities.map((b, j) => (
                  <Tr key={j}>
                    <Td className="px-2 py-2 text-smart-cbt-dark-green">{j + 1}</Td>
                    <Td className="px-2 py-2 text-black">{b.details}</Td>
                    <Td className="px-2 py-2 text-black">{b.time}</Td>
                  </Tr>
                ))}
              </Fragment>
            ))}
        </TBody>
      </Table>
    </div>
  );
};

export default TravelActivitySummary;
