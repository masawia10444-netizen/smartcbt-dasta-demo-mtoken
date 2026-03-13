"use client";

import { CheckIconCircle, DeleteIcon, MaterialSymbolsAddRounded, PencilWithLined } from "@/components/Icon";
import { useEffect, useMemo, useState } from "react";

import { fetchListCarbon } from "@/app/[locale]/(authenticated)/carbon-footprint/projects/actions";
import BreadCrumb from "@/components/Breadcrumb";
import { NextLink } from "@/components/Link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { MenuDropDown } from "@/components/MenuDropDown";
import { useSession } from "@/components/context-provider/AuthProvider";
import DataTable from "@/components/data-table/data-table";
import { CarbonListJson } from "@/utils/cms/adapters/website/carbon/types";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { StatusCounts } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import ConfirmDeletePopup from "./Popup/ConfirmDeletePopup";
import { CarbonProjectStatusBadgeCell } from "./ProjectStatusBadgeCell";
import { CarbonProjectStatusTab } from "./ProjectStatusTab";

interface ProjectListProps {
  statusCounts: StatusCounts;
}

function selectedIndex(status: string) {
  switch (status) {
    case PROJECT_STATUS.DRAFT:
      return 1;
    case PROJECT_STATUS.PENDING_FOR_APPROVAL:
      return 2;
    case PROJECT_STATUS.APPROVAL:
      return 3;
    case PROJECT_STATUS.REJECTED:
      return 4;
    case PROJECT_STATUS.REQUEST_TO_DELETE:
      return 5;
    default:
      return 0;
  }
}

function slugForIndex(index: number) {
  switch (index) {
    case 1:
      return PROJECT_STATUS.DRAFT;
    case 2:
      return PROJECT_STATUS.PENDING_FOR_APPROVAL;
    case 3:
      return PROJECT_STATUS.APPROVAL;
    case 4:
      return PROJECT_STATUS.REJECTED;
    case 5:
      return PROJECT_STATUS.REQUEST_TO_DELETE;
    default:
      return "all";
  }
}

