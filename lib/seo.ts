import type { Metadata } from "next";
import { absUrl, type Lang, type PageKey, SITE } from "@/lib/site";

type Args = {
  key: PageKey;
  lang: Lang;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
};

export function pageMetadata({ key, lang, title, description, image = "kolaj-ic-mekan", type = "website" }: Args): Metadata {
  const url = absUrl(key, lang);
  const images = [`${SITE}/img/${image}.webp`];
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: absUrl(key, "tr"), en: absUrl(key, "en"), "x-default": absUrl(key, "tr") },
    },
    openGraph: {
      type,
      siteName: "Dent32",
      title,
      description,
      url,
      images,
      locale: lang === "tr" ? "tr_TR" : "en_GB",
      alternateLocale: lang === "tr" ? "en_GB" : "tr_TR",
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

/** JSON-LD script etiketi için güvenli serileştirme */
export const jsonLd = (data: object) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
