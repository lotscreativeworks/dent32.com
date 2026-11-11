import type { Metadata } from "next";
import { BlogList, blogListMetadata } from "@/views/Blog";

export const metadata: Metadata = blogListMetadata("en", null, 1);

export default function Page() {
  return <BlogList lang="en" />;
}
