import { AppContext } from "@/contexts/App.context";
import { useTranslations } from "next-intl";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../form/Form";

interface FinancialListHeaderProps {
  itemCount: number;
  onSearch: (params: any) => void;
}

export interface FinancialListSearchForm {
  province: { id: number; value: string } | null;
}

const FinancialListHeader = (props: FinancialListHeaderProps) => {
  const { itemCount, onSearch } = props;
  const t = useTranslations("common");
  const { provinces } = useContext(AppContext);

  const { control, watch, setValue } = useForm<FinancialListSearchForm>({ defaultValues: { province: null } });

  useEffect(() => {
    const subscription = watch((value) => {
      const params = {
        province: value.province ?? undefined,
      };
      onSearch(params);
    });
    return () => subscription.unsubscribe();
  }, [watch, onSearch]);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex ">
        <h1>
          {t("global.totalList")} {itemCount} {t("global.items")}
        </h1>
      </div>
      <Form.SelectDropDown
        idKey="id"
        values={[null, ...provinces]}
        displayFunction={(v) => (v.at(0) === null ? t("global.allValues") : v.at(0)?.title ?? "")}
        buttonDisplayFunction={(v) =>
          `${t("global.province")}: ${v.at(0) === null ? t("global.allValues") : v.at(0)?.title ?? ""}`
        }
        placeholder="-"
        name="province"
        control={control}
        intent="filter"
      />
    </div>
  );
};
export default FinancialListHeader;
