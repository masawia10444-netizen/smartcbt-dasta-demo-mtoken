export interface Menu {
  title: string;
  href?: string;
  key: string;
}

export const defaultMenu: Menu[] = [
  {
    title: "menus.menu",
    key: "menu",
    href: "/main-menus",
  },
  {
    title: "menus.language",
    key: "language",
  },
  {
    title: "menus.login",
    key: "login",
    href: "/login",
  },
  {
    title: "menus.profile",
    key: "profile",
  },
];

export const registerTravelMartMenu: Menu[] = [
  {
    title: "menus.register",
    key: "register",
    href: "/register/portal",
  },
]

export const simpleMenu: Menu[] = [
  {
    title: "menus.language",
    key: "language",
  },
  // {
  //   title: "menus.register",
  //   key: "register",
  //   href: "/register",
  // },
  {
    title: "menus.profile",
    key: "profile",
  },
];

export const mainMenu: Menu[] = [
  {
    title: "menus.menu",
    key: "menu",
    href: "/main-menus",
  },
  {
    title: "menus.relatedSystem",
    key: "relatedSystem",
  },
];

export const travelMartRegisterMenu: Menu[] = [
  {
    title: "menus.register",
    key: "register-portal",
    href: "/travel-mart/register/portal",
  },
]

export const travelMartMenu: Menu[] = [
  {
    title: "menus.mainPage",
    key: "mainPage",
    href: "/travel-mart",
  },
  {
    title: "menus.menu",
    key: "mainMenus",
    href: "/main-menus",
  },
  {
    title: "menus.aboutProjects",
    key: "aboutProject",
    href: "/travel-mart/about-project",
  },
  {
    title: "menus.detailProjects",
    key: "detailProjects",
    // href: "/travel-mart/detail-projects",
  },
  {
    title: "menus.contactUs",
    key: "contactUs",
    href: "/travel-mart/contact-us",
  },
];

export const siaSroiMenu: Menu[] = [
  {
    title: "menus.mainPage",
    key: "mainPage",
    href: "/sia-sroi/projects/overview",
  },
  {
    title: "menus.menu",
    key: "mainMenus",
    href: "/main-menus",
  },
  {
    title: "menus.contactUs",
    key: "contactUs",
    href: "/travel-mart/contact-us",
  },
];

export const carbonMenu: Menu[] = [
  {
    title: "menus.mainPage",
    key: "mainPage",
    href: "/carbon-footprint/overview",
  },
  {
    title: "menus.menu",
    key: "mainMenus",
    href: "/main-menus",
  },
  // {
  //   title: "menus.contactUs",
  //   key: "contactUs",
  //   href: "/travel-mart/contact-us",
  // },
];

export const photoBankMenu: Menu[] = [
  {
    title: "menus.mainPage",
    key: "mainPage",
    href: "/photo-bank",
  },
  {
    title: "menus.menu",
    key: "menu",
    href: "/main-menus",
  },
  {
    title: "menus.contactUs",
    key: "contactUs",
    href: "/travel-mart/contact-us",
  },
];

export const manageApiMenu: Menu[] = [
  {
    title: "menus.mainApim",
    key: "mainApim",
    href: "/mapi",
  },
  {
    title: "menus.menu",
    key: "mainMenus",
    href: "/main-menus",
  },
  {
    title: "menus.forDeveloper",
    key: "forDeveloper",
    href: "/mapi/developer",
  },
  {
    title: "menus.contactUs",
    key: "contactUs",
    href: "/mapi/contact-us",
  },
];
