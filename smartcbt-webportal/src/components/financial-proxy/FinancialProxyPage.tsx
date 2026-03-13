"use client";

import BreadCrumb from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import { MaterialSymbolsAddRounded } from "@/components/Icon";
import FinancialProxyList from "@/components/financial-proxy/FinancialProxyList";
import { FinancialProxyCreateForm } from "@/components/financial-proxy/create/FinancialProxyCreateForm";
import { FinancialProxySavedPopup } from "@/components/financial-proxy/create/FinancialProxySavePopup";
import { FinancialProxyCreateSchema } from "@/schemas/forms/financial-proxies/financial-proxy-create-schema";
import { FinancialProxiesBody } from "@/utils/cms/adapters/website/sia/types/project";
import {
  FinancialProxiesJson,
  createManageFinancialProxy,
  updateManageFinancialProxy,
} from "@/utils/cms/cms-api-adapter";
import { financialProxyCalculation } from "@/utils/project-create-form-helper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "../context-provider/AuthProvider";

export default function FinancialProxyPage({ listFinancialProxy }: { listFinancialProxy: FinancialProxiesJson[] }) {
  const router = useRouter();
  const t = useTranslations("common");

  const [showCreateProxy, setShowCreateProxy] = useState<{ id: number | null } | null>(null);
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [refresh, setRefresh] = useState<number | string>();
  const { session } = useSession();

  const isSiaAdminRole = () =>
    session?.user?.roles.find((value) => value.app_code == "SIA/SROI" && value.role == "super_admin") != null;

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "main-menus",
    },
    {
      name: t("menus.allProjects"),
      slug: "sia-sroi/projects/manage",
    },
  ];

  const handleShowCreateProxy = () => {
    setShowCreateProxy({ id: null });
  };

  const handleHideCreateProxy = (didCreate: boolean) => {
    setShowCreateProxy(null);
  };

  const handleSubmitProxy = async (data: FinancialProxyCreateSchema) => {
    console.log("data", data);
    const startYear = new Date();
    const endYear = new Date();
    startYear.setFullYear(data.startingYear - 543);
    endYear.setFullYear(data.endingYear - 543);

    const dataFinancialProxyCalculation = financialProxyCalculation(data);

    const body: FinancialProxiesBody = {
      is_supported_all_province: false,
      remark: data.note ?? "",
      growth_rate: data.discountRate,
      value: data.value,
      title_en: data.titleEn,
      growth_formula: "npv",
      categories: data.category,
      title: data.title,
      status: data.status,
      start_year: startYear?.toISOString(),
      end_year: endYear?.toISOString(),
      proxy_type: Number(data.type.value),
      unit: data.unit,
      province: data.province?.id,
      growth_rate_calculation_detail: dataFinancialProxyCalculation.map((d) => {
        return {
          year: d.year,
          year_index: d.offset,
          value: d.value,
        };
      }),
      attachments: data.files.map((f) => ({
        directus_files_id: f.id,
      })),
    };

    if (showCreateProxy?.id) {
      await updateManageFinancialProxy(Number(showCreateProxy.id), body);
    } else {
      await createManageFinancialProxy(body);
    }
    setRefresh(data.internalId);
    setShowCreateProxy(null);
    setShowSavedPopup(true);
    router.refresh();
  };

  const handleClickedProxyId = (id: number) => {
    if (isSiaAdminRole()) {
      setShowCreateProxy({ id });
    }
  };

  const handleHideSavedPopup = () => {
    setShowSavedPopup(false);
  };

  return (
    <div className="flex flex-col flex-1 w-full gap-4 px-2">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-bold text-smart-cbt-dark-green"> {t("financialProxy.title")}</h1>
          <BreadCrumb links={breadCrumbLinks} />
        </div>
        <div className="flex items-center gap-2 md:justify-end">
          {isSiaAdminRole() && (
            <Button
              className="w-fit"
              intent={"primary"}
              size={"small"}
              icon={<MaterialSymbolsAddRounded />}
              onClick={handleShowCreateProxy}
            >
              {t("financialProxy.action.add")}
            </Button>
          )}
        </div>
      </div>
      <FinancialProxyList
        onProxyClicked={handleClickedProxyId}
        listFinancialProxy={listFinancialProxy}
        setRefresh={setRefresh}
        isSiaAdminRole={isSiaAdminRole()}
        refresh={refresh}
      />
      {showCreateProxy && (
        <FinancialProxyCreateForm
          onSubmit={handleSubmitProxy}
          isOpen={showCreateProxy != null}
          onClose={handleHideCreateProxy}
          id={showCreateProxy?.id}
        />
      )}
      {showSavedPopup && <FinancialProxySavedPopup isOpen={showSavedPopup} onClose={handleHideSavedPopup} />}
    </div>
  );
}
