import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Istanbul } from "@/views/Istanbul";

export const metadata: Metadata = pageMetadata({
  key: "istanbul",
  lang: "tr",
  title: "İstanbul Diş Kliniği | Dent32 Beylikdüzü, Avrupa Yakası",
  description: "İstanbul Avrupa Yakası'nda, Beylikdüzü'ndeki Dent32 diş kliniği: metrobüs ve E-5 ile ulaşım, uzaktan gelenler için ziyaret planı, tedaviler ve SSS.",
  image: "klinik-01-bina",
});

export default function Page() {
  return <Istanbul lang="tr" />;
}
