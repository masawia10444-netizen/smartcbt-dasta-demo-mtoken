import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { HtmlHTMLAttributes } from "react";

const projectStatusBadgeCell = cva("h-8 w-fit rounded-2xl px-4 py-1 text-base", {
  variants: {
    status: {
      draft: "bg-smart-cbt-light-grey text-smart-cbt-very-dark-grey",
      pending_for_approval: "bg-smart-cbt-blue-3 text-smart-cbt-blue",
      approved: "bg-smart-cbt-light-green text-smart-cbt-green",
      published: "bg-smart-cbt-green-3 text-smart-cbt-dark-green",
      rejected: "bg-[#FFE3E1] text-smart-cbt-red",
      inprogress: "bg-[#FFF7E6] text-smart-cbt-orange",
      done: "bg-smart-cbt-dark-grey text-white",
      request_to_delete: "bg-smart-cbt-blue-3 text-smart-cbt-blue",
      deleted: "bg-[#FFE3E1] text-smart-cbt-red",
    },
  },
});

interface ProjectStatusBadgeCellProps extends HtmlHTMLAttributes<HTMLDivElement> {
  status: PROJECT_STATUS;
}

export const ProjectStatusBadgeCell = (props: ProjectStatusBadgeCellProps) => {
  const { status } = props;
  const t = useTranslations("common");

  return (
    <div className={cn(projectStatusBadgeCell({ status: status as unknown as PROJECT_STATUS }))}>
      {t(`project.status.${status}`)}
    </div>
  );
};
