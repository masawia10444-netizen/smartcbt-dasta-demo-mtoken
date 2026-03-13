import { fetchItemPaginated, handleAPIError } from "@/utils/helper";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  ColumnDef,
  ExtendedPagination,
  PaginationState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MouseEventHandler, PropsWithChildren, useEffect, useState } from "react";
import { TBody, Table, TableContainer, Td, Tf, Th, Thead, Tr, tableContainer, tbody } from "./data-table-cva";

import { cn } from "@/utils/cn";
import { VariantProps } from "class-variance-authority";
import { isNil } from "lodash";
import debounce from "lodash.debounce";
import { useTranslations } from "next-intl";
import { IcTwotoneSearch } from "../Icon";
import PageControl from "./data-table-page-control";

// Constants
const SORT_ASCENDING = "asc";
const SORT_DESCENDING = "desc";
const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_PAGE_COUNT = 1;
const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGINATION_SIZE = 5;

export type DataTablePaginated<T> = {
  items: T[];
  searchKey: string;
  currentPageIndex: number;
  totalPages: number;
};

type HeaderProps = { showHeader?: true; tableName: string } | { showHeader: false };

type DataTableProps<T> = PropsWithChildren<
  {
    columns: ColumnDef<T, any>[];
    path?: string; // For querying data from the api
    data?: T[]; // For passing data to this data table
    showSearch?: boolean;
    dataLoading?: boolean;
    forceRefreshKey?: number | string;
    params?: { [key: string]: any };
    Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element | null;
    hidePagination?: boolean;
    searchQuery?: string | null;
    customPageSize?: number;
    showFooter?: boolean;
    thClassName?: string;
    thChildClassName?: string;
    footClassName?: string;
    footChildClassName?: string;
    showEmptyMessage?: boolean;
    onRowClick?: (object: T) => any;
    onSearchText?: (search: string) => void;
  } & HeaderProps &
    VariantProps<typeof tableContainer> &
    VariantProps<typeof tbody>
>;

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    fullWidth?: boolean;
    centerData?: boolean;
    toggleEdit?: boolean;
  }

  interface ExtendedPagination extends PaginationState {
    pageCount?: number;
  }
}

