import {
  updateCarbonProgramAction,
  uploadFile,
} from "@/app/[locale]/(authenticated)/carbon-footprint/projects/actions";
import { Button } from "@/components/Button";
import { ArrowLeftIcon, ArrowRightIcon, SaveDiskIcon } from "@/components/Icon";
import { FormLabel } from "@/components/form/FormLabel";
import {
  CreateImages,
  ImageView,
  TravelProgramRoundsSchema,
  TravelProgramSchema,
} from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { PictureSchema } from "@/schemas/forms/shard-schema";
import { footprintCalculation, viewMode } from "@/utils/carbon-project-form-helper";
import { createEmissionFactorProxy } from "@/utils/cms/adapters/website/carbon/emission-factor-proxy";
import { CarbonJson } from "@/utils/cms/adapters/website/carbon/types";
import { cn } from "@/utils/cn";
import { handleAPIError, toastSuccess } from "@/utils/helper";
import { Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import CarbonFootprint from "../../create/carbon-footprint/CarbonFootprint";
import { PhotographicEvidencesRound } from "../../create/photos/PhotographicEvidencesRound";
import TravelPlanSummary from "../../create/summary/TravelPlanSummary";
import ProjectRoundEditStep1 from "./ProjectRoundEditStep1";

type ProjectCreateStep = { id: string; index: number; content: JSX.Element };

type ProjectRoundEditProps = {
  selectedIndex: number;
  tabs: TravelProgramSchema[];
  mode: "view" | "edit";
  carbonProgram?: CarbonJson | null;
};

const ProjectRoundEdit = ({ mode, selectedIndex, tabs, carbonProgram }: ProjectRoundEditProps) => {
  const t = useTranslations("common");
  const router = useRouter();

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const { watch, trigger } = useFormContext<TravelProgramRoundsSchema>();

  const formData = watch("rounds")[selectedIndex];

  const steps: ProjectCreateStep[] = [
    {
      id: "step1",
      index: 0,
      content: <ProjectRoundEditStep1 mode={mode} selectedIndex={selectedIndex} tabs={tabs} key={1} />,
    },
    {
      id: "step2",
      index: 1,
      content: <CarbonFootprint dataOutSide={formData} key={2} selectedIndex={selectedIndex} />,
    },
    {
      id: "step3",
      index: 2,
      content: (
        <>
          <FormLabel className="whitespace-nowrap text-black">{t("carbon.create.totalCarbonFootprint")}</FormLabel>
          <TravelPlanSummary dataOutSide={formData as any} key={3} />
        </>
      ),
    },
    { id: "step4", index: 3, content: <PhotographicEvidencesRound selectedIndex={selectedIndex} key={4} /> },
  ];

  const { viewOnly } = viewMode({ id: formData?.id, status: formData?.status });

  const handleOnNext = async () => {
    const isCurrentStepValid = await trigger();
    const currentStep = `step${selectedTabIndex + 1}`;
    console.log(`Step: ${currentStep} is valid: `, isCurrentStepValid);
    if (!isCurrentStepValid) return false;
    setSelectedTabIndex(selectedTabIndex + 1);
    return true;
  };
  const handleOnSubmit = async () => {
    const isCurrentStepValid = await trigger();
    const currentStep = `step${selectedTabIndex + 1}`;
    console.log(`Step: ${currentStep} is valid: `, isCurrentStepValid);
    if (!isCurrentStepValid) return false;
    const data = formData;
    console.log("formData", data);
    if (!data.id) return;
    if (!carbonProgram) return;
    try {
      let cover;

      const checkCover =
        !(data.photographic.cover as ImageView)?.id &&
        !(data.photographic.cover as ImageView)?.url &&
        (data.photographic.cover as PictureSchema)?.file;

      if (checkCover) {
        const coverFormData = new FormData();
        coverFormData.append(
          "file",
          new Blob([(data.photographic.cover as PictureSchema)?.file], {
            type: (data.photographic.cover as PictureSchema)?.file.type,
          }),
          (data.photographic.cover as PictureSchema)?.file.name
        );
        cover = await uploadFile("Cover image", coverFormData);
      }

      const travel_images =
        data.photographic.travel?.length !== 0
          ? await Promise.all(
              (data.photographic.travel as CreateImages | ImageView[])?.map(async (t) => {
                if (t instanceof File) {
                  const formData = new FormData();
                  formData.append("file", new Blob([t], { type: t.type }), t.name);
                  const image = await uploadFile("Travel images", formData);
                  return { directus_files_id: image?.id };
                }
                return { directus_files_id: (t as ImageView).id };
              })
            )
          : null;
      const waste_images =
        data.photographic.wastes?.length !== 0
          ? await Promise.all(
              (data.photographic.wastes as CreateImages | ImageView[])?.map(async (w) => {
                if (w instanceof File) {
                  const formData = new FormData();
                  formData.append("file", new Blob([w], { type: w.type }), w.name);
                  const image = await uploadFile("Waste images", formData);
                  return { directus_files_id: image?.id };
                }
                return { directus_files_id: (w as ImageView).id };
              })
            )
          : null;
      const food_images =
        data.photographic.foods?.length !== 0
          ? await Promise.all(
              (data.photographic.foods as CreateImages | ImageView[])?.map(async (f) => {
                if (f instanceof File) {
                  const formData = new FormData();
                  formData.append("file", new Blob([f], { type: f.type }), f.name);
                  const image = await uploadFile("Food images", formData);
                  return { directus_files_id: image?.id };
                }
                return { directus_files_id: (f as ImageView).id };
              })
            )
          : null;
      const accommodation_images =
        data.photographic.accommodation?.length !== 0
          ? await Promise.all(
              (data.photographic.accommodation as CreateImages | ImageView[]).map(async (a) => {
                if (a instanceof File) {
                  const formData = new FormData();
                  formData.append("file", new Blob([a], { type: a.type }), a.name);
                  const image = await uploadFile("Accommodation images", formData);
                  return { directus_files_id: image?.id };
                }
                return { directus_files_id: (a as ImageView).id };
              })
            )
          : null;
      const trip_publicity_documents_images =
        data.photographic.documents?.length !== 0
          ? await Promise.all(
              (data.photographic.documents as CreateImages | ImageView[])?.map(async (d) => {
                if (d instanceof File) {
                  const formData = new FormData();
                  formData.append("file", new Blob([d], { type: d.type }), d.name);
                  const image = await uploadFile("Trip publicity documents images", formData);
                  return { directus_files_id: image?.id };
                }
                return { directus_files_id: (d as ImageView).id };
              })
            )
          : null;

      const { accomodations, foods, total, transportations, wastes } = footprintCalculation(data as any);

      const programStartDate = data.dates?.startDate.toISOString().split("T")[0];
      const programEndDate = data.dates?.endDate.toISOString().split("T")[0];

      const roundIds = carbonProgram.round?.map((r) => {
        return { id: r.id };
      });

      console.log("roundIds", roundIds);

      const round = [
        ...roundIds,
        {
          sort: tabs?.length,
          round: tabs?.length,
          capacity_value: Number(data.numberOfTourist),
          summary_cf: total,
          waste_cf: wastes.grandTotal,
          food_cf: foods.grandTotal,
          accommodation_cf: accomodations.grandTotal,
          travel_cf: transportations.grandTotal,
          average_cfp: total / 4,
          status: "published",
          program_end: programEndDate,
          program_start: programStartDate,
          program_round_activity: (
            await Promise.all(
              data.travelPlans.flatMap(
                async (tp) =>
                  await Promise.all(
                    tp.activities.map(async (a, i) => {
                      const program_activity = a.id;
                      const program_activity_detail = await Promise.all(
                        a.carbonFootprintActivities.map(async (cfa, i) => {
                          let createdProxy: any = {};
                          console.log("cfa.isCreatedProxy", cfa.isCreatedProxy);
                          if (cfa.isCreatedProxy) {
                            const proxyImages =
                              cfa.emissionProxy?.files && cfa.emissionProxy?.files?.length !== 0
                                ? await Promise.all(
                                    cfa.emissionProxy?.files?.map(async (file) => {
                                      return { directus_files_id: file?.id };
                                    })
                                  )
                                : null;

                            const proxyBody = {
                              emission_factor_unit: 1,
                              pcr_type: cfa.emissionProxy?.pcr_type.id,
                              sort: null,
                              status: "draft",
                              emission_factor_value: cfa.emissionProxy?.emission_factor_value,
                              control_variable_value: cfa.emissionProxy?.controlVariableValue,
                              name: cfa.emissionProxy?.name,
                              has_control_variable: cfa.emissionProxy?.hasControlVariable ? "yes" : "no",
                              control_variable_unit: cfa.emissionProxy?.controlVariableUnit,
                              files: proxyImages || [],
                            };
                            console.log("proxyBody", proxyBody);
                            createdProxy = await createEmissionFactorProxy(proxyBody);
                          }
                          console.log("createdProxy", createdProxy);
                          console.log("cfa.emissionProx", cfa.emissionProxy);
                          return {
                            sort: i + 1,
                            pcr_type: cfa.pcr_type?.id,
                            emission_factor_type: cfa.isCreatedProxy ? createdProxy.id : cfa.emissionProxy?.id,
                            capacity: Number(cfa.multiplier),
                            cfp_amount: Number(
                              cfa.emissionProxy?.emission_factor_value && cfa?.multiplier
                                ? cfa.emissionProxy?.emission_factor_value * cfa?.multiplier
                                : 0
                            ),
                            ef_value: cfa.emissionProxy?.emission_factor_value,
                            activity_detail_title: cfa.name,
                            status: "published",
                          };
                        })
                      );
                      return {
                        activity_ef: a.carbonFootprintActivities
                          .reduce(
                            (accumulator, currentValue) =>
                              (accumulator ?? 0) +
                              (currentValue.multiplier ?? 1) * (currentValue.emissionProxy?.emission_factor_value ?? 0),
                            0
                          )
                          .toFixed(3),
                        status: "published",
                        program_activity_detail: program_activity_detail,
                        program_activity: program_activity,
                      };
                    })
                  )
              )
            )
          ).flat(),
        },
      ];

      let bodyUpdateCarbon: any = {
        round: round,
        travel_images: travel_images,
        waste_images: waste_images,
        food_images: food_images,
        accommodation_images: accommodation_images,
        trip_publicity_documents_images: trip_publicity_documents_images,
      };
      if (cover) bodyUpdateCarbon = { ...bodyUpdateCarbon, cover_image: cover?.id };
      console.log("bodyUpdateCarbon", bodyUpdateCarbon);

      const resCarbonProgram = await updateCarbonProgramAction(data.id as number, bodyUpdateCarbon as any);
      toastSuccess(t("carbon.create.updateSuccessMessage"));
      console.log("resCarbonProgram", resCarbonProgram);
      router.refresh();
    } catch (error) {
      handleAPIError(error);
      console.log(error);
    }
  };

  const handleOnPrevious = () => {
    setSelectedTabIndex(selectedTabIndex - 1);
  };

  const canNext =
    selectedTabIndex == steps.length - 1 ? watch("rounds")[selectedIndex]?.photographic?.cover != null : true;

  return (
    <Tab.Group selectedIndex={selectedTabIndex} onChange={setSelectedTabIndex}>
      <div className="flex flex-grow flex-col overflow-auto rounded-lg border border-smart-cbt-border-green bg-white">
        <Tab.List className="flex h-[48px] min-h-[48px] justify-between overflow-x-hidden border-b border-smart-cbt-border-green">
          {steps.map((step) => (
            <Tab
              key={step.id}
              onClick={(e) => {
                if (viewOnly) return;
                selectedTabIndex <= step.index && e.preventDefault();
              }}
              className={cn(
                "relative block w-full cursor-default bg-smart-cbt-light-grey p-4 text-center text-sm text-smart-cbt-dark-green outline-none after:absolute after:right-[-12px] after:top-1/2 after:z-10 after:h-6 after:w-6 after:-translate-y-1/2 after:rotate-45 after:bg-smart-cbt-very-light-green ui-selected:border-r-smart-cbt-light-green ui-selected:bg-smart-cbt-very-light-green ui-not-selected:after:hidden",
                (viewOnly || selectedIndex > step.index) && "cursor-pointer bg-white",
                selectedIndex < step.index && "text-smart-cbt-medium-grey"
              )}
              id={step.id}
            >
              {t(`carbon.create.steps.${step.id}`)}
            </Tab>
          ))}
        </Tab.List>
        <div className="flex flex-grow flex-col gap-6 overflow-auto p-6">
          <Tab.Panels className="flex-grow">
            {steps.map(({ content }, i) => (
              <Tab.Panel key={i}>{content}</Tab.Panel>
            ))}
          </Tab.Panels>
          <div className="flex items-center justify-between">
            <Button
              intent="text"
              size="small"
              className={selectedTabIndex == 0 ? "invisible" : ""}
              onClick={handleOnPrevious}
              icon={<ArrowLeftIcon />}
            >
              {t("project.create.back")}
            </Button>
            <p>{`${selectedTabIndex + 1}/${steps.length}`}</p>
            <Button
              intent={canNext ? "primary" : "disabled"}
              size="small"
              // className={selectedIndex == steps.length - 1 ? "invisible" : ""}
              onClick={selectedTabIndex == steps.length - 1 ? handleOnSubmit : handleOnNext}
              iconRight={!(selectedTabIndex == steps.length - 1) ? <ArrowRightIcon /> : undefined}
              icon={selectedTabIndex == steps.length - 1 ? <SaveDiskIcon /> : undefined}
              disabled={!canNext}
            >
              {selectedTabIndex == steps.length - 1 ? t("project.create.save") : t("project.create.next")}
            </Button>
          </div>
        </div>
      </div>
    </Tab.Group>
  );
};

export default ProjectRoundEdit;
