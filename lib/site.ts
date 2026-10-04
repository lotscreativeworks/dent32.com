import blogEn from "@/content/blog.en.json";
import blogTr from "@/content/blog.tr.json";
import siteData from "@/content/site.json";

export type Lang = "tr" | "en";
export type Localized<T = string> = Record<Lang, T>;

/** İki dilli metin seçici: t("Merhaba", "Hello") */
export const translator = (lang: Lang) => (tr: string, en: string) => (lang === "tr" ? tr : en);

// --- Klinik bilgileri --------------------------------------------------------
export const SITE = "https://dent32.com";
export const PHONE = "+90 555 011 33 68";
export const PHONE_E164 = "+905550113368";
export const WA = "https://wa.me/905550113368";
export const EMAIL = "info@dent32.com";
export const STREET = "Barış Mah., Ginza Lavinya, E-5 Yanyolu No:30 D:179";
export const ADDRESS = `${STREET}, 34520 Beylikdüzü / İstanbul`;
export const GEO = { lat: 41.0100185, lng: 28.6530091 };
export const MAP_EMBED = (hl: Lang) =>
  `https://maps.google.com/maps?q=${GEO.lat},${GEO.lng}&z=17&hl=${hl}&output=embed`;
export const GMB = "https://maps.app.goo.gl/PqUcLHUcNRhoC3eF9";
export const IG = "https://www.instagram.com/dent.32/";
export const SOCIAL = [
  { key: "instagram", name: "Instagram", url: IG, icon: "sosyal-instagram.png" },
  { key: "facebook", name: "Facebook", url: "https://www.facebook.com/pages/category/Doctor/DENT-32-153857862092782/", icon: "sosyal-facebook.svg" },
  { key: "whatsapp", name: "WhatsApp", url: WA, icon: "sosyal-whatsapp.png" },
  { key: "youtube", name: "YouTube", url: "https://www.youtube.com/channel/UCFzDdXSD2lG0HSAKhkEds5Q", icon: "sosyal-youtube.png" },
  { key: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@dent.32", icon: "sosyal-tiktok.svg" },
] as const;
/** Kliniğin günlük saatleri netleşince doldurun, ör. ["09:00", "19:00"]. Boşken JSON-LD'de saat yazılmaz. */
export const CLINIC_HOURS: [string, string] | null = null;

export const waLink = (text: string) => `${WA}?text=${encodeURIComponent(text)}`;

// --- İçerik ------------------------------------------------------------------
export type Post = {
  key: string; date: string; cat: string; cover: string; slug: string;
  title: string; desc: string; lead: string;
  sections: { id: string; h: string; html: string }[];
  faq: { q: string; a: string }[];
};
const byDateDesc = (a: Post, b: Post) => b.date.localeCompare(a.date);
export const POSTS: Record<Lang, Post[]> = {
  tr: [...(blogTr as Post[])].sort(byDateDesc),
  en: [...(blogEn as Post[])].sort(byDateDesc),
};
export const getPost = (lang: Lang, slug: string) => POSTS[lang].find((p) => p.slug === slug);
export const postByKey = (lang: Lang, key: string) => POSTS[lang].find((p) => p.key === key)!;

export const { treatments: TREATMENTS, strip: STRIP, reviews: REVIEWS, team: TEAM, clinic: CLINIC, reels: REELS } = siteData;
export type Treatment = (typeof TREATMENTS)[number];

// --- Rotalar -----------------------------------------------------------------
const STATIC_ROUTES = {
  home: { tr: "/", en: "/en/" },
  treat: { tr: "/tedaviler/", en: "/en/treatments/" },
  about: { tr: "/hakkimizda/", en: "/en/about/" },
  gallery: { tr: "/galeri/", en: "/en/gallery/" },
  blog: { tr: "/blog/", en: "/en/blog/" },
  contact: { tr: "/iletisim/", en: "/en/contact/" },
} satisfies Record<string, Localized>;

export type PageKey = keyof typeof STATIC_ROUTES | `post-${string}`;

export function route(key: PageKey, lang: Lang, hash?: string): string {
  let path: string;
  if (key.startsWith("post-")) {
    const post = postByKey(lang, key.slice(5));
    path = lang === "tr" ? `/blog/${post.slug}/` : `/en/blog/${post.slug}/`;
  } else {
    path = STATIC_ROUTES[key as keyof typeof STATIC_ROUTES][lang];
  }
  return hash ? `${path}#${hash}` : path;
}

export const absUrl = (key: PageKey, lang: Lang) => SITE + route(key, lang);
export const ALL_PAGE_KEYS: PageKey[] = [
  ...(Object.keys(STATIC_ROUTES) as PageKey[]),
  ...POSTS.tr.map((p) => `post-${p.key}` as PageKey),
];

// --- Tarih -------------------------------------------------------------------
const MONTHS: Localized<string[]> = {
  tr: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
const MONTH_ABBR: Localized<string[]> = {
  tr: ["OCA", "ŞUB", "MAR", "NİS", "MAY", "HAZ", "TEM", "AĞU", "EYL", "EKİ", "KAS", "ARA"],
  en: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
};
const parts = (iso: string) => iso.split("-").map(Number) as [number, number, number];
export const dateLong = (iso: string, lang: Lang) => {
  const [y, m, d] = parts(iso);
  return `${d} ${MONTHS[lang][m - 1]} ${y}`;
};
export const dateBadge = (iso: string, lang: Lang) => {
  const [, m, d] = parts(iso);
  return { day: d, month: MONTH_ABBR[lang][m - 1] };
};
export const readMinutes = (post: Post) => {
  const text = [post.lead, ...post.sections.map((s) => s.html), ...post.faq.map((f) => f.q + f.a)].join(" ");
  return Math.max(1, Math.ceil(text.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 200));
};
