import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Gallery } from "@/views/Gallery";

export const metadata: Metadata = pageMetadata({
  key: "gallery",
  lang: "tr",
  title: "Öncesi ve Sonrası Galeri | Dent32 Beylikdüzü Diş Kliniği",
  description: "Beylikdüzü'ndeki Dent32 diş kliniğinde tedavi edilen hastalardan implant ve zirkonyum öncesi ve sonrası fotoğraflar. Sonuçlar kişiden kişiye değişebilir.",
  image: "vaka-zirkonyum1-sonrasi",
});

export default function Page() {
  return <Gallery lang="tr" />;
}
