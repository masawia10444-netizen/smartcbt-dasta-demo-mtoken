"use client";

import { Button } from "@/components/Button";
import { ArrowLeftIcon, DownloadIcon } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { AppContext, SiaSroiContext } from "@/contexts/App.context";
import { OrganizationJson, ProjectJson } from "@/utils/cms/adapters/website/sia/types/project";
import {
  budget,
  convertProjectJsonToCreateProjectSchema,
  effects,
  impacts,
  projectBenefitDocument,
  projectDetails,
  sia,
  socialImpactPathway,
  socialReturnOnInvestmentData,
  sroiTableData,
  thoeryOfChange,
} from "@/utils/project-create-form-helper";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import Step9SIA from "../create/step9/Step9SIA";
import Step9SROI from "../create/step9/Step9SROI";
import ProjectDocument, { IProjectDocument } from "../documents/Project/ProjectDocument";

export const ViewProjectSummary = ({
  project,
  projects,
  step2,
  organizations,
}: {
  project: ProjectJson;
  projects: ProjectJson[];
  step2: any;
  organizations: OrganizationJson[];
}) => {
  const t = useTranslations("common");

  const tabs = [{ title: t("project.create.step9.tabs.sia") }, { title: t("project.create.step9.tabs.sroi") }];

  const { discountRates, listCBTProject } = useContext(SiaSroiContext);

  const { provinces, districts, subdistricts } = useContext(AppContext);

  const createProjectSchema = convertProjectJsonToCreateProjectSchema(
    project,
    projects,
    step2,
    provinces,
    districts,
    subdistricts,
    listCBTProject,
    organizations,
    discountRates?.discount_rate
  );

  const [showDownloadPreview, setShowDownloadPreview] = useState(false);
  const [projectDocument, setProjectDocument] = useState<IProjectDocument | undefined>(undefined);

  const handleDownload = () => {
    setProjectDocument({
      projectDetailsDocument: projectDetails(createProjectSchema),
      thoeryOfChangeDocument: thoeryOfChange(createProjectSchema),
      socialReturnOnInvestment: socialReturnOnInvestmentData(createProjectSchema, discountRates?.discount_rate ?? 5),
      projectWithWithoutDocument: effects(createProjectSchema),
      projectbudgetDocument: budget(createProjectSchema),
      projectImpactDocument: impacts(createProjectSchema),
      siaDocument: sia(createProjectSchema),
      projectBenefitDocument: projectBenefitDocument(createProjectSchema),
      socialImpactPathwayXLXS: socialImpactPathway(createProjectSchema),
      sroiData: sroiTableData(createProjectSchema, discountRates?.discount_rate ?? 5),
    });
    setShowDownloadPreview(true);
  };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between gap-8">
        <NextLink href="/sia-sroi/projects/overview" intent="primarySimple" icon={<ArrowLeftIcon />}>
          {t("global.back")}
        </NextLink>
        <Button type="button" onClick={handleDownload} intent={"secondary"} size="small" icon={<DownloadIcon />}>
          {t("project.create.step9.download")}
        </Button>
      </div>
      <div className="relative flex flex-col flex-grow rounded-b-l">
        <Tab.Group>
          <Tab.List className="flex">
            {tabs.map((t) => (
              <Tab
                key={t.title}
                className="flex-1 py-3 rounded-t-lg outline-none border-smart-cbt-border-green ui-selected:border-l ui-selected:border-r ui-selected:border-t ui-selected:bg-white ui-selected:text-smart-cbt-dark-green ui-not-selected:border-b ui-not-selected:bg-smart-cbt-medium-grey/30 ui-not-selected:text-smart-cbt-medium-grey"
              >
                {t.title}
              </Tab>
            ))}
          </Tab.List>

          <div className="flex flex-col flex-grow h-px gap-6 overflow-y-auto bg-white border-b border-l border-r rounded-b-lg border-smart-cbt-border-green">
            <Tab.Panels className="flex-grow">
              <Tab.Panel className="p-6">
                <Step9SIA project={createProjectSchema} />
              </Tab.Panel>
              <Tab.Panel>
                <Step9SROI project={createProjectSchema} />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
      {showDownloadPreview && projectDocument && (
        <ProjectDocument
          isOpen={showDownloadPreview}
          onClose={() => {
            setShowDownloadPreview(false);
          }}
          projectDocument={projectDocument}
        />
      )}
    </div>
  );
};
