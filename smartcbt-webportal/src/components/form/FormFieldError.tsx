import { useTranslations } from "next-intl";

export const FormFieldError = ({ error, useMessage }: { error?: any; useMessage?: boolean }) => {
  const t = useTranslations("errors");
  return error ? (
    <span className="text-sm italic text-smart-cbt-red">{useMessage ? error : t("customRequired")}</span>
  ) : (
    <></>
  );
};
