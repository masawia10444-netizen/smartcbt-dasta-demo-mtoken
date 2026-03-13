"use server";

import { readFolders } from "@directus/sdk";
import { isEmpty } from "lodash";
import { getCmsURL } from "../../api-helpers";
import cmsApi from "../../cms-api";

async function fetchFolderIdByName(name: string) {
  // list folders
  const folders = await cmsApi.request(
    readFolders({
      fields: ["id"],
      filter: {
        name: {
          _eq: name,
        },
      },
    })
  );

  if (isEmpty(folders)) throw new Error("no-attachments-folder");

  return folders[0].id;
}

async function bufferFileUtils(image: string) {
  try {
    const url = `${getCmsURL()}/assets/${image}`;
    const data = await fetch(url);
    const buffer = await data.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    return bytes;
  } catch (error) {
    console.error(error);
    return null
  }
}
export { bufferFileUtils, fetchFolderIdByName };
