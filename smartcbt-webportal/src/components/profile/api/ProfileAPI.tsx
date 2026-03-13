"use client";

import { Button } from "@/components/Button";
import { EditPencil, SaveDiskIcon } from "@/components/Icon";
import { useSession } from "@/components/context-provider/AuthProvider";
import Image from "@/components/image";
import { ProfileAPISchema } from "@/schemas/forms/profile/profile-api-schema";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProfileRegisterIntro from "../ProfileRegisterIntro";
import ProfileAPIForm from "./ProfileAPIForm";

type ProfileAPIProps = {};

const ProfileAPI = ({}: ProfileAPIProps) => {
  const t = useTranslations("common");
  const { session } = useSession();
  const user = session?.user;

  const [mode, setMode] = useState<"view" | "edit">("view");

  const formContext = useForm<ProfileAPISchema>();

  const handleOnSubmit = formContext.handleSubmit(async (data) => {
    // TODO: change this if api ready
    console.log(data);
    setMode("view");
  });

  return (
    <FormProvider {...formContext}>
      <div className="m-8 rounded-2xl border border-smart-cbt-green bg-white p-8">
        {user?.communities != null || user?.organizations != null ? (
          <form className="flex flex-col gap-4 divide-y-2" onSubmit={handleOnSubmit}>
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
                <Button
                  intent={"secondary"}
                  size="small"
                  type={"submit"}
                  className="w-fit px-5"
                  icon={<SaveDiskIcon />}
                >
                  {t("global.save")}
                </Button>
              )}
            </div>
            <div className="flex flex-row gap-10 pt-10">
              <div className="w-fit">
                <div className="border-smart-cbt-grey relative h-60 w-60 items-center justify-center rounded-full border bg-white text-center text-xl uppercase text-black">
                  {(session?.user as any)?.image ? (
                    <Image
                      src={(session?.user as any)?.image}
                      alt={(session?.user as any)?.first_name}
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
              <ProfileAPIForm mode={mode} user={session?.user} />
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4 divide-y-2">
            <div className="flex flex-row justify-between">
              <div className="text-2xl font-medium text-smart-cbt-dark-green">{t("profile.user.title")}</div>
            </div>
            <ProfileRegisterIntro
              buttonText={t("profile.api.registerIntro.buttonText")}
              description={t("profile.api.registerIntro.description")}
              href=""
            />
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default ProfileAPI;
