import { ScheduleStatus } from "@/utils/cms/adapters/website/constants";
import { cn } from "@/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { HtmlHTMLAttributes } from "react";

const negotiationBadgeCell = cva("h-8 w-fit rounded-2xl px-4 py-1 text-base", {
  variants: {
    status: {
      OPEN: "bg-smart-cbt-green text-white",
      PENDING: "bg-smart-cbt-yellow-2 text-smart-cbt-orange",
      "IN-PROGRESS": "bg-smart-cbt-green text-white",
      REJECTED: "bg-orange-100 text-smart-cbt-red",
      "CHANGE-SLOT": "bg-orange-100 text-smart-cbt-red",
      CLOSED: "bg-yellow-100 text-smart-cbt-orange",
      COMPLETED: "bg-smart-cbt-green text-white",
    },
  },
});

interface NegotiationBadgeCellProps
  extends HtmlHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof negotiationBadgeCell> {
  status?: ScheduleStatus;
  isOwner?: boolean;
  isChangeSlot?: boolean;
}

export const NegotiationBadgeCell = (props: NegotiationBadgeCellProps) => {
  const { status, isOwner, isChangeSlot } = props;
  const t = useTranslations("common");

  return (
    <div className={cn(negotiationBadgeCell({ status: status }))}>
      {status != null
        ? t(
            `businessNegotiation.negotiationStatus.${
              status == "REJECTED" && isOwner && !isChangeSlot
                ? "REJECTED_OWNER"
                : status == "REJECTED" && isOwner && isChangeSlot
                ? "REJECTED_OWNER"
                : status
            }`
          )
        : "-"}
    </div>
  );
};
