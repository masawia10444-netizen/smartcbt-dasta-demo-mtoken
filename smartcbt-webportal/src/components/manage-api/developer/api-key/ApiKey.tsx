"use client";
import { Button } from "@/components/Button";
import { MApiApiKeyIcon } from "@/components/Icon";
import { FormInput } from "@/components/form/FormInput";
import { useManageApiKey } from "@/components/manage-api/developer/api-key/ApiKey.hook";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

export default function ApiKey() {
  const t = useTranslations("common");
  const { apiKey, copied, loading, handleOnClick } = useManageApiKey();

  return (
    <>
      <div className="mb-3 flex items-center gap-x-3 text-2xl font-medium text-smart-cbt-dark-green">
        <MApiApiKeyIcon fill="#005E38" />
        {t("manageApi.menus.apiKey")}
      </div>
      <div className="font-medium">{t("manageApi.developerApiKey.paragraph1.title")}</div>
      <div className="mb-4">{t("manageApi.developerApiKey.paragraph1.description")}</div>

      <div className="font-medium">{t("manageApi.developerApiKey.paragraph2.title")}</div>
      <div className="relative flex rounded-lg">
        <FormInput
          disabled
          placeholder={t("manageApi.developerApiKey.input.placeholder")}
          value={loading ? "Loading..." : apiKey}
          className="rounded-none rounded-l-lg text-smart-cbt-medium-grey"
        />
        <Button
          type="submit"
          intent={"primary"}
          size="small"
          className="min-w-[200px] rounded-none rounded-r-lg"
          onClick={loading ? () => null : handleOnClick}
          icon={!apiKey || copied ? undefined : <DocumentDuplicateIcon className="h-6 w-5" />}
          disabled={loading}
        >
          {!apiKey
            ? t("manageApi.developerApiKey.input.submit")
            : copied
            ? t("manageApi.developerApiKey.input.copied")
            : t("manageApi.developerApiKey.input.copy")}
        </Button>
      </div>
    </>
  );
}
