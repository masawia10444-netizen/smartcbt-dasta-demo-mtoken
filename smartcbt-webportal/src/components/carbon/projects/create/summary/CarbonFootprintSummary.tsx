import CollapseSection from "@/components/CollapseSection";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { useTranslations } from "next-intl";
import CarbonFootprintTable from "./CarbonFootprintTable";

interface CarbonFootprintSummaryProps {
  data: CarbonSummaryData;
}

const CarbonFootprintSummary = (props: CarbonFootprintSummaryProps) => {
  const t = useTranslations("common");
  const { data } = props;

  return (
    <CollapseSection
      className="bg-smart-cbt-very-light-green px-2 text-smart-cbt-dark-green"
      title={t("carbon.summary.dataCollectionScope.title")}
      defaultOpen={true}
    >
      <CarbonFootprintTable data={data} />
    </CollapseSection>
  );
};

export default CarbonFootprintSummary;
