import { getEmissionFactorById } from "@/app/[locale]/(authenticated)/carbon-footprint/emission-factor-proxy/action";
import { Button } from "@/components/Button";
import { SaveDiskIcon, XMarkIcon } from "@/components/Icon";
import LoadingSpinner from "@/components/LoadingSpinner";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { EmissionFactorProxyStatus, EmissionFactorUnit, emissionFactorProxyPCRs } from "@/models/emission-factor-proxy";
import { customZodResolver } from "@/schemas/base-schema";
import {
  EmissionProxyCreateSchema,
  emissionProxyCreateSchema,
} from "@/schemas/forms/carbon/emission-proxies/emission-proxy-create-schema";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { EmissionProxyCreateFormDetail } from "./EmissionProxyCreateFormDetail";
import { CarbonContext } from "@/contexts/App.context";

type EmissionProxyCreateFormProps = {
  pcrTypeId?: number;
  isOpen: boolean;
  onClose: (didCreate: boolean) => void;
  onSubmit: (data: EmissionProxyCreateSchema) => void;
  id: number | null;
};

export const EmissionProxyCreateForm = (props: EmissionProxyCreateFormProps) => {
  const t = useTranslations("common");

  const { emissionFactorUnits } = useContext(CarbonContext);

  const formContext = useForm<EmissionProxyCreateSchema>({
    defaultValues: {
      files: [],
      status: EmissionFactorProxyStatus.Draft,
      hasControlVariable: false,
      pcr_type: props.pcrTypeId ? emissionFactorProxyPCRs.find((pcr) => pcr.id == props.pcrTypeId) : undefined,
    },
    resolver: customZodResolver(emissionProxyCreateSchema),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = formContext;

  const [isLoading, setIsLoading] = useState(true);

  const close = () => {
    props.onClose(false);
  };

  const onSubmit = handleSubmit((data) => {
    props.onSubmit(data);
  });

  useEffect(() => {
    if (props.id) {
      const fetchProxy = async () => {
        const { response } = await getEmissionFactorById(props.id!);
        if (!response) return;
        response.status && setValue("status", response.status as EmissionFactorProxyStatus);
        response.name && setValue("name", response.name);
        response.unit && setValue("unit", response.unit);
        response.emission_factor_value && setValue("emission_factor_value", response.emission_factor_value);

        // TODO: 2023-11-20
        // To hide control fields, we need to force 'hasControlVariable' to false
        // response.has_control_variable && setValue("hasControlVariable", response.has_control_variable == "yes");
        response.has_control_variable && setValue("hasControlVariable", false);

        response.controll_variable_value && setValue("controlVariableValue", response.controll_variable_value);
        response.controll_variable_unit && setValue("controlVariableUnit", response.controll_variable_unit);

        const unit = emissionFactorUnits.find((value) => value.id == response.emission_factor_unit?.id);
        unit && setValue("emission_factor_unit", { id: unit.id ?? 0, label: unit.label ?? "" });

        const pcrType = emissionFactorProxyPCRs.find((pcr) => pcr.id == response.pcr_type?.id);
        pcrType && setValue("pcr_type", pcrType);

        response.files &&
          setValue(
            "files",
            response.files.map((value) => ({ id: value.id ?? "", url: value.url ?? "", type: value.type ?? "" }))
          );

        response.tooltip_flag && setValue("isTooltipEnabled", response.tooltip_flag);
        response.tooltip_data && setValue("tooltip", response.tooltip_data);

        setIsLoading(false);
      };
      fetchProxy();
    } else {
      setValue("status", EmissionFactorProxyStatus.Draft);
      setIsLoading(false);
    }
  }, [props.id]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <FormProvider {...formContext}>
      <Dialog open={props.isOpen} onClose={close} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="ml-[30%] h-full overflow-y-auto bg-white px-4 py-4 lg:px-12 xl:ml-[50%]">
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
              <div className="flex items-center justify-between">
                <p className="font-medium text-smart-cbt-dark-green">{t("carbon.emissionProxy.action.add")}</p>
                <Button onClick={close} intent="text" size="small" className="text-smart-cbt-very-dark-grey">
                  <XMarkIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row">
                <div className="flex w-full flex-col gap-10">
                  <EmissionProxyCreateFormDetail id={props.id} />
                  <div className="lg:w-[60%]">
                    <Form.ImageInput
                      required
                      control={control}
                      name="files"
                      folderName="Emission Factor"
                      onLoading={(loading) => setIsLoading(loading)}
                    />
                    <FormFieldError error={errors.files} />
                  </div>
                  <div className="flex flex-col gap-8 lg:flex-row">
                    <Button intent="primary" size="responsive" icon={<SaveDiskIcon />} onClick={onSubmit} type="submit">
                      {t("global.save")}
                    </Button>
                    <Button intent="tertiary" size="responsive" onClick={close}>
                      {t("global.cancel")}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </FormProvider>
  );
};
