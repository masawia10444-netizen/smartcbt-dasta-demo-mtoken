"use client";

import NavigationBar from "@/components/NavigationBar";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileOpened, setIsMobileOpened] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <NavigationBar
        onToggle={toggleMobileMenu}
        className={`group ${scrollPosition == 0 ? "bg-transparent" : ""}`}
        isMobileOpened={isMobileOpened}
      />
      <div>{children}</div>
    </div>
  );
}
