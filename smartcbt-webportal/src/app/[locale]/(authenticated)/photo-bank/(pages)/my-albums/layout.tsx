import AppContextProvider from "@/components/context-provider/AppContextProvider";
import { fetchCommunities } from "@/utils/cms/cms-api-adapter";

export default async function MyAlbumsLayout({ children }: { children: React.ReactNode }) {
  const communities = await fetchCommunities();

  return <AppContextProvider communities={communities}>{children}</AppContextProvider>;
}
