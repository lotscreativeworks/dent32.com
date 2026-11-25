import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Privacy } from "@/views/Privacy";

export const metadata: Metadata = pageMetadata({
  key: "privacy",
  lang: "tr",
  title: "Çerez Politikası ve Aydınlatma Metni | Dent32",
  description: "Dent32 sitesinde kullanılan çerezler, Google Ads ve Google Analytics ölçümü, açık rıza ve KVKK kapsamındaki haklarınız.",
});

export default function Page() {
  return <Privacy lang="tr" />;
}
