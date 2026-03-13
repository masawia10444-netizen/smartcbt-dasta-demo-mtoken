"use client";

import { ArrowLeftIcon, ArrowRightIcon, CheckIconCircle, SaveDiskIcon } from "@/components/Icon";
import {
  CreateProjectSchema,
  createProjectSchemaValidation,
} from "@/schemas/forms/projects/create/create-project-schema";
import { step2DefaultValues } from "@/schemas/forms/projects/create/step2-schema";
import { step4DefaultValues } from "@/schemas/forms/projects/create/step4-schema";
import { step6DefaultValues } from "@/schemas/forms/projects/create/step6-schema";
import { CbtProject, OrganizationJson } from "@/utils/cms/adapters/website/sia/types/project";
import { CreateCommunityBody } from "@/utils/cms/adapters/website/travel-mart/types/communities";
import {
  budget,
  effects,
  getQuestionsInStep2,
  getStep1WithValuesFromProject,
  getStep2WithValuesFromProject,
  getStep4WithValuesFromProject,
  getStep6WithValuesFromProject,
  impacts,
  projectBenefitDocument,
  projectDetails,
  sia,
  socialImpactPathway,
  socialReturnOnInvestmentData,
  sroiTableData,
  thoeryOfChange,
  transformProjectBody,
  viewMode,
} from "@/utils/project-create-form-helper";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import ProjectDocument, { IProjectDocument } from "../documents/Project/ProjectDocument";

import { Button } from "@/components/Button";
import { customZodResolver } from "@/schemas/base-schema";
import { cn } from "@/utils/cn";
import { Menu, Tab } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { ApproveCompletePopup } from "./ApproveCompletePopup";
import { ApproveDeleteProjectPopup } from "./ApproveDeleteProjectPopup";
import { ApproveProjectConfirmPopup } from "./ApproveProjectConfirmPopup";
import { ApproveProjectSuccessPopup } from "./ApproveProjectSuccessPopup";
import { CancelProjectPopup } from "./CancelProjectPopup";
import { RejectProjectPopup } from "./RejectProjectPopup";

import {
  createCbtProjectAction,
  createOrganizationsAction,
  createSIAProjectAction,
  updateProjectStatusAction,
  updateSIAProjectAction,
} from "@/app/[locale]/(authenticated)/sia-sroi/projects/action";
import { AppContext, SiaSroiContext } from "@/contexts/App.context";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { ProjectJson } from "@/utils/cms/adapters/website/sia/types/project";
import { handleAPIError, toastSuccess } from "@/utils/helper";
import CreateProjectStep1 from "./step1/CreateProjectStep1";
import CreateProjectStep2 from "./step2-temp/CreateProjectStep2";
import CreateProjectStep3 from "./step3/CreateProjectStep3";
import CreateProjectStep4 from "./step4/CreateProjectStep4";
import CreateProjectStep5 from "./step5/CreateProjectStep5";
import CreateProjectStep6 from "./step6/CreateProjectStep6";
import Step6TableContainer from "./step6/Step6TableContainer";
import CreateProjectStep7 from "./step7/CreateProjectStep7";
import CreateProjectStep8 from "./step8/CreateProjectStep8";
import Step9Container from "./step9/Step9Container";

type ProjectCreateStep = { id: string; index: number; content: JSX.Element };

type CreateProjectMainFormProps = {
  project: ProjectJson | null;
  projects: ProjectJson[];
  step2: any | null;
  organizations: OrganizationJson[];
  isAdmin: boolean;
};

