import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_CATS, blogCatBySlug } from "@/lib/site";
import { BlogList, blogListMetadata, blogPageParams } from "@/views/Blog";

type Props = { params: Promise<{ cat: string; page: string }> };

// Statik çıktı: yalnızca birden fazla sayfası olan kategorilerin var olan sayfaları üretilir
export const dynamicParams = false;
export const generateStaticParams = () =>
  BLOG_CATS.flatMap((c) => blogPageParams("tr", c).map((p) => ({ cat: c.slug.tr, ...p })));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cat: slug, page } = await params;
  const cat = blogCatBySlug("tr", slug);
  return cat ? blogListMetadata("tr", cat, Number(page)) : {};
}

export default async function Page({ params }: Props) {
  const { cat: slug, page } = await params;
  const cat = blogCatBySlug("tr", slug);
  if (!cat) notFound();
  return <BlogList lang="tr" cat={cat} page={Number(page)} />;
}
