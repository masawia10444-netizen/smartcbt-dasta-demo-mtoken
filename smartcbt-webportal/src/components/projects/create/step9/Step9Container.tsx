import { Button } from "@/components/Button";
import { ArrowLeftIcon, DownloadIcon, SaveDiskIcon, SendIcon } from "@/components/Icon";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { ProjectJson } from "@/utils/cms/adapters/website/sia/types/project";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import Step9SIA from "./Step9SIA";
import Step9SROI from "./Step9SROI";

const Step9Container = ({
  project,
  handleOnPrevious,
  onDownload,
  onSubmit,
  onUpdate,
  isLoading,
  setIsLoading,
}: {
  project: ProjectJson | null;
  handleOnPrevious: () => void;
  onDownload: () => void;
  onSubmit: () => void;
  onUpdate: () => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const t = useTranslations("common");
  const { getValues } = useFormContext<CreateProjectSchema>();

  const tabs = [{ title: t("project.create.step9.tabs.sia") }, { title: t("project.create.step9.tabs.sroi") }];

  const value = getValues();

  return (
    <div className="relative h-full">
      <div className="flex h-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button
            intent={isLoading ? "disabled" : "text"}
            size="small"
            icon={<ArrowLeftIcon className="h-6 w-6" />}
            className="font-medium text-black"
            onClick={handleOnPrevious}
            disabled={isLoading}
          >
            {t("project.create.step9.back")}
          </Button>
          <div className="flex items-center gap-8">
            <Button
              type="button"
              onClick={onDownload}
              intent={isLoading ? "disabled" : "secondary"}
              size="small"
              icon={<DownloadIcon />}
              disabled={isLoading}
            >
              {t("project.create.step9.download")}
            </Button>
            {!project && (
              <Button
                type="button"
                onClick={onSubmit}
                intent={isLoading ? "disabled" : "primary"}
                size="small"
                icon={<SendIcon />}
                disabled={isLoading}
              >
                {t("project.create.step9.submit")}
              </Button>
            )}
            {project && [PROJECT_STATUS.DRAFT, PROJECT_STATUS.REJECTED].includes(project.status) && (
              <Button
                type="button"
                onClick={onSubmit}
                intent={isLoading ? "disabled" : "primary"}
                size="small"
                icon={<SendIcon />}
                disabled={isLoading}
              >
                {t("project.create.step9.submit")}
              </Button>
            )}
            {project && [PROJECT_STATUS.APPROVAL, PROJECT_STATUS.IN_PROGRESS].includes(project.status) && (
              <Button
                type="button"
                onClick={onUpdate}
                intent={isLoading ? "disabled" : "primary"}
                size="small"
                icon={<SaveDiskIcon />}
                disabled={isLoading}
              >
                {t("project.create.step9.save")}
              </Button>
            )}
          </div>
        </div>
        <div className="rounded-b-l relative flex flex-grow flex-col pb-6">
          <Tab.Group>
            <Tab.List className="flex">
              {tabs.map((t) => (
                <Tab
                  key={t.title}
                  className="flex-1 rounded-t-lg border-smart-cbt-border-green py-3 outline-none ui-selected:border-l ui-selected:border-r ui-selected:border-t ui-selected:bg-white ui-selected:text-smart-cbt-dark-green ui-not-selected:border-b ui-not-selected:bg-smart-cbt-medium-grey/30 ui-not-selected:text-smart-cbt-medium-grey"
                >
                  {t.title}
                </Tab>
              ))}
            </Tab.List>

            <div className="flex h-px flex-grow flex-col gap-6 overflow-y-auto rounded-b-lg border-b border-l border-r border-smart-cbt-border-green bg-white">
              <Tab.Panels className="flex-grow">
                <Tab.Panel className="p-6">
                  <Step9SIA project={value} />
                </Tab.Panel>
                <Tab.Panel>
                  <Step9SROI project={value} />
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </Tab.Group>
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green" />
        </div>
      )}
    </div>
  );
};

export default Step9Container;
