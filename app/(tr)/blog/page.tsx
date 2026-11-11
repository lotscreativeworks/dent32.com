import type { Metadata } from "next";
import { BlogList, blogListMetadata } from "@/views/Blog";

export const metadata: Metadata = blogListMetadata("tr", null, 1);

export default function Page() {
  return <BlogList lang="tr" />;
}
