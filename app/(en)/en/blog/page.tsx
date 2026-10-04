import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { BlogList } from "@/views/Blog";

export const metadata: Metadata = pageMetadata({
  key: "blog",
  lang: "en",
  title: "Blog: dental treatment guides | Dent32",
  description: "Short, clear guides on implants, zirconia, veneers, whitening, clear aligners and smile design.",
  image: "blog-gulus-tasarimi",
});

export default function Page() {
  return <BlogList lang="en" />;
}
