export type MainMenusType = {
  title: string;
  image: string;
  href: string;
  disabled?: boolean;
  width?: number;
  height?: number;
};

export const photoBankMenu = {
  title: "mainMenu.photoBank",
  image: "/images/shared/photo-bank.png",
  href: "/photo-bank",
};
export const apiMenu = {
  title: "mainMenu.api",
  image: "/images/shared/api.png",
  href: "/mapi",
};
export const siaSroiMenu = {
  title: "mainMenu.siaSroi",
  image: "/images/shared/sia-sroi.png",
  href: "/sia-sroi/projects/overview",
};
export const carbonFootprintMenu = {
  title: "mainMenu.carbonFootprint",
  image: "/images/shared/carbon-footprint.png",
  href: "/carbon-footprint/overview",
};
export const travelMartMenu = {
  title: "mainMenu.travelMart",
  image: "/images/shared/travel-mart.png",
  href: "/travel-mart",
};

export const cbtThailandMenu = {
  title: "mainMenu.cbtThailand",
  image: "/images/shared/cbt-thailand.png",
  href: "https://cbtthailand.dasta.or.th/webapp",
  width: 140,
  height: 140,
};
