import { Button } from "@/components/Button";
import { useTranslations } from "next-intl";

type TravelMartStepButtonProps = {
  isLoading: boolean;
  disabledSubmit?: boolean;
  disabledNext?: boolean;
  intentSubmit?: "primary" | "secondary" | "tertiary" | "text" | "danger" | "disabled" | null;
  intentNext?: "primary" | "secondary" | "tertiary" | "text" | "danger" | "disabled" | null;
  isLastStep: boolean;
  handleNext: () => void;
  mode: "create" | "view";
};

const TravelMartStepButton = ({
  isLastStep,
  handleNext,
  isLoading,
  intentSubmit,
  intentNext,
  disabledNext,
  disabledSubmit,
  mode,
}: TravelMartStepButtonProps) => {
  const t = useTranslations("common");

  return (
    <div className="flex flex-col items-center">
      {isLastStep ? (
        mode == "create" && (
          <Button
            intent={intentSubmit ? intentSubmit : "secondary"}
            disabled={disabledSubmit}
            className="rounded-full md:md:max-w-full"
            size="medium"
            type="submit"
          >
            {t("travelMart.register.confirmRegistration")}
          </Button>
        )
      ) : (
        <Button
          intent={intentNext ? intentNext : "secondary"}
          disabled={disabledNext}
          className="rounded-full"
          onClick={handleNext}
          size="medium"
          type="button"
        >
          {t("travelMart.register.entrepreneur.step.next")}
        </Button>
      )}
    </div>
  );
};

export default TravelMartStepButton;
