import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Treatments } from "@/views/Treatments";

export const metadata: Metadata = pageMetadata({
  key: "treat",
  lang: "tr",
  title: "Beylikdüzü Diş Tedavileri: İmplant, Zirkonyum, Kanal | Dent32",
  description: "Beylikdüzü'ndeki Dent32 diş kliniğinde implant, zirkonyum ve porselen kaplama, gülüş tasarımı, şeffaf plak, diş beyazlatma, kanal tedavisi, çocuk diş hekimliği ve diş eti tedavisi.",
  image: "tedavi-implant",
});

export default function Page() {
  return <Treatments lang="tr" />;
}
