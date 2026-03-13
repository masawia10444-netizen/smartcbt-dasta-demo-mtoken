"use client";

import { Button } from "@/components/Button";
import { ArrowLeftIcon, DownloadIcon } from "@/components/Icon";
import CarbonDocument from "@/components/projects/documents/Carbon/CarbonDocument";
import { CarbonContext } from "@/contexts/App.context";
import { emissionFactorProxyPCRs } from "@/models/emission-factor-proxy";
import { TravelProgramRoundsSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { carbonSummary } from "@/utils/carbon-project-form-helper";
import { CarbonJson, ProgramActivity } from "@/utils/cms/adapters/website/carbon/types";
import { cn } from "@/utils/cn";
import { convertDateStringToDate } from "@/utils/helper";
import { Tab } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import ProjectRoundEdit from "./EditRound/ProjectRoundEdit";
import ProjectRoundEditStep1 from "./EditRound/ProjectRoundEditStep1";
import ApprovePopup from "./Popup/ApprovePopup";
import RejectPopup from "./Popup/RejectPopup";

export enum modeCarbon {
  check = "checkInformation",
  fill = "fillInformation",
}

type ProjectRoundsProps = {
  carbonProgram?: CarbonJson | null;
  emissionFactorTypes: Record<string, any>;
  isViewOnly: boolean;
};

const ProjectRounds = (props: ProjectRoundsProps) => {
  const router = useRouter();
  const { carbonProgram, isViewOnly } = props;

  const t = useTranslations("common");

  const { listEmissionFactorProxy } = useContext(CarbonContext);

  const formContext = useForm<TravelProgramRoundsSchema>({
    defaultValues: { rounds: [] },
    // resolver: customRoundZodResolver(travelProgramRoundsSchema),
  });

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = formContext;

  const { append } = useFieldArray({
    control,
    name: `rounds`,
  });

  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showDownloadPreview, setShowDownloadPreview] = useState(false);
  const [showApprovePopup, setShowApprovePopup] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const realNumberTab = watch("rounds");
  const tabs = realNumberTab.slice(1);
  const defaultValues = {
    ...watch("rounds")[realNumberTab.length == 1 || realNumberTab.length == 0 ? 0 : realNumberTab.length - 1],
    mode: isViewOnly ? "view" : "edit",
  };

  const handleDownload = () => {
    setShowDownloadPreview(true);
  };
  const handleRejectClose = () => {
    setShowRejectPopup(false);
  };
  const handleApproveClose = () => {
    setShowApprovePopup(false);
  };
  const handleSave = () => {
    const currentData = formContext.watch();
    setValue(`rounds.${selectedIndex + 1}.mode`, "view");
    //TODO handle action
    // const isValid = await formContext.trigger();
  };

  useEffect(() => {
    if (!carbonProgram) return;
    carbonProgram.round.map((round, index1) => {
      formContext.setValue(`rounds.${index1}.id`, carbonProgram.id);
      formContext.setValue(`rounds.${index1}.mode`, "view");
      formContext.setValue(`rounds.${index1}.cbtProject`, carbonProgram.cbt_project as any);
      formContext.setValue(`rounds.${index1}.name`, carbonProgram.cbt_project?.title);
      formContext.setValue(`rounds.${index1}.company`, carbonProgram.cbt_project.organizations?.title ?? ``);
      formContext.setValue(`rounds.${index1}.numberOfTourist`, round.capacity_value);
      formContext.setValue(`rounds.${index1}.scopeOfAssessment`, carbonProgram.scope_assessment);
      formContext.setValue(`rounds.${index1}.unit`, carbonProgram.carbon_unit);
      if (carbonProgram.request_date) {
        const registrationDate = convertDateStringToDate(carbonProgram.request_date);
        registrationDate && formContext.setValue(`rounds.${index1}.registrationDate`, registrationDate);
      }
      formContext.setValue(`rounds.${index1}.photographic.cover`, carbonProgram.cover_image);
      formContext.setValue(`rounds.${index1}.photographic.accommodation`, carbonProgram.accommodation_images);
      formContext.setValue(`rounds.${index1}.photographic.documents`, carbonProgram.trip_publicity_documents_images);
      formContext.setValue(`rounds.${index1}.photographic.foods`, carbonProgram.food_images);
      formContext.setValue(`rounds.${index1}.photographic.travel`, carbonProgram.travel_images);
      formContext.setValue(`rounds.${index1}.photographic.wastes`, carbonProgram.waste_images);

      const startDate = convertDateStringToDate(round.program_start);
      const endDate = convertDateStringToDate(round.program_end);
      if (startDate) {
        formContext.setValue(`rounds.${index1}.dates.startDate`, startDate);
      }
      if (endDate) {
        formContext.setValue(`rounds.${index1}.dates.endDate`, endDate);
      }

      carbonProgram.program_calendar &&
        carbonProgram.program_calendar.length != 0 &&
        carbonProgram.program_calendar.flatMap((programCalendar: any, index2: number) => {
          programCalendar.program_activity.flatMap((programActivity: any, index3: number) => {
            formContext.setValue(`rounds.${index1}.travelPlans.${index2}.activities.${index3}.id`, programActivity.id);
            formContext.setValue(
              `rounds.${index1}.travelPlans.${index2}.activities.${index3}.details`,
              programActivity.program_activity_title
            );
            formContext.setValue(
              `rounds.${index1}.travelPlans.${index2}.activities.${index3}.noTime`,
              programActivity.no_specific_time
            );
            formContext.setValue(
              `rounds.${index1}.travelPlans.${index2}.activities.${index3}.startTime`,
              !programActivity.no_specific_time ? programActivity.start_time.substring(0, 5) : ""
            );
            formContext.setValue(
              `rounds.${index1}.travelPlans.${index2}.activities.${index3}.endTime`,
              !programActivity.no_specific_time ? programActivity.end_time.substring(0, 5) : ""
            );
          });
        });

      const groupedActivities: { calendarId?: number; activities: ProgramActivity[] }[] = [];
      round?.program_round_activity?.forEach((activity) => {
        if (activity.program_activity?.program_calendar_id !== null) {
          const calendarId = activity.program_activity?.program_calendar_id;
          const existingGroup = groupedActivities.find((group) => group.calendarId === calendarId);
          if (existingGroup) {
            existingGroup.activities.push(activity);
          } else {
            groupedActivities.push({
              calendarId,
              activities: [activity],
            });
          }
        }
      });

      groupedActivities?.length != 0 &&
        groupedActivities.flatMap(({ activities }, index2: number) => {
          activities?.flatMap((programRoundActivity, index3: number) => {
            programRoundActivity.program_activity_detail?.map((programActivityDetail, index4: number) => {
              formContext.setValue(
                `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.isCreatedProxy`,
                false
              );
              formContext.setValue(
                `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.name`,
                programActivityDetail.activity_detail_title
              );
              formContext.setValue(
                `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.multiplier`,
                programActivityDetail.capacity
              );

              const pcrType = emissionFactorProxyPCRs?.find((pcr) => pcr.id == programActivityDetail.pcr_type);
              pcrType &&
                formContext.setValue(
                  `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.pcr_type`,
                  pcrType
                );

              const id = programActivityDetail.emission_factor_type;
              const controlVariableUnit = props.emissionFactorTypes[id]?.control_variable_unit;
              if (id != null && controlVariableUnit != null) {
                formContext.setValue(
                  `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.emissionProxy.unit`,
                  controlVariableUnit
                );
              }
              const emissionFactorType = (listEmissionFactorProxy as any[]).find(
                (value) => value.id == programActivityDetail.emission_factor_type
              );
              if (emissionFactorType) {
                formContext.setValue(
                  `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.emissionProxy.name`,
                  emissionFactorType.name
                );
                formContext.setValue(
                  `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.emissionProxy.id`,
                  emissionFactorType.id
                );
                formContext.setValue(
                  `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.emissionProxy.unit`,
                  emissionFactorType.unit
                );
                formContext.setValue(
                  `rounds.${index1}.travelPlans.${index2}.activities.${index3}.carbonFootprintActivities.${index4}.emissionProxy.emission_factor_value`,
                  programActivityDetail.ef_value ?? 0
                );
              }
            });
          });
        });
    });
  }, [carbonProgram]);

  useEffect(() => {
    if (realNumberTab.length == 1) append(defaultValues);
  }, [realNumberTab]);

  const renderButton = () => {
    return (
      <div className="flex items-center gap-8">
        <Button type="button" onClick={handleDownload} intent={"secondary"} size="small" icon={<DownloadIcon />}>
          {t("carbon.create.recap.download")}
        </Button>
        {/* {mode == "view" && (
          <Button
            type="button"
            onClick={() => setValue(`rounds.${selectedIndex + 1}.mode`, "edit")}
            intent="primary"
            size="small"
            icon={<SaveDiskIcon />}
          >
            {t("project.manage.action.edit")}
          </Button>
        )} */}
      </div>
    );
  };

  const mode = tabs[selectedIndex]?.mode;

  return (
    <FormProvider {...formContext}>
      <div className="flex h-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button
            intent="text"
            size="small"
            icon={<ArrowLeftIcon className="h-6 w-6" />}
            onClick={() => router.back()}
            className="font-medium text-black"
          >
            {t("carbon.create.recap.back")}
          </Button>
          {renderButton()}
        </div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className="relative flex h-px w-full flex-grow flex-col">
            <div className="relative h-fit w-full overflow-x-auto overflow-y-hidden">
              <Tab.List className="w-max items-center ">
                {tabs.map((tab, i) => (
                  <Tab
                    key={i}
                    className={({ selected }) =>
                      cn(
                        "w-fit rounded-t-lg border border-smart-cbt-border-green  px-12 py-4 text-smart-cbt-dark-green",
                        selected ? "bg-white" : "bg-smart-cbt-light-grey"
                      )
                    }
                  >
                    {`ครั้งที่ ${i + 1}`}
                  </Tab>
                ))}
                {!props.isViewOnly && (
                  <button
                    onClick={() => {
                      setSelectedIndex(tabs.length);
                      append(defaultValues);
                    }}
                    className="ml-4 rounded-full bg-smart-cbt-green p-1"
                  >
                    <PlusIcon className="h-5 w-5 text-white" />
                  </button>
                )}
              </Tab.List>
            </div>
            <Tab.Panels className="flex h-px flex-grow flex-col gap-6 overflow-y-auto rounded-lg rounded-tl-none border border-smart-cbt-border-green bg-white p-6">
              {tabs.map((tab, i) => (
                <Tab.Panel key={i}>
                  {mode == "view" ? (
                    <ProjectRoundEditStep1 mode={mode} selectedIndex={i + 1} tabs={tabs as any} />
                  ) : (
                    <ProjectRoundEdit
                      mode="edit"
                      selectedIndex={i + 1}
                      tabs={tabs as any}
                      carbonProgram={carbonProgram}
                    />
                  )}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
      {showRejectPopup && <RejectPopup id={carbonProgram?.id} onClose={handleRejectClose} isOpen={showRejectPopup} />}
      {showApprovePopup && (
        <ApprovePopup id={carbonProgram?.id} onClose={handleApproveClose} isOpen={showApprovePopup} />
      )}
      {showDownloadPreview && (
        <CarbonDocument
          isOpen={showDownloadPreview}
          onClose={() => {
            setShowDownloadPreview(false);
          }}
          data={carbonSummary(formContext.getValues(`rounds.${selectedIndex+1}`) as any)}
        />
      )}
    </FormProvider>
  );
};

export default ProjectRounds;
