import type { MetadataRoute } from "next";
import { absUrl, ALL_PAGE_KEYS } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ALL_PAGE_KEYS.flatMap((key) =>
    (["tr", "en"] as const).map((lang) => ({
      url: absUrl(key, lang),
      alternates: { languages: { tr: absUrl(key, "tr"), en: absUrl(key, "en"), "x-default": absUrl(key, "tr") } },
    })),
  );
}
