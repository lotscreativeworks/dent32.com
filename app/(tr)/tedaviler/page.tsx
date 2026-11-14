import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Treatments } from "@/views/Treatments";

export const metadata: Metadata = pageMetadata({
  key: "treat",
  lang: "tr",
  title: "Beylikdüzü Diş Tedavileri: İmplant, Zirkonyum, Kanal | Dent32",
  description: "Dent32 Beylikdüzü'nde implant, zirkonyum ve porselen kaplama, gülüş tasarımı, şeffaf plak, beyazlatma, kanal, çocuk diş ve diş eti tedavileri.",
  image: "tedavi-implant",
});

export default function Page() {
  return <Treatments lang="tr" />;
}
