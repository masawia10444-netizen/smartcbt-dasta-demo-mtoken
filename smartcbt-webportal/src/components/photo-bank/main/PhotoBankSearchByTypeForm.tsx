"use client";

import { Button } from "@/components/Button";
import FormDropdown from "@/components/form/FormDropdown";
import { FormFieldError } from "@/components/form/FormFieldError";
import { customZodResolver } from "@/schemas/base-schema";
import {
  PhotoBankMainSearchByTypeSchema,
  photoBankMainSearchByTypeSchema,
} from "@/schemas/forms/photo-bank/photo-bank-main-search-by-type-schema";
import { ProvinceJSONData } from "@/utils/cms/adapters/master-data/geolocation/provinces";
import { CommunityJSONData } from "@/utils/cms/adapters/website/travel-mart/communities";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type PhotoBankSearchByTypeFormProps = {
  provinces: ProvinceJSONData[];
  communities: CommunityJSONData[];
};

const PhotoBankSearchByTypeForm = (props: PhotoBankSearchByTypeFormProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  const { provinces, communities } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhotoBankMainSearchByTypeSchema>({
    resolver: customZodResolver(photoBankMainSearchByTypeSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const queryParams = [
      data.province ? `provinceId=${data.province.id}` : "",
      data.community ? `communityId=${data.community.id}` : "",
    ]
      .filter(Boolean)
      .join("&");
    router.push(`/photo-bank/search?type=search&${queryParams}`);
  });

  return (
    <form className="flex flex-row items-start justify-start gap-4" onSubmit={onSubmit}>
      <div className="flex w-64 flex-col gap-2">
        <FormDropdown
          className="w-full"
          buttonClassName="rounded-lg border border-smart-cbt-medium-grey bg-white w-full"
          control={control}
          name="province"
          values={provinces}
          filterKey={"title"}
          idKey={"id"}
          displayKey={"title"}
          title={t("photoBank.main.province")}
          disabled={false}
          fixed={false}
          placeholder={t("photoBank.main.province")}
          nullDisplay={"-"}
        />
        <FormFieldError error={errors.province?.message} />
      </div>
      <div className="flex w-64 flex-col gap-2">
        <FormDropdown
          className="w-full"
          buttonClassName="rounded-lg border border-smart-cbt-medium-grey bg-white w-full"
          control={control}
          name="community"
          values={communities}
          filterKey={"title"}
          idKey={"id"}
          displayKey={"title"}
          title={t("photoBank.main.community")}
          disabled={false}
          fixed={false}
          placeholder={t("photoBank.main.community")}
          nullDisplay={"-"}
        />
        <FormFieldError error={errors.community?.message} />
      </div>
      <Button intent={"primary"} size={"small"} icon={<MagnifyingGlassIcon className="h-5 w-5" />} type="submit">
        {t("photoBank.main.search")}
      </Button>
    </form>
  );
};

export default PhotoBankSearchByTypeForm;
