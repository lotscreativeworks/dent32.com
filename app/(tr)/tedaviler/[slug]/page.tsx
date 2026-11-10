import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { treatmentBySlug, TREATMENTS } from "@/lib/site";
import { TreatmentDetail } from "@/views/Treatments";

type Props = { params: Promise<{ slug: string }> };

// Statik çıktı: yalnızca bilinen tedaviler üretilir
export const dynamicParams = false;
export const generateStaticParams = () => TREATMENTS.map((t) => ({ slug: t.slug.tr }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tr = treatmentBySlug("tr", (await params).slug);
  if (!tr) return {};
  return pageMetadata({ key: `treat-${tr.id}`, lang: "tr", title: tr.seoTitle.tr, description: tr.seoDesc.tr, image: tr.img });
}

export default async function Page({ params }: Props) {
  const tr = treatmentBySlug("tr", (await params).slug);
  if (!tr) notFound();
  return <TreatmentDetail lang="tr" tr={tr} />;
}
