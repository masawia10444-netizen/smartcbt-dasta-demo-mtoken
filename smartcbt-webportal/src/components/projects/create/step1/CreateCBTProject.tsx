import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { AddPlusIcon, SaveDiskIcon, XMarkIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import { SiaSroiContext } from "@/contexts/App.context";
import { customZodResolver } from "@/schemas/base-schema";
import {
  CbtProjectSchema,
  CreateOrganizationListFormSchema,
  CreateOrganizationSchema,
  Step1ForCreateProjectSchema,
  step1ForCreateProjectSchema,
} from "@/schemas/forms/projects/create/step1-schema";
import { PROJECT_STATUS } from "@/utils/cms/adapters/website/constants";
import { CBTProjectJson } from "@/utils/cms/adapters/website/sia/create-sia";
import { CommunitySIAJson } from "@/utils/cms/adapters/website/sia/types/project";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateOrganization } from "./CreateOrganization";

export enum CreateCBTProjectFromType {
  sia = "sia",
  carbon = "carbon",
}

type CreateCBTProjectProps = {
  isOpen: boolean;
  onClose: (didCreate: boolean) => void;
  onSubmit: (cbtProject: CbtProjectSchema, createOrganization: CommunitySIAJson[]) => void;
  listCBTProject: CBTProjectJson[];
  id: string | null;
  fromType?: CreateCBTProjectFromType;
};

export const CreateCBTProject = (props: CreateCBTProjectProps) => {
  const t = useTranslations("common");

  const { listCommunity } = useContext(SiaSroiContext);

  const [showCreateOrganizationForm, setShowCreateOrganizationForm] = useState(false);

  const formContext = useForm<Step1ForCreateProjectSchema>({
    resolver: customZodResolver(step1ForCreateProjectSchema),
  });

  const {
    control,
    register,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = formContext;

  const close = () => {
    props.onClose(false);
  };

  const handleNewOrganizationCreate = () => {
    setShowCreateOrganizationForm(true);
  };

  const step1 = watch();
  const createdOrganization = step1.createdOrganization;

  const handleNewOrganizationSave = (data: CreateOrganizationSchema) => {
    if (!showCreateOrganizationForm) return;
    const createdOrganizationListForm: CreateOrganizationListFormSchema = {
      district_id: data.district.id,
      title: data.title,
      district_title: data.district.title,
      latitude: data.lat,
      longitude: data.lng,
      subdistrict_id: data.subdistrict.id,
      subdistrict_title: data.subdistrict.title,
      province_id: data.province.id,
      province_title: data.province.title,
      postal_code: data.postCode,
    };
    const createOrganizations = [...(createdOrganization ?? []), createdOrganizationListForm];
    setValue(`createdOrganization`, createOrganizations);
    setValue(`cbtProject.organizations`, createdOrganizationListForm);
    setValue("cbtProject.status", PROJECT_STATUS.DRAFT);
    setShowCreateOrganizationForm(false);
  };

  const onSubmit = async () => {
    const isCurrentStepValid = await trigger();
    if (!isCurrentStepValid) return;
    const data = getValues();
    props.onSubmit(data.cbtProject, data.createdOrganization as any);
  };

  console.log(errors);

  const allListOrganization = step1?.createdOrganization
    ? [...listCommunity, ...step1?.createdOrganization]
    : [...listCommunity];

  const handleSelectedOrganization = (
    data: CreateOrganizationListFormSchema,
    next: (p: CreateOrganizationListFormSchema) => void
  ) => {
    next(data);
  };

  return (
    <div>
      <FormProvider {...formContext}>
        <div className="relative z-40">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0">
            {/* The actual dialog panel  */}
            <div className="ml-[50%] h-full overflow-y-auto bg-white px-4 py-4 lg:px-12">
              {/* <form className="flex flex-col gap-10" onSubmit={onSubmit}> */}
              <div className="flex items-center justify-between">
                <p className="font-medium text-smart-cbt-dark-green">
                  {t("project.create.step1.createCBTProject.title")}
                </p>
                <Button onClick={close} intent="text" size="small" className="text-smart-cbt-very-dark-grey">
                  <XMarkIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel required>{t("project.create.step1.createCBTProject.projectName")}</FormLabel>
                    <Form.Input
                      intent={"primary"}
                      {...register("cbtProject.title")}
                      placeholder={t("project.create.step1.createCBTProject.projectName")}
                    />
                    <FormFieldError error={errors.cbtProject?.title?.message} />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel required={props.fromType === CreateCBTProjectFromType.sia ? false : true}>
                      {t("project.create.step1.createCBTProject.communityName")}
                    </FormLabel>
                    <Form.DropDownSearch
                      values={[null, ...allListOrganization]}
                      defaultValue={null}
                      idKey="title"
                      disabled={false}
                      title=""
                      nullDisplay=""
                      filterKey="title"
                      displayKey="title"
                      placeholder={t("project.create.step1.createCBTProject.communityName")}
                      itemDisplayFunction={(item) =>
                        item ? (
                          <div key={item.title} className="p-2">
                            {item.title}
                          </div>
                        ) : (
                          <div
                            key="createNewCommunity"
                            className="flex h-full w-full items-center gap-4 bg-white p-2 text-smart-cbt-blue"
                          >
                            <AddPlusIcon />
                            {t("project.create.step1.newCommunity")}
                          </div>
                        )
                      }
                      onChangeInterceptor={(v, next) => {
                        v ? handleSelectedOrganization(v, next) : handleNewOrganizationCreate();
                      }}
                      inputEditable={true}
                      name={`cbtProject.organizations`}
                      control={control}
                      fixed={false}
                    />
                    <FormFieldError error={errors.cbtProject?.organizations?.message} />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel>{t("global.province")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={step1.cbtProject?.organizations?.province_title ?? ""}
                      placeholder={t("global.province")}
                      disabled
                    />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel>{t("global.district")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={step1.cbtProject?.organizations?.district_title ?? ""}
                      placeholder={t("global.district")}
                      disabled
                    />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel>{t("global.subdistrict")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={step1.cbtProject?.organizations?.subdistrict_title ?? ""}
                      placeholder={t("global.subdistrict")}
                      disabled
                    />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel>{t("project.create.step1.createOrganization.postCode")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={step1.cbtProject?.organizations?.postal_code ?? ""}
                      placeholder={t("project.create.step1.createOrganization.postCode")}
                      disabled
                    />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel>{t("project.create.step1.createOrganization.latitude")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={step1.cbtProject?.organizations?.latitude ?? ""}
                      placeholder={t("project.create.step1.createOrganization.latitude")}
                      disabled
                    />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel>{t("project.create.step1.createOrganization.longitude")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={step1.cbtProject?.organizations?.longitude ?? ""}
                      placeholder={t("project.create.step1.createOrganization.longitude")}
                      disabled
                    />
                  </Flex.Element>
                </Flex.Container>
                <div className="flex gap-8">
                  <Button intent="primary" size="small" onClick={onSubmit} icon={<SaveDiskIcon />} type="button">
                    {t("project.create.step1.createCBTProject.save")}
                  </Button>
                  <Button intent="tertiary" size="small" onClick={close}>
                    {t("global.cancel")}
                  </Button>
                </div>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </FormProvider>
      {showCreateOrganizationForm && (
        <CreateOrganization
          onClose={() => setShowCreateOrganizationForm(false)}
          onSubmit={handleNewOrganizationSave}
          isOpen={showCreateOrganizationForm != null}
          listCBTProject={props.listCBTProject}
          id={null}
        />
      )}
    </div>
  );
};
