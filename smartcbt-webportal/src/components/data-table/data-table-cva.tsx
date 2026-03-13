import { VariantProps, cva } from "class-variance-authority";
import { DetailedHTMLProps, HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

const tableContainer = cva("flex w-full flex-col gap-4", {
  variants: {},
  defaultVariants: {},
});

const table = cva("w-full", {
  variants: {},
  defaultVariants: {},
});

const thread = cva("p-2 text-sm", {
  variants: {},
  defaultVariants: {},
});

const tbody = cva("", {
  variants: { bodyIntent: { withDivider: "divide-y", withoutDivider: "" } },
  defaultVariants: { bodyIntent: "withDivider" },
});

const th = cva(
  "h-12 whitespace-nowrap bg-smart-cbt-very-light-green px-4 text-center text-sm text-smart-cbt-dark-green",
  {
    variants: { intent: { smallerFont: "text-2xs" } },
    defaultVariants: {},
  }
);

const tr = cva("", {
  variants: {},
  defaultVariants: {},
});

const tf = cva("", {
  variants: {},
  defaultVariants: {},
});

const td = cva("p-4 text-sm", {
  variants: { intent: { smallPadding: "px-2", smallerFont: "text-2xs" } },
  defaultVariants: {},
});

type DivProps = VariantProps<typeof tableContainer> & {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

const TableContainer = ({ className, children, ...props }: DivProps) => (
  <div className={cn(tableContainer({}), className)} {...props}>
    {children}
  </div>
);
const Table = ({ id, className, children, ...props }: DivProps) => (
  <table id={id} className={cn(table({}), className)} {...props}>
    {children}
  </table>
);
const Thead = ({ className, children, ...props }: DivProps) => (
  <thead className={cn(thread({}), className)} {...props}>
    {children}
  </thead>
);
const TBody = ({ className, children, bodyIntent, ...props }: DivProps & VariantProps<typeof tbody>) => (
  <tbody className={cn(tbody({ bodyIntent }), className)} {...props}>
    {children}
  </tbody>
);
const Th = ({
  className,
  children,
  intent,
  ...props
}: DivProps &
  VariantProps<typeof th> &
  DetailedHTMLProps<ThHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) => (
  <th className={cn(th({ intent }), className)} {...props}>
    {children}
  </th>
);
const Tr = ({
  className,
  children,
  ...props
}: DivProps & DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>) => (
  <tr className={cn(tr({}), className)} {...props}>
    {children}
  </tr>
);

const Td = ({
  className,
  children,
  intent,
  ...props
}: DivProps &
  VariantProps<typeof td> &
  DetailedHTMLProps<TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>) => (
  <td className={cn(td({ intent }), className)} {...props}>
    {children}
  </td>
);

const Tf = ({ className, children, ...props }: DivProps) => (
  <tfoot className={cn(tf({}), className)} {...props}>
    {children}
  </tfoot>
);

export { TBody, Table, TableContainer, Td, Tf, Th, Thead, Tr, tableContainer, tbody };
