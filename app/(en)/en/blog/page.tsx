import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BlogList } from "@/views/Blog";

export const metadata: Metadata = pageMetadata({
  key: "blog",
  lang: "en",
  title: "Dental Health Blog: Implant, Crown and Treatment Guides | Dent32",
  description: "Short, clear guides on dental implants, crowns, root canal treatment, gum health, children's teeth and cosmetic dentistry from the Dent32 team in Istanbul.",
  image: "blog-gulus-tasarimi",
});

export default function Page() {
  return <BlogList lang="en" />;
}
