import { CheckIconCircle, DeleteIcon } from "@/components/Icon";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { fetchListProject } from "@/app/[locale]/(authenticated)/sia-sroi/action";
import { updateProjectStatusAction } from "@/app/[locale]/(authenticated)/sia-sroi/projects/action";
import { MenuDropDown } from "@/components/MenuDropDown";
import { useSession } from "@/components/context-provider/AuthProvider";
import DataTable from "@/components/data-table/data-table";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { ProjectListJSON } from "@/utils/cms/adapters/website/sia/types/project";
import { StatusCounts, countProjectStatus, handleAPIError } from "@/utils/helper";
import { createColumnHelper } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { DeleteProjectWarningPopup } from "./DeleteProjectWarningPopup";
import { ProjectStatusBadgeCell } from "./ProjectStatusBadgeCell";
import { ProjectStatusTab } from "./ProjectStatusTab";

const ProjectList = () => {
  const t = useTranslations("common");
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get("current_status") as PROJECT_STATUS;

  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState<string>();
  // const [currentIndex, setCurrentIndex] = useState<number>();
  const [data, setData] = useState<ProjectListJSON[]>([]);
  const [dataByStatus, setDataByStatus] = useState<ProjectListJSON[]>([]);
  const [status, setStatus] = useState<PROJECT_STATUS | undefined>(currentStatus);

  const [statusCounts, setStatusCounts] = useState<StatusCounts>(countProjectStatus(data));
  const [showDeleteWarningPopup, setShowDeleteWarningPopup] = useState<number | null>(null);
  const columnHelper = createColumnHelper<ProjectListJSON>();
  const { session } = useSession();
  const router = useRouter();
  const siaRole = session?.user?.roles.find((value) => value.app_code == "SIA/SROI") ?? null;
  const isSiaAdminRole = siaRole?.role == "super_admin";

  const tabs = [
    {
      key: "totalCount",
      status: undefined,
      name: t("project.manage.tabs.status.all"),
    },
    { key: "draft", status: PROJECT_STATUS.DRAFT, name: t("project.manage.tabs.status.draft") },
    {
      key: "pending_for_approval",
      status: PROJECT_STATUS.PENDING_FOR_APPROVAL,
      name: t("project.manage.tabs.status.waitingForApprove"),
    },
    { key: "approved", status: PROJECT_STATUS.APPROVAL, name: t("project.manage.tabs.status.approved") },
    { key: "inprogress", status: PROJECT_STATUS.IN_PROGRESS, name: t("project.manage.tabs.status.onGoing") },
    { key: "done", status: PROJECT_STATUS.DONE, name: t("project.manage.tabs.status.completed") },
    { key: "rejected", status: PROJECT_STATUS.REJECTED, name: t("project.manage.tabs.status.rejected") },
    {
      key: "request_to_delete",
      status: PROJECT_STATUS.REQUEST_TO_DELETE,
      name: t("project.manage.tabs.status.pendingDelete"),
    },
  ];

  const currentIndex = tabs.findIndex((tab) => tab.status == status) ?? 0;

  const columns = useMemo(() => {
    const columns = [
      columnHelper.accessor("cbt_project.title", {
        header: () => t("project.manage.name"),
        enableSorting: false,
      }),
      columnHelper.accessor("project_owner.title", {
        header: () => t("project.manage.organization"),
        enableSorting: false,
      }),
      columnHelper.accessor("project_budget", {
        header: () => t("project.manage.cost"),
        enableSorting: true,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          const n = Number(row.original.project_budget);
          const parts = n.toFixed(2).split(".");
          const budget = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + (parts[1] ? "." + parts[1] : "");
          return n == 0 ? "-" : budget;
        },
      }),
      columnHelper.accessor("project_start_year", {
        header: () => t("project.manage.year"),
        enableSorting: true,
        meta: {
          fullWidth: true,
          centerData: true,
        },
      }),
      columnHelper.accessor("user_created", {
        header: () => t("project.manage.createBy"),
        enableSorting: false,
        meta: {
          fullWidth: true,
        },
        cell: ({ getValue }) => {
          const firstName = getValue()?.first_name;
          const lastName = getValue()?.last_name;
          const fullName = firstName || lastName ? `${firstName ?? ""} ${lastName ?? ""}` : null;
          return fullName ? fullName : getValue()?.email;
        },
      }),
      columnHelper.accessor("status", {
        header: () => t("project.manage.status"),
        enableSorting: false,
        meta: {
          fullWidth: true,
          centerData: true,
        },
        cell: ({ row }) => {
          return <ProjectStatusBadgeCell status={row.original.status} />;
        },
      }),
    ];

    const actionColumn = (() => {
      if (status == PROJECT_STATUS.PENDING_FOR_APPROVAL && !isSiaAdminRole) return null;
      return columnHelper.display({
        id: "action",
        header: () => "การจัดการ",
        cell: ({ row }) => {
          const { id } = row.original;
          const menuItems = [
            {
              key: "edit",
              href: `/sia-sroi/projects/manage/${id}`,
              label: t("project.manage.action.edit"),
              icon: <CheckIconCircle />,
            },
            {
              key: "delete",
              label: t("project.manage.action.delete"),
              icon: <DeleteIcon />,
              onClick: () => {
                setShowDeleteWarningPopup(id);
              },
            },
          ];
          return (
            <MenuDropDown className="justify-center" itemsClassName="overflow-auto rounded-xl" menuItems={menuItems} />
          );
        },
      });
    })();

    if (actionColumn) columns.push(actionColumn);
    return columns;
  }, [columnHelper]);

  const fetchData = async () => {
    try {
      setData([]);
      setDataByStatus([]);
      setIsLoading(true);
      const projectList = await fetchListProject(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        search
      );
      setStatusCounts(countProjectStatus(projectList));
      setData(projectList);
      setDataByStatus(status ? projectList.filter((project) => project.status == status) : projectList);
      setIsLoading(false);
    } catch (error) {
      handleAPIError(error);
      setIsLoading(false);
    }
  };

  const fetchDataByStatus = async () => {
    setDataByStatus(status ? data.filter((project) => project.status == status) : data);
  };

  const handleRowClick = (row: ProjectListJSON) => {
    router.push(`/sia-sroi/projects/manage/${row.id}`);
  };

  const handleDeleteRequest = async (didConfirm: boolean) => {
    if (!didConfirm || !showDeleteWarningPopup) {
      setShowDeleteWarningPopup(null);
      return;
    }
    const findData = data.find((value) => value.id == showDeleteWarningPopup);
    const id = showDeleteWarningPopup;
    setShowDeleteWarningPopup(null);
    const deleteStatus = isSiaAdminRole
      ? findData?.status == PROJECT_STATUS.REQUEST_TO_DELETE
        ? PROJECT_STATUS.DELETED
        : PROJECT_STATUS.REQUEST_TO_DELETE
      : PROJECT_STATUS.REQUEST_TO_DELETE;

    const { error } = await updateProjectStatusAction(id, deleteStatus);
    if (error) {
      handleAPIError(error);
      return;
    }

    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  useEffect(() => {
    fetchDataByStatus();
  }, [status]);

  return (
    <div className="flex overflow-auto">
      <ProjectStatusTab
        status={tabs}
        selectedIndex={currentIndex}
        statusCounts={statusCounts}
        onChange={(_selectedIndex, status) => {
          setStatus(status);
        }}
      >
        <DataTable
          columns={columns}
          showSearch={true}
          showHeader
          tableName={""}
          data={dataByStatus}
          dataLoading={isLoading}
          customPageSize={10}
          thChildClassName="justify-start"
          onSearchText={setSearch}
          onRowClick={
            status != null &&
            [(PROJECT_STATUS.DRAFT, PROJECT_STATUS.APPROVAL, PROJECT_STATUS.IN_PROGRESS)].includes(status)
              ? handleRowClick
              : undefined
          }
        >
          <h1>
            {t("project.allProjects")} {dataByStatus?.length} {t("project.project")}
          </h1>
        </DataTable>
      </ProjectStatusTab>
      {showDeleteWarningPopup && (
        <DeleteProjectWarningPopup isOpen={showDeleteWarningPopup != null} onClose={handleDeleteRequest} />
      )}
    </div>
  );
};

export default ProjectList;
