"use client";

import { Session } from "@/contexts/Auth.context";
import { Policies } from "@/models/travel-mart/register/travel-mart-policies";
import { TermConditions } from "@/models/travel-mart/register/travel-mart-term-conditions";
import { District, Subdistrict } from "@/models/travel-mart/travel-mart-countries";
import { ProvinceJSONData } from "@/utils/cms/adapters/master-data/geolocation/provinces";
import { CommunityJSONData } from "@/utils/cms/adapters/website/travel-mart/communities";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { PropsWithChildren } from "react";
import { AuthProvider } from "./context-provider/AuthProvider";

type Data = {
  provinces: ProvinceJSONData[];
  districts: District[];
  subdistricts: Subdistrict[];
  communities: CommunityJSONData[];
  policies: Policies[];
  termConditions: TermConditions[];
};

export default function RootLayout({
  session,
  messages,
  children,
}: PropsWithChildren<{
  messages: any;
  provinces: ProvinceJSONData[];
  districts: District[];
  subdistricts: Subdistrict[];
  communities: CommunityJSONData[];
  policies: Policies[];
  termConditions: TermConditions[];
  session: Session | null;
}>) {
  const locale = useLocale();
  // const [initValue, setInitValue] = useState<Data>({
  //   provinces: [],
  //   districts: [],
  //   subdistricts: [],
  //   communities: [],
  //   termConditions: [],
  //   policies: [],
  // });
  // const fetch = useCallback(async () => {
  //   const [provinces, districts, subdistricts, communities, termConditions, policies] = await Promise.all([
  //     fetchProvinces(),
  //     fetchDistricts(),
  //     fetchSubDistricts(),
  //     fetchCommunities(),
  //     getTermConditions(),
  //     getPolicies(),
  //   ]);

  //   setInitValue({
  //     provinces,
  //     districts,
  //     subdistricts,
  //     communities,
  //     termConditions: termConditions ?? [],
  //     policies: policies ?? [],
  //   });
  // }, []);

  // useEffect(() =>{
  //   void fetch()
  // }, [fetch])

  return (
    <AuthProvider session={session}>
      {/* <AppContext.Provider value={initValue}> */}
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
      {/* </AppContext.Provider> */}
    </AuthProvider>
  );
}
