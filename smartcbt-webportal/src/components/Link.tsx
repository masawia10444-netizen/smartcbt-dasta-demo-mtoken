import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";
import Link from "next-intl/link";

const link = cva("p-2 text-center text-base hover:cursor-pointer", {
  variants: {
    intent: {
      primary: "text-smart-cbt-medium-grey underline underline-offset-4 hover:text-smart-cbt-green",
      primarySimple: "text-smart-cbt-green underline-offset-4 hover:text-smart-cbt-green hover:underline",
      whiteButton: "rounded-md bg-white text-smart-cbt-green",
      whiteButtonBordered: "rounded-md border border-smart-cbt-green bg-white text-smart-cbt-green",
      primaryButton: "rounded-md bg-smart-cbt-green font-medium text-white",
      primaryOutlineButton: "rounded-md border border-smart-cbt-green font-medium text-smart-cbt-green ",
      blackOutline: "text-black underline underline-offset-4 hover:text-smart-cbt-green",
      disabledButton:
        "cursor-not-allowed rounded-md bg-smart-cbt-light-grey text-smart-cbt-medium-grey hover:cursor-not-allowed",
    },
    size: {
      medium: "flex-1 whitespace-nowrap",
    },
  },
  compoundVariants: [
    { intent: "primary", size: "medium" },
    { intent: "whiteButton", size: "medium" },
  ],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export interface NextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof link> {
  href: string;
  icon?: JSX.Element;
  className?: string;
}

export const NextLink = ({ href, children, className, intent, size, icon, onClick, ...props }: NextLinkProps) => {
  return (
    <Link href={href} {...props}>
      <span
        className={cn(
          link({ intent, size }),
          "line-clamp-1 flex items-center justify-start gap-2 truncate  whitespace-nowrap px-4",
          className
        )}
      >
        {icon}
        {children}
      </span>
    </Link>
  );
};
