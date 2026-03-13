"use server";
import cmsApi from "@/utils/cms/cms-api";
import { Profile, checkExistApplication, checkPermissionExist } from "@/utils/cms/cms-api-adapter";
import { Collection } from "@/utils/cms/cms-type";
import { createItem, readItems, updateItem, uploadFiles } from "@directus/sdk";
import { get, isEmpty, isNil, omit } from "lodash";
import { UserApps } from "../travel-mart/types/on-boarding";
import { CreateAlbumBody, PhotoGrapherOnBoardingBody } from "./types";

async function onboardingPhotoGrapher(profile: Profile, body: PhotoGrapherOnBoardingBody) {
  let consents: { application_consents_id: number }[] = [];
  if (!isEmpty(body.consents)) {
    consents = body.consents.map((consentId) => ({ application_consents_id: consentId }));
  }

  const code = "photographer"; // role code
  const permission = await checkPermissionExist("PHOTO", code);

  // add user app
  // check not exist
  const application = Number(permission.applications);

  await checkExistApplication(profile, application, permission);

  const userAppBody: Partial<UserApps> = {
    user: profile.id,
    application: application,
    user_app_role: permission.id,
    photographer_onboarding: [
      {
        ...omit(body, ["consents"]),
        consents,
      },
    ],
  };

  try {
    await cmsApi.request(createItem("user_apps", userAppBody));
    return { status: "success" };
  } catch (e) {
    console.log("error photographer onboarding: ", e);
  }
}

async function updateOnboardingPhotoGrapher(profile: Profile, body: PhotoGrapherOnBoardingBody) {
  // get exist onboarding guide
  const existInfo = await cmsApi.request(
    // @ts-ignore
    readItems("user_photographer_onboarding", {
      filter: {
        user_app: {
          user: {
            _eq: profile.id,
          },
        },
      },
    })
  );

  if (isEmpty(existInfo)) throw new Error("not-found-community-onboarding");

  const id = get(existInfo, [0, "id"]);

  let consents: { application_consents_id: number }[] = [];
  if (!isEmpty(body.consents)) {
    consents = body.consents.map((consentId) => ({ application_consents_id: consentId }));
  }

  try {
    await cmsApi.request(
      updateItem("user_photographer_onboarding", id, {
        ...omit(body, ["consents"]),
        consents,
      })
    );
    return { status: "success" };
  } catch (e) {
    console.log("error photographer onboarding: ", e);
  }
}

async function uploadFile(formData: FormData) {
  // @ts-ignore
  try {
    const result = await cmsApi.request(uploadFiles(formData));
    return result;
  } catch (e) {
    console.log("e: ", e);
  }
}

async function createAlbum(body: CreateAlbumBody) {
  const categories: { community_tourist_attraction_type_id: number }[] = [];
  const images: { directus_files_id: string }[] = [];

  body.categories.forEach((categoryId) => {
    categories.push({
      community_tourist_attraction_type_id: categoryId,
    });
  });

  if (!isEmpty(body.images) && !isNil(body.images))
    body.images.forEach((imageId) => {
      images.push({
        directus_files_id: imageId,
      });
    });

  try {
    await cmsApi.request(
      createItem("photo_bank_albums", {
        ...omit(body, ["categories", "image"]),
        categories,
        images,
      })
    );

    return { status: "success" };
  } catch (e) {
    console.log("error: ", e);
  }
}

async function updateAlbumById(id: number, body: CreateAlbumBody) {
  const categories: { community_tourist_attraction_type_id: number }[] = [];
  const images: { directus_files_id: string }[] = [];

  body.categories.forEach((categoryId) => {
    categories.push({
      community_tourist_attraction_type_id: categoryId,
    });
  });

  if (!isEmpty(body.images) && !isNil(body.images))
    body.images.forEach((imageId) => {
      images.push({
        directus_files_id: imageId,
      });
    });

  try {
    await cmsApi.request(
      updateItem("photo_bank_albums", id, {
        ...omit(body, ["categories", "image"]),
        categories,
        images,
      })
    );

    return { status: "success" };
  } catch (e) {
    console.log("error: ", e);
  }
}

async function getOnBoardingPhotoGrapher(profile: Profile) {
  const res = await cmsApi.request(
    // @ts-ignore
    readItems("user_photographer_onboarding", {
      fields: ["*", "photographer_profile_image.*", "photographer_attachment.*", "user_app.status"],
      filter: {
        user_app: {
          user: {
            _eq: profile.id,
          },
        },
      },
    })
  );

  const info = get(res, [0]) as Collection["user_photographer_onboarding"];

  if (isEmpty(info)) throw Error("on-boarding-not-found");

  const profileImageId = get(info, ["photographer_profile_image", "id"], null);
  const attachmentId = get(info, ["photographer_attachment", "id"], null);

  const profileImage = get(info, ["photographer_profile_image"], null);
  const attachment = get(info, ["photographer_attachment"], null);

  let profileImageInfo = null;
  let attachmentInfo = null;

  if (!isNil(profileImage) && typeof profileImage == "object") {
    profileImageInfo = {
      id: profileImage.id,
      url: get(profileImage, ["filename_disk"], null),
      type: get(profileImage, ["type"], null),
      title: get(profileImage, ["title"], null),
    };
  }

  if (!isNil(attachment) && typeof attachment == "object") {
    attachmentInfo = {
      id: attachment.id,
      url: get(attachment, ["filename_disk"], null),
      type: get(attachment, ["type"], null),
      title: get(attachment, ["title"], null),
    };
  }

  return {
    ...omit(info, ["user_app"]),
    status: get(info, ["user_app", "status"], null),
    photographer_profile_image: profileImageId,
    photographer_profile_image_info: profileImageInfo,
    photographer_attachment: attachmentId,
    photographer_attachment_info: attachmentInfo,
  };
}

export {
  createAlbum,
  getOnBoardingPhotoGrapher,
  onboardingPhotoGrapher,
  updateAlbumById,
  updateOnboardingPhotoGrapher,
  uploadFile,
};
