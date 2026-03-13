import BreadCrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import Image from "@/components/image";
import { useTranslations } from "next-intl";

type TravelMartAboutProjectProps = {};

const TravelMartAboutProject = (props: TravelMartAboutProjectProps) => {
  const t = useTranslations("common");

  const breadCrumbLinks = [
    {
      name: t("menus.home"),
      slug: "travel-mart",
    },
    {
      name: t("menus.aboutProjects"),
      slug: "travel-mart/about-project",
    },
  ];

  const targets = [
    {
      title: "travelMart.aboutProject.target1",
      image: "/images/travel-mart/register/community.png",
    },
    {
      title: "travelMart.aboutProject.target2",
      image: "/images/travel-mart/register/entrepreneur.png",
    },
    {
      title: "travelMart.aboutProject.target3",
      image: "/images/travel-mart/register/guide.png",
    },
  ];

  const invitesGroups = [
    {
      title: "travelMart.aboutProject.invitingCommunitiesTitle",
      key: "community",
      description: "travelMart.aboutProject.invitingCommunitiesDescription",
      image: "/images/travel-mart/about-project/1.png",
    },
    {
      title: "travelMart.aboutProject.invitingEntrepreneursTitle",
      key: "entrepreneur",
      description: "travelMart.aboutProject.invitingEntrepreneursDescription",
      image: "/images/travel-mart/about-project/2.png",
    },
    {
      title: "travelMart.aboutProject.invitingGuidesTitle",
      key: "guide",
      description: "travelMart.aboutProject.invitingGuidesDescription",
      image: "/images/travel-mart/about-project/3.png",
    },
  ];

  return (
    <div className="relative h-full">
      <div className="relative h-[300px] w-full md:h-[400px] lg:h-[65vh]">
        <div className="absolute left-0 right-0 top-0 z-10 h-full w-full bg-black/30" />
        <Image src="/images/travel-mart/about-project/header-bg.png" fill alt="header" style={{ objectFit: "cover" }} />
        <div className="absolute left-5 top-14 z-20 md:top-20">
          <BreadCrumb links={breadCrumbLinks} textWhite />
        </div>
        <div className="container absolute left-1/2 top-1/2 z-20 mx-auto -translate-x-1/2 -translate-y-1/2 text-white">
          <div className="flex flex-col items-center gap-4 text-white md:gap-10">
            <h1 className="text-3xl font-semibold drop-shadow-md md:text-5xl xl:text-9xl">
              {t("travelMart.aboutProject.headerTitle")}
            </h1>
            <p className="text-center text-base font-thin lg:text-3xl">
              {t("travelMart.aboutProject.headerDescription")}
            </p>
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-white py-4 md:py-10">
        <div className="flex flex-col items-center gap-4 text-smart-cbt-dark-green md:gap-10">
          <h1 className="text-2xl md:text-4xl">{t("travelMart.aboutProject.aboutProjectTitle")}</h1>
          <p
            className="justify-center text-left text-sm md:text-lg"
            dangerouslySetInnerHTML={{ __html: t("travelMart.aboutProject.aboutProjectDescription") }}
          ></p>
        </div>
      </div>
      {/* <div className="relative bg-[#08979C]">
        <div className="container mx-auto py-4 md:py-10">
          <div className="flex flex-col items-center gap-4 text-white md:gap-10">
            <h1 className="text-center text-2xl md:text-4xl">{t("travelMart.aboutProject.targetOfProject")}</h1>
            <div className="flex  w-full flex-col items-center justify-center px-20 md:flex-row md:justify-between">
              {targets.map((target, i) => {
                return <TargetGridItem key={i} image={target.image} title={target.title} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto bg-white py-4 md:py-10">
        <div className="flex flex-col items-center gap-4 text-smart-cbt-dark-green md:gap-10">
          <h1 className="text-2xl md:text-4xl">{t("travelMart.aboutProject.creatingUnderstanding")}</h1>
          <div className="flex w-full flex-col gap-10">
            {invitesGroups.map((inv, i) => {
              return (
                <InviteGridItem
                  key={inv.key}
                  description={inv.description}
                  index={i}
                  image={inv.image}
                  title={inv.title}
                />
              );
            })}
          </div>
        </div>
      </div> */}
      <Footer className="relative pt-8 md:relative" />
    </div>
  );
};

export default TravelMartAboutProject;
