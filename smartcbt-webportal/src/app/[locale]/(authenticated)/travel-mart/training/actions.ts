"use server";

import { StatusOfTraining, TrainingData } from "@/models/travel-mart/travel-mart-training";
import { getCmsURL } from "@/utils/cms/api-helpers";
import { revalidatePath } from "next/cache";

export async function getTrainingData() {
  try {
    const url = `${getCmsURL()}/items/business_trainings?fields=*.*.*.*`;
    const data = await fetch(url, { cache: "no-store" });
    const json: { data: TrainingData[] } = await data.json();
    const trainingData = new Promise<TrainingData[] | undefined>((resolve) => {
      setTimeout(() => {
        return resolve(json.data.filter((d) => d.status == StatusOfTraining.Published));
      }, 1000);
    });
    return trainingData;
  } catch (error) {
    console.error(error);
    revalidatePath(`/travel-mart`);
  }
}
