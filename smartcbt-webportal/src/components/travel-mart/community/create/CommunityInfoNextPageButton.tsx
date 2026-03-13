import { Button } from "@/components/Button";
import { ArrowRightIcon } from "@/components/Icon";
import { useTranslations } from "next-intl";

export const CommunityInfoNextPageButton = ({
  onNextButtonClicked,
  currentIndex,
  total,
  isSubmitButtonHidden,
}: {
  onNextButtonClicked: () => void;
  currentIndex: number;
  total: number;
  isSubmitButtonHidden: boolean;
}) => {
  const t = useTranslations("common");
  if (isSubmitButtonHidden && currentIndex == total) return null;
  return (
    <Button
      intent={currentIndex == total ? "primary" : "secondary"}
      size="small"
      className="rounded-full md:max-w-full"
      onClick={onNextButtonClicked}
      iconRight={<ArrowRightIcon />}
    >
      {currentIndex == total ? t("community.info.create.communityDataApproval") : t("global.next")}
    </Button>
  );
};
