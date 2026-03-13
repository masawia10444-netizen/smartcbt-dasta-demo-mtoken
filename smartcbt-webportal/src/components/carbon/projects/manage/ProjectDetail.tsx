"use client";

import { Button } from "@/components/Button";
import { ArrowLeftIcon } from "@/components/Icon";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSession } from "@/components/context-provider/AuthProvider";
import { CarbonContext } from "@/contexts/App.context";
import { CarbonProjectStatus } from "@/models/carbon-project";
import { emissionFactorProxyPCRs } from "@/models/emission-factor-proxy";
import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { CarbonJson, ProgramActivity } from "@/utils/cms/adapters/website/carbon/types";
import { CARBON_PROGRAM_STATUS } from "@/utils/cms/adapters/website/constants";
import { convertDateStringToDate } from "@/utils/helper";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CarbonProjectRecapDetail from "../create/recap/CarbonProjectRecapDetail";
import ApprovePopup from "./Popup/ApprovePopup";
import RejectPopup from "./Popup/RejectPopup";

type ProjectDetailProps = {
  carbonProgram?: CarbonJson | null;
  emissionFactorTypes: Record<string, any>;
  isViewOnly: boolean;
};

const ProjectDetail = (props: ProjectDetailProps) => {
  const { carbonProgram } = props;

  const t = useTranslations("common");
  const router = useRouter();
  const formContext = useForm<TravelProgramSchema>();
  const { listEmissionFactorProxy } = useContext(CarbonContext);

  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showDownloadPreview, setShowDownloadPreview] = useState(false);
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [mode, setMode] = useState<"edit" | "view">("view");
  const [loading, setIsLoading] = useState(true);

  const { session } = useSession();

  const isCarbonAdminRole =
    session?.user?.roles.find((value) => value.app_code == "CARBON" && value.role == "super_admin") != null;

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
    const currentData = formContext.getValues();
    setMode("view");
    //TODO handle action
    // const isValid = await formContext.trigger();
  };

  useEffect(() => {
    if (!carbonProgram) return;
    setIsLoading(true);
    formContext.setValue("cbtProject", carbonProgram.cbt_project as any);
    formContext.setValue("name", carbonProgram.cbt_project?.title);
    formContext.setValue("company", carbonProgram.cbt_project.organizations?.title ?? "");
    formContext.setValue("numberOfTourist", carbonProgram.capacity);
    formContext.setValue("scopeOfAssessment", carbonProgram.scope_assessment);
    formContext.setValue("unit", carbonProgram.carbon_unit);
    formContext.setValue("status", (carbonProgram.status as CarbonProjectStatus) ?? "");
    formContext.setValue("remark", carbonProgram.remark ?? "");
    if (carbonProgram.request_date) {
      const registrationDate = convertDateStringToDate(carbonProgram.request_date);
      registrationDate && formContext.setValue("registrationDate", registrationDate);
    }
    formContext.setValue("photographic.cover", carbonProgram.cover_image);
    formContext.setValue("photographic.accommodation", carbonProgram.accommodation_images);
    formContext.setValue("photographic.documents", carbonProgram.trip_publicity_documents_images);
    formContext.setValue("photographic.foods", carbonProgram.food_images);
    formContext.setValue("photographic.travel", carbonProgram.travel_images);
    formContext.setValue("photographic.wastes", carbonProgram.waste_images);

    carbonProgram.program_calendar &&
      carbonProgram.program_calendar.length != 0 &&
      carbonProgram.program_calendar.flatMap((programCalendar: any, index1: number) => {
        programCalendar.program_activity.flatMap((programActivity: any, index2: number) => {
          formContext.setValue(
            `travelPlans.${index1}.activities.${index2}.details`,
            programActivity.program_activity_title
          );
          formContext.setValue(`travelPlans.${index1}.activities.${index2}.noTime`, programActivity.no_specific_time);
          formContext.setValue(
            `travelPlans.${index1}.activities.${index2}.startTime`,
            !programActivity.no_specific_time ? programActivity.start_time.substring(0, 5) : ""
          );
          formContext.setValue(
            `travelPlans.${index1}.activities.${index2}.endTime`,
            !programActivity.no_specific_time ? programActivity.end_time.substring(0, 5) : ""
          );
        });
      });

    const groupedActivities: { calendarId?: number; activities: ProgramActivity[] }[] = [];
    carbonProgram?.round[0]?.program_round_activity?.forEach((activity) => {
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
      groupedActivities.flatMap(({ activities }, index1: number) => {
        activities?.flatMap((programRoundActivity, index2: number) => {
          console.log("programRoundActivity", programRoundActivity);

          programRoundActivity.program_activity_detail?.map((programActivityDetail, index3: number) => {
            formContext.setValue(
              `travelPlans.${index1}.activities.${index2}.carbonFootprintActivities.${index3}.name`,
              programActivityDetail.activity_detail_title
            );
            formContext.setValue(
              `travelPlans.${index1}.activities.${index2}.carbonFootprintActivities.${index3}.multiplier`,
              programActivityDetail.capacity
            );

            const pcrType = emissionFactorProxyPCRs?.find((pcr) => pcr.id == programActivityDetail.pcr_type);
            pcrType &&
              formContext.setValue(
                `travelPlans.${index1}.activities.${index2}.carbonFootprintActivities.${index3}.pcr_type`,
                pcrType
              );

            const id = programActivityDetail.emission_factor_type;
            const controlVariableUnit = props.emissionFactorTypes[id]?.control_variable_unit;

            if (id != null && controlVariableUnit != null) {
              formContext.setValue(
                `travelPlans.${index1}.activities.${index2}.carbonFootprintActivities.${index3}.emissionProxy.unit`,
                controlVariableUnit
              );
            }

            const emissionFactorType = (listEmissionFactorProxy as any[]).find(
              (value) => value.id == programActivityDetail.emission_factor_type
            );
            if (emissionFactorType) {
              formContext.setValue(
                `travelPlans.${index1}.activities.${index2}.carbonFootprintActivities.${index3}.emissionProxy.name`,
                emissionFactorType.name
              );
              formContext.setValue(
                `travelPlans.${index1}.activities.${index2}.carbonFootprintActivities.${index3}.emissionProxy.emission_factor_value`,
                programActivityDetail.ef_value ?? 0
              );
            }
          });
        });
      });
    setIsLoading(false);
  }, [carbonProgram]);

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
          {isCarbonAdminRole &&
            !props.isViewOnly &&
            props.carbonProgram?.status == CARBON_PROGRAM_STATUS.PENDING_FOR_APPROVAL && (
              <div className="flex items-center gap-8">
                <Button
                  type="button"
                  intent={"dangerOutline"}
                  onClick={() => setShowRejectPopup(true)}
                  size="small"
                  icon={<XCircleIcon className="h-6 w-6" />}
                >
                  {t("carbon.rejectButton")}
                </Button>
                <Button
                  type="submit"
                  intent={"primary"}
                  size="small"
                  onClick={() => setShowApprovePopup(true)}
                  icon={<CheckCircleIcon className="h-6 w-6" />}
                >
                  {t("carbon.approveButton")}
                </Button>
              </div>
            )}
        </div>
        <div className="flex h-px flex-grow flex-col gap-6 overflow-y-auto rounded-lg border border-smart-cbt-border-green bg-white p-6">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <CarbonProjectRecapDetail isHideTravelPlanSummary dataOutSide={formContext.watch()} />
          )}
        </div>
      </div>
      {showRejectPopup && (
        <RejectPopup onClose={handleRejectClose} isOpen={showRejectPopup} id={props.carbonProgram?.id} />
      )}
      {showApprovePopup && (
        <ApprovePopup onClose={handleApproveClose} isOpen={showApprovePopup} id={props.carbonProgram?.id} />
      )}
    </FormProvider>
  );
};

export default ProjectDetail;
