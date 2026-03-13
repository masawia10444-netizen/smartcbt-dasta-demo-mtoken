import Flex from "@/components/Flex";
import FormFloatingLabelTextInput from "@/components/form/FormFloatingLabelTextInput";
import { ProfileUserSchema } from "@/schemas/forms/profile/profile-user-schema";
import { Profile } from "@/utils/cms/cms-api-adapter";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

type ProfileUserFormProps = {
  mode: "view" | "edit";
  user: Profile | null;
};

const ProfileUserForm = ({ mode, user }: ProfileUserFormProps) => {
  const t = useTranslations("common");

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileUserSchema>();

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
      {/* <div className="flex flex-row items-center gap-2">
        <HourGlassIcon className="h-6 w-6" />
        <h3 className="font-medium text-smart-cbt-orange">{t("profile.user.status.pending")}</h3>
      </div> */}
      <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("profile.user.firstName")}
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
            placeholder={t("profile.user.lastName")}
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
            placeholder={t("profile.user.phoneNumber")}
            type="text"
            name="phoneNumber"
            disabled={true}
            control={control}
            isRequired
            errorMessage={errors?.phoneNumber?.message}
          />
        </Flex.Element>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("profile.user.email")}
            type="text"
            name="email"
            control={control}
            disabled={true}
            isRequired
            errorMessage={errors?.email?.message}
          />
        </Flex.Element>
      </Flex.Container>
      {/* <Flex.Container>
        <Flex.Element>
          <FormFloatingLabelTextInput
            placeholder={t("profile.user.password")}
            type="password"
            name="password"
            control={control}
            disabled={true}
            isRequired
            errorMessage={errors?.password?.message}
          />
        </Flex.Element>
      </Flex.Container> */}
      <Flex.Element>
        <FormFloatingLabelTextInput
          placeholder={t("profile.user.organization")}
          type="organization"
          name="organization"
          control={control}
          disabled={true}
          isRequired
          errorMessage={errors?.organization?.message}
        />
      </Flex.Element>
    </div>
  );
};

export default ProfileUserForm;