export const CreateProjectMainForm = (props: CreateProjectMainFormProps) => {
  const t = useTranslations("common");

  const { provinces, districts, subdistricts } = useContext(AppContext);
  const { discountRates, listCBTProject } = useContext(SiaSroiContext);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isViewingStep61, setIsViewingStep61] = useState(false);
  const [showDownloadPreview, setShowDownloadPreview] = useState(false);
  const [projectDocument, setProjectDocument] = useState<IProjectDocument | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [showApprovePopup, setShowApprovePopup] = useState(false);
  const [showApproveDeletePopup, setShowApproveDeletePopup] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [showRejectPopup, setShowRejectPopup] = useState(false);
  const [showSuccessApprovePopup, setShowSuccessApprovePopup] = useState(false);
  const [showSuccessCompletePopup, setShowSuccessCompletePopup] = useState(false);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const router = useRouter();

  const steps: ProjectCreateStep[] = [
    {
      id: "step1",
      index: 0,
      content: <CreateProjectStep1 key={1} isLoading={isLoading} setIsLoading={setIsLoading} />,
    },
    {
      id: "step2",
      index: 1,
      content: <CreateProjectStep2 key={2} projects={props.projects} organizations={props.organizations} />,
    },
    { id: "step3", index: 2, content: <CreateProjectStep3 key={3} /> },
    { id: "step4", index: 3, content: <CreateProjectStep4 key={4} /> },
    { id: "step5", index: 4, content: <CreateProjectStep5 key={5} /> },
    { id: "step6", index: 5, content: <CreateProjectStep6 key={6} /> },
    { id: "step7", index: 6, content: <CreateProjectStep7 key={7} /> },
    { id: "step8", index: 7, content: <CreateProjectStep8 key={8} /> },
    { id: "step9", index: 8, content: <></> },
  ];

  // TODO use the json without default values

  const step1DefaultValues = {
    album: [],
    createdOrganization: [],
    createdCBTProject: [],
  };

  const currentStep = `step${selectedIndex + 1}`;

  // TODO: refactor validation
  const realStep = selectedIndex == 6 || selectedIndex == 7 ? "step6" : currentStep;

  const formContext = useForm<CreateProjectSchema>({
    resolver: customZodResolver(
      createProjectSchemaValidation(realStep, selectedIndex == 5 && isViewingStep61 ? "step61" : (currentStep as any))
    ),
    mode: "onChange",
    defaultValues: {
      status: PROJECT_STATUS.DRAFT,
      user_created: props.project?.user_created?.id ?? "",
      step1: step1DefaultValues,
      step2: props.step2 ? getQuestionsInStep2(props.step2) : step2DefaultValues,
      step4: step4DefaultValues,
      step6: step6DefaultValues,
    },
  });

  const formData = formContext.getValues();

  useEffect(() => {
    const project = props.project;
    const projects = props.projects;
    const organization = props.organizations;
    setIsLoading(false);

    if (!project) return;

    project.id && formContext.setValue("id", project.id.toString());
    project.status && formContext.setValue("status", project.status);

    const step2WithValues = getStep2WithValuesFromProject(
      formContext.getValues("step2"),
      project,
      projects,
      provinces,
      districts,
      subdistricts,
      organization
    );
    const step1WithValues = getStep1WithValuesFromProject(listCBTProject, project);
    const step4WithValues = getStep4WithValuesFromProject(project);
    const step6WithValues = getStep6WithValuesFromProject(project, discountRates ? discountRates.discount_rate : 0);

    formContext.setValue("step1", step1WithValues);
    formContext.setValue("step2", step2WithValues);
    formContext.setValue("step4", step4WithValues);
    formContext.setValue("step6", step6WithValues);
  }, []);

  const createCbtProjectsAndOrganizations = async () => {
    const values = formContext.getValues("step1");

    var resOrganizations: { body: CreateCommunityBody; response: any }[] = [];
    var resCbtProjects: { body: CbtProject; response: any }[] = [];

    if (values.createdOrganization.length > 0) {
      const bodies: CreateCommunityBody[] = values.createdOrganization.map((organization) => ({
        title: organization.title,
        address_info: {
          province_id: organization.province_id,
          district_id: organization.district_id,
          sub_district_id: organization.subdistrict_id,
          postal_code: organization.postal_code,
          latitude: organization.latitude ?? "",
          longitude: organization.longitude ?? "",
        },
      }));
      resOrganizations = await createOrganizationsAction(bodies);
    }
    if (values.createdCBTProject.length > 0) {
      const bodies: CbtProject[] = values.createdCBTProject.map((cbtProject) => {
        var organizationId =
          (cbtProject.organizations as any)?.organizations?.id ??
          resOrganizations.find(
            (resOrganization) =>
              resOrganization.body.title == cbtProject.organizations?.title &&
              resOrganization.body.address_info.province_id == cbtProject.organizations?.province_id &&
              resOrganization.body.address_info.district_id == cbtProject.organizations?.district_id &&
              resOrganization.body.address_info.sub_district_id == cbtProject.organizations?.subdistrict_id &&
              resOrganization.body.address_info.postal_code == cbtProject.organizations?.postal_code &&
              resOrganization.body.address_info.latitude == cbtProject.organizations?.latitude &&
              resOrganization.body.address_info.longitude == cbtProject.organizations?.longitude
          )?.response.organization;

        return {
          title: cbtProject.title,
          organizations: organizationId,
        };
      });

      resCbtProjects = await createCbtProjectAction(bodies);
    }

    var cbtProjectId =
      values.cbtProject?.id ??
      resCbtProjects.find((resCbtProject) => resCbtProject.body.title == values.cbtProject?.title)?.response.id;

    formContext.setValue("step1.cbtProject.id", cbtProjectId);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await createCbtProjectsAndOrganizations();
    const body = transformProjectBody(PROJECT_STATUS.DRAFT, formContext.getValues(), discountRates?.discount_rate ?? 5);

    const { response, error } = props.project?.id
      ? await updateSIAProjectAction(props.project.id, body)
      : await createSIAProjectAction(body);

    setIsLoading(false);
    if (error) {
      handleAPIError(error);
      return;
    }
    toastSuccess(t("project.saveSuccessMessage"));

    if (response?.id) router.push(`/sia-sroi/projects/manage/${response?.id}`);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await createCbtProjectsAndOrganizations();
    const body = transformProjectBody(
      PROJECT_STATUS.PENDING_FOR_APPROVAL,
      formContext.getValues(),
      discountRates?.discount_rate ?? 5
    );

    const { error } = props.project?.id
      ? await updateSIAProjectAction(props.project.id, body)
      : await createSIAProjectAction(body);

    setIsLoading(false);
    if (error) {
      handleAPIError(error);
      return;
    }
    toastSuccess(t("project.createSuccessMessage"));
    router.push("/sia-sroi/projects/manage");
  };

  const handleUpdate = async () => {
    if (!props.project) return;
    const project = props.project;
    const newStatus = project.status == PROJECT_STATUS.APPROVAL ? PROJECT_STATUS.IN_PROGRESS : project.status;
    setIsLoading(true);
    await createCbtProjectsAndOrganizations();
    const body = transformProjectBody(newStatus, formContext.getValues(), discountRates?.discount_rate ?? 5);
    const { error } = await updateSIAProjectAction(project.id ?? 0, body);
    setIsLoading(false);
    if (error) {
      handleAPIError(error);
      return;
    }
    toastSuccess(t("project.updateSuccessMessage"));
    router.push("/sia-sroi/projects/manage");
  };

  const handleCancel = (didCancel: boolean) => {
    setShowCancelPopup(false);
    didCancel && router.push("/sia-sroi/projects/manage");
  };

  const handleOnNext = async () => {
    const isCurrentStepValid = await formContext.trigger();

    if (!viewOnly && !isCurrentStepValid) return false;

    if (selectedIndex == 5) {
      if (!isViewingStep61) {
        setIsViewingStep61(true);
        return true;
      }
      setIsViewingStep61(false);
    }
    setSelectedIndex(selectedIndex + 1);
    return true;
  };

  const handleOnPrevious = () => {
    if (isViewingStep61) {
      setIsViewingStep61(false);
      return;
    }
    setSelectedIndex(selectedIndex - 1);
  };

  const handleDownload = () => {
    const project = formContext.getValues();
    setProjectDocument({
      projectDetailsDocument: projectDetails(project),
      thoeryOfChangeDocument: thoeryOfChange(project),
      socialReturnOnInvestment: socialReturnOnInvestmentData(project, discountRates?.discount_rate ?? 5),
      projectWithWithoutDocument: effects(project),
      projectbudgetDocument: budget(project),
      projectImpactDocument: impacts(project),
      siaDocument: sia(project),
      projectBenefitDocument: projectBenefitDocument(project),
      socialImpactPathwayXLXS: socialImpactPathway(project),
      sroiData: sroiTableData(project, discountRates?.discount_rate ?? 5),
    });
    setShowDownloadPreview(true);
  };

  const handleApprove = async (didApprove: boolean) => {
    const project = props.project;
    if (!project?.id) return;

    setShowApprovePopup(false);
    if (!didApprove) return;

    setIsLoading(true);
    const { response, error } = await updateProjectStatusAction(project.id, PROJECT_STATUS.APPROVAL, null);
    setIsLoading(false);
    if (error) {
      handleAPIError(error);
      return;
    }

    setShowSuccessApprovePopup(true);
    router.push("/sia-sroi/projects/manage");
  };

  const handleApproveDelete = (didApprove: boolean) => {
    setShowApproveDeletePopup(false);
    if (!didApprove) return;
    // TODO: API
  };

  const handleReject = async (rejectReason: string | null) => {
    const project = props.project;
    if (!project?.id) return;

    setShowRejectPopup(false);
    if (rejectReason == null) return;

    setIsLoading(true);
    const { response, error } = await updateProjectStatusAction(project.id, PROJECT_STATUS.REJECTED, rejectReason);
    setIsLoading(false);
    if (error) {
      handleAPIError(error);
      return;
    }

    router.push("/sia-sroi/projects/manage");
  };

  const handleComplete = async (didComplete: boolean) => {
    const project = props.project;
    if (!project?.id) return;

    setShowCompletePopup(false);
    if (!didComplete) return;

    setIsLoading(true);
    const { response, error } = await updateProjectStatusAction(project.id, PROJECT_STATUS.DONE, null);
    setIsLoading(false);
    if (error) {
      handleAPIError(error);
      return;
    }

    setShowSuccessCompletePopup(true);
    router.push("/sia-sroi/projects/manage?current_status=done");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const projectName = formContext.watch("step1.name");
  const title = projectName && projectName != "" ? projectName : t("project.create.buildProject");

  const renderButton = () => {
    return (
      <Menu>
        <Menu.Button
          onClick={toggleDropdown}
          className="w-full rounded-md border border-smart-cbt-border-green bg-white p-4 text-left text-sm text-smart-cbt-dark-green"
        >
          {t(`project.create.steps.${currentStep}`)}
        </Menu.Button>
        <Menu.Items>
          <Menu.Item>
            {({ active }) => (
              <div className="absolute left-0 right-0 top-14 z-30 flex flex-col rounded-md  border bg-white  text-smart-cbt-dark-green   shadow-lg md:w-[360px] md:min-w-[360px]">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    onClick={async (e) => {
                      if (viewOnly) return;
                      const isCurrentStepValid = await formContext.trigger();
                      if (isCurrentStepValid) setSelectedIndex(step.index);
                      e.preventDefault();
                    }}
                    className={cn(
                      "w-full border border-smart-cbt-very-light-grey p-4 text-left text-sm outline-none ",
                      (viewOnly || selectedIndex > step.index) && "cursor-pointer bg-white"
                    )}
                    id={step.id}
                  >
                    {t(`project.create.steps.${step.id}`)}
                  </div>
                ))}

                <div className="grow border-r border-smart-cbt-border-green" />
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    );
  };

  const { viewOnly } = viewMode(formData);

  return (
    <div className="relative h-full">
      <div className="h-full">
        <FormProvider {...formContext}>
          <form onSubmit={handleSubmit} className="flex h-full flex-col gap-6">
            {isViewingStep61 ? (
              <Step6TableContainer handleOnPrevious={handleOnPrevious} handleOnNext={handleOnNext} />
            ) : selectedIndex == 8 ? (
              <Step9Container
                project={props.project}
                handleOnPrevious={handleOnPrevious}
                onDownload={handleDownload}
                onSubmit={handleSubmit}
                onUpdate={handleUpdate}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            ) : (
              <>
                <CreateProjectHeader
                  onApproveDelete={() => setShowApproveDeletePopup(true)}
                  onComplete={() => setShowCompletePopup(true)}
                  onSave={handleSave}
                  onCancel={() => setShowCancelPopup(true)}
                  onApprove={() => {
                    setShowApprovePopup(true);
                  }}
                  onReject={() => setShowRejectPopup(true)}
                  isLoading={isLoading}
                  isAdmin={props.isAdmin || false}
                />
                <Tab.Group vertical selectedIndex={selectedIndex} onChange={setSelectedIndex}>
                  <div className="flex h-full flex-col md:flex-row md:overflow-auto md:rounded-lg md:border md:border-smart-cbt-border-green md:bg-white">
                    <div className="relative mx-6 md:hidden ">
                      {renderButton()}
                      <h3 className="flex whitespace-nowrap pt-6 text-xl font-medium">{title}</h3>
                    </div>

                    <div className="hidden w-full flex-col md:flex md:w-[360px] md:min-w-[360px]">
                      <Tab.List>
                        {steps.map((step) => (
                          <Tab
                            key={step.id}
                            onClick={(e) => {
                              if (viewOnly) return;
                              selectedIndex <= step.index && e.preventDefault();
                            }}
                            className={cn(
                              "relative block w-full cursor-default border-b border-r border-smart-cbt-very-light-grey bg-smart-cbt-light-grey p-4 text-left text-sm outline-none after:absolute after:right-[-12px] after:top-1/2 after:h-6 after:w-6 after:-translate-y-1/2 after:rotate-45 after:bg-smart-cbt-very-light-green ui-selected:border-r-smart-cbt-light-green ui-selected:bg-smart-cbt-very-light-green ui-not-selected:after:hidden",
                              (viewOnly || selectedIndex > step.index) && "cursor-pointer bg-white"
                            )}
                            id={step.id}
                          >
                            {t(`project.create.steps.${step.id}`)}
                          </Tab>
                        ))}
                      </Tab.List>
                      <div className="grow border-r border-smart-cbt-border-green" />
                    </div>
                    <div className="flex flex-grow flex-col gap-6 p-6 md:overflow-auto">
                      <Tab.Panels className="flex-grow">
                        {steps.map(({ content }, i) => (
                          <Tab.Panel key={i}>{content}</Tab.Panel>
                        ))}
                      </Tab.Panels>
                      <div className="hidden items-center justify-between md:flex">
                        <Button
                          intent={isLoading ? "disabled" : "text"}
                          size="small"
                          className={selectedIndex == 0 ? "invisible" : ""}
                          onClick={handleOnPrevious}
                          icon={<ArrowLeftIcon />}
                          disabled={isLoading}
                        >
                          {t("project.create.back")}
                        </Button>
                        <p className="hidden sm:flex">{`${selectedIndex + 1}/${steps.length}`}</p>
                        <Button
                          intent={isLoading ? "disabled" : "primary"}
                          size="small"
                          className={selectedIndex == steps.length - 1 ? "invisible" : ""}
                          onClick={handleOnNext}
                          iconRight={<ArrowRightIcon />}
                          disabled={isLoading}
                        >
                          {t("project.create.next")}
                        </Button>
                      </div>
                    </div>
                    <div className="rounded-t-lg border-t-[1px] bg-white py-4 text-sm font-medium  md:hidden">
                      <div className="flex items-center justify-between gap-4 px-4 py-2">
                        <Button
                          // intent="text"
                          size="small"
                          className={
                            selectedIndex == 0
                              ? "invisible"
                              : "w-full border border-smart-cbt-border-green bg-transparent text-smart-cbt-green"
                          }
                          onClick={handleOnPrevious}
                          icon={<ArrowLeftIcon />}
                          disabled={isLoading}
                        >
                          {t("project.create.back")}
                        </Button>
                        <p className="hidden gap-4 sm:flex">{`${selectedIndex + 1}/${steps.length}`}</p>
                        <Button
                          // intent="primary"
                          size="small"
                          className={
                            selectedIndex == steps.length - 1
                              ? "invisible"
                              : "w-full rounded-md  bg-smart-cbt-green font-medium text-white "
                          }
                          onClick={handleOnNext}
                          iconRight={<ArrowRightIcon />}
                          disabled={isLoading}
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
          {showDownloadPreview && projectDocument && (
            <ProjectDocument
              isOpen={showDownloadPreview}
              onClose={() => {
                setShowDownloadPreview(false);
              }}
              projectDocument={projectDocument}
            />
          )}
        </FormProvider>
        {showApprovePopup && <ApproveProjectConfirmPopup isOpen={showApprovePopup} onClose={handleApprove} />}
        {showApproveDeletePopup && (
          <ApproveDeleteProjectPopup isOpen={showApproveDeletePopup} onClose={handleApproveDelete} />
        )}
        {showRejectPopup && <RejectProjectPopup isOpen={showRejectPopup} onClose={handleReject} />}
        {(showSuccessApprovePopup || showSuccessCompletePopup) && (
          <ApproveProjectSuccessPopup
            isOpen={showSuccessApprovePopup || showSuccessCompletePopup}
            onClose={() =>
              showSuccessApprovePopup ? setShowSuccessApprovePopup(false) : setShowSuccessCompletePopup(false)
            }
            title={
              showSuccessApprovePopup
                ? t("project.create.popupApproveSuccess.title")
                : t("project.create.popupCompleteSuccess.title")
            }
            subTitle={
              showSuccessApprovePopup
                ? t("project.create.popupApproveSuccess.subTitle")
                : t("project.create.popupCompleteSuccess.subTitle")
            }
          />
        )}
        {showCancelPopup && <CancelProjectPopup isOpen={showCancelPopup} onClose={handleCancel} />}
        {showCompletePopup && <ApproveCompletePopup isOpen={showCompletePopup} onClose={handleComplete} />}
      </div>
      {isLoading && (
        <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green" />
        </div>
      )}
    </div>
  );
};

const CreateProjectHeader = ({
  onSave,
  onApprove,
  onReject,
  onCancel,
  onApproveDelete,
  onComplete,
  isLoading,
  isAdmin = false,
}: {
  onSave: () => void;
  onApprove: () => void;
  onReject: () => void;
  onCancel: () => void;
  onApproveDelete: () => void;
  onComplete: () => void;
  isLoading: boolean;
  isAdmin: boolean;
}) => {
  const t = useTranslations("common");
  const { watch, getValues } = useFormContext<CreateProjectSchema>();
  const projectName = watch("step1.name");
  const title = projectName && projectName != "" ? projectName : t("project.create.buildProject");

  const renderButtonsByStatus = (status?: PROJECT_STATUS) => {
    switch (status) {
      case PROJECT_STATUS.DRAFT:
        return (
          <>
            <Button
              type="button"
              onClick={onCancel}
              intent={isLoading ? "disabled" : "danger"}
              size="small"
              disabled={isLoading}
            >
              {t("global.back")}
            </Button>
            <Button
              type="button"
              onClick={onSave}
              intent={isLoading ? "disabled" : "primary"}
              size="small"
              icon={<SaveDiskIcon />}
              disabled={isLoading}
            >
              {t("project.create.save")}
            </Button>
          </>
        );
      case PROJECT_STATUS.PENDING_FOR_APPROVAL:
        return (
          isAdmin && (
            <>
              <Button
                type="button"
                className="text-smart-cbt-dark-grey"
                onClick={onReject}
                intent={isLoading ? "disabled" : "text"}
                size="small"
                disabled={isLoading}
              >
                {t("project.create.reject")}
              </Button>
              <Button
                type="button"
                onClick={onApprove}
                intent={isLoading ? "disabled" : "primary"}
                size="small"
                icon={<CheckIconCircle />}
                disabled={isLoading}
              >
                {t("project.create.approve")}
              </Button>
            </>
          )
        );
      case PROJECT_STATUS.REJECTED:
      case PROJECT_STATUS.APPROVAL:
        return (
          <>
            <Button
              type="button"
              onClick={onCancel}
              intent={isLoading ? "disabled" : "danger"}
              size="small"
              disabled={isLoading}
            >
              {t("global.back")}
            </Button>
            <Button
              type="button"
              onClick={onSave}
              intent={isLoading ? "disabled" : "primary"}
              size="small"
              icon={<SaveDiskIcon />}
              disabled={isLoading}
            >
              {t("project.create.save")}
            </Button>
          </>
        );
      case PROJECT_STATUS.REQUEST_TO_DELETE:
        return (
          <>
            <Button
              type="button"
              onClick={onCancel}
              intent={isLoading ? "disabled" : "danger"}
              size="small"
              disabled={isLoading}
            >
              {t("global.cancel")}
            </Button>
            {isAdmin && (
              <Button
                type="button"
                onClick={onApproveDelete}
                intent={isLoading ? "disabled" : "danger"}
                size="small"
                disabled={isLoading}
              >
                {t("project.create.approveDeleteProject")}
              </Button>
            )}
          </>
        );
      case PROJECT_STATUS.IN_PROGRESS:
        return (
          <>
            <Button
              type="button"
              onClick={onComplete}
              intent={isLoading ? "disabled" : "primary"}
              size="small"
              disabled={isLoading}
            >
              {t("project.create.done")}
            </Button>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h3 className="hidden w-3/5 whitespace-normal text-xl font-medium md:flex md:w-2/5">{title}</h3>
      <div className="flex w-2/5 items-center justify-between gap-8 sm:w-full sm:px-6 md:w-3/5 md:justify-end md:px-0">
        {renderButtonsByStatus(getValues("status"))}
      </div>
    </div>
  );
};
