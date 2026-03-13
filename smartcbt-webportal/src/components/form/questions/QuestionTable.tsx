import {
  TBody,
  Table,
  TableContainer,
  Td,
  Tf,
  Th,
  Thead,
  Tr,
  tableContainer,
  tbody,
} from "@/components/data-table/data-table-cva";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { cn } from "@/utils/cn";
import { VariantProps } from "class-variance-authority";
import { PropsWithChildren } from "react";

type DataTableProps<T> = PropsWithChildren<
  {
    columns: ColumnDef<T, any>[];
    data: T[];
    thClassName?: string;
    thChildClassName?: string;
    footClassName?: string;
    footChildClassName?: string;
    showEmptyMessage?: boolean;
  } & VariantProps<typeof tableContainer> &
    VariantProps<typeof tbody>
>;

const QuestionTable = <T,>(props: DataTableProps<T>) => {
  const { columns, thClassName, thChildClassName, footClassName, footChildClassName, data } = props;

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex-1 flex-col gap-2">
      <TableContainer>
        <Table>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id} className={cn(thClassName)}>
                    <div className={cn("flex items-center justify-center", thChildClassName)}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </div>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <TBody bodyIntent={props.bodyIntent}>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((c) => {
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
        </Table>
      </TableContainer>
    </div>
  );
};

export default QuestionTable;
