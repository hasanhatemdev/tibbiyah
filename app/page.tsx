import { HomeScreen } from "@/components/home/HomeScreen";
import { getLang } from "@/lib/get-lang";

export default async function Home() {
  return <HomeScreen initialLang={await getLang()} />;
}
