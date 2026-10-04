import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Gallery } from "@/views/Gallery";

export const metadata: Metadata = pageMetadata({
  key: "gallery",
  lang: "tr",
  title: "Galeri: öncesi ve sonrası | Dent32",
  description: "İmplant ve zirkonyum tedavilerinden rötuşsuz öncesi ve sonrası fotoğrafları.",
  image: "vaka-zirkonyum1-sonrasi",
});

export default function Page() {
  return <Gallery lang="tr" />;
}
