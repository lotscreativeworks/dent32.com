import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Treatments } from "@/views/Treatments";

export const metadata: Metadata = pageMetadata({
  key: "treat",
  lang: "tr",
  title: "Tedaviler | Dent32 Diş Kliniği",
  description: "İmplant, zirkonyum ve porselen kaplama, gülüş tasarımı, şeffaf plak, diş beyazlatma, kanal tedavisi, çocuk diş hekimliği ve diş eti tedavisi.",
  image: "tedavi-implant",
});

export default function Page() {
  return <Treatments lang="tr" />;
}
