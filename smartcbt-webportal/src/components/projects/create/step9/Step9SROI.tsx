import { InfoIcon } from "@/components/Icon";
import { SiaSroiContext } from "@/contexts/App.context";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { cn } from "@/utils/cn";
import { socialReturnOnInvestmentData, viewMode } from "@/utils/project-create-form-helper";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import Step9Table from "./Step9Table";

const Step9SROI = ({ project }: { project: CreateProjectSchema }) => {
  const t = useTranslations("common");
  const { viewOnly, showExAndPost, canEditExPost } = viewMode(project);

  const exTabs = [
    {
      title: t("project.create.step9.exTabs.ante"),
      content: <ContainerWithSensitivityAnalysis showExAndPost={showExAndPost} project={project} isExPost={false} />,
    },
    {
      title: t("project.create.step9.exTabs.post"),
      content: <ContainerWithSensitivityAnalysis showExAndPost={showExAndPost} project={project} isExPost />,
    },
  ];

  return (
    <div className="relative">
      {showExAndPost ? (
        <Tab.Group>
          <div className="sticky top-0 z-10 -mx-6">
            <Tab.List className="flex">
              {exTabs.map((t) => (
                <Tab
                  key={t.title}
                  className="flex-1 py-3 bg-white border-b outline-none ui-selected:border-smart-cbt-green ui-selected:text-smart-cbt-green ui-not-selected:border-white ui-not-selected:text-smart-cbt-medium-grey"
                >
                  {t.title}
                </Tab>
              ))}
            </Tab.List>
            <div className="h-2 bg-white" />
          </div>
          <Tab.Panels className="flex-grow">
            {exTabs.map((t) => (
              <Tab.Panel key={t.title}>{t.content}</Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <ContainerWithSensitivityAnalysis showExAndPost={showExAndPost} project={project} isExPost={false} />
      )}
    </div>
  );
};

export default Step9SROI;

const ContainerWithSensitivityAnalysis = ({
  project,
  isExPost,
  showExAndPost,
}: {
  project: CreateProjectSchema;
  isExPost: boolean;
  showExAndPost: boolean;
}) => {
  const t = useTranslations("common");

  const { discountRates } = useContext(SiaSroiContext);

  const tabs = [
    {
      title: t("project.create.step9.sroiTabs.baseCase"),
      data: socialReturnOnInvestmentData(project, discountRates?.discount_rate ?? 5, "base", isExPost),
    },
    {
      title: t("project.create.step9.sroiTabs.bestCase"),
      data: socialReturnOnInvestmentData(project, discountRates?.discount_rate ?? 5, "best", isExPost),
    },
    {
      title: t("project.create.step9.sroiTabs.worstCase"),
      data: socialReturnOnInvestmentData(project, discountRates?.discount_rate ?? 5, "worst", isExPost),
    },
  ];

  const sensitivityAnalysis = project.step6.sensitivityAnalysis;

  return (
    <div className="mx-6">
      {sensitivityAnalysis ? (
        <Tab.Group>
          <Tab.List className={cn("sticky flex space-x-px bg-white", showExAndPost ? "top-[57px]" : "top-0")}>
            {tabs.map((t) => (
              <Tab
                key={t.title}
                className="flex-1 py-3 outline-none ui-selected:bg-smart-cbt-light-green ui-selected:text-smart-cbt-dark-green ui-not-selected:bg-smart-cbt-light-grey ui-not-selected:text-smart-cbt-medium-grey"
              >
                {t.title}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="py-6">
            {tabs.map((tab) => (
              <Tab.Panel key={tab.title} className="flex flex-col gap-6 overflow-y-auto">
                <Header project={project} />
                <Step9Table tableData={tab.data} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <div className="flex flex-col gap-6 py-6 overflow-y-auto">
          <Header project={project} />
          <Step9Table tableData={tabs[0].data} />
        </div>
      )}
    </div>
  );
};

const Header = ({ project }: { project: CreateProjectSchema }) => {
  const t = useTranslations("common");
  const isCreatedProxy = project.step6.sections.some((section: any) =>
    section.value.some((value: any) =>
      value.benefitDetails.some((benefitDetails: any) => benefitDetails.isCreatedProxy)
    )
  );
  return (
    <div className="flex justify-between">
      <p className="font-medium text-smart-cbt-dark-green">{t("project.create.step9.socialReturnOnInvestment")}</p>
      {isCreatedProxy && (
        <p className="flex items-center gap-2 text-sm text-smart-cbt-orange">
          <InfoIcon className="w-3 h-3 text-white rounded-full bg-smart-cbt-orange" />
          {t("project.create.step9.pendingCreateProxyInfo")}
        </p>
      )}
    </div>
  );
};
