import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { About } from "@/views/About";

export const metadata: Metadata = pageMetadata({
  key: "about",
  lang: "tr",
  title: "Hakkımızda | Dent32 Diş Kliniği",
  description: "Dent32'nin kurucusu Dr. Hüseyin Aşçı, hekim kadromuz, çalışma biçimimiz ve Beylikdüzü'ndeki kliniğimiz.",
  image: "hakkimizda-huseyin-asci",
});

export default function Page() {
  return <About lang="tr" />;
}
