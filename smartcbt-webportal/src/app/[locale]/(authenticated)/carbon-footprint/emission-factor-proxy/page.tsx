import { EmissionProxyPage } from "@/components/carbon/emisison-factor-proxy/EmissionProxyPage";
import CarbonContextProvider from "@/components/context-provider/CarbonContextProvider";
import useCookies from "@/hooks/useCookies";
import { getProfile } from "@/utils/cms/adapters/authen/authen";
import { emissionFactorUnit } from "@/utils/cms/adapters/website/carbon/carbon-option";

export default async function CarbonProxiesPage() {
  const { appCode, token } = useCookies();
  await getProfile(token, appCode);

  const emissionFactorUnits = await emissionFactorUnit();

  return (
    <CarbonContextProvider emissionFactorUnits={emissionFactorUnits}>
      <EmissionProxyPage />
    </CarbonContextProvider>
  );
}
