import { withSentryConfig } from "@sentry/nextjs";
import nextIntl from "next-intl/plugin";
import "./src/env.mjs";

/** @type {import('next').NextConfig} */

// const withNextIntl = require("next-intl/plugin")(
//   // This is the default (also the `src` folder is supported out of the box)
//   "./src/i18n.ts"
// );

// Use nextIntl to extend your configuration with the next-intl plugin
const withNextIntl = nextIntl("./src/i18n.ts");

const nextConfig = withNextIntl({
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    ...(process.env.STAGE === "production"
      ? {
          removeConsole: {
            exclude: ["error"],
          },
        }
      : {}),
  },
  // // https://github.com/tailwindlabs/headlessui/issues/2677
  // webpack: (config) => {
  //   let modularizeImports = null;
  //   config.module.rules.some((rule) =>
  //     rule.oneOf?.some((oneOf) => {
  //       modularizeImports = oneOf?.use?.options?.nextConfig?.modularizeImports;
  //       return modularizeImports;
  //     })
  //   );
  //   if (modularizeImports?.["@headlessui/react"]) delete modularizeImports["@headlessui/react"];
  //   return config;
  // },
  images: {
    loader: "custom",
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "*.smart-cbt.com" },
      { protocol: "https", hostname: "*.smartcbt.dasta.or.th" },
    ],
    dangerouslyAllowSVG: true,
  },
});

// module.exports = nextConfig;
// export default nextConfig;
export default withSentryConfig(
  withNextIntl(nextConfig),
  {
    org: process.env.NEXT_SENTRY_ORG,
    project: process.env.NEXT_SENTRY_PROJECT,

    // An auth token is required for uploading source maps.
    authToken: process.env.NEXT_SENTRY_AUTH_TOKEN,

    silent: false, // Can be used to suppress logs
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
);
