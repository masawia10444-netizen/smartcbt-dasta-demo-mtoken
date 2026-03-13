import { createFinancialProxyAction } from "@/app/[locale]/(authenticated)/sia-sroi/action";
import { getSiaProxyById } from "@/app/[locale]/(authenticated)/sia-sroi/financial-proxy/actions";
import {
  getFinancialMinorProxiesByYear,
  getFinancialProxiesByYear,
} from "@/app/[locale]/(authenticated)/sia-sroi/projects/action";
import { AddPlusIcon, DeleteIcon, InfoIcon } from "@/components/Icon";
import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { FinancialProxyCreateForm } from "@/components/financial-proxy/create/FinancialProxyCreateForm";
import Form from "@/components/form/Form";
import { SiaSroiContext } from "@/contexts/App.context";
import { FinancialProxyCategory, mockFinancialProxies } from "@/models/financial-proxy";
import { FinancialProxyCreateSchema } from "@/schemas/forms/financial-proxies/financial-proxy-create-schema";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { Step8DetailsSchema } from "@/schemas/forms/projects/create/step8-schema";
import { FinancialProxiesJson } from "@/utils/cms/adapters/website/sia/financial-proxies";
import { FinancialProxiesBody } from "@/utils/cms/adapters/website/sia/types/project";
import { cn } from "@/utils/cn";
import { handleAPIError } from "@/utils/helper";
import { benefitCalculations, financialProxyCalculation, viewMode } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { Fragment, useContext, useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { blankBenefit } from "./Step6TableContainer";

type Step6TableProps = {
  hasMinCaseBenefit?: boolean;
  hasMaxCaseBenefit?: boolean;
  availableYears: string[];
};
const Step6Table = (props: Step6TableProps) => {
  const t = useTranslations("common");

  const { getValues } = useFormContext<CreateProjectSchema>();
  const project = getValues();

  const { viewOnly } = viewMode(getValues());

  const step61Data = project.step6;

  const showingWithBenefits = props.hasMaxCaseBenefit || props.hasMinCaseBenefit || false;

  // const createdProxies = step61Data.proxyCreated
  //   ?.flatMap((value: any) => value)
  //   .filter((p: AnyARecord): p is any => !!p);

  const columns = [
    { title: t("project.create.step61.number"), isProxy: false },
    { title: t("project.create.step61.title"), isProxy: false },
    { title: t("project.create.step61.year"), isProxy: false },
    showingWithBenefits ? { title: t("project.create.step61.percentageAdjustment") } : null,
    { title: t("project.create.step61.quantity"), isProxy: false },
    { title: t("project.create.step61.unitPerYear"), isProxy: false },
    { title: t("project.create.step61.proxy"), isProxy: true },
    { title: t("project.create.step61.proxyUnit"), isProxy: true },
    { title: t("project.create.step61.proxyValue"), isProxy: true },
    { title: t("project.create.step61.totalAmount"), isProxy: true },
    { title: t("project.create.step61.variableCost"), isProxy: false },
    { title: t("project.create.step61.nonVariableCost"), isProxy: false },
    { title: t("project.create.step61.netBenefit"), isProxy: true },
    { title: t("project.create.step61.delete"), isProxy: false },
  ].filter((e): e is { title: string; isProxy: boolean } => !!e);

  return (
    <Table className="relative">
      <Thead>
        <Tr>
          {columns.map((c, i) => (
            <Th
              key={c.title}
              className={cn(
                "relative border-b px-8",
                c.isProxy
                  ? "border-bg-smart-cbt-medium-grey bg-smart-cbt-light-grey text-smart-cbt-dark-grey before:bg-smart-cbt-medium-grey"
                  : "border-smart-cbt-dark-green before:bg-smart-cbt-dark-green",
                i > 0 && "before:absolute before:left-0 before:h-1/2 before:w-px"
              )}
            >
              {c.title}
            </Th>
          ))}
        </Tr>
      </Thead>

      <TBody bodyIntent="withoutDivider">
        {step61Data.sections.map((section, sectionIndex) => {
          return (
            <Fragment key={sectionIndex}>
              <Tr>
                <Td
                  className="border-b border-smart-cbt-dark-green bg-smart-cbt-light-green py-2 text-smart-cbt-dark-green"
                  colSpan={columns.length}
                >
                  {t("project.create.step6.benefitNo")} {`${sectionIndex + 1} ${section.title}`}
                </Td>
              </Tr>
              {section.value.map((sectionValue, sectionValueIndex) => {
                return (
                  <SectionValueRow
                    key={sectionValueIndex}
                    sectionValueIndex={sectionValueIndex}
                    showingWithBenefits={showingWithBenefits}
                    availableYears={props.availableYears}
                    sectionValue={sectionValue}
                    sectionIndex={sectionIndex}
                    hasMaxCaseBenefit={props.hasMaxCaseBenefit ?? false}
                    hasMinCaseBenefit={props.hasMinCaseBenefit ?? false}
                    columnLength={columns.length}
                    viewOnly={viewOnly}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </TBody>
    </Table>
  );
};

export default Step6Table;

type SectionValueRowProps = {
  sectionValueIndex: number;
  sectionValue: Step8DetailsSchema;
  sectionIndex: number;
  availableYears: string[];
  showingWithBenefits: boolean;
  hasMaxCaseBenefit: boolean;
  hasMinCaseBenefit: boolean;

  columnLength: number;
  viewOnly: boolean;
};
const SectionValueRow = ({
  sectionValueIndex,
  showingWithBenefits,
  availableYears,
  sectionValue,
  sectionIndex,
  hasMaxCaseBenefit,
  hasMinCaseBenefit,
  columnLength,
  viewOnly,
}: SectionValueRowProps) => {
  const { discountRates, projectTypes } = useContext(SiaSroiContext);
  const filteredBenefits = sectionValue.benefitDetails.filter((bd) => bd.isFilled == true);

  const yearsAlreadyTaken = filteredBenefits.map((b) => b.year);
  const remainingAvailableYears = availableYears.filter((v) => !yearsAlreadyTaken.includes(v));

  const [showCreateProxyForm, setShowCreateProxyForm] = useState<{
    sectionIndex: number;
    sectionValueIndex: number;
    benefitDetailIndex: number;
  } | null>(null);

  const t = useTranslations("common");

  const { setValue, register, control, getValues, watch } = useFormContext<CreateProjectSchema>();
  const project = watch();

  const { fields, append, remove, update } = useFieldArray({
    name: `step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails`,
    control,
    keyName: "fieldId",
  });

  useEffect(() => {
    fields.forEach(async (data, index) => {
      await handleFetchingProxiesByYear(String(data.year), index);
    });
  }, []);

  const step61Data = project.step6;

  let createdProxies = step61Data.proxyCreated ?? [];

  const handleFetchingProxiesByYear = async (year: string, benefitDetailIndex: number) => {
    const [majorProxies, minorProxies] = await Promise.all([
      getFinancialProxiesByYear(year),
      getFinancialMinorProxiesByYear(project.user_created ?? "", year),
    ]);

    const proxies = majorProxies.concat(minorProxies);

    // transform proxies

    const transformProxies = proxies.map((proxy): FinancialProxyCreateSchema => {
      return {
        discountRate: discountRates?.discount_rate ?? 0,
        status: proxy.status,
        proxyId: proxy.id,
        title: proxy.title,
        titleEn: proxy.title_en,
        category: proxy.categories,
        // type: z.object({ key: z.string(), value: z.string(), label: z.string() }),
        type: {
          key: String(proxy?.proxy_type?.id),
          value: String(proxy?.proxy_type?.id),
          label: proxy?.proxy_type?.title,
        },
        startingYear: proxy.start_year,
        endingYear: proxy.end_year,
        value: proxy.value,
        unit: proxy.unit,
        // province: z.object({ id: z.number().nullish().optional(), title: z.string().nullish() }).nullable(),
        province: {
          id: proxy.province?.id,
          title: proxy.province?.title,
        },
        files: [],
        createdBy: proxy.user_created,
      };
    });

    setValue(
      `step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.proxies`,
      proxies
    );

    createdProxies = transformProxies;
  };

  const handleNewProxySave = async (data: FinancialProxyCreateSchema) => {
    if (!showCreateProxyForm) return;

    const startYear = new Date();
    const endYear = new Date();
    startYear.setFullYear(data.startingYear - 543);
    endYear.setFullYear(data.endingYear - 543);

    const dataFinancialProxyCalculation = financialProxyCalculation(data);

    const body: FinancialProxiesBody = {
      is_supported_all_province: false,
      remark: data.note ?? "",
      growth_rate: data.discountRate,
      value: data.value,
      title_en: data.titleEn,
      growth_formula: "npv",
      categories: data.category,
      title: data.title,
      status: data.status,
      start_year: startYear?.toISOString(),
      end_year: endYear?.toISOString(),
      proxy_type: Number(data.type.value),
      unit: data.unit,
      province: data.province?.id,
      growth_rate_calculation_detail: dataFinancialProxyCalculation.map((d) => {
        return {
          year: d.year,
          year_index: d.offset,
          value: d.value,
        };
      }),
      attachments: data.files.map((f) => ({
        directus_files_id: f.id,
      })),
    };

    const { response, error } = await createFinancialProxyAction(body);
    if (error) {
      console.info(error);
      handleAPIError(error);
      return;
    }

    data.id = response.id;
    setValue(
      `step6.sections.${showCreateProxyForm.sectionIndex}.value.${showCreateProxyForm.sectionValueIndex}.benefitDetails.${showCreateProxyForm.benefitDetailIndex}.proxy`,
      data
    );
    const proxies = [...(createdProxies ?? []), data];
    setValue(`step6.proxyCreated`, proxies);
    setValue(
      `step6.sections.${showCreateProxyForm.sectionIndex}.value.${showCreateProxyForm.sectionValueIndex}.benefitDetails.${showCreateProxyForm.benefitDetailIndex}.isCreatedProxy`,
      true
    );
    setShowCreateProxyForm(null);

    const benefitDetail = getValues(
      `step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${showCreateProxyForm.benefitDetailIndex}`
    );

    if (!benefitDetail.year) return;
    handleFetchingProxiesByYear(benefitDetail.year, showCreateProxyForm.benefitDetailIndex);
  };

  const handleSelectedProxy = async (
    data: FinancialProxiesJson,
    next: (p: FinancialProxiesJson) => void,
    params: {
      sectionIndex: number;
      sectionValueIndex: number;
      benefitDetailIndex: number;
    }
  ) => {
    next(data);
    setValue(
      `step6.sections.${params.sectionIndex}.value.${params.sectionValueIndex}.benefitDetails.${params.benefitDetailIndex}.isCreatedProxy`,
      createdProxies.map((proxy) => proxy.id).includes(data.id.toString())
    );

    const { response } = await getSiaProxyById((data.id as number)!);
    if (!response) return;

    const category = Object.values(FinancialProxyCategory).find((c) => c == response.categories.replace(" ", "_"));
    const discountRate = discountRates?.discount_rate ?? 0;
    const startingYear = response.start_year ? new Date(response.start_year).getFullYear() + 543 : 0;
    const endingYear = response.end_year ? new Date(response.end_year).getFullYear() + 543 : 0;
    const type = projectTypes.find((t) => Number(t.value) == response.proxy_type?.id);
    const unit = response.unit ?? " ";
    const attachments = [{ id: "", url: "", type: "" }];

    setValue(
      `step6.sections.${params.sectionIndex}.value.${params.sectionValueIndex}.benefitDetails.${params.benefitDetailIndex}.proxy.discountRate`,
      discountRate
    );
    setValue(
      `step6.sections.${params.sectionIndex}.value.${params.sectionValueIndex}.benefitDetails.${params.benefitDetailIndex}.proxy.startingYear`,
      startingYear
    );
    setValue(
      `step6.sections.${params.sectionIndex}.value.${params.sectionValueIndex}.benefitDetails.${params.benefitDetailIndex}.proxy.endingYear`,
      endingYear
    );
    setValue(
      `step6.sections.${params.sectionIndex}.value.${params.sectionValueIndex}.benefitDetails.${params.benefitDetailIndex}.proxy.files`,
      attachments
    );
    setValue(
      `step6.sections.${params.sectionIndex}.value.${params.sectionValueIndex}.benefitDetails.${params.benefitDetailIndex}.proxy.unit`,
      unit
    );
    category &&
      setValue(
        `step6.sections.${params.sectionIndex}.value.${params.sectionValueIndex}.benefitDetails.${params.benefitDetailIndex}.proxy.category`,
        category
      );
    type &&
      setValue(
        `step6.sections.${params.sectionIndex}.value.${params.sectionValueIndex}.benefitDetails.${params.benefitDetailIndex}.proxy.type`,
        type
      );
  };

  const handleNewProxyCreate = (params: {
    sectionIndex: number;
    sectionValueIndex: number;
    benefitDetailIndex: number;
  }) => {
    setShowCreateProxyForm(params);
  };

  let filledIndex = 0;

  // filter only field that has proxy
  const filterFields = viewOnly ? fields.filter((field) => field.proxy) : fields;

  return (
    <>
      {filteredBenefits && filteredBenefits.length > 0 ? (
        filterFields.map((field: any, benefitDetailIndex: any) => {
          const benefitDetail = getValues(
            `step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}`
          ) as any;

          const proxies = benefitDetail.year ? [null, ...(benefitDetail.proxies ?? [])] : [];

          if (!benefitDetail.isFilled) return null;
          filledIndex += 1;
          const {
            netBenefit,
            netBenefitMaximmum,
            netBenefitMinimum,
            proxyValue,
            totalAmount,
            adjustedMaximumAmount,
            adjustedMinimumAmount,
            totalMinimumAmount,
            totalMaximumAmount,
          } = benefitCalculations(benefitDetail, true);
          return (
            <Tr
              key={field.fieldId}
              className={cn(
                showingWithBenefits &&
                  benefitDetailIndex == filteredBenefits.length - 1 &&
                  "border-b border-smart-cbt-light-grey",
                "align-top"
              )}
            >
              {filledIndex == 1 && (
                <>
                  <Td intent="smallPadding" className="text-center" rowSpan={filteredBenefits.length}>{`${
                    sectionIndex + 1
                  }.${sectionValueIndex + 1}`}</Td>
                  <Td className="h-px min-w-[272px]" rowSpan={filteredBenefits.length}>
                    <Form.TextArea
                      disabled={showingWithBenefits || viewOnly}
                      intent={showingWithBenefits || viewOnly ? "displayOnly" : "primary"}
                      className="h-full py-2"
                      {...register(`step6.sections.${sectionIndex}.value.${sectionValueIndex}.title`)}
                    />
                  </Td>
                </>
              )}
              <Td className="min-w-[132px]">
                {showingWithBenefits ? (
                  <p className="py-2 text-center">{benefitDetail.year}</p>
                ) : (
                  <Form.SelectDropDown
                    disabled={showingWithBenefits || viewOnly}
                    intent={showingWithBenefits ? "displayOnly" : "form"}
                    className="py-2"
                    idKey={null}
                    placeholder="-"
                    displayKey={null}
                    values={remainingAvailableYears}
                    control={control}
                    onChangeInterceptor={(value, next) => {
                      const existingManuallyFilledBdForYearIndex = sectionValue.benefitDetails.findIndex(
                        (bd) => bd.year == value
                      );
                      if (existingManuallyFilledBdForYearIndex != -1) {
                        update(benefitDetailIndex, { ...benefitDetail, year: value, isFilled: true });
                        remove(existingManuallyFilledBdForYearIndex);
                      } else {
                        next(value);
                      }
                      handleFetchingProxiesByYear(value, benefitDetailIndex);
                    }}
                    name={`step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.year`}
                  />
                )}
              </Td>
              {hasMaxCaseBenefit && (
                <Td className="min-w-[132px]">
                  <Form.NumberInput
                    disabled={viewOnly}
                    className="py-2 text-center"
                    control={control}
                    prefix="+"
                    suffix="%"
                    name={`step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.maximumPercentage`}
                    decimalScale={2}
                  />
                </Td>
              )}
              {hasMinCaseBenefit && (
                <Td className="min-w-[132px]">
                  <Form.NumberInput
                    disabled={viewOnly}
                    className="py-2 text-center"
                    control={control}
                    prefix="-"
                    allowNegative={false}
                    suffix="%"
                    name={`step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.minimumPercentage`}
                    decimalScale={2}
                  />
                </Td>
              )}
              <Td className="min-w-[132px]">
                {showingWithBenefits ? (
                  <Form.NumberInput
                    disabled={viewOnly}
                    decimalScale={2}
                    className="block pt-2 text-center"
                    displayType="text"
                    fixedDecimalScale
                    fixedValue={hasMaxCaseBenefit ? adjustedMaximumAmount : adjustedMinimumAmount}
                  />
                ) : (
                  <Form.NumberInput
                    disabled={false}
                    displayType={showingWithBenefits ? "text" : "input"}
                    className="block py-2 text-center"
                    control={control}
                    name={`step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.amount`}
                    defaultValue={undefined}
                    decimalScale={2}
                  />
                )}
              </Td>
              <Td className="min-w-[132px] border-r border-smart-cbt-medium-grey">
                <Form.Input
                  disabled={showingWithBenefits || viewOnly}
                  intent={showingWithBenefits ? "displayOnly" : "primary"}
                  className="py-2 text-center"
                  {...register(
                    `step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.unitPerYear`
                  )}
                />
              </Td>
              {/* <Td className="min-w-[200px]">Proxy selection</Td> */}
              <Td className="min-w-[200px]">
                {showingWithBenefits ? (
                  <p className="py-2">{benefitDetail.proxy?.title}</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Form.DropDownSearch
                      values={proxies}
                      idKey="id"
                      disabled={viewOnly}
                      title=""
                      nullDisplay=""
                      filterKey="title"
                      displayKey="title"
                      itemDisplayFunction={(item) =>
                        item ? (
                          <div key={item.title} className="p-2">
                            {item.title}
                          </div>
                        ) : (
                          <div
                            key="createNewProxy"
                            className="flex h-full w-full items-center gap-4 bg-white p-2 text-smart-cbt-blue"
                          >
                            <AddPlusIcon />
                            {t("project.create.step61.newProxy")}
                          </div>
                        )
                      }
                      onChangeInterceptor={(v, next) => {
                        const position = {
                          sectionIndex,
                          sectionValueIndex,
                          benefitDetailIndex,
                        };
                        v ? handleSelectedProxy(v, next, position) : handleNewProxyCreate(position);
                      }}
                      placeholder=""
                      inputEditable={true}
                      name={`step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.proxy`}
                      control={control}
                      fixed={false}
                    />
                    {benefitDetail.isCreatedProxy && (
                      <p className="flex items-center gap-2 text-xs text-smart-cbt-orange">
                        <InfoIcon className="mb-1 h-4 w-4 rounded-full bg-smart-cbt-orange text-white" />
                        {t("project.create.step61.pendingCreateProxyInfo")}
                      </p>
                    )}
                  </div>
                )}
              </Td>
              <Td className="min-w-[142px] text-center">
                <p className="pt-2">{benefitDetail.proxy?.unit}</p>
              </Td>
              <Td className="min-w-[132px]">
                <Form.NumberInput
                  disabled={viewOnly}
                  decimalScale={2}
                  className="block pt-2 text-center"
                  displayType="text"
                  fixedDecimalScale
                  // fixedValue={benefitDetail.proxy?.value}
                  fixedValue={proxyValue}
                />
              </Td>
              <Td className="min-w-[150px]">
                <Form.NumberInput
                  disabled={viewOnly}
                  decimalScale={2}
                  className="block pt-2 text-center"
                  displayType="text"
                  fixedDecimalScale
                  fixedValue={
                    hasMaxCaseBenefit ? totalMaximumAmount : hasMinCaseBenefit ? totalMinimumAmount : totalAmount
                  }
                />
              </Td>
              <Td>
                <Form.NumberInput
                  disabled={false}
                  displayType={showingWithBenefits ? "text" : "input"}
                  className="block py-2 text-center"
                  control={control}
                  name={`step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.variableCost`}
                  decimalScale={2}
                />
              </Td>
              <Td>
                <Form.NumberInput
                  disabled={false}
                  displayType={showingWithBenefits ? "text" : "input"}
                  className="block py-2 text-center"
                  control={control}
                  name={`step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.nonVariableCost`}
                  decimalScale={2}
                />
              </Td>
              <Td>
                {/* มูลค่าผลประโยชน์สุทธิ = ผลรวมมูลค่า - [(ต้นทุนผันแปร*จำนวน)+ต้นทุนไม่ผันแปร] */}
                <Form.NumberInput
                  disabled={viewOnly}
                  decimalScale={2}
                  fixedDecimalScale
                  className="block pt-2 text-center"
                  displayType="text"
                  fixedValue={
                    hasMaxCaseBenefit ? netBenefitMaximmum : hasMinCaseBenefit ? netBenefitMinimum : netBenefit
                  }
                />
              </Td>
              <Td>
                <button
                  onClick={() => {
                    remove(benefitDetailIndex);
                  }}
                  type="button"
                  className="h-8 w-full text-smart-cbt-red"
                >
                  <DeleteIcon className="mx-auto" />
                </button>
              </Td>
            </Tr>
          );
        })
      ) : (
        <Tr className="align-top">
          <Td intent="smallPadding" className="text-center">{`${sectionIndex + 1}.${sectionValueIndex + 1}`}</Td>
          <Td className="min-w-[272px]">
            <Form.TextArea
              disabled={showingWithBenefits || viewOnly}
              intent={showingWithBenefits ? "displayOnly" : "primary"}
              className="h-full py-2"
              {...register(`step6.sections.${sectionIndex}.value.${sectionValueIndex}.title`)}
            />
          </Td>
        </Tr>
      )}

      {filteredBenefits.length < availableYears.length && !showingWithBenefits && (
        <Tr>
          <Td className="px-0 pb-4 pt-2" colSpan={columnLength}>
            <button
              type="button"
              className="border-smart-cbt-medium-grey-grey flex w-full justify-center gap-4 rounded-lg border border-dashed py-2 text-sm text-smart-cbt-medium-grey"
              onClick={() => {
                append(blankBenefit(true));
              }}
            >
              <AddPlusIcon />
              {t("project.create.step61.addNewBenefit")}
            </button>
          </Td>
        </Tr>
      )}
      {showCreateProxyForm && (
        <FinancialProxyCreateForm
          onClose={() => setShowCreateProxyForm(null)}
          onSubmit={handleNewProxySave}
          provinceId={project.step2[5].province?.id}
          isOpen={showCreateProxyForm != null}
          proxy={mockFinancialProxies}
          id={null}
        />
      )}
    </>
  );
};
