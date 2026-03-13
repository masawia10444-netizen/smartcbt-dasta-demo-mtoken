import { fetchTrainings, loginEmail } from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // demo data

  const email: string | null = "smtvhet.uthong@gmail.com";
  const password: string | null = "cbt0929142899";
  const appCode: string = "BUSINESS";

  // 200 Success
  const resLogin = await loginEmail(email, password, appCode);
  const trainings = await handleFetchTrainings();

  return (
    <>
      <h1>trainings</h1>
      <br />
      {trainings}
      <br />
      <br />
    </>
  );
}

async function handleFetchTrainings() {
  const trainings = await fetchTrainings();
  return JSON.stringify(trainings);
}
