import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface CarbonFootprintTableProps {
  data: CarbonSummaryData;
}

const CarbonFootprintTable = (props: CarbonFootprintTableProps) => {
  const t = useTranslations("common");
  const { data } = props;
  const { dataCollectionScope } = data;

  return (
    <Table className="w-full py-4 text-base">
      <Thead>
        <Tr className="divide-x-2 divide-white ">
          <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
            {t("carbon.summary.dataCollectionScope.activityNo")}
          </Th>
          <Th className="bg-smart-cbt-yellow-2 px-2 py-2 font-normal text-smart-cbt-red">
            {t("carbon.summary.dataCollectionScope.activityList")}
          </Th>
          <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
            {t("carbon.summary.dataCollectionScope.pcr")}
          </Th>
          <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
            {t("carbon.summary.dataCollectionScope.emissionFactor")}
          </Th>
          <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
            {t("carbon.summary.dataCollectionScope.multiplier")}
          </Th>
          <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
            {t("carbon.summary.dataCollectionScope.unit")}
          </Th>
          <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
            {t("carbon.summary.dataCollectionScope.ef")}
          </Th>
          <Th className="bg-smart-cbt-yellow-2 p-2 font-normal text-smart-cbt-red">
            {t("carbon.summary.dataCollectionScope.cfp")}
          </Th>
        </Tr>
      </Thead>
      <TBody bodyIntent={"withoutDivider"}>
        {dataCollectionScope &&
          dataCollectionScope?.map((d, i) => (
            <Fragment key={i}>
              <Tr className="border-t-2 border-white bg-smart-cbt-very-light-grey">
                <Td className="p-2 " colSpan={8}>
                  {t("carbon.summary.generalInformation.date", {
                    date: i + 1,
                  })}
                </Td>
              </Tr>
              {d.activities?.map((a, j) => (
                <Fragment key={j}>
                  <Tr className="border-t-2 border-white bg-[#FAFAFA] text-left text-black">
                    <Td className="p-2" colSpan={8}>
                      {a.details}
                    </Td>
                  </Tr>
                  {a.carbonFootprintActivities?.map((c, k) => (
                    <Tr key={k} className="text-center text-black">
                      <Td className="p-2">{k + 1}</Td>
                      <Td className="p-2 text-left">{c?.name}</Td>
                      <Td className="p-2">{c?.pcrType?.label}</Td>
                      <Td className="p-2">{c?.emissionProxy}</Td>
                      <Td className="p-2">{c?.multiplier}</Td>
                      <Td className="p-2">{c?.unit}</Td>
                      <Td className="p-2">{c?.emissionFactorValue}</Td>
                      <Td className="p-2">{c?.ef.toFixed(4)}</Td>
                    </Tr>
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
      </TBody>
    </Table>
  );
};

export default CarbonFootprintTable;
