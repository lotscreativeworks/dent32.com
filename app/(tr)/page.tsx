import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata: Metadata = pageMetadata({
  key: "home",
  lang: "tr",
  title: "Beylikdüzü Diş Kliniği ve Diş Hekimi | Dent32 · 7 Gün Açık",
  description: "Beylikdüzü diş kliniği Dent32: implant, zirkonyum, lamine, gülüş tasarımı, şeffaf plak, kanal ve çocuk diş tedavisi. E-5 yanyolu Ginza Lavinya, hafta sonu dahil 7 gün açık.",
  image: "hekim-huseyin-asci",
});

export default function Page() {
  return <Home lang="tr" />;
}
