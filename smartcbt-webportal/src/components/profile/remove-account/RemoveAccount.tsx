"use client";
import { Button } from "@/components/Button";
import FormCheckbox from "@/components/form/FormCheckbox";
import FloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { DeleteIcon2 } from "@/components/Icon";
import { useRemoveAccount } from "@/components/profile/remove-account/RemoveAccount.hook";
import { useTranslations } from "next-intl";

export default function RemoveAccount() {
  const t = useTranslations("common");
  const { onSubmit, formContext } = useRemoveAccount();
  const {
    control,
    watch,
    formState: { errors },
  } = formContext;
  const confirm = watch("confirm");

  return (
    <div className="m-8 flex flex-col gap-4 rounded-2xl border border-smart-cbt-green bg-white p-6 md:p-10">
      <div className="mb-3 flex items-center gap-x-3 text-2xl font-medium text-smart-cbt-dark-green">
        <DeleteIcon2 fill="#005E38" />
        {t("profile.menus.removeAccount")}
      </div>
      <div className="mb-4 flex text-smart-cbt-very-dark-grey">{t("manageApi.removeAccount.paragraph")}</div>

      <form className="max-w-md" onSubmit={onSubmit}>
        <div className="mb-4 flex text-smart-cbt-very-dark-grey">
          {t("manageApi.removeAccount.action.selectAccount")}
        </div>
        <FormCheckbox
          name="confirm"
          control={control}
          labelClassName="text-xs xl:text-sm text-smart-cbt-medium-grey font-thin"
          label={t("manageApi.removeAccount.action.removePermanent")}
        />
        {confirm && (
          <FloatingLabelTextInput
            placeholder={t("profile.removeAccount.action.inputLabel")}
            errorMessage={errors?.password?.message}
            type="password"
            control={control}
            name="password"
          />
        )}
        {confirm && (
          <div className="mt-4 flex flex-col gap-4 px-3 md:flex-row">
            <Button className="w-[50%]" type="submit" intent={"danger"} size="small" onClick={() => null}>
              {t("profile.removeAccount.action.confirm")}
            </Button>
            <Button className="min-w-[25%]" intent={"tertiary"} size="small" onClick={() => null}>
              {t("profile.removeAccount.action.cancel")}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
