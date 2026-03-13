"use server";
import CreateProjectMockedHx from "@/config/create-project-mocked-hx.json";
import { createProject } from "@/utils/cms/adapters/website/sia/create-sia";

export async function submit() {
  try {
    const res = await createProject(CreateProjectMockedHx);
    console.log("==================");
    console.log(res);
    console.log("==================");
  } catch (error) {
    console.error(error);
  }
}
