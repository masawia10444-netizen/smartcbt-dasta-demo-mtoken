import { getCmsURL } from "@/utils/cms/api-helpers";
import { fetchConfigGlobal, fetchPitching } from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // Initiate both requests in parallel
  const businessPitchingData = getBusinessPitching();
  const globalConfigData = getGlobalConfigs();

  console.log(`${getCmsURL()}/items/policies`);

  //   console.log("config", globalConfigData);
  //   console.log("businessPitchingData", businessPitchingData);

  // Wait for the promises to resolve
  const [config, businessPitching] = await Promise.all([globalConfigData, businessPitchingData]);

  return (
    <>
      <h1>globalConfigData</h1>
      <br />
      {globalConfigData}
      <hr />
      <h1>businessPitching</h1>
      <br />
      {businessPitchingData}
    </>
  );
}

async function getBusinessPitching() {
  const res = await fetchPitching();
  return JSON.stringify(res);
}

async function getGlobalConfigs() {
  const res = await fetchConfigGlobal("th");
  return JSON.stringify(res);
}
