import AppContextProvider from "@/components/context-provider/AppContextProvider";
import SiaSroiContextProvider from "@/components/context-provider/SiaSroiContextProvider";
import FinancialProxyPage from "@/components/financial-proxy/FinancialProxyPage";
import useCookies from "@/hooks/useCookies";
import { fetchProvinces, getListManageFinancialProxy, getProfile } from "@/utils/cms/cms-api-adapter";

import { fetchProjectTypes, getDiscountRate } from "@/utils/cms/cms-api-adapter";

export default async function Proxies() {
  const { appCode, token } = useCookies();
  const profile = await getProfile(token, appCode);

  const [provinces, listFinancialProxy, discountRates, projectTypes] = await Promise.all([
    fetchProvinces(),
    getListManageFinancialProxy(profile),
    getDiscountRate(),
    fetchProjectTypes(),
  ]);

  return (
    <AppContextProvider provinces={provinces}>
      <SiaSroiContextProvider discountRates={discountRates} projectTypes={projectTypes}>
        <FinancialProxyPage listFinancialProxy={listFinancialProxy} />;
      </SiaSroiContextProvider>
    </AppContextProvider>
  );
}
