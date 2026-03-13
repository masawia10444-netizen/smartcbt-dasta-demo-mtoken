"use client";

import {
  createEmissionFactor,
  updateEmissionFactor,
} from "@/app/[locale]/(authenticated)/carbon-footprint/emission-factor-proxy/action";
import { Button } from "@/components/Button";
import { ArrowLeftIcon, MaterialSymbolsAddRounded } from "@/components/Icon";
import { NextLink } from "@/components/Link";
import { useSession } from "@/components/context-provider/AuthProvider";
import { EmissionProxyCreateSchema } from "@/schemas/forms/carbon/emission-proxies/emission-proxy-create-schema";
import { handleAPIError } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useState } from "react";
import EmissionProxyList from "./EmissionProxyList";
import { EmissionProxyPublishSuccessPopup } from "./EmissionProxyPublishSuccessPopup";
import { EmissionProxyCreateForm } from "./create/EmissionProxyCreateForm";
import { EmissionProxySavePopup } from "./create/EmissionProxySavePopup";

type EmissionProxyPageProps = {};

export const EmissionProxyPage = ({}: EmissionProxyPageProps) => {
  const t = useTranslations("common");

  const [showCreateProxy, setShowCreateProxy] = useState<{ id: number | null } | null>(null);
  const [showSavedPopup, setShowSavedPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [refresh, setRefresh] = useState<number | string | null>();

  const { session } = useSession();
  const isCarbonAdminRole =
    session?.user?.roles.find((value) => value.app_code == "CARBON" && value.role == "super_admin") != null;

  const handleSubmitProxy = async (data: EmissionProxyCreateSchema) => {
    const body: any = {
      name: data.name,
      pcr_type: data.pcr_type.id,
      sort: null,
      status: data.status,
      unit: data.unit,
      emission_factor_value: data.emission_factor_value,
      emission_factor_unit: data.emission_factor_unit.id,
      has_control_variable: data.hasControlVariable ? "yes" : "no",
      controll_variable_value: data.controlVariableValue,
      controll_variable_unit: data.controlVariableUnit,
      files: data.files.map((value: any) => ({ directus_files_id: value.id })),
      tooltip_flag: data.isTooltipEnabled,
      tooltip_data: data.tooltip,
    };

    if (showCreateProxy?.id) {
      const { error } = await updateEmissionFactor(showCreateProxy.id, body);
      if (error) {
        handleAPIError(error);
        return;
      }
    } else {
      const { error } = await createEmissionFactor(body);
      if (error) {
        handleAPIError(error);
        return;
      }
    }
    setRefresh(data.name);
    setShowCreateProxy(null);
    setShowSavedPopup(true);
  };

  const handleShowCreateProxy = () => {
    setShowCreateProxy({ id: null });
  };

  const handleHideCreateProxy = (didCreate: boolean) => {
    setShowCreateProxy(null);
  };

  const handleClickedProxyId = (id: number) => {
    if (isCarbonAdminRole) {
      setShowCreateProxy({ id });
    }
  };

  const handleHideSavedPopup = () => {
    setShowSavedPopup(false);
  };

  const handleHideSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-2">
      <div className="flex flex-wrap justify-between gap-6">
        <NextLink
          className="text-xl font-medium text-smart-cbt-dark-green"
          icon={<ArrowLeftIcon />}
          intent="primarySimple"
          href="/carbon-footprint/projects/manage"
        >
          {t("carbon.emissionProxy.title")}
        </NextLink>
        <div className="flex items-center gap-2 md:justify-end">
          {isCarbonAdminRole && (
            <Button
              intent={"primary"}
              size={"small"}
              icon={<MaterialSymbolsAddRounded />}
              onClick={handleShowCreateProxy}
            >
              {t("carbon.emissionProxy.action.add")}
            </Button>
          )}
        </div>
      </div>
      <EmissionProxyList
        onProxyClicked={handleClickedProxyId}
        refresh={refresh}
        setRefresh={setRefresh}
        isCarbonAdminRole={isCarbonAdminRole}
        setShowSuccessPopup={setShowSuccessPopup}
      />
      {showCreateProxy && (
        <EmissionProxyCreateForm
          onSubmit={handleSubmitProxy}
          isOpen={showCreateProxy != null}
          onClose={handleHideCreateProxy}
          id={showCreateProxy?.id}
        />
      )}
      {showSavedPopup && (
        <EmissionProxySavePopup isOpen={showSavedPopup} onClose={handleHideSavedPopup} setRefresh={setRefresh} />
      )}
      {showSuccessPopup && (
        <EmissionProxyPublishSuccessPopup isOpen={showSuccessPopup} onClose={handleHideSuccessPopup} />
      )}
    </div>
  );
};
