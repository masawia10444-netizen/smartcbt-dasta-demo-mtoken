import { TBody, Table, TableContainer, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { FormInput } from "@/components/form/FormInput";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { cn } from "@/utils/cn";
import { benefitCalculations } from "@/utils/project-create-form-helper";
import get from "lodash/get";
import { useTranslations } from "next-intl";
import { Fragment, useState } from "react";
import { useFormContext } from "react-hook-form";

type Step7TableProps = {
  hasMinCaseBenefit?: boolean;
  hasMaxCaseBenefit?: boolean;
  isExPost: boolean;
  viewOnly: boolean;
};

const Step7Table = (props: Step7TableProps) => {
  const {
    getValues,
    control,
    formState: { errors },
  } = useFormContext<CreateProjectSchema>();
  const t = useTranslations("common");
  const viewOnly = props.viewOnly;

  const project = getValues();
  const step7 = project.step6;
  const step28Data = project.step2[8] as any;
  const step29Data = project.step2[9] as any;

  const [isFileLoading, setIsFileLoading] = useState(false);

  const availableYears: string[] = [];
  for (let year = step28Data.questions[1].value; year <= step28Data.questions[2].value; year++) {
    availableYears.push(year.toString());
  }
  for (let year = Number(availableYears.slice(-1)) + 1; year <= (step29Data.questions[1] as any).value; year++) {
    availableYears.push(year.toString());
  }

  return (
    <TableContainer className="py-10">
      <Table>
        <Thead>
          <Tr>
            <Th className={cn("p-2")}>{t("project.create.step7.title")}</Th>
            {availableYears.map((year) => (
              <Th className={cn("w-24 p-2")} key={year}>
                {year}
              </Th>
            ))}
          </Tr>
        </Thead>
        <TBody bodyIntent="withoutDivider">
          {step7.sections.map((section, sectionIndex) => {
            return (
              <Fragment key={section.title}>
                <Tr>
                  <Td className="py-2 text-smart-cbt-dark-green" colSpan={availableYears.length + 1}>
                    {t("project.create.step6.benefitNo")} {`${sectionIndex + 1} ${section.title}`}
                  </Td>
                </Tr>
                {step7.sections.at(sectionIndex)?.value.map((sectionValue, sectionValueIndex, items) => (
                  <Tr key={sectionValue.title}>
                    <Td className="p-5 text-smart-cbt-dark-green">{`${sectionValue.title}`}</Td>
                    {/* {sectionValue.benefitDetails.map((benefitDetail, benefitDetailIndex) => {
                      
                    })} */}
                    {availableYears.map((year) => {
                      const benefitDetailIndex = sectionValue.benefitDetails.findIndex(
                        (benefit) => benefit.year == year
                      );
                      const benefitDetail = sectionValue.benefitDetails[benefitDetailIndex];

                      if (!benefitDetail) {
                        return (
                          <Fragment key={benefitDetailIndex}>
                            <Td intent="smallPadding" className="min-w-[110px]">
                              <FormInput
                                type="number"
                                disabled
                                value={0}
                                className="rounded text-smart-cbt-medium-grey"
                              />
                            </Td>
                          </Fragment>
                        );
                      }

                      const { netBenefitMaximmum, netBenefitMinimum } = benefitCalculations(
                        benefitDetail,
                        benefitDetail.isFilled ?? false
                      );
                      const netBenefitName = props.isExPost ? "netBenefitExPost" : "netBenefit";
                      return (
                        <Fragment key={benefitDetailIndex}>
                          {!props.hasMaxCaseBenefit && !props.hasMinCaseBenefit && (
                            <Td intent="smallPadding" className="min-w-[110px]">
                              <Form.NumberInput
                                disabled={viewOnly}
                                className="py-2 text-center"
                                control={control}
                                name={`step6.sections.${sectionIndex}.value.${sectionValueIndex}.benefitDetails.${benefitDetailIndex}.${netBenefitName}`}
                                decimalScale={2}
                              />
                            </Td>
                          )}
                          {props.hasMaxCaseBenefit && (
                            <Td intent="smallPadding" className="min-w-[110px]">
                              <Form.NumberInput
                                disabled={viewOnly}
                                className="py-2 text-center"
                                displayType="text"
                                fixedValue={netBenefitMaximmum}
                                decimalScale={2}
                              />
                            </Td>
                          )}
                          {props.hasMinCaseBenefit && (
                            <Td intent="smallPadding" className="min-w-[110px]">
                              <Form.NumberInput
                                disabled={viewOnly}
                                className="py-2 text-center"
                                displayType="text"
                                fixedValue={netBenefitMinimum}
                                decimalScale={2}
                              />
                            </Td>
                          )}
                        </Fragment>
                      );
                    })}
                  </Tr>
                ))}
                {props.isExPost && (
                  <Tr key={`${sectionIndex}-reference`} className="border-b border-smart-cbt-light-grey">
                    <Td className="p-5 text-smart-cbt-dark-green">
                      <Form.ImageInput
                        id={`step6.sections.${sectionIndex}.referenceDocuments`}
                        key={`${sectionIndex}-reference-upload`}
                        control={control}
                        folderName="SIA SROI"
                        name={`step6.sections.${sectionIndex}.referenceDocuments`}
                        disabled={isFileLoading}
                        onLoading={(loading: boolean) => setIsFileLoading(loading)}
                      />
                      <FormFieldError
                        error={get(errors, [`step6.sections.${sectionIndex}.referenceDocuments.message`], null)}
                      />
                    </Td>
                  </Tr>
                )}
              </Fragment>
            );
          })}
        </TBody>
      </Table>
    </TableContainer>
  );
};

export default Step7Table;
