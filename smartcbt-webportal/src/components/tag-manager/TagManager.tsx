"use client";

import { useEffect } from "react";
import GTMTagManager from "react-gtm-module";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID as string;
const tagManagerArgs = {
  gtmId: GTM_ID,
};

const TagManager = () => {
  useEffect(() => {
    if (!GTM_ID) return

    GTMTagManager.initialize(tagManagerArgs);
  }, []);

  return <div id="tag-manager" />;
};

export default TagManager;
