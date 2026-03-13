import Form from "@/components/form/Form";
import { CreateProjectSchema } from "@/schemas/forms/projects/create/create-project-schema";
import { cn } from "@/utils/cn";
import { get, isUndefined } from "lodash";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface ProjectEffectProps {
  index: number;
  subindex: number;
  formIndex: number;
  type: "attribution" | "deadweight" | "displacement";
  viewOnly: boolean;
}

const ProjectEffectForm = (props: ProjectEffectProps) => {
  const t = useTranslations("common");

  const { index, subindex, formIndex, type } = props;
  const {
    getValues,
    setValue,
    register,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext<CreateProjectSchema>();
  const viewOnly = props.viewOnly;

  const detail = watch(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}`);

  const errorMsg = get(
    errors,
    `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.details.message`,
    null
  );

  const hasAdditionalInfo = watch(
    `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.hasAdditionalInfo`
  );

  const benefitPercentage = watch(
    `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.benefitPercentage`
  );
  const percentage = watch(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.percentage`);

  const initialBenefitPercentage = hasAdditionalInfo ? benefitPercentage : 100 - (percentage || 0);
  const initialPercentage = 100 - initialBenefitPercentage;

  const [firstInputValue, setFirstInputValue] = useState<number>(initialBenefitPercentage);
  const [secondInputValue, setSecondInputValue] = useState<number>(initialPercentage);

  const initializeInputValues = () => {
    setFirstInputValue(initialBenefitPercentage);
    setSecondInputValue(initialPercentage);
  };

  const calculateSecondInputValue = () => {
    const calculatedPercentage = 100 - (firstInputValue || 0);
    return hasAdditionalInfo ? calculatedPercentage : percentage;
  };

  const calculateFirstInputValue = () => {
    return 100 - (secondInputValue || 0);
  };

  useEffect(() => {
    // if no data set not checked
    if (isUndefined(hasAdditionalInfo)) {
      setValue(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.hasAdditionalInfo`, true);
    } else {
      setValue(
        `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.benefitPercentage`,
        calculateFirstInputValue()
      );
      setValue(
        `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.percentage`,
        calculateSecondInputValue()
      );
    }
  }, []);

  useEffect(initializeInputValues, [initialBenefitPercentage, initialPercentage]);

  const handleCheckboxChange = () => {
    // when has checked
    if (hasAdditionalInfo) {
      setFirstInputValue(100);
      setSecondInputValue(0);
      setValue(
        `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.hasAdditionalInfo`,
        false
      );
      setValue(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}`, null);
    } else {
      // when has not checked
      setValue(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.hasAdditionalInfo`, true);
      setValue(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.details`, "");
      setValue(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.benefitPercentage`, 100);
      setValue(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.percentage`, 0);
    }

    trigger();
  };

  const validatePercentageValue = (value: number) => {
    if (isNaN(value)) {
      return 0;
    }
    return Math.min(100, Math.max(0, value));
  };

  return (
    <div className="flex items-start justify-between" {...{ inert: props.viewOnly ? "" : undefined }}>
      <div className="flex w-40 items-center justify-around gap-2 px-2">
        <label className="text-sm text-black">
          {getValues(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.year`)}
        </label>
        <div className="flex gap-2">
          <input
            disabled={viewOnly}
            id={`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.hasAdditionalInfo`}
            type="checkbox"
            className={cn("form-checkbox  checked:bg-smart-cbt-green hover:cursor-pointer")}
            checked={!hasAdditionalInfo}
            onChange={handleCheckboxChange}
          />
          <label
            className="cursor-pointer text-sm text-black"
            htmlFor={`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.hasAdditionalInfo`}
          >
            {"ไม่มี"}
          </label>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-2">
        <textarea
          disabled={!hasAdditionalInfo || viewOnly}
          className={cn(
            "w-full rounded-md border border-smart-cbt-medium-grey bg-white p-2 disabled:bg-smart-cbt-light-grey disabled:text-smart-cbt-medium-grey"
          )}
          {...register(`step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.details`)}
        />
        {errorMsg && <p style={{ color: "red" }}>{t("global.requiredErrorMsg")}</p>}
      </div>
      <div className="flex w-40 justify-center px-2">
        <Form.NumberInput
          disabled={!hasAdditionalInfo || viewOnly}
          fixedValue={firstInputValue}
          allowNegative={false}
          isAllowed={(value) =>
            (value.floatValue != undefined && value.floatValue <= 100 && value.floatValue >= 0) ||
            value.floatValue == undefined
          }
          suffix="%"
          className={cn(
            "h-10 w-32 rounded-md border border-smart-cbt-medium-grey bg-white p-2 text-right disabled:bg-smart-cbt-light-grey disabled:text-smart-cbt-medium-grey"
          )}
          onValueChange={(value) => {
            const newValue = validatePercentageValue(value.floatValue ?? 0);
            setFirstInputValue(newValue);
            setSecondInputValue(100 - newValue);
            setValue(
              `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.benefitPercentage`,
              firstInputValue
            );
            setValue(
              `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.percentage`,
              secondInputValue
            );
          }}
        />
      </div>
      <div className="flex w-40 justify-center px-2">
        <Form.NumberInput
          disabled={!hasAdditionalInfo || viewOnly}
          fixedValue={secondInputValue}
          allowNegative={false}
          isAllowed={(value) =>
            (value.floatValue != undefined && value.floatValue <= 100 && value.floatValue >= 0) ||
            value.floatValue == undefined
          }
          suffix="%"
          className={cn(
            "h-10 w-32 rounded-md border border-smart-cbt-medium-grey bg-white p-2 text-right disabled:bg-smart-cbt-light-grey disabled:text-smart-cbt-medium-grey"
          )}
          onValueChange={(value) => {
            const newValue = validatePercentageValue(value.floatValue ?? 0);
            setSecondInputValue(newValue);
            setFirstInputValue(100 - newValue);
            setValue(
              `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.benefitPercentage`,
              firstInputValue
            );
            setValue(
              `step6.sections.${index}.value.${subindex}.benefitDetails.${formIndex}.${type}.percentage`,
              secondInputValue
            );
          }}
        />
      </div>
    </div>
  );
};

export default ProjectEffectForm;
