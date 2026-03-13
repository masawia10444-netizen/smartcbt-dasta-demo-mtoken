import FormCollapsibleCheckboxQuestion from "@/components/form/questions/FormCollapsibleCheckboxQuestion";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type CommunityInfoStep3FormProps = {
  areFieldsDisabled: boolean;
};

export const CommunityInfoStep3Form = (props: CommunityInfoStep3FormProps) => {
  const t = useTranslations("common");
  const { control } = useFormContext();
  const question_1 = "step3.1";
  const question_2_1 = "step3.2-1";
  const question_2_2 = "step3.2-2";
  const question_2_3 = "step3.2-3";

  return (
    <div className="flex flex-col w-full gap-4">
      <h3 className="text-smart-cbt-dark-green">{t("community.info.create.step3.question1")}</h3>
      <FormCollapsibleCheckboxQuestion control={control} name={question_1} disabled={props.areFieldsDisabled} />
      <h3 className="text-smart-cbt-dark-green">{t("community.info.create.step3.question2")}</h3>
      <div className="flex flex-col gap-4 ml-8">
        <h3 className="text-smart-cbt-dark-green">{t("community.info.create.step3.question2_1")}</h3>
        <FormCollapsibleCheckboxQuestion control={control} name={question_2_1} disabled={props.areFieldsDisabled} />
        <h3 className="text-smart-cbt-dark-green">{t("community.info.create.step3.question2_2")}</h3>
        <FormCollapsibleCheckboxQuestion control={control} name={question_2_2} disabled={props.areFieldsDisabled} />
        <h3 className="text-smart-cbt-dark-green">{t("community.info.create.step3.question2_3")}</h3>
        <FormCollapsibleCheckboxQuestion control={control} name={question_2_3} disabled={props.areFieldsDisabled} />
      </div>
    </div>
  );
};
