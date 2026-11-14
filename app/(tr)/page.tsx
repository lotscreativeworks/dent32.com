import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata: Metadata = pageMetadata({
  key: "home",
  lang: "tr",
  title: "Beylikdüzü Diş Kliniği ve Diş Polikliniği | Dent32 · 7 Gün Açık",
  description: "Beylikdüzü diş kliniği Dent32 Ağız ve Diş Sağlığı Polikliniği: implant, zirkonyum, lamine, gülüş tasarımı ve şeffaf plak. Ginza Lavinya, 7 gün açık.",
  image: "hekim-huseyin-asci",
});

export default function Page() {
  return <Home lang="tr" />;
}
