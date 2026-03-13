import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { SaveDiskIcon, XMarkIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import { AppContext } from "@/contexts/App.context";
import { customZodResolver } from "@/schemas/base-schema";
import { CreateOrganizationSchema, createOrganizationSchema } from "@/schemas/forms/projects/create/step1-schema";
import { CBTProjectJson } from "@/utils/cms/adapters/website/sia/create-sia";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type CreateOrganizationProps = {
  isOpen: boolean;
  onClose: (didCreate: boolean) => void;
  onSubmit: (data: CreateOrganizationSchema) => void;
  listCBTProject: CBTProjectJson[];
  id: string | null;
};

export const CreateOrganization = (props: CreateOrganizationProps) => {
  const t = useTranslations("common");

  const { provinces, districts, subdistricts } = useContext(AppContext);

  const formContext = useForm<CreateOrganizationSchema>({
    resolver: customZodResolver(createOrganizationSchema),
  });
  const {
    control,
    register,
    getValues,
    watch,
    resetField,
    trigger,
    setValue,
    formState: { errors, dirtyFields },
  } = formContext;

  console.log(errors);

  const close = () => {
    props.onClose(false);
  };

  const onSubmit = async () => {
    const isCurrentStepValid = await trigger();
    if (!isCurrentStepValid) return;
    const data = getValues();
    props.onSubmit(data);
  };

  const province = watch("province");
  const district = watch("district");

  useEffect(() => {
    if (!dirtyFields?.province) return;
    resetField("district", { keepDirty: true });
  }, [provinces]);

  useEffect(() => {
    if (!dirtyFields?.district) return;
    resetField("subdistrict", { keepDirty: true });
  }, [districts]);

  const searchDistricts = async (query?: string) => {
    return Promise.resolve(
      districts?.filter((di) => di.province == province?.id && di.title?.includes(query ?? "")) ?? []
    );
  };

  const searchSubDistricts = async (query?: string) => {
    return Promise.resolve(
      subdistricts?.filter((sub) => sub.district == district?.id && sub.title?.includes(query ?? "")) ?? []
    );
  };

  return (
    <FormProvider {...formContext}>
      <Dialog open={props.isOpen} onClose={close} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="ml-[50%] h-full overflow-y-auto bg-white px-4 py-4 lg:px-12">
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-smart-cbt-dark-green">
                  {t("project.create.step1.createOrganization.title")}
                </p>
                <Button onClick={close} intent="text" size="small" className="text-smart-cbt-very-dark-grey">
                  <XMarkIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel required>{t("project.create.step1.createOrganization.organizationName")}</FormLabel>
                    <Form.Input
                      intent={"primary"}
                      {...register("title")}
                      placeholder={t("project.create.step1.createOrganization.organizationName")}
                    />
                    <FormFieldError error={errors.title?.message} />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel required>{t("global.province")}</FormLabel>
                    <Form.DropDownSearch
                      values={provinces}
                      idKey="id"
                      disabled={false}
                      title=""
                      nullDisplay=""
                      filterKey="title"
                      displayKey="title"
                      placeholder={t("global.province")}
                      inputEditable={true}
                      name={`province`}
                      control={control}
                      fixed={false}
                      onChangeInterceptor={(v, next) => {
                        resetField("district");
                        resetField("subdistrict");
                        setValue("postCode", "");
                        next(v);
                      }}
                    />
                    <FormFieldError error={errors.province?.message} />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel required>{t("global.district")}</FormLabel>
                    <Form.DropDownSearch
                      name="district"
                      searchFunction={searchDistricts}
                      idKey="id"
                      nullDisplay=""
                      displayKey="title"
                      title={""}
                      placeholder={t("travelMart.register.address.district")}
                      control={control}
                      disabled={!province?.id}
                      inputEditable={true}
                      fixed={false}
                      onChangeInterceptor={(v, next) => {
                        resetField("subdistrict");
                        setValue("postCode", "");
                        next(v);
                      }}
                    />
                    <FormFieldError error={errors.district?.message} />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel required>{t("global.subdistrict")}</FormLabel>
                    <Form.DropDownSearch
                      name="subdistrict"
                      searchFunction={searchSubDistricts}
                      idKey="id"
                      nullDisplay=""
                      displayKey="title"
                      title={""}
                      placeholder={t("global.subdistrict")}
                      control={control}
                      disabled={!district?.id}
                      inputEditable={true}
                      fixed={false}
                      onChangeInterceptor={(v, next) => {
                        console.info("postcode : " + JSON.stringify(v));
                        setValue("postCode", v.postal);
                        next(v);
                      }}
                    />
                    <FormFieldError error={errors.subdistrict?.message} />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel required>{t("project.create.step1.createOrganization.postCode")}</FormLabel>
                    <Form.Input
                      intent={"primary"}
                      placeholder={t("project.create.step1.createOrganization.postCode")}
                      value={watch("postCode")}
                      disabled
                    />
                    <FormFieldError error={errors.postCode?.message} />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel>{t("project.create.step1.createOrganization.latitude")}</FormLabel>
                    <Form.Input
                      intent={"primary"}
                      {...register("lat")}
                      placeholder={t("project.create.step1.createOrganization.latitude")}
                    />
                    <FormFieldError error={errors.lat?.message} />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel>{t("project.create.step1.createOrganization.longitude")}</FormLabel>
                    <Form.Input
                      intent={"primary"}
                      {...register("lng")}
                      placeholder={t("project.create.step1.createOrganization.longitude")}
                    />
                    <FormFieldError error={errors.lng?.message} />
                  </Flex.Element>
                </Flex.Container>
                <div className="flex gap-8">
                  <Button intent="primary" size="small" icon={<SaveDiskIcon />} type="button" onClick={onSubmit}>
                    {t("project.create.step1.createCBTProject.save")}
                  </Button>
                  <Button intent="tertiary" size="small" onClick={close}>
                    {t("global.cancel")}
                  </Button>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </FormProvider>
  );
};
