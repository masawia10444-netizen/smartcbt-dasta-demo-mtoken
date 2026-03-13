import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // only server side has access to this token.
    CMS_ADMIN_TOKEN: z.string().min(1),
  },
  client: {
    // frontend
    NEXT_PUBLIC_SITE_URL: z.string().min(1),
    // backend
    NEXT_PUBLIC_CMS_URL: z.string().min(1),
    // ws backend
    NEXT_PUBLIC_CMS_WS_URL: z.string().min(1),
    // used for client side form submit..
    NEXT_PUBLIC_CMS_WEBAPI_TOKEN: z.string().min(1),
    // this control nextjs revalidation(set cms-api.tsx)
    API_CACHE_DISABLED: z.coerce.boolean().optional(),
    // change default locale, note: this will affect seo! currently 'th' and 'en' supported.
    NEXT_PUBLIC_LOCALE_DEFAULT: z.string().min(1).default("th"),
  },
  runtimeEnv: process.env,
});
