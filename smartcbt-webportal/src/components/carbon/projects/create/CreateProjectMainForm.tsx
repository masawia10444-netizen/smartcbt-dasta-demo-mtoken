"use client";

import { getEmissionFactorById } from "@/app/[locale]/(authenticated)/carbon-footprint/emission-factor-proxy/action";
import {
  createCarbonProgramAction,
  updateCarbonProgramAction,
  uploadFile,
} from "@/app/[locale]/(authenticated)/carbon-footprint/projects/actions";
import { Button } from "@/components/Button";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/Icon";
import { CancelProjectPopup } from "@/components/projects/create/CancelProjectPopup";
import CarbonDocument from "@/components/projects/documents/Carbon/CarbonDocument";
import { CarbonContext } from "@/contexts/App.context";
import { CarbonProjectStatus } from "@/models/carbon-project";
import { EmissionFactorProxyListJson, emissionFactorProxyPCRs } from "@/models/emission-factor-proxy";
import { customZodResolver } from "@/schemas/base-schema";
import {
  ImageView,
  TravelProgramSchema,
  isImageView,
  isPictureSchema,
  travelProgramSchema,
} from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { PictureSchema } from "@/schemas/forms/shard-schema";
import { carbonSummary, viewMode } from "@/utils/carbon-project-form-helper";
import { createEmissionFactorProxy } from "@/utils/cms/adapters/website/carbon/emission-factor-proxy";
import { CarbonJson } from "@/utils/cms/adapters/website/carbon/types";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { CbtProject } from "@/utils/cms/adapters/website/sia/types/project";
import { CreateCommunityBody, createCbtProject, createCommunity } from "@/utils/cms/cms-api-adapter";
import { cn } from "@/utils/cn";
import { handleAPIError, toastSuccess } from "@/utils/helper";
import { Tab } from "@headlessui/react";
import { isEmpty } from "lodash";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import CreateProjectHeader from "./CreateProjectHeader";
import CarbonFootprint from "./carbon-footprint/CarbonFootprint";
import { PhotographicEvidences } from "./photos/PhotographicEvidences";
import CarbonProjectRecapContainer from "./recap/CarbonProjectRecapContainer";
import CarbonSummary from "./summary/CarbonSummary";
import TravelProgram from "./travel-plan/TravelProgram";

type CreateProjectMainFormProps = {
  carbonProgram?: CarbonJson | null;
};

type ProjectCreateStep = { id: string; index: number; content: JSX.Element };

const steps: ProjectCreateStep[] = [
  { id: "step1", index: 0, content: <TravelProgram key={1} /> },
  { id: "step2", index: 1, content: <CarbonFootprint key={2} /> },
  { id: "step3", index: 2, content: <CarbonSummary key={3} /> },
  { id: "step4", index: 3, content: <PhotographicEvidences key={4} /> },
];

