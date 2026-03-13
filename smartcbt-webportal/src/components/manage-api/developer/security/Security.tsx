"use client";
import { Button } from "@/components/Button";
import { MApiSecurityIcon } from "@/components/Icon";
import { FormInput } from "@/components/form/FormInput";
import { useManageApiSecurity } from "@/components/manage-api/developer/security/Security.hook";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Security() {
  const t = useTranslations("common");
  const { dataIpAddress, handleAddIpAddress, handleRemoveIpAddress } = useManageApiSecurity();

  return (
    <>
      <div className="mb-3 flex items-center gap-x-3 text-2xl font-medium text-smart-cbt-dark-green">
        <MApiSecurityIcon fill="#005E38" />
        {t("manageApi.menus.security")}
      </div>
      <div className="mb-4">{t("manageApi.developerSecurity.paragraph1.description")}</div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col rounded-2xl border border-smart-cbt-light-grey bg-white p-6 lg:w-[50%]">
          <div className="mb-3 text-md font-medium text-smart-cbt-green">
            {t("manageApi.developerSecurity.domain.title")}
          </div>
          <div className="mb-4">{t("manageApi.developerSecurity.domain.description")}</div>
          <FormGroup handleSubmit={() => {}} />
          {[]?.map((item, i) => (
            <ListItem key={`domain-${i}`} data={item} onRemove={() => handleRemoveIpAddress(item)} />
          ))}
        </div>
        <div className="flex flex-col rounded-2xl border border-smart-cbt-light-grey bg-white p-6 lg:w-[50%]">
          <div className="mb-3 text-md font-medium text-smart-cbt-green">
            {t("manageApi.developerSecurity.ipAddress.title")}
          </div>
          <div className="mb-4">{t("manageApi.developerSecurity.ipAddress.description")}</div>
          <FormGroup handleSubmit={handleAddIpAddress} />
          {dataIpAddress?.map((item, i) => (
            <ListItem key={`ip-${i}`} data={item} onRemove={() => handleRemoveIpAddress(item)} />
          ))}
        </div>
      </div>
    </>
  );
}

function FormGroup({ handleSubmit }: { handleSubmit: (value: string) => void }) {
  const t = useTranslations("common");
  const [query, setQuery] = useState("");

  return (
    <div className="relative my-4 flex">
      <FormInput
        placeholder={t("manageApi.developerSecurity.action.placeholder")}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        type="submit"
        intent={"primary"}
        size="small"
        className="ml-2 min-w-[70px]"
        onClick={() => {
          handleSubmit(query);
          setQuery("");
        }}
        icon={<PlusIcon className="h-6 w-6" />}
      >
        {t("manageApi.developerSecurity.action.add")}
      </Button>
    </div>
  );
}

function ListItem({ data, onRemove }: { data: string; onRemove: () => void }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4 pl-2 lg:pr-20">
      <div>{data}</div>
      <TrashIcon className="h-5 w-5 cursor-pointer" onClick={onRemove} />
    </div>
  );
}

const mockup = ["api-dev.tatdataapi.io", "api-dev.tatdataapi.io", "api-dev.tatdataapi.io"];
