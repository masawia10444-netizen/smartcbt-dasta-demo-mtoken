import Form from "@/components/form/Form";
import FormDropdown from "@/components/form/FormDropdown";
import { AppContext, TravelMartContext } from "@/contexts/App.context";
import { Schedule } from "@/utils/cms/cms-api-adapter";
import { isNil } from "lodash";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import RequestNotification from "../RequestNotification";

interface TravelMartEntrepreneurRecommendHeaderProps {
  organizationId?: number;
  requestNotifications?: Schedule[];
  onSearch: (params: any) => void;
}

interface TravelMartEntrepreneurRecommendForm {
  projectTitle: string | null;
  province: { id: number; value: string } | null;
  type: { id: number; title: string } | null;
  region: { id: number; title: string } | null;
}

const TravelMartEntrepreneurRecommendHeader = (props: TravelMartEntrepreneurRecommendHeaderProps) => {
  const { onSearch, organizationId, requestNotifications } = props;
  const t = useTranslations("common");

  const { control, watch, setValue } = useForm<TravelMartEntrepreneurRecommendForm>();

  const { provinces } = useContext(AppContext);

  const { attractionTypes, regions } = useContext(TravelMartContext);

  useEffect(() => {
    const subscription = watch((value) => {
      const params = {
        search: value.projectTitle,
        provinceId: value.province?.id,
        regionId: value.region?.id,
        type: value.type?.title,
      };

      onSearch(params);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSearch]);

  const regionId = watch("region");

  return (
    <div className="my-4 flex w-full items-end gap-4 ">
      <div className="flex w-full gap-4">
        <Form.Input
          className="w-auto rounded-3xl border-0 bg-smart-cbt-light-grey px-4 py-2"
          type="text"
          placeholder={t("recommend.entrepreneur.search")}
          onChange={(e) => setValue("projectTitle", e.target.value)}
        />
        <FormDropdown
          name="region"
          values={[null, ...regions]}
          idKey="id"
          displayKey="title"
          disabled={false}
          title={t("travelMart.main.region")}
          nullDisplay={t("global.all")}
          filterKey={"title"}
          placeholder={t("travelMart.main.region")}
          control={control}
          fixed={false}
        />
        <FormDropdown
          name="province"
          values={[
            null,
            ...(isNil(provinces) ? [] : regionId ? provinces.filter((p) => p.region == regionId.id) : provinces),
          ]}
          idKey="id"
          displayKey="title"
          disabled={false}
          title={t("global.province")}
          nullDisplay={t("global.all")}
          filterKey={"title"}
          placeholder={t("global.province")}
          control={control}
          fixed={false}
        />
        <FormDropdown
          name="type"
          values={[null, ...attractionTypes]}
          idKey="id"
          displayKey="title"
          disabled={false}
          title={t("recommend.entrepreneur.type")}
          nullDisplay={t("global.all")}
          filterKey={"title"}
          placeholder={t("recommend.community.type")}
          control={control}
          fixed={false}
        />
      </div>
      <RequestNotification organizationId={organizationId} requestNotifications={requestNotifications} type="community" />
    </div>
  );
};

export default TravelMartEntrepreneurRecommendHeader;