export const CreateProjectMainForm = (props: CreateProjectMainFormProps) => {
  const { carbonProgram } = props;

  const t = useTranslations("common");
  const router = useRouter();

  const { listEmissionFactorProxy, listCBTProject } = useContext(CarbonContext);

  const [loading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showApproveDeletePopup, setShowApproveDeletePopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showSuccessApprovePopup, setShowSuccessApprovePopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [isViewingRecap, setIsViewingRecap] = useState(false);
  const [showDownloadPreview, setShowDownloadPreview] = useState(false);

  const formContext = useForm<TravelProgramSchema>({
    resolver: customZodResolver(travelProgramSchema),
    defaultValues: {
      status: CarbonProjectStatus.Draft,
      registrationDate: new Date(),
      createdProxy: [],
      photographic: {
        cover: null,
        accommodation: [],
        documents: [],
        foods: [],
        travel: [],
        wastes: [],
        isCover: undefined,
      },
      travelPlans: carbonProgram?.program_calendar
        ? carbonProgram.program_calendar.map((program_calendar: any, index1: number) => ({
            activities: program_calendar.program_activity
              ? program_calendar.program_activity.map((program_activity: any, index1: number) => ({}))
              : [],
          }))
        : [],
    },
  });
  const formData = formContext.watch();

  const fetchEmissionFactorDetailById = async (
    id: number,
    position: {
      travelPlanIndex: number;
      activityIndex: number;
      carbonFootprintActivityIndex: number;
    }
  ) => {
    const { response, error } = await getEmissionFactorById(id);
    if (error) return;
    if (!response) return;
    const proxy = response as EmissionFactorProxyListJson;

    proxy.files &&
      formContext.setValue(
        `travelPlans.${position.travelPlanIndex}.activities.${position.activityIndex}.carbonFootprintActivities.${position.carbonFootprintActivityIndex}.emissionProxy.files`,
        proxy.files as any
      );
  };

  useEffect(() => {
    if (!carbonProgram) return;
    setIsLoading(true);
    // Step1
    if (carbonProgram.cbt_project) {
      const cbtProject = listCBTProject.find((project) => project.id == carbonProgram.cbt_project.id);
      cbtProject && formContext.setValue("cbtProject", cbtProject as any);
    }
    carbonProgram.capacity && formContext.setValue("numberOfTourist", carbonProgram.capacity);
    carbonProgram.scope_assessment && formContext.setValue("scopeOfAssessment", carbonProgram.scope_assessment as any);
    carbonProgram.request_date && formContext.setValue("registrationDate", new Date(carbonProgram.request_date));
    carbonProgram.province && formContext.setValue("scopeOfAssessment", carbonProgram.scope_assessment as any);
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
            !programActivity.no_specific_time && programActivity.start_time
              ? programActivity.start_time.substring(0, 5)
              : ""
          );
          formContext.setValue(
            `travelPlans.${index1}.activities.${index2}.endTime`,
            !programActivity.no_specific_time && programActivity.end_time
              ? programActivity.end_time.substring(0, 5)
              : ""
          );
        });
      });
    // Step2
    if (carbonProgram.round) {
      var i = 0;
      for (var j = 0; j < carbonProgram.round[i]?.program_round_activity.length; j++) {
        var programActivityDetail = carbonProgram.round[i].program_round_activity[j].program_activity_detail;
        if (programActivityDetail) {
          for (var k = 0; k < programActivityDetail.length; k++) {
            formContext.setValue(
              `travelPlans.${i}.activities.${j}.carbonFootprintActivities.${k}.name`,
              programActivityDetail[k].activity_detail_title
            );
            formContext.setValue(
              `travelPlans.${i}.activities.${j}.carbonFootprintActivities.${k}.multiplier`,
              programActivityDetail[k].capacity
            );

            // PCR
            const pcrTypeId = programActivityDetail[k].pcr_type;
            const pcrType = emissionFactorProxyPCRs.find((value) => value.id == pcrTypeId);
            if (pcrType) {
              formContext.setValue(`travelPlans.${i}.activities.${j}.carbonFootprintActivities.${k}.pcr_type`, pcrType);
            }

            // Emission Factor
            const emissionFactorId = programActivityDetail[k].emission_factor_type;
            const emissionFactor = listEmissionFactorProxy.find((value) => value.id == emissionFactorId);
            if (emissionFactor) {
              formContext.setValue(
                `travelPlans.${i}.activities.${j}.carbonFootprintActivities.${k}.emissionProxy`,
                emissionFactor
              );

              // Tooltip
              emissionFactor.tooltipFlag &&
                formContext.setValue(
                  `travelPlans.${i}.activities.${j}.carbonFootprintActivities.${k}.isTooltipEnabled`,
                  emissionFactor.tooltipFlag
                );
              emissionFactor.tooltipData &&
                formContext.setValue(
                  `travelPlans.${i}.activities.${j}.carbonFootprintActivities.${k}.tooltip`,
                  emissionFactor.tooltipData
                );

              const position = {
                travelPlanIndex: i,
                activityIndex: j,
                carbonFootprintActivityIndex: k,
              };

              fetchEmissionFactorDetailById(emissionFactorId, position);
            }
          }
        }
      }
    }

    // Step4
    carbonProgram.cover_image && formContext.setValue("photographic.cover", carbonProgram.cover_image);
    carbonProgram.travel_images && formContext.setValue("photographic.travel", carbonProgram.travel_images);
    carbonProgram.accommodation_images &&
      formContext.setValue("photographic.accommodation", carbonProgram.accommodation_images);
    carbonProgram.food_images && formContext.setValue("photographic.foods", carbonProgram.food_images);
    carbonProgram.waste_images && formContext.setValue("photographic.wastes", carbonProgram.waste_images);
    carbonProgram.trip_publicity_documents_images &&
      formContext.setValue("photographic.documents", carbonProgram.trip_publicity_documents_images);
    setIsLoading(false);
  }, [props.carbonProgram]);

  const getConvertedImages = async (folderName: string, images?: any[]) => {
    if (!images) return null;

    const convertedImages = [];
    const newTravelImages: File[] = [];

    images.forEach((value: any) => {
      if (isImageView(value)) {
        convertedImages.push({ directus_files_id: value.id });
      } else {
        newTravelImages.push(value);
      }
    });

    const uploadImages = await Promise.all(
      newTravelImages.map(async (t: File) => {
        const formData = new FormData();
        formData.append("file", new Blob([t], { type: t.type }), t.name);
        const image = await uploadFile(folderName, formData);
        return { directus_files_id: image?.id };
      })
    );

    convertedImages.push(...uploadImages);

    return convertedImages;
  };

  const handleSubmit = async () => {
    const isValid = await formContext.trigger();
    if (!isValid) return;
    await handleSubmission(PROJECT_STATUS.PENDING_FOR_APPROVAL, "carbon.create.successMessage");
  };

  const handleSave = async () => {
    await handleSubmission(PROJECT_STATUS.DRAFT, "carbon.create.savedMessage");
  };

  const handleSubmission = async (status: PROJECT_STATUS, successMessage: string) => {
    const carbonProgram = props.carbonProgram;
    const data = formContext.getValues();
    try {
      setIsLoading(true);

      let resCreateOrganizations;
      let resCreateCbtProject;

      if (data.cbtProject?.isCreateOrganizations && data.createdOrganizations) {
        const communityBody: CreateCommunityBody = {
          title: data.createdOrganizations.title,
          address_info: {
            province_id: data.createdOrganizations.province_id,
            district_id: data.createdOrganizations.district_id,
            sub_district_id: data.createdOrganizations.subdistrict_id,
            postal_code: data.createdOrganizations.postal_code ?? "",
            longitude:
              data.createdOrganizations.longitude == "" ||
              data.createdOrganizations.longitude == null ||
              data.createdOrganizations.longitude == undefined
                ? undefined
                : data.createdOrganizations.longitude,
            latitude:
              data.createdOrganizations.latitude == "" ||
              data.createdOrganizations.latitude == null ||
              data.createdOrganizations.latitude == undefined
                ? undefined
                : data.createdOrganizations.latitude,
          },
        };

        resCreateOrganizations = await createCommunity(communityBody);
      }

      if (data.isCreateCBTProject && data.createdCBTProject && data.cbtProject?.isCreateOrganizations) {
        const cbtProjectBody: CbtProject = {
          title: data.createdCBTProject.title,
          organizations: resCreateOrganizations?.organization,
        };
        resCreateCbtProject = await createCbtProject(cbtProjectBody);
        // console.log("resCreateCbtProject", resCreateCbtProject);
      } else if (data.isCreateCBTProject && data.createdCBTProject && !data.cbtProject?.isCreateOrganizations) {
        const cbtProjectBody: CbtProject = {
          title: data.createdCBTProject.title,
          organizations: data.createdCBTProject.organizations?.id,
        };
        resCreateCbtProject = await createCbtProject(cbtProjectBody);
        // console.log("resCbtProjectBody", resCreateCbtProject);
      }

      let coverImageId: string | undefined;
      const { cover } = data.photographic;

      if (cover) {
        if (isPictureSchema(cover)) {
          const { file } = cover as PictureSchema;
          const coverFormData = new FormData();
          coverFormData.append("file", new Blob([file]), file.type);
          const response = await uploadFile("Cover image", coverFormData);
          coverImageId = response?.id;
        } else if (isImageView(cover)) {
          coverImageId = (cover as ImageView).id;
        } else {
          // Do nothing
        }
      }

      const travel_images = await getConvertedImages("Travel images", data.photographic.travel);
      const waste_images = await getConvertedImages("Waste images", data.photographic.wastes);
      const food_images = await getConvertedImages("Food images", data.photographic.foods);
      const accommodation_images = await getConvertedImages("Accommodation images", data.photographic.accommodation);
      const trip_publicity_documents_images = await getConvertedImages(
        "Trip publicity documents images",
        data.photographic.documents
      );

      const programEnd = new Date(data.registrationDate);
      programEnd.setDate(data.registrationDate.getDate() + data.travelPlans.length);

      let provinceId: number | undefined;
      if (data.cbtProject?.organizations?.province_id) {
        provinceId = data.cbtProject.organizations.province_id;
      }

      let cbtProject: any | undefined;
      if (data.cbtProject != null) {
        cbtProject = {
          id: data.isCreateCBTProject ? resCreateCbtProject?.id : data.cbtProject.id,
          title: data.isCreateCBTProject ? resCreateCbtProject?.title : data.cbtProject.title,
          organizations: data.cbtProject.isCreateOrganizations
            ? resCreateOrganizations?.organization
            : data.cbtProject.organizations.id,
        };
      }

      let scopeAssessmentId = data.scopeOfAssessment?.id ?? undefined;

      const bodyCreateCarbon = {
        capacity: data.numberOfTourist,
        status: status,
        province: provinceId,
        request_date: data.registrationDate,
        cbt_project: cbtProject,
        scope_assessment: scopeAssessmentId,
        carbon_unit: 1,
        program_calendar: data.travelPlans.map((tp, i) => {
          const activities = tp.activities
            .map((a, i) =>
              a.details
                ? {
                    no_specific_time: a.noTime,
                    sort: i + 1,
                    program_activity_title: a.details,
                    status: "published",
                    start_time: a.noTime ? null : a.startTime,
                    end_time: a.noTime ? null : a.endTime,
                  }
                : null
            )
            .filter((item) => !!item);
          return {
            sort: i + 1,
            day: i + 1,
            status: "published",
            program_activity: activities,
          };
        }),
        round: [
          {
            sort: 1,
            round: 1,
            capacity_value: data.numberOfTourist,
            summary_cf: null,
            waste_cf: null,
            food_cf: null,
            accommodation_cf: null,
            travel_cf: null,
            average_cfp: null,
            status: "published",
            program_end: null,
            program_start: null,
            program_round_activity: (
              await Promise.all(
                data.travelPlans.flatMap(
                  async (tp) =>
                    await Promise.all(
                      tp.activities.map(async (a, i) => {
                        const program_activity = a.id;
                        const promiseList = a.carbonFootprintActivities?.map(async (cfa, i) => {
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
                            // console.log("proxyBody", proxyBody);
                            createdProxy = await createEmissionFactorProxy(proxyBody);
                          }
                          // console.log("createdProxy", createdProxy);
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
                        });

                        const program_activity_detail = !isEmpty(promiseList) ? await Promise.all(promiseList) : [];

                        return {
                          activity_ef: a.carbonFootprintActivities
                            ?.reduce(
                              (accumulator, currentValue) =>
                                (accumulator ?? 0) +
                                (currentValue.multiplier ?? 1) *
                                  (currentValue.emissionProxy?.emission_factor_value ?? 0),
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
        ],
        cover_image: coverImageId,
        travel_images: travel_images,
        waste_images: waste_images,
        food_images: food_images,
        accommodation_images: accommodation_images,
        trip_publicity_documents_images: trip_publicity_documents_images,
      };

      const { response, error } = carbonProgram
        ? await updateCarbonProgramAction(carbonProgram.id, bodyCreateCarbon as any)
        : await createCarbonProgramAction(bodyCreateCarbon as any);

      setIsLoading(false);
      if (error) {
        handleAPIError(error);
        return;
      }
      toastSuccess(t(successMessage));

      if (response?.id) router.push(`/carbon-footprint/projects/manage/${response?.id}`);
    } catch (error) {
      setIsLoading(false);
      handleAPIError(error);
    }
  };

  const handleOnNext = async () => {
    const isCurrentStepValid = await formContext.trigger();
    const currentStep = `step${selectedIndex + 1}`;
    // console.log(`Step: ${currentStep} is valid: `, isCurrentStepValid);
    if (!isCurrentStepValid) return false;
    if (selectedIndex == 3) {
      setIsViewingRecap(true);
    } else {
      setSelectedIndex(selectedIndex + 1);
    }
    return true;
  };

  const handleOnPrevious = () => {
    setSelectedIndex(selectedIndex - 1);
  };

  const handleRecapBack = () => {
    setIsViewingRecap(false);
  };

  const handleDownload = () => {
    setShowDownloadPreview(true);
  };

  const handleCancel = (didCancel: boolean) => {
    setShowCancelPopup(false);
    didCancel && router.push("/carbon-footprint/projects/manage");
  };

  const { viewOnly } = viewMode(formData);

  const canNext = selectedIndex == steps.length - 1 ? formContext.getValues("photographic.cover") != null : true;

  return (
    <div className="relative h-full">
      <div className="h-full">
        <FormProvider {...formContext}>
          <form className="flex h-full flex-col gap-6">
            {isViewingRecap ? (
              <CarbonProjectRecapContainer
                handleOnPrevious={handleRecapBack}
                onDownload={handleDownload}
                onSubmit={handleSubmit}
                onSaveDraft={handleSave}
              />
            ) : (
              <>
                <CreateProjectHeader
                  onApproveDelete={() => setShowApproveDeletePopup(true)}
                  onSave={handleSave}
                  onCancel={() => setShowCancelPopup(true)}
                  onApprove={() => setShowApprovePopup(true)}
                  onReject={() => setShowRejectPopup(true)}
                />
                <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                  <div className="flex flex-grow flex-col overflow-auto rounded-lg border border-smart-cbt-border-green bg-white">
                    <Tab.List className="flex h-[48px] min-h-[48px] justify-between overflow-x-hidden border-b border-smart-cbt-border-green">
                      {steps.map((step) => (
                        <Tab
                          key={step.id}
                          onClick={(e) => {
                            if (viewOnly) return;
                            selectedIndex <= step.index && e.preventDefault();
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
                          className={selectedIndex == 0 ? "invisible" : ""}
                          onClick={handleOnPrevious}
                          icon={<ArrowLeftIcon />}
                        >
                          {t("project.create.back")}
                        </Button>
                        <p>{`${selectedIndex + 1}/${steps.length}`}</p>
                        <Button
                          intent={canNext ? "primary" : "disabled"}
                          size="small"
                          onClick={handleOnNext}
                          iconRight={<ArrowRightIcon />}
                          disabled={!canNext}
                        >
                          {t("project.create.next")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Tab.Group>
              </>
            )}
          </form>
          {showDownloadPreview && (
            <CarbonDocument
              isOpen={showDownloadPreview}
              onClose={() => {
                setShowDownloadPreview(false);
              }}
              data={carbonSummary(formContext.getValues())}
            />
          )}
        </FormProvider>
        {showCancelPopup && <CancelProjectPopup isOpen={showCancelPopup} onClose={handleCancel} />}
        {/* {showApprovePopup && <ApproveProjectConfirmPopup isOpen={showApprovePopup} onClose={handleApprove} />}
      {showApproveDeletePopup && (
        <ApproveDeleteProjectPopup isOpen={showApproveDeletePopup} onClose={handleApproveDelete} />
      )}
      {showRejectPopup && <RejectProjectPopup isOpen={showRejectPopup} onClose={handleReject} />}
      {showSuccessApprovePopup && (
        <ApproveProjectSuccessPopup
          isOpen={showSuccessApprovePopup}
          onClose={() => setShowSuccessApprovePopup(false)}
        />
      )}
      {showCancelPopup && <CancelProjectPopup isOpen={showCancelPopup} onClose={handleCancel} />} */}
      </div>
      {loading && (
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green" />
        </div>
      )}
    </div>
  );
};
