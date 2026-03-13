"use client";

import { ProvinceJSONData } from "@/utils/cms/adapters/master-data/geolocation";
import { CommunityJSONData } from "@/utils/cms/adapters/website/travel-mart";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormDropdown from "../form/FormDropdown";

type PhotoBankListBySearchHeaderProps = {
  provinces: ProvinceJSONData[] | null | undefined;
  communities: CommunityJSONData[] | null | undefined;
  provinceId: number | null | undefined;
  communityId: number | null | undefined;
  onSearch: (params: any) => void;
};

type PhotoBankListBySearchHeaderForm = {
  province: ProvinceJSONData;
  community: CommunityJSONData;
};

const PhotoBankListBySearchHeader = ({
  provinces,
  communities,
  provinceId,
  communityId,
  onSearch,
}: PhotoBankListBySearchHeaderProps) => {
  const t = useTranslations("common");
  const { control, setValue, watch } = useForm<PhotoBankListBySearchHeaderForm>({});

  useEffect(() => {
    const province = provinces?.find((value) => value.id == provinceId);
    const community = communities?.find((value) => value.id == communityId);
    if (province != null) setValue("province", province);
    if (community != null) setValue("community", community);
  }, []);

  useEffect(() => {
    const subscription = watch((value) => {
      const params = { provinceId: value.province?.id, communityId: value.community?.id };
      onSearch(params);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSearch]);

  return (
    <div className="flex flex-row gap-4 md:container md:mx-auto">
      <FormDropdown
        buttonClassName="rounded-lg border border-smart-cbt-medium-grey bg-white"
        control={control}
        name="province"
        values={[null, ...(provinces ?? [])]}
        filterKey={"title"}
        idKey={"id"}
        displayKey={"title"}
        title={t("photoBank.main.province")}
        disabled={false}
        fixed={false}
        placeholder={t("photoBank.main.province")}
        nullDisplay={"-"}
      />
      <FormDropdown
        buttonClassName="rounded-lg border border-smart-cbt-medium-grey bg-white"
        control={control}
        name="community"
        values={[null, ...(communities ?? [])]}
        filterKey={"title"}
        idKey={"id"}
        displayKey={"title"}
        title={t("photoBank.main.community")}
        disabled={false}
        fixed={false}
        placeholder={t("photoBank.main.community")}
        nullDisplay={"-"}
      />
    </div>
  );
};

export default PhotoBankListBySearchHeader;
