import CollapseSection from "@/components/CollapseSection";
import Flex from "@/components/Flex";
import { AddPlusIcon } from "@/components/Icon";
import { CreateCBTProject } from "@/components/cbt-project/CreateCBTProject";
import Form from "@/components/form/Form";
import FormDatePicker from "@/components/form/FormDatePicker";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import { CarbonContext } from "@/contexts/App.context";
import { TravelProgramSchema } from "@/schemas/forms/carbon/travel-plan/travel-plan";
import { CreateCbtProjectSchema } from "@/schemas/forms/cbt-project/create-cbt-project";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { Fragment, useContext, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import TravelPlanActivityDetails from "./TravelPlanActivityDetails";

const TravelProgram = () => {
  const t = useTranslations("common");

  const { listCBTProject, scopeAssessments, carbonUnitOption } = useContext(CarbonContext);

  const [showCreateCBTProjectForm, setShowCreateCBTProjectForm] = useState(false);

  const {
    register,
    control,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TravelProgramSchema>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `travelPlans`,
  });
  const handleNewCBTProjectCreate = () => {
    setShowCreateCBTProjectForm(true);
  };

  const handleOnSubmitCBTProjectCreate = (createdCBTProject: CreateCbtProjectSchema) => {
    const newCbtProject: CreateCbtProjectSchema = {
      id: `P${Math.floor(Math.random() * 10000)}`,
      title: createdCBTProject.title,
      organizations: createdCBTProject.organizations,
      createdOrganizations: createdCBTProject.createdOrganizations,
      isCreateOrganizations: createdCBTProject.isCreateOrganizations,
    };
    if (createdCBTProject.createdOrganizations)
      setValue("createdOrganizations", createdCBTProject.createdOrganizations);
    setValue("createdCBTProject", newCbtProject);
    setValue("cbtProject", newCbtProject);
    setValue("isCreateCBTProject", true);
    setShowCreateCBTProjectForm(false);
  };

  const data = watch();
  const createOrganizations = data?.createdOrganizations;
  const allListCbtProject = [...listCBTProject, ...(data.createdCBTProject ? [data.createdCBTProject] : [])];

  const handleSelectedCBTProject = (selectData: any, next: (p: any) => void) => {
    next(selectData);
    setValue("isCreateCBTProject", selectData == data.createdCBTProject);
  };

  //TODO: Just for force if want dynamic unit option need to check this again
  useEffect(() => {
    carbonUnitOption && setValue("unit", carbonUnitOption[0]);
  }, [carbonUnitOption]);

  return (
    <div className="flex flex-col gap-4 p-2">
      <CollapseSection
        defaultOpen
        title={t("carbon.create.generalInformation.generalInformation.title")}
        className="text-smart-cbt-dark-green"
      >
        <Flex.Container>
          <Flex.Element className="flex flex-col gap-2">
            <FormLabel className="whitespace-nowrap text-black" required>
              {t("carbon.create.generalInformation.generalInformation.programName")}
            </FormLabel>
            <Form.DropDownSearch
              values={[null, ...allListCbtProject]}
              idKey="id"
              disabled={false}
              title=""
              nullDisplay=""
              filterKey="title"
              displayKey="title"
              placeholder={t("carbon.create.generalInformation.generalInformation.programName")}
              itemDisplayFunction={(item) =>
                item ? (
                  <div key={item.title} className="p-2">
                    {item.title}
                  </div>
                ) : (
                  <div
                    key="createNewProject"
                    className="flex h-full w-full items-center gap-4 bg-white p-2 text-smart-cbt-blue"
                  >
                    <AddPlusIcon />
                    {t("cbtProject.create.carbon.newProgram")}
                  </div>
                )
              }
              onChangeInterceptor={(v, next) => {
                v ? handleSelectedCBTProject(v, next) : handleNewCBTProjectCreate();
              }}
              inputEditable={true}
              name={`cbtProject`}
              control={control}
              fixed={false}
            />
            <FormFieldError error={errors.cbtProject?.message} />
          </Flex.Element>
          <Flex.Element className="flex flex-col gap-2">
            <FormLabel className="whitespace-nowrap text-black" required>
              {t("carbon.create.generalInformation.generalInformation.companyName")}
            </FormLabel>
            <Form.Input value={data.cbtProject?.organizations?.title} disabled intent={"disabled"} />
            <FormFieldError error={errors.cbtProject?.organizations?.title?.message} />
          </Flex.Element>
        </Flex.Container>
      </CollapseSection>
      <CollapseSection
        defaultOpen
        title={t("carbon.create.generalInformation.travelProgram.title")}
        className="text-smart-cbt-dark-green"
      >
        <Flex.Container className="flex flex-col gap-2">
          <Flex.Element className="flex flex-col gap-2">
            <FormLabel className="whitespace-nowrap text-black" required>
              {t("carbon.create.generalInformation.travelProgram.numberOfTourist")}
            </FormLabel>
            <Form.NumberInput
              control={control}
              name="numberOfTourist"
              placeholder={t("carbon.create.generalInformation.travelProgram.numberOfTourist")}
            />
            <FormFieldError error={errors.numberOfTourist?.message} />
          </Flex.Element>
          <Flex.Element className="flex flex-col gap-2">
            <FormLabel className="whitespace-nowrap text-black" required>
              {t("carbon.create.generalInformation.travelProgram.scopeOfAssessment")}
            </FormLabel>
            <Form.DropDownSearch
              values={scopeAssessments}
              idKey="id"
              disabled={false}
              title=""
              nullDisplay=""
              filterKey="title"
              displayKey="title"
              placeholder={t("carbon.create.generalInformation.travelProgram.scopeOfAssessment")}
              inputEditable={true}
              name={`scopeOfAssessment`}
              control={control}
              fixed={false}
            />
            <FormFieldError error={errors.scopeOfAssessment?.message} />
          </Flex.Element>
          <Flex.Element className="flex flex-col gap-2">
            <FormLabel className="whitespace-nowrap text-black">
              {t("carbon.create.generalInformation.travelProgram.unit")}
            </FormLabel>
            <FormLabel className="whitespace-nowrap text-black">
              {/* TODO: Just for force if want dynamic unit option need to check this again */}
              {getValues("unit.title")}
            </FormLabel>
          </Flex.Element>
        </Flex.Container>

        <Flex.Container>
          <Flex.Element className="flex flex-col">
            {/* <FormLabel className="text-black whitespace-nowrap" required>
              {t("carbon.create.generalInformation.travelProgram.registrationDate")}
            </FormLabel> */}
            <div className="h-8" />
            <FormDatePicker
              disabled={true}
              wrapperClassName="p-0"
              inputClassName="border-smart-cbt-medium-grey focus:border-smart-cbt-medium-grey"
              showIcon
              placeholder={t("carbon.create.generalInformation.travelProgram.registrationDate")}
              {...register("registrationDate")}
            />
            <FormFieldError error={errors.registrationDate?.message} />
          </Flex.Element>
          <Flex.Element className="flex flex-col gap-2">
            <FormLabel className="whitespace-nowrap text-black" required>
              {t("global.province")}
            </FormLabel>
            <Form.Input value={data.cbtProject?.organizations?.province_title} disabled intent={"disabled"} />
            <FormFieldError error={errors.cbtProject?.organizations?.province_title?.message} />
          </Flex.Element>
          <Flex.Element className="flex flex-col gap-2">
            <FormLabel className="whitespace-nowrap text-black" required>
              {t("carbon.overview.regionalLevel")}
            </FormLabel>
            <Form.Input value={data.cbtProject?.organizations?.region_title} disabled intent={"disabled"} />
            <FormFieldError error={errors.cbtProject?.organizations?.province_title?.message} />
          </Flex.Element>
        </Flex.Container>
        <Flex.Container>
          <Flex.Element className="flex flex-col gap-2">
            <h1 className="text-base font-medium text-smart-cbt-dark-green">
              {t("carbon.create.generalInformation.travelProgram.description")}
            </h1>
            {fields.map((field, index) => (
              <Fragment key={field.id}>
                <TravelPlanActivityDetails
                  index={index}
                  onClickRemoveButton={() => {
                    remove(index);
                  }}
                />
                <div className="h-[1px] bg-smart-cbt-light-grey" />
              </Fragment>
            ))}
            <button
              type="button"
              onClick={() => {
                append({ activities: [] });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-smart-cbt-dark-grey p-2 text-smart-cbt-dark-grey"
            >
              <PlusIcon className="h-6 w-6" />
              {t("carbon.create.generalInformation.travelProgram.addTravelProgram")}
            </button>
          </Flex.Element>
        </Flex.Container>
        <FormFieldError error={errors.travelPlans?.message} />
      </CollapseSection>
      {showCreateCBTProjectForm && (
        <CreateCBTProject
          onClose={() => setShowCreateCBTProjectForm(false)}
          onSubmit={handleOnSubmitCBTProjectCreate}
          isOpen={showCreateCBTProjectForm != null}
          createOrganizations={createOrganizations}
          isCarbon={true}
          id={null}
        />
      )}
    </div>
  );
};

export default TravelProgram;
