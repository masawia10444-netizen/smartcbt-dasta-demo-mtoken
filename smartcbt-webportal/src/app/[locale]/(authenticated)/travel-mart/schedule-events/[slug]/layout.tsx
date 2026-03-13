"use client";

import NavigationBar from "@/components/NavigationBar";
import { Fragment, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <Fragment>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-full w-full flex-grow">
        <div className="px-6 pb-4 pt-20 lg:px-8">
          <div className="md:container md:mx-auto">
            <div className="mt-4 min-h-full rounded-2xl border border-smart-cbt-green bg-white lg:mx-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
