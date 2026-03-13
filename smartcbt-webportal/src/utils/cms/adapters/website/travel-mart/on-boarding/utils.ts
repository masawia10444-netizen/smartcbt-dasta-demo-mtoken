"use server";
import cmsApi from "@/utils/cms/cms-api";
import { Collection } from "@/utils/cms/cms-type";
import { deleteItems } from "@directus/sdk";
import { isEmpty } from "lodash";

async function calculateOptions<T>(
  organizationId: number,
  existDatas: T & { id?: number | undefined }[],
  datas: number[],
  key: string,
  collectionName: keyof Collection | string
) {
  const newData = !isEmpty(datas)
    ? datas.map((id, idx) => {
        const existData = existDatas[idx];
        const existId = typeof existData == "object" && existData?.id;

        const updatedData: { organizations_id: number; [key: string]: number } = {
          organizations_id: organizationId,
          [key]: id,
        };

        if (existId) updatedData.id = existId;

        return updatedData;
      })
    : [];

  const deleteData = existDatas.slice(datas.length ?? 0);

  if (!isEmpty(deleteData)) {
    const deleteIds = deleteData.map((data) => Number(typeof data == "object" && data?.id));

    // @ts-ignore
    await cmsApi.request(deleteItems(collectionName, deleteIds));
  }

  return newData;
}

export { calculateOptions };
