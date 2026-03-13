"use client";

import { InfoIcon } from "@/components/Icon";
import { TBody, Table, Td, Th, Thead, Tr } from "@/components/data-table/data-table-cva";
import { cn } from "@/utils/cn";
import { SocialReturnOnInvestment } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { DetailedHTMLProps, Fragment, PropsWithChildren, TdHTMLAttributes } from "react";
import { NumericFormat } from "react-number-format";

interface Step9TableProps {
  id?: string;
  tableData: SocialReturnOnInvestment;
  smallerFont?: boolean;
}

const Step9Table = (props: Step9TableProps) => {
  const t = useTranslations("common");
  const { id, tableData, smallerFont } = props;
  const {
    availableProjectYears,
    availableAfterProjectYears,
    allYears,
    fullTableColSpan,
    discountRate,
    initialInvestment,
    totalInitialInvestment,
    presentValueOfInvestment,
    totalNPVInitialInvestment,
    allAttributions,
    allDeadweights,
    allDisplacements,
    totalBaseCaseImpact,
    presentBaseCaseImpact,
    totalPresentBaseCaseImpact,
    benefits,
    totalBenefit,
    presentBenefit,
    totalPresentBenefit,
    netSocialReturnOnInvestment,
    netPresentValue,
    totalNetNPVSROI,
    sroiRatio,
    sroiIRR,
  } = tableData;

  const intent = smallerFont ? "smallerFont" : undefined;
  return (
    <Table id={id} className={cn("mt-2 border-spacing-8  ", smallerFont && "text-2xs")}>
      <Thead className="divide-y-4 divide-white">
        <Tr className="divide-x-4 divide-white">
          <Th className="w-[390px] font-semibold" rowSpan={2} intent={intent}>
            {t("project.create.step9.socialReturnOnInvestment")}
          </Th>
          <Th className="font-semibold" colSpan={availableProjectYears.length} intent={intent}>
            {t("project.create.step9.implementationPeriod")}
          </Th>
          <Th className="font-semibold" colSpan={availableAfterProjectYears.length} intent={intent}>
            {t("project.create.step9.afterProjectPeriod")}
          </Th>
        </Tr>
        <Tr>
          {allYears.map((y, yi) => (
            <Th key={yi} className="border-l-4 border-white font-normal" intent={intent}>
              {y}
            </Th>
          ))}
        </Tr>
      </Thead>
      <TBody bodyIntent="withoutDivider">
        <Tr className="art-cbt-brown bg-smart-cbt-yellow-3 font-semibold">
          <Td className="py-3" colSpan={fullTableColSpan} intent={intent}>
            {t("project.create.step9.assumptionData")}
          </Td>
        </Tr>
        <DividedTr>
          <Td intent={intent}>{t("project.create.step9.discountRate", { rate: discountRate })}</Td>
          {allYears.map((y, yi) => (
            <Td className="text-right" intent={intent} key={yi}>
              -
            </Td>
          ))}
        </DividedTr>
        <DividedTr className="art-cbt-brown bg-smart-cbt-yellow-3 font-semibold">
          <Td className="py-3" colSpan={fullTableColSpan} intent={intent}>
            {t("project.create.step9.initialInvestment")}
          </Td>
        </DividedTr>
        {initialInvestment.map((row, ri) => (
          <DividedTr key={ri}>
            <Td intent={intent}>{row.title}</Td>
            {row.values.map((value, vi) => (
              <NumberCell smallerFont={smallerFont} key={vi} value={value} />
            ))}
          </DividedTr>
        ))}
        <DividedTr>
          <Td intent={intent}>{t("project.create.step9.totalCost")}</Td>
          {totalInitialInvestment.map((value, vi) => (
            <NumberCell smallerFont={smallerFont} key={vi} value={value} />
          ))}
        </DividedTr>
        <DividedTr>
          <Td intent={intent}>{t("project.create.step9.presentValueInvestment")}</Td>
          {presentValueOfInvestment.map((value, vi) => (
            <NumberCell key={vi} value={value} smallerFont={smallerFont} />
          ))}
        </DividedTr>
        <DividedTr>
          <Td intent={intent}>{t("project.create.step9.totalInitialInvestment")}</Td>
          <NumberCell smallerFont={smallerFont} value={totalNPVInitialInvestment} />
        </DividedTr>
        <Tr className="art-cbt-brown bg-smart-cbt-yellow-3 font-semibold">
          <Td className="py-3" colSpan={fullTableColSpan} intent={intent}>
            {t("project.create.step9.baseCaseImpact")}
          </Td>
        </Tr>
        <Tr className="bg-smart-cbt-light-grey ">
          <Td className="py-3" colSpan={fullTableColSpan} intent={intent}>
            {t("project.create.step9.attibutionTitle")}
          </Td>
        </Tr>
        {allAttributions.map((attribution, ai) => (
          <DividedTr key={ai}>
            <Td key={ai} intent={intent}>
              {attribution.title}
              {attribution.hasCreatedProxy && (
                <InfoIcon className="ml-2 inline h-3 w-3 rounded-full bg-smart-cbt-orange text-white" />
              )}
            </Td>
            {attribution.values.map((value, vi) => (
              <NumberCell smallerFont={smallerFont} key={vi} value={value} />
            ))}
          </DividedTr>
        ))}
        <Tr className="bg-smart-cbt-light-grey ">
          <Td className="py-3" colSpan={fullTableColSpan} intent={intent}>
            {t("project.create.step9.deadweightTitle")}
          </Td>
        </Tr>
        {allDeadweights.map((deadweight, ai) => (
          <DividedTr key={ai}>
            <Td key={ai} intent={intent}>
              {deadweight.title}
              {deadweight.hasCreatedProxy && (
                <InfoIcon className="ml-2 inline h-3 w-3 rounded-full bg-smart-cbt-orange text-white" />
              )}
            </Td>
            {deadweight.values.map((value, vi) => (
              <NumberCell smallerFont={smallerFont} key={vi} value={value} />
            ))}
          </DividedTr>
        ))}
        <Tr className="bg-smart-cbt-light-grey ">
          <Td className="py-3" colSpan={fullTableColSpan} intent={intent}>
            {t("project.create.step9.displacementTitle")}
          </Td>
        </Tr>
        {allDisplacements.map((displacement, ai) => (
          <DividedTr key={ai}>
            <Td intent={intent}>
              {displacement.title}
              {displacement.hasCreatedProxy && (
                <InfoIcon className="ml-2 inline h-3 w-3 rounded-full bg-smart-cbt-orange text-white" />
              )}
            </Td>
            {displacement.values.map((value: any, vi) => (
              <NumberCell smallerFont={smallerFont} key={vi} value={value} />
            ))}
          </DividedTr>
        ))}
        <DividedTr className="border-t border-smart-cbt-light-grey">
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.totalBaseCaseImpact")}
          </Td>
          {totalBaseCaseImpact.map((total, ti) => (
            <NumberCell smallerFont={smallerFont} value={total} key={ti} />
          ))}
        </DividedTr>
        <DividedTr>
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.presentBaseCaseImpact")}
          </Td>
          {presentBaseCaseImpact.map((value, vi) => (
            <NumberCell smallerFont={smallerFont} value={value} key={vi} />
          ))}
        </DividedTr>
        <DividedTr>
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.totalPresentBaseCaseImpact")}
          </Td>
          <NumberCell smallerFont={smallerFont} value={totalPresentBaseCaseImpact} />
        </DividedTr>
        <Tr className="art-cbt-brown bg-smart-cbt-yellow-3 font-semibold">
          <Td className="py-3" colSpan={fullTableColSpan} intent={intent}>
            {t("project.create.step9.benefit")}
          </Td>
        </Tr>
        {benefits.map((benefit, bi) => (
          <Fragment key={bi}>
            <Tr className="bg-smart-cbt-light-grey">
              <Td colSpan={fullTableColSpan} intent={intent}>
                {benefit.title}
              </Td>
            </Tr>
            {benefit.values.map((benefitValue, bi) => (
              <DividedTr key={bi}>
                <Td intent={intent}>{benefitValue.title}</Td>
                {benefitValue.values.map((value, vi) => (
                  <NumberCell smallerFont={smallerFont} key={vi} value={value} />
                ))}
              </DividedTr>
            ))}
          </Fragment>
        ))}
        <DividedTr className="border-t border-smart-cbt-light-grey">
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.totalTotal")}
          </Td>
          {totalBenefit.map((total, ti) => (
            <NumberCell smallerFont={smallerFont} value={total} key={ti} />
          ))}
        </DividedTr>
        <DividedTr>
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.presentBenefit")}
          </Td>
          {presentBenefit.map((value, vi) => (
            <NumberCell smallerFont={smallerFont} value={value} key={vi} />
          ))}
        </DividedTr>
        <DividedTr>
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.totalPresentBenefit")}
          </Td>
          <NumberCell smallerFont={smallerFont} value={totalPresentBenefit} />
        </DividedTr>
        <Tr className="art-cbt-brown bg-smart-cbt-yellow-3 font-semibold">
          <Td className="py-3" colSpan={fullTableColSpan} intent={intent}>
            {t("project.create.step9.sroiSummary")}
          </Td>
        </Tr>
        <DividedTr className="border-t border-smart-cbt-light-grey">
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.totalPresentBenefitBaseCaseImpact")}
          </Td>
          {netSocialReturnOnInvestment.map((total, ti) => (
            <NumberCell smallerFont={smallerFont} value={total} key={ti} />
          ))}
        </DividedTr>
        <DividedTr>
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.totalBenefitTotalCostBaseCaseImpact")}
          </Td>
          {netPresentValue.map((value, vi) => (
            <NumberCell smallerFont={smallerFont} value={value} key={vi} />
          ))}
        </DividedTr>
        <DividedTr>
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.presentValue")}
          </Td>
          <NumberCell smallerFont={smallerFont} value={totalNetNPVSROI} />
        </DividedTr>
        <DividedTr>
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.sroiRatio")}
          </Td>
          <NumberCell smallerFont={smallerFont} value={sroiRatio} suffix="x" />
        </DividedTr>
        <DividedTr>
          <Td className="text-right font-semibold" intent={intent}>
            {t("project.create.step9.sroiIRR")}
          </Td>
          <NumberCell smallerFont={smallerFont} value={sroiIRR} suffix="%" />
        </DividedTr>
      </TBody>
    </Table>
  );
};

const DividedTr = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <Tr className={cn("divide-x divide-smart-cbt-light-grey", className)}>{children}</Tr>
);

const NumberCell = (
  props: {
    value: number | string | null | undefined;
    suffix?: string;
    smallerFont?: boolean;
  } & DetailedHTMLProps<TdHTMLAttributes<HTMLTableCellElement>, HTMLTableCellElement>
) => {
  const { value, smallerFont, ...tdProps } = props;
  return (
    <Td className="text-right" intent={smallerFont ? "smallerFont" : undefined} {...tdProps}>
      <NumericFormat
        displayType="text"
        thousandSeparator={","}
        value={value ?? "-"}
        decimalScale={2}
        fixedDecimalScale
        suffix={props.suffix}
      />
    </Td>
  );
};

export default Step9Table;
