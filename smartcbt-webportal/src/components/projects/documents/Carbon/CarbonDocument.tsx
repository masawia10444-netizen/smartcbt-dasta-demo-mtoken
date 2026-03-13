"use client";

import { ExcelIcon, FilePdfIcon } from "@/components/Icon";
import { generateDocxRecap } from "@/components/carbon/projects/create/recap/docx/CarbonProjectRecapDocx";
import Image from "@/components/image";
import { CarbonSummaryData } from "@/utils/carbon-project-form-helper";
import { Dialog } from "@headlessui/react";
import html2canvas from "html2canvas";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ProjectPDFPreviewLayout from "../ProjectDocumentLayout";
import CarbonActivityTableDocument from "./CarbonActivityTableDocument";
import CarbonDataCollectionScope from "./CarbonDataCollectionScope";
import GeneralInformationDocument from "./GeneralInformationDocument";
import GraphDocument from "./GraphDocument";
import PhotoDocument from "./PhotoDocument";
import TravelProgramDocument from "./TravelProgramDocument";

interface CarbonDocumentProps {
  isOpen: boolean;
  onClose: () => void;
  data: CarbonSummaryData;
}

const CarbonDocument = (props: CarbonDocumentProps) => {
  const t = useTranslations("common");
  const { data } = props;

  const pdfRef = useRef<HTMLDivElement | null>(null);

  const close = () => {
    props.onClose();
  };

  const children = () => {
    return (
      <>
        <ProjectPDFPreviewLayout>
          <GeneralInformationDocument data={data} />
          <TravelProgramDocument data={data} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <CarbonDataCollectionScope data={data} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <CarbonActivityTableDocument
            title={t("carbon.document.3.title")}
            unit={t("carbon.document.3.multiplierDescription")}
            data={data.transportations}
          />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <CarbonActivityTableDocument
            title={t("carbon.document.4.title")}
            unit={t("carbon.document.4.multiplierDescription")}
            data={data.accomodations}
          />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <CarbonActivityTableDocument
            title={t("carbon.document.5.title")}
            unit={t("carbon.document.5.multiplierDescription")}
            data={data.foods}
          />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <CarbonActivityTableDocument
            title={t("carbon.document.6.title")}
            unit={t("carbon.document.6.multiplierDescription")}
            data={data.wastes}
          />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <GraphDocument data={data} />
        </ProjectPDFPreviewLayout>
        <ProjectPDFPreviewLayout>
          <PhotoDocument data={data} />
        </ProjectPDFPreviewLayout>
      </>
    );
  };

  const captureSummaryAsImage = async () => {
    const summaryElement = document.getElementById("chart-summary");
    if (!summaryElement) {
      throw new Error("Chart container element not found");
    }
    const canvas = await html2canvas(summaryElement);
    return canvas.toDataURL("image/png");
  }

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
            <button
              className="m-2 flex items-center justify-center gap-2 p-2 text-white"
              onClick={async (e) => {
                try {
                  const summaryImage = await captureSummaryAsImage();
                  generateDocxRecap(data, summaryImage);
                } catch (error) {
                  console.error("Error exporting DOCX with chart:", error);
                }
              }}
            >
              <ExcelIcon className="h-6 w-6" />
              Word
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

export default CarbonDocument;
