import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BlogList } from "@/views/Blog";

export const metadata: Metadata = pageMetadata({
  key: "blog",
  lang: "tr",
  title: "Beylikdüzü Diş Sağlığı Blogu: Tedavi Rehberleri | Dent32",
  description: "İmplant, diş kaplama, kanal tedavisi, diş eti, çocuk diş sağlığı ve estetik diş hekimliği hakkında Beylikdüzü'ndeki Dent32 hekimlerinden kısa ve net rehberler.",
  image: "blog-gulus-tasarimi",
});

export default function Page() {
  return <BlogList lang="tr" />;
}
