import { useTranslations } from "next-intl";

interface EmissionProxyListHeaderProps {
  itemCount: number;
}

const EmissionProxyListHeader = (props: EmissionProxyListHeaderProps) => {
  const { itemCount } = props;
  const t = useTranslations("common");

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex ">
        <h1>
          {t("global.totalList")} {itemCount} {t("global.items")}
        </h1>
      </div>
    </div>
  );
};
export default EmissionProxyListHeader;
