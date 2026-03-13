import { manualsByApplication } from "@/utils/cms/adapters/website/application-manual/manual";

export default async function Page() {
  // Initiate both requests in parallel
  const manual = await manualByApplication();

  return (
    <>
      <h1>manual</h1>
      <br />
      {manual}
      <hr />
    </>
  );
}

async function manualByApplication() {
  const response = await manualsByApplication();
  return JSON.stringify(response);
}
