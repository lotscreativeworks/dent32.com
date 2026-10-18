import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata: Metadata = pageMetadata({
  key: "home",
  lang: "tr",
  title: "Beylikdüzü Diş Kliniği: İmplant, Kaplama, Gülüş Tasarımı | Dent32",
  description: "Beylikdüzü'nde diş kliniği. İmplant, zirkonyum ve porselen kaplama, gülüş tasarımı, kanal tedavisi ve şeffaf plak. Haftanın yedi günü açık; WhatsApp'tan randevu alın.",
  image: "hekim-huseyin-asci",
});

export default function Page() {
  return <Home lang="tr" />;
}
