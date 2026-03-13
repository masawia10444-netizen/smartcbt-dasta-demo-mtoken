import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

type CarbonDataCollectionScopeProps = {
  data: CarbonSummaryData;
};

const CarbonDataCollectionScope = (props: CarbonDataCollectionScopeProps) => {
  const t = useTranslations("common");

  const { data } = props;
  const { dataCollectionScope } = data;

  console.log('dataCollectionScope', dataCollectionScope);
  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-2xs font-medium text-smart-cbt-dark-green">{t("carbon.document.2.title")}</h1>
      <Table className="w-full py-4 text-2xs">
        <Thead>
          <Tr className="divide-x-2 divide-white ">
            <Th className="bg-smart-cbt-yellow-2 px-2 py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.summary.dataCollectionScope.activityNo")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 px-2 py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.summary.dataCollectionScope.activityList")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 px-2 py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.summary.dataCollectionScope.pcr")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 px-2 py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.summary.dataCollectionScope.emissionFactor")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 px-2 py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.summary.dataCollectionScope.multiplier")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 px-2 py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.summary.dataCollectionScope.unit")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 px-2 py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.summary.dataCollectionScope.ef")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 px-2 py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.summary.dataCollectionScope.cfp")}
            </Th>
          </Tr>
        </Thead>
        <TBody bodyIntent={"withoutDivider"}>
          {dataCollectionScope.map((d, i) => (
            <Fragment key={i}>
              <Tr className="border-t-2 border-white bg-smart-cbt-very-light-grey text-2xs">
                <Td className="p-2 text-2xs" colSpan={8}>
                  {t("carbon.summary.generalInformation.date", {
                    date: i + 1,
                  })}
                </Td>
              </Tr>
              {d.activities.map((a, j) => (
                <Fragment key={j}>
                  <Tr key={j} className="text-center text-2xs text-black">
                    <Td className="p-2 text-2xs" colSpan={8}>
                      {a.details}
                    </Td>
                  </Tr>
                  {a.carbonFootprintActivities?.map((c, k) => (
                    <Tr key={k} className="text-center text-black">
                      <Td className="p-2 text-2xs">{k + 1}</Td>
                      <Td className="p-2 text-left text-2xs">{c.name}</Td>
                      <Td className="p-2 text-2xs">{c.pcrType?.label}</Td>
                      <Td className="p-2 text-2xs">{c.emissionProxy}</Td>
                      <Td className="p-2 text-2xs">{c.multiplier}</Td>
                      <Td className="p-2 text-2xs">{c.unit}</Td>
                      <Td className="p-2 text-2xs">{c.emissionFactorValue}</Td>
                      <Td className="p-2 text-2xs">{c.ef.toFixed(4)}</Td>
                    </Tr>
                  ))}
                </Fragment>
              ))}
            </Fragment>
          ))}
        </TBody>
      </Table>
    </div>
  );
};

export default CarbonDataCollectionScope;
