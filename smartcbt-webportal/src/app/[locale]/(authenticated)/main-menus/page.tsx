import MainMenu from "@/components/main-menu/MainMenu";
import useCookies from "@/hooks/useCookies";

export default async function MenuPage() {
  const { isMTokenSession } = useCookies();
  return <MainMenu isMTokenSession={isMTokenSession} />;
}