const DataTable = <T,>(props: DataTableProps<T>) => {
  const t = useTranslations("common");
  const {
    columns,
    path,
    data,
    dataLoading,
    showSearch,
    showHeader,
    Icon,
    hidePagination,
    searchQuery,
    children,
    forceRefreshKey,
    customPageSize,
    showFooter,
    thClassName,
    thChildClassName,
    footClassName,
    footChildClassName,
    showEmptyMessage,
    onRowClick,
    onSearchText,
  } = props;

  const [isLoading, setIsLoading] = useState(dataLoading); // Loading state indicator
  const [dataSource, setDataSource] = useState<T[]>(() => []); // Data for the data table
  const [{ pageIndex, pageSize, pageCount }, setPagination] = useState<ExtendedPagination>({
    // Current pagination of the data table
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: customPageSize ? customPageSize : DEFAULT_PAGE_SIZE,
    pageCount: DEFAULT_PAGE_COUNT,
  });

  const [searchKey, setSearchKey] = useState("");
  const [resetPage, setResetPage] = useState(false);
  const [order, setOrder] = useState(""); // Column used for ordering
  const [sort, setSort] = useState(""); // Sorting order (ascending or descending)
  const onTextChangeDebounced = debounce((value: string) => {
    setSearchKey(value);
    onSearchText && onSearchText(value);
  }, 500);
  const manualPagination = path == undefined && data == undefined;
  const table = useReactTable({
    columns: columns,
    data: dataSource,
    pageCount: pageCount,
    manualPagination: manualPagination,
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  useEffect(() => {
    if (path != null) {
      setPagination({
        pageIndex: DEFAULT_PAGE_INDEX,
        pageSize: customPageSize ? customPageSize : DEFAULT_PAGE_SIZE,
        pageCount: DEFAULT_PAGE_COUNT,
      });
      setResetPage(true);
      return;
    }
  }, [searchKey, props.params, forceRefreshKey, path, customPageSize]);

  useEffect(() => {
    if (data != null && dataLoading != undefined) {
      const totalPages = Math.ceil(data.length / pageSize);
      setDataSource(data);
      setPagination({
        pageIndex: pageIndex,
        pageSize: pageSize,
        pageCount: totalPages,
      });
      setIsLoading(dataLoading);
      return;
    }
    if (path != null) {
      if (!resetPage) return;
      if (searchQuery != null) setSearchKey(searchQuery);
      fetchData(path);
      return;
    }
  }, [searchKey, pageIndex, sort, order, resetPage, forceRefreshKey, data, path]);

  const fetchData = async (path: string) => {
    try {
      setIsLoading(true);
      const dataSource = await fetchItemPaginated<T>(
        path,
        pageIndex + 1,
        DEFAULT_PAGE_SIZE,
        order,
        sort,
        searchKey,
        props.params ?? {}
      );
      setIsLoading(false);
      setDataSource(dataSource.items);
      if (dataSource.currentPageIndex != pageIndex) {
        setPagination({ pageIndex: dataSource.currentPageIndex, pageSize, pageCount: dataSource.totalPages });
      }
      setIsLoading(false);
    } catch (error) {
      handleAPIError(error);
      setIsLoading(false);
    }
  };

  const onHeaderClicked = (id: string) => {
    if (sort === id) {
      if (order === SORT_ASCENDING) {
        setOrder(SORT_DESCENDING);
      } else {
        setSort("");
        setOrder("");
      }
    } else {
      setSort(id);
      setOrder(SORT_ASCENDING);
    }
  };

  const isShowHeader = showHeader == undefined || showHeader == true;

  return (
    <div className="flex-1 flex-col gap-2">
      {isShowHeader && (
        <div className="flex justify-between gap-2">
          <div className="w-full">{children}</div>
          {showSearch && (
            <div className="mb-4 flex h-10 flex-row items-center gap-2 rounded-lg border border-smart-cbt-light-grey bg-white px-4">
              <input
                type="text"
                onChange={(e) => onTextChangeDebounced(e.target.value)}
                className={cn(" w-full focus:outline-none")}
                placeholder={t("global.search")}
              />
              <span className="right-4 top-0 cursor-pointer text-smart-cbt-medium-grey">
                <IcTwotoneSearch className="h-6 w-6 text-smart-cbt-dark-grey" />
              </span>
              <div className="right-2 top-0 h-6 " />
            </div>
          )}
        </div>
      )}
      {/* Table */}
      <TableContainer>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} className={cn("font-medium", thClassName)}>
                    <div
                      className={cn(
                        "flex items-center justify-center",
                        thChildClassName,
                        header.column.getCanSort() ? "cursor-pointer" : ""
                      )}
                      onClick={() => {
                        if (isLoading || !header.column.getCanSort()) return;
                        onHeaderClicked(header.id);
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <span className="ml-2">
                          <ChevronUpIcon
                            className={cn(
                              "ml-1 h-3 w-3",
                              header.id === sort && order === "asc"
                                ? "text-smart-cbt-dark-green"
                                : "text-smart-cbt-dark-grey"
                            )}
                          />
                          <ChevronDownIcon
                            className={cn(
                              "ml-1 h-3 w-3",
                              header.id === sort && order === "desc"
                                ? "text-smart-cbt-dark-green"
                                : "text-smart-cbt-dark-grey"
                            )}
                          />
                        </span>
                      )}
                    </div>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <TBody bodyIntent={props.bodyIntent}>
            {isLoading
              ? table.getHeaderGroups().map((headerGroup, index) => {
                  return (
                    <Tr key={index}>
                      {headerGroup.headers.map((_header, subIndex) => {
                        return (
                          <Td key={subIndex}>
                            <div className="my-4 w-full">
                              <div className="ml-2 mr-4 h-2 animate-pulse rounded bg-gray-200"></div>
                            </div>
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })
              : table.getRowModel().rows.map((row) => (
                  <Tr
                    key={row.id}
                    onClick={(e) => {
                      // !isNil(onRowClick) ? onRowClick(row.original) : undefined;
                      if (!isNil(onRowClick)) {
                        console.log("onRowClick");
                        return onRowClick(row.original);
                      } else {
                        console.log("undefined");
                        return undefined;
                      }
                    }}
                    className={cn(onRowClick && "cursor-pointer")}
                  >
                    {row.getAllCells().map((c) => {
                      const { cell, meta } = c.column.columnDef;
                      return (
                        <Td key={c.id} className={cn(meta?.fullWidth ? "whitespace-nowrap" : "")}>
                          <div className={cn(meta?.centerData ? "flex justify-center" : "", "")}>
                            {flexRender(cell, c.getContext())}
                          </div>
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
          </TBody>
          {showFooter && (
            <Tf>
              {table.getFooterGroups().map((footerGroup) => (
                <Tr key={footerGroup.id}>
                  {footerGroup.headers.map((header) => (
                    <Th key={header.id} className={footClassName}>
                      <div className={footChildClassName}>
                        {flexRender(header.column.columnDef.footer, header.getContext())}
                      </div>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Tf>
          )}
        </Table>
        {/* Show no data message if the data is empty */}
        {!isLoading && (dataSource == null || dataSource?.length == 0) && showEmptyMessage && (
          <div className="flex justify-center p-2">
            <p>{t("global.noData")}</p>
          </div>
        )}
      </TableContainer>
      <div className="flex justify-end">
        {/* Condition of showing the pagination */}
        {!hidePagination && (
          <PageControl
            gotoPage={table.setPageIndex}
            previousPage={table.previousPage}
            nextPage={table.nextPage}
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            pageIndex={pageIndex}
            pageSize={pageSize}
            pageCount={table.getPageCount()}
            showCount={DEFAULT_PAGINATION_SIZE}
          />
        )}
      </div>
    </div>
  );
};

export default DataTable;
