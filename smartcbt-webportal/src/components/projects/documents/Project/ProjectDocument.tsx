"use client";

import * as XLSX from "xlsx";

import {
  ProjectBenefitDocument,
  ProjectDetailsDocument,
  ProjectImpactDocument,
  ProjectWithWithoutDocument,
  ProjectbudgetDocument,
  SIADocument,
  SROIData,
  SocialImpactPathwayXLXS,
  SocialReturnOnInvestment,
  ThoeryOfChangeDocument,
} from "@/utils/project-create-form-helper";

import { ExcelIcon, FilePdfIcon } from "@/components/Icon";
import Image from "@/components/image";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ProjectPDFPreviewLayout from "../ProjectDocumentLayout";
import ProjectBenefitAndLongTermEffectDocument from "./ProjectBenefitAndLongTermEffectDocument";
import ProjectBenefitFromImplementation from "./ProjectBenefitFromImplementation";
import ProjectBenefitTableDocument from "./ProjectBenefitTableDocument";
import ProjectBudgetDocument from "./ProjectBudgetDocument";
import ProjectDetailsAndRelatedPlansDocument from "./ProjectDetailsAndRelatedPlansDocument";
import ProjectEffectDocument from "./ProjectEffectDocument";
import ProjectOverviewEffectDocument from "./ProjectOverviewEffectDocument";
import SIAPathWay from "./SIAPathWay";
import SIASummaryDocument from "./SIASummaryDocument";
import SROISummaryDocument from "./SROISummaryDocument";

export interface IProjectDocument {
  projectDetailsDocument: ProjectDetailsDocument;
  thoeryOfChangeDocument: ThoeryOfChangeDocument;
  socialReturnOnInvestment: SocialReturnOnInvestment;
  projectWithWithoutDocument: ProjectWithWithoutDocument;
  projectbudgetDocument: ProjectbudgetDocument;
  projectImpactDocument: ProjectImpactDocument;
  siaDocument: SIADocument;
  projectBenefitDocument: ProjectBenefitDocument;
  socialImpactPathwayXLXS: SocialImpactPathwayXLXS;
  sroiData: SROIData;
}

interface ProjectDocumentProps {
  isOpen: boolean;
  onClose: () => void;
  projectDocument: IProjectDocument;
}

const ProjectDocument = (props: ProjectDocumentProps) => {
  const t = useTranslations("common");
  const { projectDocument } = props;
  const {
    projectDetailsDocument,
    thoeryOfChangeDocument,
    projectWithWithoutDocument,
    projectbudgetDocument,
    projectImpactDocument,
    siaDocument,
    projectBenefitDocument,
    socialImpactPathwayXLXS,
    sroiData,
  } = projectDocument;

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const close = () => {
    props.onClose();
  };

  const children = () => {
    return (
      <>
        <ProjectPDFPreviewLayout>
          <div className="mb-3">
            <h1 className="text-sm font-medium text-smart-cbt-dark-green">
              {t("project.documents.projectDetails.projectName")}
            </h1>
            <label className="text-2xs text-black">{projectDetailsDocument.projectName}</label>
          </div>
          <ProjectDetailsAndRelatedPlansDocument projectDetailsDocument={projectDetailsDocument} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <ProjectBenefitAndLongTermEffectDocument thoeryOfChangeDocument={thoeryOfChangeDocument} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <ProjectOverviewEffectDocument projectWithWithoutDocument={projectWithWithoutDocument} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <ProjectBudgetDocument projectbudgetDocument={projectbudgetDocument} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <ProjectBenefitFromImplementation projectBenefitDocument={projectBenefitDocument} />
          <ProjectBenefitTableDocument projectBenefitDocument={projectBenefitDocument} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <ProjectEffectDocument projectImpactDocument={projectImpactDocument} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <SIASummaryDocument siaDocument={siaDocument} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <SROISummaryDocument sroiData={sroiData} />
          <SIAPathWay id="sia-pathway" socialImpactPathwayXLXS={socialImpactPathwayXLXS} />
        </ProjectPDFPreviewLayout>
      </>
    );
  };

  const createXLSX = () => {
    const siaTable = document.getElementById("sia-pathway");
    const table1 = document.getElementById("exAnteBase");
    const table2 = document.getElementById("exAnteBest");
    const table3 = document.getElementById("exAnteWorst");
    const table4 = document.getElementById("exPostBase");

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.table_to_sheet(siaTable);
    const ws1 = XLSX.utils.table_to_sheet(table1);
    const ws2 = XLSX.utils.table_to_sheet(table2);
    const ws3 = XLSX.utils.table_to_sheet(table3);
    const ws4 = XLSX.utils.table_to_sheet(table4);

    XLSX.utils.book_append_sheet(wb, ws, "pathway");
    XLSX.utils.book_append_sheet(wb, ws1, "exAnteBase");
    XLSX.utils.book_append_sheet(wb, ws2, "exAnteBest");
    XLSX.utils.book_append_sheet(wb, ws3, "exAnteWorst");
    XLSX.utils.book_append_sheet(wb, ws4, "exPostBase");

    const ref = ws!["!ref"] as string;
    const range = XLSX.utils.decode_range(ref);
    const columnWidths = [];

    for (let C = range.s.c; C <= range.e.c; ++C) {
      let maxCellLength = 0;

      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cellAddress = { c: C, r: R };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        const cell = ws[cellRef];

        if (cell && cell.v) {
          const cellValue = cell.v.toString();
          maxCellLength = Math.max(maxCellLength, cellValue.length);
        }
      }

      const minWidth = 8; // Set a minimum width
      const finalWidth = maxCellLength > minWidth ? maxCellLength : minWidth;

      columnWidths[C] = { wch: finalWidth };
    }

    ws1["!cols"] = columnWidths;

    XLSX.writeFileXLSX(wb, "sia.xlsx");
  };

  return (
    <Dialog open={props.isOpen} onClose={close} className="relative z-50 ">
      <div className="fixed inset-0 cursor-pointer bg-black/80" />
      <div className="fixed inset-0">
        <Dialog.Panel className="mx-auto my-4 h-[97vh]  max-w-[807px] justify-center overflow-y-auto bg-white">
          <div className="absolute right-4 top-2 flex flex-1 justify-end">
            <button
              className="m-2 flex items-center justify-center gap-2 p-2 text-white"
              onClick={useReactToPrint({
                content: () => pdfRef.current,
              })}
            >
              <FilePdfIcon className="h-6 w-6" />
              PDF
            </button>
            <button className="m-2 flex items-center justify-center gap-2 p-2 text-white" onClick={createXLSX}>
              <ExcelIcon className="h-6 w-6" />
              Excel
            </button>
          </div>
          <div id="print-content" ref={pdfRef}>
            <table>
              <thead className="h-8">
                <tr>
                  <th className="bg-white">
                    <div className="hidden h-10 flex-row-reverse bg-smart-cbt-green px-4 print:flex">
                      <div className="bg-white">
                        <Image src="/images/logo.png" alt="CBT Logo" width={100} height={20} />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{children()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProjectDocument;
