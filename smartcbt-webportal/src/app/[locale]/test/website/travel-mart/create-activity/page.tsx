import { COMMUNITY_STATUS } from "@/utils/cms/adapters/website/constants";
import {
  COMMUNITY_STATUS_VALUE,
  CreateCommunityBody,
} from "@/utils/cms/adapters/website/travel-mart/types/communities";
import {
  createCommunity,
  fetchAttractionType,
  fetchAwards,
  fetchCommunityFormById,
  fetchCountries,
  fetchFacilities,
  fetchFolderIdByName,
  fetchTouristTargetGroups,
  fetchTouristTravelType,
  getProfile,
  listCommunityByStatus,
  listMonths,
  loginEmail,
  uploadRegisteredAttachments,
} from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // Initiate both requests in parallel

  // const email: string | null = "test@harmonyx.co";
  // const password: string | null = "admin1234";
  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "BUSINESS";

  const bodyCreateCommunity: CreateCommunityBody = {
    contact_points: [
      {
        firstname: "นายเอ",
        lastname: "นามสกุล",
        mobile: "0911234567",
        email: "test1@example.com",
        line: "line1",
      },
      {
        firstname: "นายบี",
        lastname: "นามสกุล",
        mobile: "0911234567",
        email: "test1@example.com",
        line: "line2",
      },
    ],
    title: "ชุมชมทดสอบ",
    description: "สำหรับทดสอบ",
    address_info: {
      address: "ที่อยู่ 1234",
      province_id: 1,
      district_id: 2,
      sub_district_id: 3,
      postal_code: "10110",
    },
    tourism_activities: [{ title: "กิจกรรม 1" }, { title: "กิจกรรม 2" }],
    tourism_products: [{ title: "สินค้า 1" }, { title: "สินค้า 2" }],
    food_menus: [{ title: "อาหาร 1" }, { title: " อาหาร 2" }],
    awards: [{ title: "มาตรฐานโฮมสเตย์" }],
    traveling_recommended_during: [1, 2, 3, 4],
    tourism_activities_prices: 1000,
    tourist_accomodate_min: null,
    tourist_accomodate_max: 30,
    community_way_of_life: "Way of life 1",
    highlight: "Highlight 1",
    community_local_language: "Thai, English",
    tour_agents: [
      {
        firstname: "นายซี",
        lastname: null,
        mobile: "0911234567",
      },
      {
        firstname: "นายดี",
        lastname: "นามสกุล",
        mobile: "0911234567",
      },
    ],
    galleries: ["b0cb8a86-19c6-4edc-81e0-8ccd63a951d1"],
    videos: ["b0cb8a86-19c6-4edc-81e0-8ccd63a951d1"],
    presentation_video: "www.youtube.com", // youtube link
    presentation_facebook: "www.facebook.com",
    presentation_instagram: "www.instagram.com",
    presentation_tiktok: "www.tiktok.com",
    presentations: "9810c84b-9319-4382-8e01-8558f8fe9535",
    presentation_other: "www.other.com",
    attraction_type: [1, 2, 3],
    facilities: [
      { facility: 1, quantity: 4, size: 3 },
      { facility: 2, quantity: 4, size: 4 },
      { facility: 7, quantity: 4, size: null },
      { facility: 14, quantity: null, size: null },
      { facility: 15, quantity: null, size: null },
    ],
    // tourist_target_groups: [1, 2],
    // tourist_travel_types: [2, 3],
    tourist_travel_countries: [1],
    tourist_travel_regions: [1],
  };

  const resLogin = await loginEmail(email, password, appCode);
  const awards = await getAwards();
  const touristTargetGroups = await getTouristTargetGroups();
  const touristTravelType = await getTouristTravelType();
  const facilities = await getFacilities();
  const attractionType = await getAttractionType();
  const months = await handleGetMonths();
  const countries = await handleGetCountries();

  const communityId = 77;
  const communityForm = await handleGetCommunityFormById(String(resLogin.access_token), appCode, communityId);
  const listCommunity = await handleListCommunityByStatus(
    String(resLogin.access_token),
    appCode,
    COMMUNITY_STATUS.REJECT
  );

  const resultCreateCommunity = await handleCreateCommunity(
    String(resLogin.access_token),
    appCode,
    bodyCreateCommunity
  );

  return (
    <>
      <hr />
      <h1>attraction type</h1>
      <br />
      {attractionType}
      <hr />
      <h1>list community</h1>
      <br />
      {listCommunity}
      <hr />
      <h1>community info</h1>
      <br />
      {communityForm}
      <hr />
      <h1>list facilities</h1>
      <br />
      {facilities}
      <hr />
      <h1>list months</h1>
      <br />
      {months}
      <hr />
      <h1>list countries</h1>
      <br />
      {countries}
      <hr />
    </>
  );
}

async function getAwards() {
  const res = await fetchAwards();
  return JSON.stringify(res);
}

async function getTouristTargetGroups() {
  const res = await fetchTouristTargetGroups();
  return JSON.stringify(res);
}

async function getFacilities() {
  const res = await fetchFacilities();
  return JSON.stringify(res);
}

async function getTouristTravelType() {
  const res = await fetchTouristTravelType();
  return JSON.stringify(res);
}

async function getAttractionType() {
  const res = await fetchAttractionType();
  return JSON.stringify(res);
}

async function handleUploadGalleryOrVideo(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  // use folder communities to upload
  const folderId = await fetchFolderIdByName("Communities");

  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  return await uploadRegisteredAttachments(formData);
}

async function handleCreateCommunity(token: string, appCode: string, body: CreateCommunityBody) {
  const profile = await getProfile(token, appCode);

  const res = await createCommunity(body);
  return JSON.stringify(res);
}

async function handleListCommunityByStatus(token: string, appCode: string, status: COMMUNITY_STATUS_VALUE) {
  const profile = await getProfile(token, appCode);
  const res = await listCommunityByStatus(profile, status);

  return JSON.stringify(res);
}

async function handleGetMonths() {
  const res = await listMonths();

  return JSON.stringify(res);
}

async function handleGetCountries() {
  const res = await fetchCountries();

  return JSON.stringify(res);
}

async function handleGetCommunityFormById(token: string, appCode: string, id: number) {
  const profile = await getProfile(token, appCode);
  const res = await fetchCommunityFormById(profile, id);

  return JSON.stringify(res);
}
