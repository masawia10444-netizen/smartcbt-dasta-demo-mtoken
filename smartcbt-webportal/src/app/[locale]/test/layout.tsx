import "@/app/globals.css";
import "react-datepicker/dist/react-datepicker.css";

import type { Metadata } from "next";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { notFound } from "next/navigation";

// CMS
import { getCmsMedia } from "@/utils/cms/api-helpers";
import { fetchConfigGlobal } from "@/utils/cms/cms-api-adapter";
import { Collection } from "@/utils/cms/cms-type";

type ConfigGlobalTranslations = Collection["config_global_translations"];

export const runtime = "edge";

const FALLBACK_SEO = {
  title: "SMARTCBT",
  description: "Designated Areas for Sustainable Tourism Administration",
};

// Static metadata
// export const metadata: Metadata = {
//   title: "SMARTCBT - DASTA",
//   description: "Designated Areas for Sustainable Tourism Administration",
// };

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const globals = await fetchConfigGlobal(params.lang);
  if (!globals.translations || globals.translations.length <= 0) return FALLBACK_SEO;
  const data = globals.translations[0] as ConfigGlobalTranslations;
  // console.log(data);
  const url = getCmsMedia(globals.favicon);
  return {
    title: {
      template: `%s | ${data?.title ?? "SMARTCBT"}`,
      default: data.title || "SMARTCBT",
    },
    description: data.description,
    openGraph: { images: getCmsMedia(data.og_image || "") },
    icons: {
      icon: [url],
    },
  };
}

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale();

  const messages = await getMessages(locale);

  return (
    <html lang={params.lang}>
      <head></head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <main className="bg-base-100 min-h-screen overflow-hidden antialiased">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
