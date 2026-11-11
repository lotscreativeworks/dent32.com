import type { Metadata } from "next";
import { BlogList, blogListMetadata, blogPageParams } from "@/views/Blog";

type Props = { params: Promise<{ page: string }> };

// Statik çıktı: yalnızca var olan sayfa numaraları üretilir
export const dynamicParams = false;
export const generateStaticParams = () => blogPageParams("en", null);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return blogListMetadata("en", null, Number((await params).page));
}

export default async function Page({ params }: Props) {
  return <BlogList lang="en" page={Number((await params).page)} />;
}
