import {
  fetchOnBoardingCommunity,
  fetchOnBoardingGuide,
  fetchOnBoardingOrganization,
} from "@/utils/cms/adapters/website/travel-mart/on-boarding";
import {
  CommunityOnBoardingBody,
  GuideOnBoardingBody,
  OrganizationOnBoardingBody,
} from "@/utils/cms/adapters/website/travel-mart/types/on-boarding";
import {
  fetchAssociationTravelGroup,
  fetchAttractionType,
  fetchAwards,
  fetchConsentsByAppCode,
  fetchCsrTypes,
  fetchDastaBusinessType,
  fetchFacilities,
  fetchFolderIdByName,
  fetchLanguageSkills,
  fetchPolicies,
  fetchProvinces,
  fetchSelectingCommunityChoices,
  fetchTermConditions,
  fetchTouristTargetGroups,
  fetchTouristTravelType,
  getProfile,
  loginEmail,
  onBoardingCommunity,
  onBoardingGuide,
  onBoardingOrganization,
  updateOnBoardingCommunity,
  updateOnBoardingGuide,
  updateOnBoardingOrganization,
  uploadRegisteredAttachments,
} from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // Initiate both requests in parallel

  // const email: string | null = "test@harmonyx.co";
  // const password: string | null = "admin1234";
  const email: string | null = "tanapol+1@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode = "BUSINESS";

  const bodyCommunityOnBoarding: CommunityOnBoardingBody = {
    firstname: "firstname",
    lastname: "lastname",
    mobile: "0811111111",
    email: "test@harmonyx.co",
    addressInfo: {
      address: "address",
      provinceId: 1,
      districtId: 1011,
      subDistrictId: 101105,
      postalCode: "12345",
    },
    consents: [2],
  };

  const bodyOrganizationOnBoarding: OrganizationOnBoardingBody = {
    contactPoints: [
      {
        firstname: "first",
        lastname: "last",
        mobile: "0899264725",
        email: "tanapol@harmonyx.co",
        line: "line-1",
      },
    ],
    organizationInfo: {
      organizationTitle: "HXXXX",
      registeredNo: "HX0111",
      registeredAttachments: null,
      address: "เลขที่ 5 ถนน เทส หมู่ 1 ซอย ซอย1 ถนน ถนน1",
      provinceId: 1,
      districtId: 1011,
      subDistrictId: 101105,
      postalCode: "12345",
      organizationYear: 5,
      website: "www.example.com",
      facebook: "www.facebook.com",
      instagram: "www.instagram.com",
      tiktok: "www.tiktok.com",
      other: "www.pinterest.com",
      latitude: "10.1111",
      longitude: "10.1111",
      googleMapUrl: "https://www.google.co.th/maps/@",
    },
    organizationMarketingTourism: {
      dastaBusinessType: 1,
      associationTravelGroup: 1,
      attractionTypes: [2, 4],
      selectingCommunityChoices: [1, 2],
      awards: [1, 2, 3],
      csrTypes: [1, 2],
      requireBusinessMatching: true,
      currentTouristTargetGroups: [1, 2],
      futureTouristTargetGroups: [2, 3],
      requireFacilities: [1, 2, 3, 4],
      currentTouristTravelType: [1, 2],
      futureTouristTravelType: [2, 3],
    },
    consents: [2],
  };

  const bodyGuideOnBoarding: GuideOnBoardingBody = {
    firstname: "firsttttt",
    lastname: "last",
    mobile: "0899264725",
    email: "tanapol@harmonyx.co",
    lineId: "line-1",
    thaiNationalId: "123456789",
    nationality: "123456789",
    facebook: "www.facebook.com",
    instagram: "www.instagram.com",
    other: "www.pinterest.com",
    profileImage: null, // file id from upload file function
    addressInfo: {
      address: "address",
      provinceId: 1,
      districtId: 1011,
      subDistrictId: 101105,
      postalCode: "12345",
    },
    guideInfo: {
      licenseNumber: "LIC123456789",
      licenseExpiredDate: new Date("2023-01-31"), // format is YYYY-MM-DD
      communityTitle: "commu title",
      organizationTitle: "org title",
      monthExperience: 1, // unit month
      yearExperience: 1, // unit year
      workProvinceId: 2, //
      languageSkills: ["thai", "japanese"],
    },
    consents: [2],
  };

  const resLogin = await loginEmail(email, password, appCode);
  const token = resLogin.access_token;
  const provinceData = await getProvinces();
  const dastaBusinessType = await getDastaBusinessType();
  const associationTravelGroup = await getAssociationTravelGroup();
  const csrTypes = await getCsrTypes(token ?? "");
  const selectingCommunityChoices = await getSelectingCommunityChoices(token ?? "");
  const awards = await getAwards();
  const touristTargetGroups = await getTouristTargetGroups(token ?? "");
  const facilities = await getFacilities();
  const touristTravelType = await getTouristTravelType(token ?? "");
  const consents = await getConsents(appCode);
  const languageSkills = await getLanguageSkills();
  const termConditions = await getTermConditions(appCode);
  const policies = await getPolicies(appCode);
  const attractionType = await getAttractionType();

  // const onboardingCommunityInfo = await handleGetOnBoardingCommunity(String(resLogin.access_token), appCode);
  // const onboardingOrganizationInfo = await handleGetOnBoardingOrganization(String(resLogin.access_token), appCode);
  const onboardingGuideInfo = await handleGetOnBoardingGuide(String(resLogin.access_token), appCode);

  // const updateOnBoardingGuide = await handleUpdateOnBoardingGuide(
  //   String(resLogin.access_token),
  //   appCode,
  //   bodyGuideOnBoarding
  // );

  // const updateOnBoardingCommunity = await handleUpdateOnBoardingCommunity(
  //   String(resLogin.access_token),
  //   appCode,
  //   bodyCommunityOnBoarding
  // );

  // const updateOnBoardingOrganization = await handleUpdateOnBoardingOrganization(
  //   String(resLogin.access_token),
  //   appCode,
  //   bodyOrganizationOnBoarding
  // );

  // -------- NOTE: ON BOARDING COMMUNITY FUNCTION --------
  // const onBoardingCommunity = await handleOnboardingCommunity(
  //   String(resLogin.access_token),
  //   appCode, // use  app code = PORTAL for register
  //   bodyCommunityOnBoarding
  // );

  // -------- NOTE: ON BOARDING COMMUNITY FUNCTION --------
  // NOTE: Before onboarding organization and want to add attachments
  // 1. call upload file function
  // 2. Use id from response to set in filed attachments

  // const file = await handleUploadRegisteredAttachments(String(resLogin.access_token), appCode);
  // if (file?.id) bodyOrganizationOnBoarding.organizationInfo.registeredAttachments = file?.id;

  // const onBoardingOrganization = await handleOnboardingOrganization(
  //   String(resLogin.access_token),
  //   appCode, // use  app code = PORTAL for register
  //   bodyOrganizationOnBoarding
  // );

  // -------- NOTE: ON BOARDING GUIDE FUNCTION --------

  // const onBoardingGuide = await handleOnboardingGuide(
  //   String(resLogin.access_token),
  //   appCode, // use  app code = PORTAL for register
  //   bodyGuideOnBoarding
  // );

  return (
    <>
      {/* <h1>provinces options</h1>
      <br />
      {provinceData} */}
      <hr />
      <h1>consents</h1>
      <br />
      {consents}
      <hr />
      <h1>dasta business type</h1>
      <br />
      {dastaBusinessType}
      <hr />
      <h1>association travel group</h1>
      <br />
      {associationTravelGroup}
      <hr />
      <h1>csr types</h1>
      <br />
      {csrTypes}
      <hr />
      <h1>selecting community choices</h1>
      <br />
      {selectingCommunityChoices}
      <hr />
      <h1>awards</h1>
      <br />
      {awards}
      <hr />
      <h1>tourist target groups</h1>
      <br />
      {touristTargetGroups}
      <hr />
      <h1>facilities</h1>
      <br />
      {facilities}
      <hr />
      <h1>tourist travel type</h1>
      <br />
      {touristTravelType}
      <hr />
      <h1>language skill</h1>
      <br />
      {languageSkills}
      <hr />
      <h1>onboarding guide info</h1>
      <br />
      {onboardingGuideInfo}
      <hr />
      {/* <h1>termConditions</h1>
      <br />
      {termConditions}
      <hr />
      <h1>policies</h1>
      <br />
      {policies} */}
      {/* <hr />
      <h1>on boarding community info</h1>
      <br />
      {onboardingCommunity}
      <hr />
      <h1>on boarding guide info</h1>
      <br />
      {onboardingGuide} */}
      {/* <hr />
      <h1>on boarding organization info</h1>
      <br />
      {onboardingOrganizationInfo} */}
      <hr />
      <h1>attraction type</h1>
      <br />
      {attractionType}
      <hr />
    </>
  );
}

