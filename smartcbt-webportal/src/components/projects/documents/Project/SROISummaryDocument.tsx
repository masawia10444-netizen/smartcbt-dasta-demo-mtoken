import { SROIData } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import Step9Table from "../../create/step9/Step9Table";

interface SROISummaryDocumentProps {
  sroiData: SROIData;
}

const SROISummaryDocument = (props: SROISummaryDocumentProps) => {
  const t = useTranslations("common");

  const { sroiData } = props;
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-sm font-medium text-smart-cbt-dark-green">{t("project.documents.summary.sroi.title")}</h1>
      <Step9Table id={"exAnteBase"} tableData={sroiData.exAnteBase} smallerFont />
      <Step9Table id={"exAnteBest"} tableData={sroiData.exAnteBest} smallerFont />
      <Step9Table id={"exAnteWorst"} tableData={sroiData.exAnteWorst} smallerFont />
      <Step9Table id={"exPostBase"} tableData={sroiData.exPostBase} smallerFont />
    </div>
  );
};

export default SROISummaryDocument;
