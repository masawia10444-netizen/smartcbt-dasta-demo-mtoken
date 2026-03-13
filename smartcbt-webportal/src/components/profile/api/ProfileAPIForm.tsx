import Flex from "@/components/Flex";
import { CheckIconCircle } from "@/components/Icon";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { ProfileAPISchema } from "@/schemas/forms/profile/profile-api-schema";
import { Profile } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

type ProfileAPIFormProps = {
  mode: "view" | "edit";
  user?: Profile | null;
};

const ProfileAPIForm = ({ mode, user }: ProfileAPIFormProps) => {
  const t = useTranslations("common");

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileAPISchema>();

  useEffect(() => {
    if (!user) return;
    setValue("email", user.email);
    setValue("password", user.id);
    setValue("firstName", user.first_name);
    setValue("lastName", user.last_name);
    setValue("phoneNumber", user.mobile);
    setValue("organization", user.organizations?.map((or) => or.title).join(", "));
  }, [user]);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <CheckIconCircle className="h-6 w-6 text-smart-cbt-green" />
        <h3 className="font-medium text-smart-cbt-green">{t("profile.api.status.approved")}</h3>
      </div>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("profile.api.firstName")}
            type="text"
            name="firstName"
            control={control}
            isRequired
            errorMessage={errors?.firstName?.message}
            disabled={mode == "view"}
          />
        </Flex.Element>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("profile.api.lastName")}
            type="text"
            name="lastName"
            control={control}
            disabled={mode == "view"}
            isRequired
            errorMessage={errors?.lastName?.message}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("profile.api.phoneNumber")}
            type="text"
            name="phoneNumber"
            disabled={mode == "view"}
            control={control}
            isRequired
            errorMessage={errors?.phoneNumber?.message}
          />
        </Flex.Element>
        <Flex.Element />
      </Flex.Container>
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("profile.api.email")}
            type="text"
            name="email"
            control={control}
            disabled={mode == "view"}
            isRequired
            errorMessage={errors?.email?.message}
          />
        </Flex.Element>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("profile.api.password")}
            type="password"
            name="password"
            control={control}
            disabled={mode == "view"}
            isRequired
            errorMessage={errors?.password?.message}
          />
        </Flex.Element>
      </Flex.Container>
      <Flex.Element>
        <FormFloatingLabelTextInput
          placeholder={t("profile.api.organization")}
          type="organization"
          name="organization"
          control={control}
          disabled={mode == "view"}
          isRequired
          errorMessage={errors?.organization?.message}
        />
      </Flex.Element>
    </div>
  );
};

export default ProfileAPIForm;