async function handleOnboardingCommunity(token: string, appCode: string, body: CommunityOnBoardingBody) {
  const profile = await getProfile(token, appCode);

  try {
    await onBoardingCommunity(profile, body);
  } catch (e) {
    console.log("boarding community:", e);
  }
}

async function handleOnboardingOrganization(token: string, appCode: string, body: OrganizationOnBoardingBody) {
  const profile = await getProfile(token, appCode);

  try {
    await onBoardingOrganization(profile, body);
  } catch (e) {
    console.log("boarding org: ", e);
  }
}

async function handleOnboardingGuide(token: string, appCode: string, body: GuideOnBoardingBody) {
  const profile = await getProfile(token, appCode);

  try {
    await onBoardingGuide(profile, body);
  } catch (e) {
    console.log("boarding guide: ", e);
  }
}

async function getProvinces() {
  const res = await fetchProvinces();
  return JSON.stringify(res);
}

async function getDastaBusinessType() {
  const res = await fetchDastaBusinessType();
  return JSON.stringify(res);
}

async function getAssociationTravelGroup() {
  const res = await fetchAssociationTravelGroup();
  return JSON.stringify(res);
}

async function getCsrTypes(token: string) {
  const res = await fetchCsrTypes();
  return JSON.stringify(res);
}