const ProjectList = (props: ProjectListProps) => {
  const { statusCounts } = props;
  const t = useTranslations("common");

  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const { session } = useSession();

  const [data, setData] = useState<CarbonListJson[]>([]);
  const [showDeleteWarningPopup, setShowDeleteWarningPopup] = useState<{
    id: number;
    status: PROJECT_STATUS;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>();
  const [filteredStatus, setFilteredStatus] = useState<PROJECT_STATUS | undefined>(undefined);
  const [selected, setSelected] = useState(0);

  const columnHelper = createColumnHelper<CarbonListJson>();
  const router = useRouter();

  const carbonRole = session?.user?.roles.find((value) => value.app_code == "CARBON") ?? null;
  const isCarbonAdminRole = carbonRole?.role == "super_admin";

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "carbon-footprint/overview",
    },
    {
      name: t("menus.allProjects"),
      slug: "carbon-footprint/projects/manage",
    },
  ];

  useEffect(() => {
    if (!status) return;
    setSelected(selectedIndex(status));
    setFilteredStatus(status == "all" ? undefined : (status as PROJECT_STATUS));
  }, [status]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const projectList = await fetchListCarbon(filteredStatus, undefined, undefined, search);
        setData(projectList);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filteredStatus, search]);

  const columns = useMemo(() => {
    const columns = [
      columnHelper.accessor("cbt_project.title", {
        header: () => t("carbon.manage.name"),
        enableSorting: false,
      }),
      columnHelper.accessor("cbt_project.organizations.title", {
        header: () => t("carbon.manage.community"),
        enableSorting: false,
      }),
      columnHelper.accessor("summary_cf", {
        header: () => t("carbon.manage.footprintPerPersonPerDay"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("status", {
        header: () => t("carbon.manage.status"),
        enableSorting: false,
        meta: {
          fullWidth: true,
        },
        cell: ({ row }) => {
          return <CarbonProjectStatusBadgeCell status={row.original.status} />;
        },
      }),
    ];
    const actionColumn = (() => {
      switch (filteredStatus) {
        default:
          return columnHelper.display({
            id: "action",
            header: () => t("carbon.manage.actionColumnTitle"),
            cell: ({ row }) => {
              const { id, status } = row.original;
              const menuItems: {
                key: string;
                href?: string;
                label: string;
                icon?: JSX.Element;
                onClick?: () => void;
              }[] = [
                {
                  key: "edit",
                  href: `/carbon-footprint/projects/manage/${id}`,
                  label:
                    status == PROJECT_STATUS.PENDING_FOR_APPROVAL
                      ? t("carbon.manage.action.rounds")
                      : t("carbon.manage.action.edit"),
                  icon: status == PROJECT_STATUS.PENDING_FOR_APPROVAL ? <CheckIconCircle /> : <PencilWithLined />,
                },
              ];
              if (!isCarbonAdminRole && status === PROJECT_STATUS.REQUEST_TO_DELETE) return;
              menuItems.push({
                key: "delete",
                label: t("global.delete"),
                icon: <DeleteIcon />,
                onClick: () => {
                  setShowDeleteWarningPopup({ id, status });
                },
              });
              return (
                <MenuDropDown
                  className="justify-center"
                  itemsClassName="overflow-auto rounded-xl"
                  menuItems={menuItems}
                />
              );
            },
          });
      }
    })();
    const createByColumn = columnHelper.accessor("user_created.first_name", {
      header: () => t("carbon.manage.createBy"),
      enableSorting: false,
      meta: {
        fullWidth: true,
        // centerData: true,
      },
      cell: ({ row }) => {
        const firstName = row.original.user_created?.first_name;
        const lastName = row.original.user_created?.last_name;
        const fullName = firstName || lastName ? `${firstName ?? ""} ${lastName ?? ""}` : null;

        return fullName ? fullName : row.original.user_created?.email;
      },
    });
    if (actionColumn && status === PROJECT_STATUS.REQUEST_TO_DELETE ? isCarbonAdminRole : true)
      columns.push(actionColumn);
    if (isCarbonAdminRole) {
      columns.splice(3, 0, createByColumn);
    }
    return columns;
  }, [columnHelper]);

  const handleRowClick = (row: CarbonListJson) => {
    router.push(`/carbon-footprint/projects/manage/${row.id}`);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className="flex overflow-auto">
      <div className="flex w-full flex-1 flex-col gap-4 px-2">
        <div className="flex flex-col justify-between md:flex-row">
          <div>
            <h1 className="text-xl font-medium">{t("carbon.overview.title")}</h1>
            <BreadCrumb links={breadCrumbLinks} />
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <NextLink intent={"whiteButtonBordered"} href="/carbon-footprint/emission-factor-proxy">
              {t("carbon.manage.emissionFactorProxy")}
            </NextLink>
            <NextLink
              intent={"primaryButton"}
              icon={<MaterialSymbolsAddRounded />}
              href="/carbon-footprint/projects/create"
            >
              {t("carbon.manage.addProgram")}
            </NextLink>
          </div>
        </div>
        <CarbonProjectStatusTab
          selectedIndex={selected}
          statusCounts={statusCounts}
          onChange={(_selectedIndex) => {
            router.push(`/carbon-footprint/projects/manage${`?status=${slugForIndex(_selectedIndex)}`}`);
          }}
        >
          <DataTable
            columns={columns}
            showSearch={true}
            showHeader
            tableName={"test"}
            data={data}
            dataLoading={isLoading}
            customPageSize={10}
            thChildClassName="justify-start"
            onSearchText={setSearch}
          >
            <h1>{t("carbon.project.allCarbonProjects", { count: data.length })}</h1>
          </DataTable>
        </CarbonProjectStatusTab>
        {showDeleteWarningPopup && (
          <ConfirmDeletePopup
            id={showDeleteWarningPopup.id}
            isOpen={showDeleteWarningPopup != null}
            onClose={() => setShowDeleteWarningPopup(null)}
            isDeleted={showDeleteWarningPopup.status === PROJECT_STATUS.REQUEST_TO_DELETE}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectList;
