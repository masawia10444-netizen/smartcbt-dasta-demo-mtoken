"use client";

import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import { useState } from "react";

export default function LayoutTravelMart({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <div>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-full w-full">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="md:container md:mx-auto">
            <div className="min-h-full bg-white">{children}</div>
            <Footer className="relative md:relative" />
          </div>
        </div>
      </div>
    </div>
  );
}
