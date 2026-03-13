import DataTable from "@/components/data-table/data-table";
import Form from "@/components/form/Form";
import { FormLabel } from "@/components/form/FormLabel";
import { FinancialProxyCreateSchema } from "@/schemas/forms/financial-proxies/financial-proxy-create-schema";
import { financialProxyCalculation } from "@/utils/project-create-form-helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

type FinancialProxyGrowthTable = {
  year: number;
  offset: number;
  value: number;
};

export const FinancialProxyCreateTable = () => {
  const t = useTranslations("common");

  const { watch } = useFormContext<FinancialProxyCreateSchema>();

  const [data, setData] = useState<FinancialProxyGrowthTable[]>([]);
  const columnHelper = createColumnHelper<FinancialProxyGrowthTable>();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (!value.startingYear || !value.endingYear || !value.discountRate || !value.value) return;
      if (name === "startingYear" || name === "endingYear" || name === "discountRate" || name === "value") {
        const data = financialProxyCalculation(value);
        setData(data);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("year", {
        header: () => t("financialProxy.create.yearly"),
        enableSorting: false,
        cell: (cell) => <p className="text-smart-cbt-dark-grey">{cell.getValue()}</p>,
        meta: {
          centerData: true,
          fullWidth: true,
        },
      }),
      columnHelper.accessor("offset", {
        header: () => t("financialProxy.create.yearOffset"),
        enableSorting: false,
        cell: (cell) => <p className="text-smart-cbt-dark-grey">{cell.getValue()}</p>,
        meta: {
          centerData: true,
          fullWidth: true,
        },
      }),
      columnHelper.accessor("value", {
        header: () => t("financialProxy.create.value"),
        enableSorting: false,
        cell: (cell) => (
          <div className="text-right text-smart-cbt-dark-green">
            <Form.NumberInput fixedValue={cell.getValue()} displayType="text" decimalScale={2} fixedDecimalScale />
          </div>
        ),
        meta: {
          fullWidth: true,
        },
      }),
    ],
    [columnHelper]
  );

  return (
    <div>
      <FormLabel>{t("financialProxy.create.growthRate")}</FormLabel>
      <div className="mt-1 overflow-auto rounded-lg border border-smart-cbt-border-green">
        <DataTable
          bodyIntent="withoutDivider"
          columns={columns}
          hidePagination
          tableName={"growth rate"}
          data={data}
          customPageSize={100}
          dataLoading={false}
        />
      </div>
    </div>
  );
};
