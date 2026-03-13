"use client";

import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { cn } from "@/utils/cn";
import { useTranslations } from "next-intl";
import { Fragment, PropsWithChildren } from "react";
import { NumericFormat } from "react-number-format";

const Step9SIA = ({ project }: { project: CreateProjectSchema }) => {
  const t = useTranslations("common");

  const availableYears: string[] = [];
  for (
    let year = (project.step2[8].questions[1] as any).value;
    year <= (project.step2[8].questions[2] as any).value;
    year++
  ) {
    availableYears.push(year.toString());
  }
  const grandTotal = project.step2[10].value.reduce(
    (acc, value) => (acc += value.values.reduce((acc, value) => (acc += value.amount), 0)),
    0
  );

  return (
    <FlexContainer className="flex-col">
      <FlexContainer className="ml-2 flex-col">
        <FlexContainer>
          <Label>{t("project.create.step9.projectName")}</Label>
          <Value>{project.step1.cbtProject?.title}</Value>
        </FlexContainer>
        <FlexContainer className="flex-col">
          <FlexContainer>
            <Label className="w-[212px]">{t("project.create.step9.projectDuration")}</Label>
            <Value>{(project.step2[8].questions.at(0) as any).value}</Value>
          </FlexContainer>
          <FlexContainer>
            <Label className="w-[212px]">{t("project.create.step9.startingYear")}</Label>
            <Value>{(project.step2[8].questions.at(1) as any).value}</Value>
          </FlexContainer>
          <FlexContainer className="items-baseline">
            <Label>{t("project.create.step9.projectDrivingBudget")}</Label>
            <FlexContainer className="flex-col gap-3">
              {availableYears.map((year, i) => {
                const totalForYear = project.step2[10].value
                  .find((v) => v.year == year)
                  ?.values.reduce((acc, v) => (acc += v.amount), 0);
                return (
                  <FlexContainer className="justify-between" key={i}>
                    <div className="flex gap-3">
                      <Value>{t("global.year")}</Value>
                      <Value>{availableYears[i]}</Value>
                    </div>
                    <Value>
                      <NumericFormat
                        value={totalForYear}
                        thousandSeparator=","
                        decimalScale={2}
                        fixedDecimalScale
                        displayType="text"
                      />
                    </Value>
                  </FlexContainer>
                );
              })}
              <FlexContainer className="justify-between">
                <Value>{t("project.create.step9.total")}</Value>
                <Value>
                  <NumericFormat
                    value={grandTotal}
                    thousandSeparator=","
                    decimalScale={2}
                    fixedDecimalScale
                    displayType="text"
                  />
                </Value>
              </FlexContainer>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer>
            <Label className="w-[212px]">{t("project.create.step9.projectAgencyDriving")}</Label>
            <Value>{project.step2[7].organization}</Value>
          </FlexContainer>
          <FlexContainer>
            <Label className="w-[212px]">{t("project.create.step9.projectOrganization")}</Label>
            <Value>{project.step2[7].projectAgency?.title}</Value>
          </FlexContainer>
          <FlexContainer>
            <Label className="w-[212px]">{t("project.create.step9.beneficiary")}</Label>
            <Value>{project.step2[15].value.join(", ")}</Value>
          </FlexContainer>
          <FlexContainer>
            <Label className="w-[212px]">{t("project.create.step9.rejectReason")}</Label>
            <Value>{project.remark ?? "-"}</Value>
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      {/* กิจกรรม &  ผลผลิต*/}
      <FlexContainer className="gap-1">
        <FlexContainer className="flex-1 flex-col">
          <Header>{t("project.create.step9.activities")}</Header>
          <FlexContainer className="ml-2 flex-col gap-3">
            {project.step2[12].value.map((v, i) => (
              <Value key={i}>{`${i + 1}. ${v}`}</Value>
            ))}
          </FlexContainer>
        </FlexContainer>
        <FlexContainer className="flex-1 flex-col">
          <Header>{t("project.create.step9.product")}</Header>
          <FlexContainer className="ml-2 flex-col gap-3">
            {project.step2[13].value.map((v, i) => (
              <Value key={i}>{`${i + 1}. ${v}`}</Value>
            ))}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
      {/* ผลลัพธ์ */}
      <>
        <Header>{t("project.create.step9.result")}</Header>
        <FlexContainer className="ml-2 flex-col gap-3">
          {project.step2[14].value.map((v, i) => (
            <Value key={i}>{`${i + 1}. ${v}`}</Value>
          ))}
        </FlexContainer>
      </>
      {/* ผลกระทบ */}
      <div>
        <Header>{t("project.create.step9.effect")}</Header>
        <FlexContainer className="gap-px">
          <GrayHeader>{t("project.create.step9.economic")}</GrayHeader>
          <GrayHeader>{t("project.create.step9.social")}</GrayHeader>
          <GrayHeader>{t("project.create.step9.environment")}</GrayHeader>
        </FlexContainer>
        {project.step4.map(({ title, with: { economic, social, environment } }) => (
          <Fragment key={title}>
            <p className="m-6 font-prompt text-sm font-medium">{title}</p>
            <FlexContainer className="ml-2">
              <div dangerouslySetInnerHTML={{ __html: economic }} className="flex-1 text-sm" />
              <div dangerouslySetInnerHTML={{ __html: social }} className="flex-1 text-sm" />
              <div dangerouslySetInnerHTML={{ __html: environment }} className="flex-1 text-sm" />
            </FlexContainer>
          </Fragment>
        ))}
      </div>
    </FlexContainer>
  );
};

export default Step9SIA;

const Header = ({ children }: PropsWithChildren) => {
  return <p className="bg-smart-cbt-light-green px-2 py-3 text-sm font-medium text-smart-cbt-dark-green">{children}</p>;
};

const GrayHeader = ({ children }: PropsWithChildren) => {
  return (
    <p className="flex-1 bg-smart-cbt-light-grey px-2 py-3 text-center text-sm font-medium text-black">{children}</p>
  );
};

const FlexContainer = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <div className={cn("flex gap-6", className)}>{children}</div>;
};

const Label = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <p className={cn("text-sm text-smart-cbt-dark-green", className)}>{children}</p>;
};

const Value = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
  return <p className={cn("text-sm", className)}>{children}</p>;
};
