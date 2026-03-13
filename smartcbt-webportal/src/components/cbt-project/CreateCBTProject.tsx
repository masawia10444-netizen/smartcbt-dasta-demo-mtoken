import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { AddPlusIcon, SaveDiskIcon, XMarkIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import { CarbonContext } from "@/contexts/App.context";
import { customZodResolver } from "@/schemas/base-schema";
import {
  CreateCbtProjectSchema,
  OrganizationSchema,
  createCbtProjectSchema,
} from "@/schemas/forms/cbt-project/create-cbt-project";

import { CreateOrganizationSchema } from "@/schemas/forms/cbt-project/create-organization";
import { useTranslations } from "next-intl";
import { useContext, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreateOrganization } from "./CreateOrganization";

type CreateCBTProjectProps = {
  isOpen: boolean;
  onClose: (didCreate: boolean) => void;
  onSubmit: (data: CreateCbtProjectSchema) => void;
  createOrganizations?: OrganizationSchema | null;
  id: string | null;
  isCarbon?: boolean | null;
};

export const CreateCBTProject = (props: CreateCBTProjectProps) => {
  const t = useTranslations("common");

  const { listCommunity, regionsWithProvince } = useContext(CarbonContext);

  const [showCreateOrganizationForm, setShowCreateOrganizationForm] = useState(false);

  const formContext = useForm<CreateCbtProjectSchema>({
    resolver: customZodResolver(createCbtProjectSchema),
  });

  const {
    control,
    register,
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = formContext;

  const close = () => {
    props.onClose(false);
  };

  const handleNewOrganizationCreate = () => {
    setShowCreateOrganizationForm(true);
  };

  const handleNewOrganizationSave = (data: CreateOrganizationSchema) => {
    const region = regionsWithProvince.find((region) =>
      region.provinces.some((province) => province.id === data.province.id)
    );
    const newOrganization: OrganizationSchema = {
      id: `C${Math.floor(Math.random() * 10000)}`,
      title: data.title,
      region_id: region?.id,
      region_title: region?.title,
      province_id: data.province.id,
      province_title: data.province.title,
      district_id: data.district.id,
      district_title: data.district.title,
      subdistrict_id: data.subdistrict.id,
      subdistrict_title: data.subdistrict.title,
      postal_code: data.subdistrict.postal,
      latitude: data.lat ?? null,
      longitude: data.lng ?? null,
    };
    setValue("createdOrganizations", newOrganization);
    setValue("organizations", newOrganization);
    setValue("isCreateOrganizations", true);
    setShowCreateOrganizationForm(false);
  };

  const onSubmit = async () => {
    const isCurrentStepValid = await trigger();
    if (!isCurrentStepValid) return;
    const data = getValues();
    props.onSubmit(data);
  };

  const handleSelectedOrganization = (data: any, next: (p: any) => void) => {
    next(data);
    setValue("isCreateOrganizations", data == props.createOrganizations);
  };

  const organization = watch("organizations");
  const createdOrganization = watch("createdOrganizations");

  const allOrganizations = [
    ...listCommunity,
    ...(props.createOrganizations ? [props.createOrganizations] : []),
    ...(createdOrganization ? [createdOrganization] : []),
  ];

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
                  {props.isCarbon ? t("cbtProject.create.carbon.programName") : t("cbtProject.create.projectName")}
                </p>
                <Button onClick={close} intent="text" size="small" className="text-smart-cbt-very-dark-grey">
                  <XMarkIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel required>
                      {props.isCarbon ? t("cbtProject.create.carbon.programName") : t("cbtProject.create.projectName")}
                    </FormLabel>
                    <Form.Input
                      intent={"primary"}
                      {...register("title")}
                      placeholder={
                        props.isCarbon ? t("cbtProject.create.carbon.programName") : t("cbtProject.create.projectName")
                      }
                    />
                    <FormFieldError error={errors.title?.message} />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel required>{t("cbtProject.create.organizationName")}</FormLabel>
                    <Form.DropDownSearch
                      values={[null, ...allOrganizations]}
                      idKey="id"
                      disabled={false}
                      title=""
                      nullDisplay=""
                      filterKey="title"
                      displayKey="title"
                      placeholder={t("cbtProject.create.organizationName")}
                      itemDisplayFunction={(item) =>
                        item ? (
                          <div key={item.title} className="p-2">
                            {item.title}
                          </div>
                        ) : (
                          <div
                            key="createNewOrganization"
                            className="flex h-full w-full items-center gap-4 bg-white p-2 text-smart-cbt-blue"
                          >
                            <AddPlusIcon />
                            {t("cbtProject.newOrganization")}
                          </div>
                        )
                      }
                      onChangeInterceptor={(v, next) => {
                        v ? handleSelectedOrganization(v, next) : handleNewOrganizationCreate();
                      }}
                      inputEditable={true}
                      name={`organizations`}
                      control={control}
                      fixed={false}
                    />
                    <FormFieldError error={errors.organizations?.message} />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel>{t("global.province")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={organization?.province_title ?? ""}
                      placeholder={t("global.province")}
                      disabled
                    />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel>{t("global.district")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={organization?.district_title ?? ""}
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
                      value={organization?.subdistrict_title ?? ""}
                      placeholder={t("global.subdistrict")}
                      disabled
                    />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel>{t("global.postcode")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={organization?.postal_code ?? ""}
                      placeholder={t("global.postcode")}
                      disabled
                    />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel>{t("global.latitude")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={organization?.latitude ?? ""}
                      placeholder={t("global.latitude")}
                      disabled
                    />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel>{t("global.longitude")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      value={organization?.longitude ?? ""}
                      placeholder={t("global.longitude")}
                      disabled
                    />
                  </Flex.Element>
                </Flex.Container>
                <div className="flex gap-8">
                  <Button intent="primary" size="small" onClick={onSubmit} icon={<SaveDiskIcon />} type="button">
                    {t("global.save")}
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
          id={null}
        />
      )}
    </div>
  );
};
