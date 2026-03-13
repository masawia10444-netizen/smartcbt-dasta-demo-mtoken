import { useMemo, useState } from "react";

import { getEmissionFactors } from "@/app/[locale]/(authenticated)/carbon-footprint/emission-factor-proxy/action";
import DataTable from "@/components/data-table/data-table";
import { EmissionFactorProxyListJson, EmissionFactorProxyStatus } from "@/models/emission-factor-proxy";
import { handleAPIError } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import EmissionProxyListHeader from "./EmissionProxyListHeader";
import { EmissionProxyStatusForm } from "./EmissionProxyStatusForm";

type EmissionProxyListProps = {
  onProxyClicked: (id: number) => void;
  refresh?: string | number | null;
  setRefresh: (refresh?: string | number | null) => void;
  setShowSuccessPopup: (showSuccessPopup: boolean) => void;
  isCarbonAdminRole: boolean;
};

const EmissionProxyList = ({
  onProxyClicked,
  refresh,
  setRefresh,
  setShowSuccessPopup,
  isCarbonAdminRole,
}: EmissionProxyListProps) => {
  const t = useTranslations("common");

  const [data, setData] = useState<EmissionFactorProxyListJson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const columnHelper = createColumnHelper<EmissionFactorProxyListJson>();

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", {
        header: () => t("carbon.emissionProxy.number"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.display({
        id: "status",
        header: () => t("global.status"),
        enableSorting: false,
        cell: ({ row }) => {
          const id = row.original.id! as any;
          const status = row.original.status as EmissionFactorProxyStatus;
          return (
            <EmissionProxyStatusForm
              id={id}
              initialStatus={status}
              setRefresh={setRefresh}
              isCarbonAdminRole={isCarbonAdminRole}
              setShowSuccessPopup={setShowSuccessPopup}
            />
          );
        },
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("name", {
        header: () => t("carbon.emissionProxy.name"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("pcr_type.label", {
        header: () => t("carbon.emissionProxy.pcrType"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("emission_factor_value", {
        header: () => t("carbon.emissionProxy.emissionFactorValue"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("emission_factor_unit.label", {
        header: () => t("global.unit"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.display({
        id: "approve_by",
        header: () => t("global.approvedBy"),
        enableSorting: false,
        meta: {
          centerData: true,
          fullWidth: true,
        },
        cell: ({ row }) => {
          const { approve_by } = row.original;
          if (!approve_by || (!approve_by.firstname && !approve_by.lastname)) return "-";
          const name = [approve_by.firstname, approve_by.lastname].filter(Boolean).join(" ");
          return `${name}`;
        },
      }),
    ],
    [columnHelper]
  );

  const onRowClick = (object: EmissionFactorProxyListJson) => {
    if (!object.id) return;
    onProxyClicked(object.id as any);
  };

  useEffect(() => {
    if (refresh === null) return;
    setData([]);
    const fetchData = async () => {
      setIsLoading(true);
      const { response, error } = await getEmissionFactors(search.length === 0 ? undefined : search);
      if (error) {
        handleAPIError(error);
        setData([]);
        setIsLoading(false);
        return;
      }
      setData(response ?? []);
      setIsLoading(false);
    };
    fetchData();
  }, [search, refresh]);

  return (
    <div className="flex h-full overflow-auto">
      <DataTable
        showHeader
        columns={columns}
        showSearch={true}
        tableName={""}
        data={data}
        dataLoading={isLoading}
        onSearchText={setSearch}
        onRowClick={onRowClick}
      >
        <EmissionProxyListHeader itemCount={data.length} />
      </DataTable>
    </div>
  );
};

export default EmissionProxyList;
