import { Button } from "@/components/Button";
import { ArrowLeftIcon, InformationCircleIcon, SaveDiskIcon } from "@/components/Icon";
import Tooltip from "@/components/Tooltip";
import Form from "@/components/form/Form";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { BenefitDetailsSchema } from "@/schemas/forms/projects/create/step8-schema";
import { benefitCalculations, viewMode } from "@/utils/project-create-form-helper";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Step6Table from "./Step6Table";

const Step6TableContainer = ({
  handleOnPrevious,
  handleOnNext,
}: {
  handleOnPrevious: () => void;
  handleOnNext: () => Promise<boolean>;
}) => {
  const t = useTranslations("common");

  const {
    watch,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<CreateProjectSchema>();

  const [isLoading, setIsLoading] = useState(true);

  const sensitivityAnalysis = watch("step6.sensitivityAnalysis");
  const step28Data = watch("step2.8") as any;
  const step29Data = watch("step2.9") as any;
  const { viewOnly } = viewMode(getValues());

  const availableYears: string[] = [];
  for (let year = step28Data.questions[1].value; year <= step28Data.questions[2].value; year++) {
    availableYears.push(year.toString());
  }
  for (let year = Number(availableYears.slice(-1)) + 1; year <= (step29Data.questions[1] as any).value; year++) {
    availableYears.push(year.toString());
  }

  const tabs = [
    { title: t("project.create.step61.tabs.baseCaseBenefit"), tooltip: "" },
    {
      title: t("project.create.step61.tabs.maximumCaseBenefit"),
      tooltip: t("project.create.step61.tabs.maximumCaseBenefitTooltip"),
    },
    {
      title: t("project.create.step61.tabs.minimumCaseBenefit"),
      tooltip: t("project.create.step61.tabs.minimumCaseBenefitTooltip"),
    },
  ];

  useEffect(() => {
    const sections = getValues("step6.sections");

    const sectionsWithDefault = sections.map((section) => {
      const value = section.value.map((value) => {
        if (value.benefitDetails.length == 0) return { ...value, benefitDetails: [blankBenefit(true)] };
        return value;
      });
      return { ...section, value };
    });

    setValue("step6.sections", sectionsWithDefault);
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    const goingNext = await handleOnNext();
    if (!goingNext) return;
    const sections = getValues("step6.sections");
    const filledSections = sections.map((section) => {
      const sectionValueFilled = section.value.map((sectionValue) => {
        const benefitFilledWithBlank: any[] = [];
        availableYears.map((year) => {
          const existingBenefit = sectionValue.benefitDetails.find((bd) => bd.year == year);
          if (existingBenefit) {
            const { netBenefit, totalAmount } = benefitCalculations(existingBenefit, existingBenefit.isFilled ?? false);
            const data = {
              ...existingBenefit,
              netBenefit,
              totalAmount,
            };

            benefitFilledWithBlank.push(data);
          }
        });

        return { ...sectionValue, benefitDetails: benefitFilledWithBlank };
      });
      return { ...section, value: sectionValueFilled };
    });

    setValue("step6.sections", filledSections);
  };

  if (isLoading) return <></>;
  return (
    <>
      <div className="flex items-center justify-between">
        <Button
          intent="text"
          size="small"
          icon={<ArrowLeftIcon className="h-6 w-6" />}
          className="font-medium text-black"
          onClick={handleOnPrevious}
        >
          {t("project.create.step6.financialProxy")}
        </Button>
        <div className="flex items-center gap-8">
          <div className="flex flex-1 flex-col items-end ">
            <Form.Checkbox
              disabled={viewOnly}
              id="sensitivityAnalysis"
              name="step6.sensitivityAnalysis"
              control={control}
              label={t("project.create.step6.sensitivityAnalysis")}
            />
            <Tooltip
              className="px-4"
              textClassName="text-xs"
              textContainerClassName="w-72 z-40"
              text={t("project.create.step6.sensitivityAnalysisTooltip")}
            >
              <div className="flex justify-end">
                <span className="flex items-center gap-2 text-smart-cbt-orange ">
                  <InformationCircleIcon className="w-h h-5" />
                  {t("project.create.step6.sensitivityAnalysisInfo")}
                </span>
              </div>
            </Tooltip>
          </div>
          <Button type="button" onClick={handleSave} intent={"primary"} size="small" icon={<SaveDiskIcon />}>
            {t("project.create.step6.confirm")}
          </Button>
        </div>
      </div>

      <div className="flex h-full flex-col gap-4 overflow-y-auto rounded-lg border border-smart-cbt-border-green bg-white">
        {sensitivityAnalysis ? (
          <div className="relative flex h-full flex-col overflow-y-auto">
            <Tab.Group>
              <Tab.List className="sticky left-0 right-0 top-0 z-10 flex divide-x divide-white">
                {tabs.map((t, i) => (
                  <Tab
                    key={t.title}
                    className="flex-1 py-3 ui-selected:bg-white ui-selected:text-smart-cbt-dark-green ui-not-selected:bg-smart-cbt-light-grey ui-not-selected:text-smart-cbt-medium-grey"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <label className="text-xs sm:text-sm">{t.title}</label>
                      {i != 0 && (
                        <Tooltip
                          className="px-4 xs:hidden sm:block"
                          textContainerClassName="w-72 z-40"
                          textClassName="text-xs"
                          text={t.tooltip}
                        >
                          <InformationCircleIcon className="w-h h-5 text-smart-cbt-orange" />
                        </Tooltip>
                      )}
                    </span>
                  </Tab>
                ))}
              </Tab.List>

              <div className="flex flex-grow flex-col gap-6 p-6" {...{ inert: viewOnly ? "" : undefined }}>
                <Tab.Panels className="flex-grow">
                  <Tab.Panel>
                    <Step6Table availableYears={availableYears} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Step6Table hasMaxCaseBenefit availableYears={availableYears} />
                  </Tab.Panel>
                  <Tab.Panel>
                    <Step6Table hasMinCaseBenefit availableYears={availableYears} />
                  </Tab.Panel>
                </Tab.Panels>
              </div>
            </Tab.Group>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-4">
            <p className="text-smart-cbt-dark-green">{t("project.create.step6.baseCaseBenefit")}</p>
            <Step6Table availableYears={availableYears} {...{ inert: viewOnly ? "" : undefined }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Step6TableContainer;

export const blankBenefit = (isFilled: boolean, year?: string): BenefitDetailsSchema => {
  return {
    year,
    isFilled,
    isCreatedProxy: false,
    netBenefit: 0,
    totalAmount: 0,
    amount: 0,
    unitPerYear: undefined,
    proxy: undefined,
    variableCost: 0,
    nonVariableCost: 0,
    maximumPercentage: 0,
    minimumPercentage: 0,
    proxies: [],
  };
};
