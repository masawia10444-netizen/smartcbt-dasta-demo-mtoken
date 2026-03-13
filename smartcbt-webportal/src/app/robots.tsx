import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  if (process.env.STAGE === "production") {
    return {
      rules: {
        userAgent: "*",
        allow: "",
        disallow: ["/api", "/auth", "/account", "/me", "/profile"],
      },
      sitemap: process.env.NEXT_PUBLIC_SITE_URL + "/sitemap.xml",
    };
  }

  return {
    rules: {
      disallow: "*",
    },
    sitemap: process.env.NEXT_PUBLIC_SITE_URL + "/sitemap.xml",
  };
}
