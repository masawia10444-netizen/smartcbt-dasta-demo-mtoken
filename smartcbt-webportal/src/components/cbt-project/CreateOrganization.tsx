import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { SaveDiskIcon, XMarkIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import { AppContext } from "@/contexts/App.context";
import { customZodResolver } from "@/schemas/base-schema";
import { CreateOrganizationSchema, createOrganizationSchema } from "@/schemas/forms/cbt-project/create-organization";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type CreateOrganizationProps = {
  isOpen: boolean;
  onClose: (didCreate: boolean) => void;
  onSubmit: (data: CreateOrganizationSchema) => void;
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
    formState: { errors, dirtyFields },
  } = formContext;

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
      districts?.filter(
        (di) =>
          // di.status == CountryStatus.Published &&
          di.province == province?.id && di.title?.includes(query ?? "")
      ) ?? []
    );
  };

  const searchSubDistricts = async (query?: string) => {
    return Promise.resolve(
      subdistricts?.filter(
        (sub) =>
          // sub.status == CountryStatus.Published &&
          sub.district == district?.id && sub.title?.includes(query ?? "")
      ) ?? []
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
                <p className="font-medium text-smart-cbt-dark-green">{t("cbtProject.titleOrganization")}</p>
                <Button onClick={close} intent="text" size="small" className="text-smart-cbt-very-dark-grey">
                  <XMarkIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel required>{t("cbtProject.create.organizationName")}</FormLabel>
                    <Form.Input
                      intent={"primary"}
                      {...register("title")}
                      placeholder={t("cbtProject.create.organizationName")}
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
                      intent={!province?.id ? "disabled" : "primary"}
                      inputEditable={true}
                      fixed={false}
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
                      intent={!district?.id ? "disabled" : "primary"}
                      inputEditable={true}
                      fixed={false}
                    />
                    <FormFieldError error={errors.subdistrict?.message} />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel required>{t("global.postcode")}</FormLabel>
                    <Form.Input
                      intent={"disabled"}
                      disabled
                      value={watch("subdistrict.postal")}
                      placeholder={t("global.postcode")}
                    />
                    <FormFieldError error={errors.postCode?.message} />
                  </Flex.Element>
                </Flex.Container>
                <Flex.Container>
                  <Flex.Element>
                    <FormLabel>{t("global.latitude")}</FormLabel>
                    <Form.Input intent={"primary"} {...register("lat")} placeholder={t("global.latitude")} />
                    <FormFieldError error={errors.lat?.message} />
                  </Flex.Element>
                  <Flex.Element>
                    <FormLabel>{t("global.longitude")}</FormLabel>
                    <Form.Input intent={"primary"} {...register("lng")} placeholder={t("global.longitude")} />
                    <FormFieldError error={errors.lng?.message} />
                  </Flex.Element>
                </Flex.Container>
                <div className="flex gap-8">
                  <Button intent="primary" size="small" icon={<SaveDiskIcon />} type="button" onClick={onSubmit}>
                    {t("global.save")}
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
