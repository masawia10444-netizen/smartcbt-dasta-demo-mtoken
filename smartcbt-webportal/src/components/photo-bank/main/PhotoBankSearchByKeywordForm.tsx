"use client";

import { Button } from "@/components/Button";
import Form from "@/components/form/Form";
import { FormFieldError } from "@/components/form/FormFieldError";
import { customZodResolver } from "@/schemas/base-schema";
import {
  PhotoBankMainSearchByKeywordSchema,
  photoBankMainSearchByKeywordSchema,
} from "@/schemas/forms/photo-bank/photo-bank-main-search-by-keyword-schema";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const PhotoBankSearchByKeywordForm = () => {
  const t = useTranslations("common");
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<PhotoBankMainSearchByKeywordSchema>({ resolver: customZodResolver(photoBankMainSearchByKeywordSchema) });

  const onSubmit = handleSubmit((data) => {
    router.push(`/photo-bank/search?type=search&q=${data.keyword}`);
  });

  return (
    <form className="mt-6 flex w-full flex-row items-start gap-4 md:mt-8 lg:mt-12" onSubmit={onSubmit}>
      <div className="flex w-full flex-col">
        <Form.Input placeholder={t("photoBank.main.searchPicture")} {...register("keyword")} />
        <FormFieldError error={errors.keyword?.message} />
      </div>
      <Button intent={"primary"} size={"small"} type="submit" icon={<MagnifyingGlassIcon className="h-5 w-5" />}>
        {t("global.search")}
      </Button>
    </form>
  );
};

export default PhotoBankSearchByKeywordForm;
