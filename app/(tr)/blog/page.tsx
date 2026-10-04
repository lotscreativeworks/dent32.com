import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BlogList } from "@/views/Blog";

export const metadata: Metadata = pageMetadata({
  key: "blog",
  lang: "tr",
  title: "Blog: diş tedavisi rehberleri | Dent32",
  description: "İmplant, zirkonyum, lamine, beyazlatma, şeffaf plak ve gülüş tasarımı hakkında kısa ve net rehberler.",
  image: "blog-gulus-tasarimi",
});

export default function Page() {
  return <BlogList lang="tr" />;
}
