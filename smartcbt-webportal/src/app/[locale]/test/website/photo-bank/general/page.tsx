import {
  CreateAlbumBody,
  PhotoGrapherOnBoardingBody,
  createAlbum,
  deleteAlbumById,
  deleteFileById,
  fetchAlbums,
  fetchCommunities,
  fetchConsentsByAppCode,
  fetchFolderIdByName,
  fetchImageById,
  fetchImages,
  fetchPhotoCategory,
  fetchProvinces,
  fethcAlbumById,
  getOnBoardingPhotoGrapher,
  getProfile,
  loginEmail,
  onboardingPhotoGrapher,
  updateAlbumById,
  updateOnboardingPhotoGrapher,
  uploadFile,
} from "@/utils/cms/cms-api-adapter";

export default async function Page() {
  // Initiate both requests in parallel

  const categoryId = 2;
  const provinceId = 29;
  const communityId = 3;
  const albumId = 26;
  const imageId = 15;
  const keyword = "10";

  const category = await getCategoryList();
  const provinces = await getProvinces();
  const communities = await getCommunities();
  const images = await getImages({});
  const image = await getImageById(imageId);

  // get image in album
  const albumImages = await getImages({ albumId });

  // register photo grapher
  const email: string | null = "pasin3@harmonyx.co";
  const password: string | null = "dreamdream55";
  const appCode: string = "PORTAL";
  const appCodePhoto: string = "PHOTO";

  const resLogin = await loginEmail(email, password, appCode);
  const token = String(resLogin.access_token);

  const albums = await handleGetAlbums(token, appCodePhoto);
  const albumInfo = await handleGetAlbumById(token, appCodePhoto, albumId);

  const consents = await getConsentsByAppCode(appCodePhoto);
  const onboardingInfo = await handleGetOnBoardingPhotoGrapher(token, appCodePhoto);

  const photoGrapherOnBoardingBody = {
    photographer_firstname: "newname",
    photographer_lastname: "lastname",
    photographer_mobile: "0899264725",
    photographer_organization_title: "harmonyx",
    photographer_attachment: "99ab1053-956f-41e0-9b40-034f29342446", // update load file and use id,
    photographer_profile_image: "99ab1053-956f-41e0-9b40-034f29342446", // update load file and use id,
    consents: [1, 2],
  };

  // const res = await handleOnBoardingPhotoGrapher(token, appCode, photoGrapherOnBoardingBody);
  // const res = await handleUpdateOnBoardingPhotoGrapher(token, appCode, photoGrapherOnBoardingBody);

  const body: CreateAlbumBody = {
    name: "chnage test album",
    community: 3,
    region: 3,
    organization: "organzation test",
    images: [
      "fc11b2cd-1c98-4a4e-8d7e-9dca17eb19ad",
      "03d83284-3e44-4d21-acfd-813878b7bac3",
      "85e8fe84-95de-43e0-8872-1c9d49e4199d",
    ], // upload file and use id to stamp in this
    categories: [1, 2, 3],
    tag_words: ["test", "hello"],
    description: "Test", // can null
  };

  await handleCreateAlbum(token, appCodePhoto, body);
  // await handleUpdateAlbum(token, appCodePhoto, albumId, body);

  // const result = await handleUploadPhotoGrapherFile(token, appCode);
  // const result = await handleUploadPhotoFileToAlbum(token, appCode);
  // const result = await handelDeleteFileById(token, appCode, "fe34d767-8646-47df-b36f-1a53190eb6a9");

  return (
    <>
      {/* <h1>photo category</h1>
      <br />
      {category}
      <hr />
      <h1>photo images</h1>
      <br />
      {images}
      <hr />
      <h1>photo image detail</h1>
      <br />
      {image}
      <hr /> */}
      <h1>photo image in albums</h1>
      <br />
      {albumImages}
      <hr />
      <h1>consents</h1>
      <br />
      {consents}
      <hr />
      <h1>albums</h1>
      <br />
      {albums}
      <hr />
      <h1>album Info</h1>
      <br />
      {albumInfo}
      <hr />
      {/* <h1>onboarding Info</h1>
      <br />
      {onboardingInfo}
      <hr /> */}
      {/* <h1>provinces</h1>
      <br />
      {provinces}
      <hr />
      <h1>communities</h1>
      <br />
      {communities}
      <hr /> */}
    </>
  );
}

