"use server";
import cmsApi, { withRevalidate } from "@/utils/cms/cms-api";
import { readItem, updateItem, updateMe } from "@directus/sdk";
import * as _ from "lodash";
import { Profile } from "../../authen";
import { UpdateProfile, UsersAccount } from "./types/user";
async function updateUserDirectus(user: UpdateProfile) {
  try {
    const data = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        updateMe({
          first_name: user.first_name,
          last_name: user.last_name,
          password: user.password,
        }),
        0
      )
    );
    return data;
  } catch (error: unknown) {
    const errors: {
      message: string;
      extensions: {
        code: string;
        collection: string;
        field: string;
      };
    }[] = _.get(error, "errors", []);
    const extractedData = _.map(errors, (error) => {
      return {
        code: error.extensions.code ?? null,
        field: error.extensions.field ?? null,
      };
    });

    throw new Error(JSON.stringify(extractedData));
  }
}

async function updateUserAccount(profile: Profile, user: UpdateProfile) {
  try {
    const data = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        updateItem("users", profile.id, {
          firstname: user.first_name,
          lastname: user.last_name,
        }),
        0
      )
    );
    return data;
  } catch (error: unknown) {
    const errors: {
      message: string;
      extensions: {
        code: string;
        collection: string;
        field: string;
      };
    }[] = _.get(error, "errors", []);
    const extractedData = _.map(errors, (error) => {
      return {
        code: error.extensions.code ?? null,
        field: error.extensions.field ?? null,
      };
    });
    throw extractedData;
  }
}

async function updateProfile(profile: Profile, user: UpdateProfile) {
  const data: UsersAccount = await cmsApi.request(
    withRevalidate(
      // @ts-ignore
      readItem("users", profile.id),
      0
    )
  );
  try {
    const updateUserAccountData = await updateUserAccount(profile, user);
    if (updateUserAccountData) {
      const updateUserDirectusData = await updateUserDirectus(user);
      if (updateUserDirectusData) {
        return updateUserAccountData;
      } else {
        // throw Error("update-user-cms-failed");
      }
    } else {
      throw Error("update-user-account-failed");
    }
  } catch (error: unknown) {
    await rollbackUpdate(profile, data);
    throw Error("update-user-account-failed");
  }
}

async function rollbackUpdate(profile: Profile, user: UsersAccount) {
  try {
    const data = await cmsApi.request(
      withRevalidate(
        // @ts-ignore
        updateItem("users", profile.id, {
          firstname: user.firstname,
          lastname: user.lastname,
        }),
        0
      )
    );
    if (data) {
      const data = await cmsApi.request(
        withRevalidate(
          // @ts-ignore
          updateMe({
            first_name: user.firstname,
            last_name: user.lastname,
          }),
          0
        )
      );
      if (data) {
        return data;
      } else {
        throw new Error("rollback-update-user-directus-failed");
      }
    }
    return data;
  } catch (e) {
    console.log("error rollback update profile: ", e);
  }
}

export { updateProfile };
