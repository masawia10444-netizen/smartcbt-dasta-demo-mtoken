import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { HtmlHTMLAttributes } from "react";

const ribbon = cva("h-10 w-fit rounded-br-[50px] p-2 text-white", {
  variants: {
    status: {
      draft: "bg-smart-cbt-light-grey text-smart-cbt-very-dark-grey",
      pending_for_approval: "bg-smart-cbt-blue",
      approved: "bg-smart-cbt-green",
      inprogress: "bg-smart-cbt-orange",
      done: "bg-smart-cbt-dark-grey",
      rejected: "bg-smart-cbt-red",
      published: "bg-smart-cbt-green-3",
      request_to_delete: "bg-smart-cbt-blue",
    },
  },
  compoundVariants: [{ status: "approved" }],
});

interface RibbonProps extends HtmlHTMLAttributes<HTMLDivElement>, VariantProps<typeof ribbon> {
  disabled?: boolean;
  icon?: JSX.Element;
}

export const Ribbon = (props: RibbonProps) => {
  const { className, status } = props;
  return (
    <div className={cn(ribbon({ status: status }), className)} {...props}>
      {props.children}
    </div>
  );
};
