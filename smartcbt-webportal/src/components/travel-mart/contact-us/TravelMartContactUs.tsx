"use client";

import { BusinessContact } from "@/models/travel-mart/travel-mart-business-contact";
import { useTranslations } from "next-intl";
import Image from "@/components/image";
import TravelMartContact from "./TravelMartContact";

type TravelMartContactUsProps = {
  data?: BusinessContact[];
};

const TravelMartContactUs = ({ data }: TravelMartContactUsProps) => {
  const t = useTranslations("common");
  const columns = 2;

  const renderContact = (contact: BusinessContact, index: number) => (
    <TravelMartContact
      key={index}
      name={`${contact.first_name ?? ""} ${contact.last_name ?? ""}`}
      position={contact.position}
      phoneNumber={contact.phone ?? ""}
      email={contact.email ?? ""}
    />
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-3xl font-medium text-smart-cbt-dark-green">{t("travelMart.contactUs.title")}</div>
      <div className="divide-y divide-smart-cbt-green">
        {data?.map((item, i) => {
          if (i % columns === 0) {
            const elementItems = data.slice(i, i + columns);
            const containerContent = elementItems.map((value, subIndex) => renderContact(value, i + subIndex));
            return (
              <div key={i} className="flex flex-col items-center gap-9 p-8">
                <div className="flex flex-row gap-4">
                  <Image
                    src={"/images/travel-mart/contact-us/phone-icon.png"}
                    alt={""}
                    width={24}
                    height={24}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                  <div className="text-xl font-medium text-smart-cbt-dark-green">
                    {t("travelMart.contactUs.projectCoordinatorContact")}
                  </div>
                </div>
                <div className="flex flex-row justify-between divide-x divide-smart-cbt-green">{containerContent}</div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TravelMartContactUs;
