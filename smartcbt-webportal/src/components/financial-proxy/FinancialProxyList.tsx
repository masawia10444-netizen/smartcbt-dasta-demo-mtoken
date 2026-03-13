import { FinancialProxyStatus } from "@/models/financial-proxy";
import { useEffect, useMemo, useState } from "react";

import { FinancialProxiesJson } from "@/utils/cms/cms-api-adapter";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import DataTable from "../data-table/data-table";
import FinancialListHeader, { FinancialListSearchForm } from "./FinancialListHeader";
import { FinancialProxyStatusForm } from "./FinancialProxyStatusForm";

type FinancialProxyListProps = {
  onProxyClicked: (id: number) => void;
  refresh?: string | number;
  setRefresh: (refresh?: string | number) => void;
  listFinancialProxy: FinancialProxiesJson[];
  isSiaAdminRole: boolean;
};

const FinancialProxyList = ({
  onProxyClicked,
  listFinancialProxy,
  setRefresh,
  refresh,
  isSiaAdminRole,
}: FinancialProxyListProps) => {
  const t = useTranslations("common");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>();
  const [data, setData] = useState<FinancialProxiesJson[]>([]);
  const columnHelper = createColumnHelper<FinancialProxiesJson>();
  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => t("financialProxy.proxyId"),
        enableSorting: false,
        meta: {
          centerData: true,
          fullWidth: true,
        },
      }),
      columnHelper.display({
        id: "status",
        header: () => t("global.status"),
        enableSorting: false,
        cell: ({ row }) => (
          <FinancialProxyStatusForm
            setRefresh={setRefresh}
            id={row.original.id!}
            initialStatus={row.original.status as FinancialProxyStatus}
            isSiaAdminRole={isSiaAdminRole}
          />
        ),
        meta: {
          centerData: true,
          fullWidth: true,
        },
      }),
      columnHelper.accessor("title", {
        header: () => t("financialProxy.name"),
        enableSorting: false,
        meta: {
          fullWidth: true,
        },
      }),
      columnHelper.accessor("categories", {
        header: () => t("global.category"),
        cell: (cell) => t(`financialProxy.categories.${cell.getValue().replace(" ", "_")}`),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("proxy_type.title", {
        header: () => t("global.type"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("province.title", {
        header: () => t("global.province"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("value", {
        header: () => t("global.value"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => row.original.value.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      }),
      columnHelper.accessor("unit", {
        header: () => t("global.unit"),
        enableSorting: false,
        meta: {
          centerData: true,
        },
        cell: ({ row }) => row.original.unit,
      }),
      columnHelper.accessor("user_created", {
        header: () => t("global.createBy"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
    ],
    [columnHelper]
  );

  const [searchParams, setSearchParams] = useState<FinancialListSearchForm>({
    province: null,
  });

  const onSearch = (params: any) => {
    setSearchParams(params);
  };

  const onRowClick = (object: FinancialProxiesJson) => {
    if (!object.id) return;
    onProxyClicked(object.id);
  };

  useEffect(() => {
    setData([]);
    const fetchData = async () => {
      setIsLoading(true);
      const provinceId = searchParams?.province?.id;
      var filteredData = [...listFinancialProxy];
      if (provinceId) filteredData = filteredData.filter((value) => value.province?.id === provinceId);
      if (search) {
        filteredData = filteredData.filter(
          (value) =>
            value.title.toLowerCase().includes(search.toLowerCase()) ||
            value.title_en?.toLowerCase().includes(search.toLowerCase())
        );
      }
      setData(filteredData);
      setIsLoading(false);
    };
    fetchData();
  }, [refresh, listFinancialProxy, searchParams, search]);

  return (
    <div className="flex overflow-auto">
      <DataTable
        tableName={""}
        params={searchParams}
        columns={columns}
        data={data}
        dataLoading={isLoading}
        onSearchText={setSearch}
        onRowClick={onRowClick}
        showSearch
        showHeader
      >
        <FinancialListHeader itemCount={data.length} onSearch={onSearch} />
      </DataTable>
    </div>
  );
};

export default FinancialProxyList;
