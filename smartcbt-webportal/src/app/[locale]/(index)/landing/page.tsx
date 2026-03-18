"use client";

import NavigationBar from "@/components/NavigationBar";
import WebPortal from "@/components/web-portal/WebPortal";
import { Fragment, useEffect, useState } from "react";

export default function LandingPage() {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);

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

  const toggleMobileMenu = () => {
    setIsMobileOpened((opened) => !opened);
  };

  return (
    <Fragment>
      <NavigationBar
        onToggle={toggleMobileMenu}
        className={scrollPosition == 0 ? "bg-transparent" : ""}
        isMobileOpened={isMobileOpened}
      />
      <WebPortal />
    </Fragment>
  );
}
