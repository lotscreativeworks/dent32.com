import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { getPost, POSTS } from "@/lib/site";
import { BlogPost } from "@/views/Blog";

type Props = { params: Promise<{ slug: string }> };

// Statik çıktı: yalnızca bilinen yazılar üretilir
export const dynamicParams = false;
export const generateStaticParams = () => POSTS.tr.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost("tr", (await params).slug);
  if (!post) return {};
  return pageMetadata({ key: `post-${post.key}`, lang: "tr", title: `${post.title} | Dent32`, description: post.desc, image: post.cover, type: "article" });
}

export default async function Page({ params }: Props) {
  const post = getPost("tr", (await params).slug);
  if (!post) notFound();
  return <BlogPost lang="tr" post={post} />;
}
