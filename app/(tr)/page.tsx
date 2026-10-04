import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata: Metadata = pageMetadata({
  key: "home",
  lang: "tr",
  title: "Dent32 Diş Kliniği | Beylikdüzü, İstanbul",
  description: "Beylikdüzü'nde diş kliniği. İmplant, zirkonyum, gülüş tasarımı ve şeffaf plak tedavilerinde açık ve planlı bir yaklaşım. Haftanın yedi günü açık.",
  image: "hekim-huseyin-asci",
});

export default function Page() {
  return <Home lang="tr" />;
}