async function getCategoryList() {
  const list = await fetchPhotoCategory();
  return JSON.stringify(list);
}

async function getProvinces() {
  const list = await fetchProvinces();
  return JSON.stringify(list);
}

async function getCommunities() {
  const list = await fetchCommunities();
  return JSON.stringify(list);
}

async function getImages(body?: {
  keyword?: string;
  provinceId?: number;
  communityId?: number;
  categoryId?: number;
  albumId?: number;
  limit?: number;
}) {
  const list = await fetchImages(body);
  return JSON.stringify(list);
}

async function getImageById(id: number) {
  const image = await fetchImageById(id);
  return JSON.stringify(image);
}

async function handleOnBoardingPhotoGrapher(token: string, appCode: string, body: PhotoGrapherOnBoardingBody) {
  const profile = await getProfile(token, appCode);
  try {
    const res = await onboardingPhotoGrapher(profile, body);
    return JSON.stringify(res);
  } catch (e) {}
}

async function handleUpdateOnBoardingPhotoGrapher(token: string, appCode: string, body: PhotoGrapherOnBoardingBody) {
  const profile = await getProfile(token, appCode);
  try {
    const res = await updateOnboardingPhotoGrapher(profile, body);
    return JSON.stringify(res);
  } catch (e) {}
}

// use to upload attachment and profile image
async function handleUploadPhotoGrapherFile(token: string, appCode: string) {
  await getProfile(token, appCode);
  console.log("test");
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  const folderId = await fetchFolderIdByName("Photo Grapher Onboarding");

  console.log("folderId:", folderId);

  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  await uploadFile(formData);
  return true;
}

async function handleUploadPhotoFileToAlbum(token: string, appCode: string) {
  await getProfile(token, appCode);
  console.log("test");
  const buffer = Buffer.from("Hello World!", "utf-8");
  const fileName = "test.txt";
  const formData = new FormData();

  const folderId = await fetchFolderIdByName("Photo Bank");

  formData.append("folder", folderId);
  formData.append("file", new Blob([buffer]), fileName);

  await uploadFile(formData);
  return true;
}

async function handleCreateAlbum(token: string, appCode: string, body: CreateAlbumBody) {
  try {
    await getProfile(token, appCode);
    const res = await createAlbum(body);
    return JSON.stringify(res);
  } catch (e) {}
}

async function handleUpdateAlbum(token: string, appCode: string, id: number, body: CreateAlbumBody) {
  try {
    await getProfile(token, appCode);
    const res = await updateAlbumById(id, body);
    return JSON.stringify(res);
  } catch (e) {}
}

async function getConsentsByAppCode(appCode: string) {
  const res = await fetchConsentsByAppCode(appCode);
  return JSON.stringify(res);
}

async function handleGetAlbums(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await fetchAlbums(profile);
  return JSON.stringify(res);
}

async function handleGetAlbumById(token: string, appCode: string, id: number) {
  const profile = await getProfile(token, appCode);
  const res = await fethcAlbumById(profile, id);
  return JSON.stringify(res);
}

async function handleGetOnBoardingPhotoGrapher(token: string, appCode: string) {
  const profile = await getProfile(token, appCode);
  const res = await getOnBoardingPhotoGrapher(profile);
  return JSON.stringify(res);
}

async function handelDeleteFileById(token: string, appCode: string, fileId: string) {
  const profile = await getProfile(token, appCode);
  await deleteFileById(fileId);

  return true;
}

async function handelDeletAlbumById(token: string, appCode: string, albumId: string) {
  const profile = await getProfile(token, appCode);
  await deleteAlbumById(albumId);

  return true;
}
