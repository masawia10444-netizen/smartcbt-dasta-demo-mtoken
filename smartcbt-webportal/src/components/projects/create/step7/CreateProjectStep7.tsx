import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { viewMode } from "@/utils/project-create-form-helper";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import Step7Table from "./Step7Table";

const CreateProjectStep7 = () => {
  const {
    control,
    getValues,
    formState: { errors },
  } = useFormContext<CreateProjectSchema>();
  const t = useTranslations("common");
  const project = getValues();
  const sensitivityAnalysis = project.step6.sensitivityAnalysis;
  const { viewOnly, showExAndPost, canEditExPost } = viewMode(project);

  const exTabs = [
    {
      title: t("project.create.step7.exTabs.ante"),
      content: (
        <ContainerWithSensitivityAnalysis viewOnly={true} sensitivityAnalysis={sensitivityAnalysis} isExPost={false} />
      ),
    },
    {
      title: t("project.create.step7.exTabs.post"),
      content: (
        <>
          <ContainerWithSensitivityAnalysis viewOnly={!canEditExPost} sensitivityAnalysis={false} isExPost />
        </>
      ),
    },
  ];

  return (
    <div className="relative -mt-6">
      {showExAndPost ? (
        <>
          <Tab.Group>
            <Tab.List className="sticky -top-6 z-10 -mx-6 flex divide-x divide-white">
              {exTabs.map((t) => (
                <Tab
                  key={t.title}
                  className="flex-1 py-3 ui-selected:bg-white ui-selected:text-smart-cbt-dark-green ui-not-selected:bg-smart-cbt-light-grey ui-not-selected:text-smart-cbt-medium-grey"
                >
                  {t.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="flex-grow">
              {exTabs.map((t) => (
                <Tab.Panel key={t.title}>{t.content}</Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </>
      ) : (
        <ContainerWithSensitivityAnalysis
          viewOnly={viewOnly}
          sensitivityAnalysis={sensitivityAnalysis}
          isExPost={false}
        />
      )}
    </div>
  );
};

export default CreateProjectStep7;

const ContainerWithSensitivityAnalysis = ({
  sensitivityAnalysis,
  viewOnly,
  isExPost,
}: {
  sensitivityAnalysis: boolean;
  viewOnly: boolean;
  isExPost: boolean;
}) => {
  const t = useTranslations("common");

  const tabs = [
    { title: t("project.create.step7.tabs.base"), content: <Step7Table isExPost={isExPost} viewOnly={viewOnly} /> },
    {
      title: t("project.create.step7.tabs.maximum"),
      content: <Step7Table isExPost={isExPost} hasMaxCaseBenefit viewOnly={viewOnly} />,
    },
    {
      title: t("project.create.step7.tabs.minimum"),
      content: <Step7Table isExPost={isExPost} hasMinCaseBenefit viewOnly={viewOnly} />,
    },
  ];

  return sensitivityAnalysis ? (
    <Tab.Group>
      <Tab.List className="sticky -top-6 z-10 -mx-6 flex divide-x divide-white">
        {tabs.map((t) => (
          <Tab
            key={t.title}
            className="flex-1 py-3 ui-selected:bg-white ui-selected:text-smart-cbt-dark-green ui-not-selected:bg-smart-cbt-light-grey ui-not-selected:text-smart-cbt-medium-grey"
          >
            {t.title}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="flex-grow" {...{ inert: viewOnly ? "" : undefined }}>
        {tabs.map((t) => (
          <Tab.Panel key={t.title}>{t.content}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  ) : (
    <div className="flex flex-col gap-2 py-4" {...{ inert: viewOnly ? "" : undefined }}>
      <p className="text-smart-cbt-dark-green">{t("project.create.step7.tabs.base")}</p>
      <Step7Table isExPost={isExPost} viewOnly={viewOnly} />
    </div>
  );
};
