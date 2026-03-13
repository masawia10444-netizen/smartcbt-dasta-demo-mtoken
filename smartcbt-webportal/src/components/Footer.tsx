import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";

type FooterProps = {
  className?: string;
};

const Footer = ({ className }: FooterProps) => {
  const t = useTranslations("common");
  return (
    <div
      className={cn(
        "bottom-2 left-4 z-40 px-4 py-2 text-center text-sm text-smart-cbt-dark-grey md:fixed md:left-1/2 md:-translate-x-1/2",
        className
      )}
    >
      {t("footer.copyright")}
    </div>
  );
};

export default Footer;
