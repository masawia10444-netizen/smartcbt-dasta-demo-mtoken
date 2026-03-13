import { cn } from "@/utils/cn";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { HtmlHTMLAttributes } from "react";

enum CommunityStatus {
  Draft = "draft",
  Published = "published",
  Pending = "pending",
  Rejected = "rejected",
}

const activityBadgeCell = cva("h-8 w-fit rounded-2xl px-4 py-1 text-base", {
  variants: {
    status: {
      draft: "bg-smart-cbt-medium-grey text-smart-cbt-very-dark-grey",
      pending: "bg-smart-cbt-orange text-white",
      published: "bg-smart-cbt-green  text-white",
      rejected: "",
    },
  },
});

interface ActivityBadgeCellProps extends HtmlHTMLAttributes<HTMLDivElement> {
  status?: string | null;
}

export const ActivityBadgeCell = (props: ActivityBadgeCellProps) => {
  const { status } = props;
  const t = useTranslations("common");

  if (status == null || !Object.values(CommunityStatus).includes(status as CommunityStatus)) {
    return <div>-</div>;
  }
  return (
    <div className={cn(activityBadgeCell({ status: status as CommunityStatus }))}>
      {t(`community.status.${status}`)}
    </div>
  );
};
