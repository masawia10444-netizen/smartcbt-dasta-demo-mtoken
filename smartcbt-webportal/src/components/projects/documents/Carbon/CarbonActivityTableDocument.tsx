import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { CarbonFootprintActivities } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

interface CarbonActivityTableDocumentProps {
  title: string;
  unit: string;
  data: CarbonFootprintActivities;
}

const CarbonActivityTableDocument = (props: CarbonActivityTableDocumentProps) => {
  const { title, unit, data } = props;
  const t = useTranslations("common");
  return (
    <div className="flex w-full flex-col gap-2">
      <h1 className="text-2xs font-medium text-smart-cbt-dark-green">{title}</h1>
      <Table className="w-full py-4 text-2xs">
        <Thead>
          <Tr className="divide-x-2 divide-white">
            <Th className="bg-smart-cbt-yellow-2 px-2  py-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.document.activityNo")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.document.activityName")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.document.efType")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2  text-2xs font-normal text-smart-cbt-red">{unit}</Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.document.ef")}
            </Th>
            <Th className="bg-smart-cbt-yellow-2 p-2 text-2xs font-normal text-smart-cbt-red">
              {t("carbon.document.cfp")}
            </Th>
          </Tr>
        </Thead>
        <TBody bodyIntent={"withoutDivider"}>
          {data.map((d, i) => (
            <Fragment key={i}>
              <Tr className="border-t-2 border-white bg-smart-cbt-very-light-grey text-2xs">
                <Td className="p-2 text-2xs" colSpan={6}>
                  {d.date}
                </Td>
              </Tr>
              {d.activities.map((a, j) => (
                <Tr key={j} className="text-center text-2xs text-black">
                  <Td className="p-2 text-2xs">{j + 1}</Td>
                  <Td className="p-2 text-left text-2xs">{a?.name}</Td>
                  <Td className="p-2 text-2xs">{a?.emissionProxy}</Td>
                  <Td className="p-2 text-2xs">{a?.multiplier}</Td>
                  <Td className="p-2 text-2xs">{a?.emissionFactorValue}</Td>
                  <Td className="p-2 text-2xs">{a?.ef.toFixed(4)}</Td>
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

export default CarbonActivityTableDocument;
