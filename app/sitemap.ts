import type { MetadataRoute } from "next";
import { absUrl, ALL_PAGE_KEYS, type PageKey, POSTS } from "@/lib/site";

export const dynamic = "force-static";

/** Yazılarda yayın tarihi, blog listesinde en yeni yazının tarihi; diğer sayfalarda tarih yazılmaz */
const lastModified = (key: PageKey) => {
  if (key === "blog") return POSTS.tr[0].date;
  if (key.startsWith("post-")) return POSTS.tr.find((p) => `post-${p.key}` === key)?.date;
};

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_PAGE_KEYS.flatMap((key) =>
    (["tr", "en"] as const).map((lang) => ({
      url: absUrl(key, lang),
      lastModified: lastModified(key),
      alternates: { languages: { tr: absUrl(key, "tr"), en: absUrl(key, "en"), "x-default": absUrl(key, "tr") } },
    })),
  );
}
