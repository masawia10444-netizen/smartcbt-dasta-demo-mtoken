"use client";

import { updateProfileAction } from "@/app/[locale]/(authenticated)/profile/user/actions";
import { Button } from "@/components/Button";
import { EditPencil, SaveDiskIcon } from "@/components/Icon";
import { useSession } from "@/components/context-provider/AuthProvider";
import Image from "@/components/image";
import { ProfileUserSchema } from "@/schemas/forms/profile/profile-user-schema";
import { UpdateProfile } from "@/utils/cms/adapters/website/users/types/user";
import { handleAPIError, toastSuccess } from "@/utils/helper";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProfileUserForm from "./ProfileUserForm";

type ProfileUserProps = {};

const ProfileUser = ({}: ProfileUserProps) => {
  const t = useTranslations("common");
  const router = useRouter();
  const { session }: any = useSession();

  const [mode, setMode] = useState<"view" | "edit">("view");

  const formContext = useForm<ProfileUserSchema>();

  const handleOnSubmit = formContext.handleSubmit(async (data) => {
    const body: UpdateProfile = {
      // email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      // organization: data.organization,
      // mobile: data.phoneNumber,
    };
    const res = await updateProfileAction(body);
    console.log(`res`, res);
    if (!res) {
      handleAPIError(t("profile.user.failMessage"));
    } else {
      toastSuccess(t("profile.user.saveSuccessMessage"));
      setMode("view");
      router.refresh();
    }
  });

  return (
    <FormProvider {...formContext}>
      <form
        className="m-4 lg:m-8 flex flex-col gap-4 divide-y-2 rounded-2xl border border-smart-cbt-green bg-white p-4 lg:p-8"
        onSubmit={handleOnSubmit}
      >
        <div className="flex flex-row justify-between">
          <div className="text-2xl font-medium text-smart-cbt-dark-green">{t("profile.user.title")}</div>
          {mode === "view" && (
            <Button
              intent={"secondary"}
              onClick={() => setMode("edit")}
              size="small"
              className="w-fit px-5"
              icon={<EditPencil />}
            >
              {t("global.edit")}
            </Button>
          )}
          {mode === "edit" && (
            <Button intent={"secondary"} size="small" type={"submit"} className="w-fit px-5" icon={<SaveDiskIcon />}>
              {t("global.save")}
            </Button>
          )}
        </div>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 pt-6 lg:pt-10 items-center lg:items-start">
          <div className="w-fit shrink-0">
            <div className="relative h-32 w-32 md:h-60 md:w-60 items-center justify-center rounded-full bg-smart-cbt-orange-2 text-center text-xl uppercase text-black">
              {(session?.user?.image as any) ? (
                <Image
                  src={session?.user?.image}
                  alt={session?.user?.first_name}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center">
                  <div className="text-center text-7xl">
                    {(session?.user?.first_name ?? "")
                      .split(" ")
                      .slice(0, 2)
                      .map((x: string) => x.charAt(0).toUpperCase())
                      .join("")}
                  </div>
                </div>
              )}
            </div>
          </div>
          <ProfileUserForm mode={mode} user={session?.user} />
        </div>
      </form>
    </FormProvider>
  );
};

export default ProfileUser;
