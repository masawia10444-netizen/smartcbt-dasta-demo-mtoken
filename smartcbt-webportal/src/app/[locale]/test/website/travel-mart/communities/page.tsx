import {
  fetchAttractionType,
  fetchCommunities,
  fetchCommunityProjectById,
  fetchCommunityProjects,
  fetchConfigGlobal,
  fetchProvinces,
  fetchRecommendOrganization,
  fetchRegions,
} from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // Initiate both requests in parallel

  const provinceId: number | null = null;
  const communityId: number | null = null;
  const projectId: number | null = 1;
  const regionId: number | null = 1;
  const attractionType: string | null = null;
  const projectTitle: string | null = null;

  const communityProjectData = await getCommunityProjects(
    provinceId,
    projectTitle,
    communityId,
    attractionType,
    regionId
  );

  const communityData = await getCommunities();
  const globalConfigData = await getGlobalConfigs();
  const attractionTypeData = await getAttractionType();
  const provinceData = await getProvinces();
  const regionData = await getRegions();
  const projectByIdData = await getProjectById(projectId);

  const recommendOrganization = await getRecommendOrganization(provinceId);

  //   console.log("config", globalConfigData);
  //   console.log("communitiesData", communitiesData);

  return (
    <>
      <h1>globalConfigData</h1>
      <br />
      {globalConfigData}
      <hr />
      <h1>communities Project Data</h1>
      <br />
      {communityProjectData}
      <hr />
      <h1>attraction type options</h1>
      <br />
      {attractionTypeData}
      <hr />
      <h1>provinces options</h1>
      <br />
      {provinceData}
      <hr />
      <h1>regions options</h1>
      <br />
      {regionData}
      {/* <hr />
      <h1>community options</h1>
      <br />
      {communityData}
      <hr />
      <h1>project by id</h1>
      <br />
      {projectByIdData} */}
      <hr />
      <h1>recommend organization</h1>
      <br />
      {recommendOrganization}
    </>
  );
}

async function getCommunityProjects(
  provinceId?: number | null,
  projectTitle?: string | null,
  communityId?: number | null,
  attractionType?: string | null,
  regionId?: number | null
) {
  const res = await fetchCommunityProjects({
    filter: { provinceId, projectTitle, regionId, communityId, attractionType },
  });
  return JSON.stringify(res);
}

async function getRecommendOrganization(provinceId?: number | null, title?: string | null) {
  const res = await fetchRecommendOrganization({
    filter: { provinceId, title },
  });
  return JSON.stringify(res);
}

async function getAttractionType() {
  const res = await fetchAttractionType();
  return JSON.stringify(res);
}

async function getCommunities() {
  const res = await fetchCommunities();
  return JSON.stringify(res);
}

async function getProvinces() {
  const res = await fetchProvinces();
  return JSON.stringify(res);
}

async function getRegions() {
  const res = await fetchRegions();
  return JSON.stringify(res);
}

async function getGlobalConfigs() {
  const res = await fetchConfigGlobal("th");
  return JSON.stringify(res);
}

async function getProjectById(id: number) {
  const res = await fetchCommunityProjectById(id);
  return JSON.stringify(res);
}
