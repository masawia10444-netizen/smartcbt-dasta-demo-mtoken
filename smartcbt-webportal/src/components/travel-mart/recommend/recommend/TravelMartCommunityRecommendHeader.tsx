import Form from "@/components/form/Form";
import FormDropdown from "@/components/form/FormDropdown";
import { AppContext, TravelMartContext } from "@/contexts/App.context";
import { Schedule } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import RequestNotification from "../RequestNotification";
import { isNil } from "lodash";
interface TravelMartCommunityRecommendHeaderProps {
  organizationId?: number;
  requestNotifications?: Schedule[];
  onSearch: (params: any) => void;
  q: string | null;
  region: string | null;
  province: string | null;
  typeEvent: string | null;
}

interface TravelMartCommunityRecommendForm {
  activityName: string | null;
  province: { id: number; title: string } | null;
  type: { id: number; title: string } | null;
  region: { id: number; title: string } | null;
}

const TravelMartCommunityRecommendHeader = (props: TravelMartCommunityRecommendHeaderProps) => {
  const { onSearch, organizationId, requestNotifications, province, q, region, typeEvent } = props;
  const t = useTranslations("common");

  const { provinces } = useContext(AppContext);
  const { attractionTypes, regions } = useContext(TravelMartContext);

  const { control, watch, setValue, getValues } = useForm<TravelMartCommunityRecommendForm>();

  useEffect(() => {
    if (q) setValue("activityName", q);
    if (region) {
      const regionResult = regions.find((r) => r.id == Number(region));
      setValue("region", regionResult as { id: number; title: string });
    }
    if (province) {
      const provinceResult = provinces.find((p) => p.id == Number(province));
      setValue("province", provinceResult as { id: number; title: string });
    }
    if (typeEvent) {
      const typeResult = attractionTypes.find((t) => t.title == typeEvent);
      setValue("type", typeResult as any);
    }
  }, []);

  const regionId = watch("region");

  useEffect(() => {
    const subscription = watch((value) => {
      const params = {
        search: value.activityName,
        provinceId: value.province?.id,
        type: value.type?.title,
        communityId: value.region?.id,
      };
      onSearch(params);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSearch]);

  return (
    <div className="my-4 flex w-full items-end gap-4 ">
      <div className="flex w-full gap-4">
        <Form.Input
          className="w-auto rounded-3xl border-0 bg-smart-cbt-light-grey px-4 py-2"
          type="text"
          placeholder={t("recommend.community.searchActivity")}
          value={getValues("activityName") ?? ""}
          onChange={(e) => setValue("activityName", e.target.value)}
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
          title={t("recommend.community.type")}
          nullDisplay={t("global.all")}
          filterKey={"title"}
          placeholder={t("recommend.community.type")}
          control={control}
          fixed={false}
        />
      </div>
      <RequestNotification
        organizationId={organizationId}
        requestNotifications={requestNotifications}
        type={"entrepreneur"}
      />
    </div>
  );
};

export default TravelMartCommunityRecommendHeader;
