"use client";

import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import { Fragment, useState } from "react";

export default function LayoutTravelMart({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <Fragment>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-screen">
        <div className="relative h-full w-full">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 md:bg-[#F5FFF9] lg:px-8">
            <div className="md:container md:mx-auto">
              <div className="min-h-full rounded-2xl border-smart-cbt-green bg-white md:border">{children}</div>
              <Footer className="relative pt-8 md:relative" />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
