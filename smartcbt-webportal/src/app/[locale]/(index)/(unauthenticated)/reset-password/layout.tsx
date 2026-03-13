"use client";

import Footer from "@/components/Footer";
import NavigationBar from "@/components/NavigationBar";
import { useState } from "react";

export default function LayoutResetPassword({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <div>
      <NavigationBar onToggle={toggleMobileMenu} isMobileOpened={isMobileOpened} />
      <div className="relative h-screen">
        <div className="relative h-full w-full">
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 md:bg-[#F5FFF9] lg:px-8">
            <div className="flex flex-col items-center md:container md:mx-auto">
              <div className="min-h-full rounded-2xl border-smart-cbt-green bg-white md:border">{children}</div>
            </div>
          </div>
          <Footer className="w-full" />
        </div>
      </div>
    </div>
  );
}
