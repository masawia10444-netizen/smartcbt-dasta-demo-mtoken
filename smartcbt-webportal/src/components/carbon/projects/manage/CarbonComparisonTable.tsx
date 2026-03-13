import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { footprintCalculation } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

type CarbonComparisonTableProps = {
  selectedIndex: number;
  tabs: TravelProgramSchema[];
};

const CarbonComparisonTable = ({ selectedIndex, tabs }: CarbonComparisonTableProps) => {
  const t = useTranslations("common");

  const showRound = tabs.slice(0, selectedIndex);

  return (
    <Fragment>
      <label>{t("carbon.manage.carbonComparisonTable.title")}</label>
      <Table className="w-full py-4 text-base">
        <Thead>
          <Tr className="bg-smart-cbt-very-light-green text-smart-cbt-dark-green">
            <Th className=" p-2 font-normal">{t("carbon.manage.carbonComparisonTable.time")}</Th>
            <Th className=" px-2 py-2 font-normal ">{t("carbon.manage.carbonComparisonTable.number")}</Th>
            <Th className=" break-words p-2 font-normal">{t("carbon.manage.carbonComparisonTable.average")}</Th>
            <Th className=" break-words p-2 font-normal">{t("carbon.manage.carbonComparisonTable.transportations")}</Th>
            <Th className=" break-words p-2 font-normal">{t("carbon.manage.carbonComparisonTable.accomodations")}</Th>
            <Th className=" break-words p-2 font-normal">{t("carbon.manage.carbonComparisonTable.foods")}</Th>
            <Th className=" break-words p-2 font-normal">{t("carbon.manage.carbonComparisonTable.wastes")}</Th>
            <Th className=" break-words p-2 font-normal">{t("carbon.manage.carbonComparisonTable.total")}</Th>
          </Tr>
        </Thead>
        <TBody bodyIntent={"withoutDivider"}>
          {showRound &&
            showRound.map((r, i) => {
              const { total, transportations, accomodations, foods, wastes } = footprintCalculation(r);
              const average = Number(
                (transportations.grandTotal + accomodations.grandTotal + foods.grandTotal + wastes.grandTotal) /
                  r.numberOfTourist
              );

              return (
                <Fragment key={i}>
                  <Tr className="text-center" key={i}>
                    <Td className="px-2 py-2 text-black">{i + 1}</Td>
                    <Td className="px-2 py-2 text-black">{r.numberOfTourist}</Td>
                    <Td className="px-2 py-2 text-black">{isNaN(average) ? "0.00" : average.toFixed(2)}</Td>
                    <Td className="px-2 py-2 text-black">
                      {isNaN(transportations.grandTotal) ? "0.00" : transportations.grandTotal.toFixed(2)}
                    </Td>
                    <Td className="px-2 py-2 text-black">
                      {isNaN(transportations.grandTotal) ? "0.00" : accomodations.grandTotal.toFixed(2)}
                    </Td>
                    <Td className="px-2 py-2 text-black">
                      {isNaN(foods.grandTotal) ? "0.00" : foods.grandTotal.toFixed(2)}
                    </Td>
                    <Td className="px-2 py-2 text-black">
                      {isNaN(wastes.grandTotal) ? "0.00" : wastes.grandTotal.toFixed(2)}
                    </Td>
                    <Td className="px-2 py-2 text-black">{isNaN(total) ? "0.00" : total.toFixed(2)}</Td>
                  </Tr>
                </Fragment>
              );
            })}
        </TBody>
      </Table>
    </Fragment>
  );
};

export default CarbonComparisonTable;