async function getSelectingCommunityChoices(token: string) {
  const res = await fetchSelectingCommunityChoices();
  return JSON.stringify(res);
}

async function getAwards() {
  const res = await fetchAwards();
  return JSON.stringify(res);
}

async function getTouristTargetGroups(token: string) {
  const res = await fetchTouristTargetGroups();
  return JSON.stringify(res);
}

async function getFacilities() {
  const res = await fetchFacilities();
  return JSON.stringify(res);
}

async function getTouristTravelType(token: string) {
  const res = await fetchTouristTravelType();
  return JSON.stringify(res);
}

async function getConsents(appCode: string) {
  const res = await fetchConsentsByAppCode(appCode);
  return JSON.stringify(res);
}

async function getLanguageSkills() {
  const res = await fetchLanguageSkills();
  return JSON.stringify(res);
}

async function getTermConditions(appCode: string) {
  const res = await fetchTermConditions(appCode);
  return JSON.stringify(res);
}

async function getPolicies(appCode: string) {
  const res = await fetchPolicies(appCode, "privacy");
  return JSON.stringify(res);
}

async function getAttractionType() {
  const res = await fetchAttractionType();
  return JSON.stringify(res);
}

async function handleUploadGuideProfileImage(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  const folderId = await fetchFolderIdByName("Guide Profile Image");

  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  return await uploadRegisteredAttachments(formData);
}

async function handleUploadRegisteredAttachments(token: string, appCode: string) {
  await getProfile(token, appCode);
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  const folderId = await fetchFolderIdByName("Registered Attachments");

  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  return await uploadRegisteredAttachments(formData);
}

async function handleGetOnBoardingCommunity(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);

  const res = await fetchOnBoardingCommunity(profile);
  return JSON.stringify(res);
}

async function handleGetOnBoardingOrganization(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);

  const res = await fetchOnBoardingOrganization(profile);
  return JSON.stringify(res);
}

async function handleGetOnBoardingGuide(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);

  const res = await fetchOnBoardingGuide(profile);
  return JSON.stringify(res);
}

async function handleUpdateOnBoardingCommunity(token: string, appCode: string, body: CommunityOnBoardingBody) {
  const profile = await getProfile(token, appCode);

  const res = await updateOnBoardingCommunity(profile, body);
  return JSON.stringify(res);
}

async function handleUpdateOnBoardingGuide(token: string, appCode: string, body: GuideOnBoardingBody) {
  const profile = await getProfile(token, appCode);

  const res = await updateOnBoardingGuide(profile, body);
  return JSON.stringify(res);
}

async function handleUpdateOnBoardingOrganization(token: string, appCode: string, body: OrganizationOnBoardingBody) {
  const profile = await getProfile(token, appCode);

  const res = await updateOnBoardingOrganization(profile, body);
  return JSON.stringify(res);
}
