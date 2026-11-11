import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_CATS, blogCatBySlug } from "@/lib/site";
import { BlogList, blogListMetadata } from "@/views/Blog";

type Props = { params: Promise<{ cat: string }> };

// Statik çıktı: yalnızca bilinen kategoriler üretilir
export const dynamicParams = false;
export const generateStaticParams = () => BLOG_CATS.map((c) => ({ cat: c.slug.en }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = blogCatBySlug("en", (await params).cat);
  return cat ? blogListMetadata("en", cat, 1) : {};
}

export default async function Page({ params }: Props) {
  const cat = blogCatBySlug("en", (await params).cat);
  if (!cat) notFound();
  return <BlogList lang="en" cat={cat} />;
}
