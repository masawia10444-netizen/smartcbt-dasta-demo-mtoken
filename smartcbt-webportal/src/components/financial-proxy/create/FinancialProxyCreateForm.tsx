import { getSiaProxyById } from "@/app/[locale]/(authenticated)/sia-sroi/financial-proxy/actions";
import { Button } from "@/components/Button";
import Flex from "@/components/Flex";
import { InformationCircleIcon, SaveDiskIcon, XMarkIcon } from "@/components/Icon";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormLabel } from "@/components/form/FormLabel";
import { AppContext, SiaSroiContext } from "@/contexts/App.context";
import { FinancialProxy, FinancialProxyCategory, FinancialProxyStatus } from "@/models/financial-proxy";
import { customZodResolver } from "@/schemas/base-schema";
import {
  FinancialProxyCreateSchema,
  financialProxyCreateSchema,
} from "@/schemas/forms/financial-proxies/financial-proxy-create-schema";
import { generateRandomString } from "@/utils/helper";
import { Dialog } from "@headlessui/react";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FinancialProxyCreateFormDetail } from "./FinancialProxyCreateFormDetail";
import { FinancialProxyCreateTable } from "./FinancialProxyCreateTable";

type FinancialProxyCreateFormProps = {
  isOpen: boolean;
  onClose: (didCreate: boolean) => void;
  onSubmit: (data: FinancialProxyCreateSchema) => void;
  provinceId?: number;
  proxy?: FinancialProxy[];
  id: number | string | null;
};

function getNextProxyId(existingNumbers: string[]): string {
  // Initialize the starting number
  let nextNumber = 1;
  let formattedNextNumber = nextNumber.toString().padStart(3, "0"); // Format as "P00X"
  // Check if the formattedNextNumber already exists in the array
  while (existingNumbers.includes(`P${formattedNextNumber}`)) {
    nextNumber++;
    formattedNextNumber = nextNumber.toString().padStart(3, "0");
  }
  return `P${formattedNextNumber}`;
}

export const FinancialProxyCreateForm = (props: FinancialProxyCreateFormProps) => {
  const t = useTranslations("common");

  const { provinces } = useContext(AppContext);
  const { discountRates, projectTypes } = useContext(SiaSroiContext);

  const defaultProvince = props.provinceId ? provinces.find((p) => p.id == props.provinceId) : undefined;

  const formContext = useForm<FinancialProxyCreateSchema>({
    defaultValues: { files: [], province: defaultProvince, status: FinancialProxyStatus.Draft },
    resolver: customZodResolver(financialProxyCreateSchema),
  });

  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = formContext;

  const [isLoading, setIsLoading] = useState(false);

  const close = () => props.onClose(false);

  const onSubmit = async () => {
    const isValid = await formContext.trigger();
    if (!isValid) return;
    const data = watch();
    props.onSubmit(data);
  };

  useEffect(() => {
    if (props.proxy) {
      const existProxyId = props.proxy.map((p) => p.proxyId);
      const nextProxyId = getNextProxyId(existProxyId);
      setValue("proxyId", nextProxyId);
    }
    if (discountRates) setValue("discountRate", discountRates?.discount_rate);
    setValue("internalId", (props.id as string) ?? generateRandomString(16));
    if (props.id) {
      const fetchProxy = async () => {
        setIsLoading(true);
        const { response } = await getSiaProxyById((props.id as number)!);
        if (!response) {
          setIsLoading(false);
          return;
        }
        const province = provinces.find((p) => p.id == response.province?.id);
        const category = Object.values(FinancialProxyCategory).find((c) => c == response.categories.replace(" ", "_"));
        const type = projectTypes.find((t) => Number(t.value) == response.proxy_type?.id);
        const startingYear = new Date(response.start_year);
        const endingYear = new Date(response.end_year);
        setValue("status", response.status as FinancialProxyStatus);
        setValue("proxyId", response.id);
        setValue("title", response.title);
        setValue("titleEn", response.title_en ?? "");
        category && setValue("category", category);
        type && setValue("type", type);
        setValue("startingYear", startingYear.getFullYear() + 543);
        setValue("endingYear", endingYear.getFullYear() + 543);
        setValue("value", response.value);
        setValue("unit", response.unit as string);
        province && setValue("province", province);
        setValue("note", response.remark);
        // setValue("files", response.attachments.map((a) => ));
        setIsLoading(false);
      };
      fetchProxy();
    } else {
      setValue("status", FinancialProxyStatus.Draft);
    }
  }, [props.id, props.proxy, discountRates]);

  return (
    <FormProvider {...formContext}>
      <Dialog open={props.isOpen} onClose={close} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="ml-[15%] h-full overflow-y-auto bg-white px-4 py-4 lg:px-12">
            <div className="relative h-full">
              <div className="h-full">
                <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-smart-cbt-dark-green">{t("financialProxy.create.title")}</p>
                    <Button onClick={close} intent="text" size="small" className="text-smart-cbt-very-dark-grey">
                      <XMarkIcon />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-4">
                    <Flex.Container>
                      <Flex.Element>
                        <FormLabel>{t("financialProxy.create.discountRate")}</FormLabel>
                        <Form.NumberInput
                          disabled
                          control={control}
                          name="discountRate"
                          intent="disabled"
                          suffix=" %"
                          className="text-right"
                        />
                      </Flex.Element>
                      <Flex.Element>
                        <span className="mt-5 flex flex-1 gap-2 text-smart-cbt-orange">
                          <InformationCircleIcon className="w-h h-5" />
                          {t("financialProxy.create.information.discountRate.title")} <br />
                          {t("financialProxy.create.information.discountRate.description")}
                        </span>
                      </Flex.Element>
                      <Flex.Element />
                    </Flex.Container>
                    <div className="flex flex-col gap-4 lg:flex-row">
                      <div className="flex flex-[67%] flex-col gap-10">
                        <FinancialProxyCreateFormDetail provinces={provinces} />
                        <div className="lg:w-[60%]">
                          <Form.ImageInput
                            required
                            control={control}
                            name="files"
                            folderName="cbt-siasroi"
                            onLoading={(loading) => setIsLoading(loading)}
                            isSiaProxy
                          />
                          <FormFieldError error={errors.files?.message} />
                        </div>
                        <div className="flex gap-8">
                          <Button intent="primary" size="medium" icon={<SaveDiskIcon />} onClick={onSubmit}>
                            {t("financialProxy.create.save")}
                          </Button>
                          <Button intent="tertiary" size="medium" onClick={close}>
                            {t("global.cancel")}
                          </Button>
                        </div>
                      </div>
                      <div className="flex-[33%]">
                        <FinancialProxyCreateTable />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {isLoading && (
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-smart-cbt-green" />
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </FormProvider>
  );
};
