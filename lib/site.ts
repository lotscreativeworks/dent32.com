import blogEn from "@/content/blog.en.json";
import blogTr from "@/content/blog.tr.json";
import siteData from "@/content/site.json";
import { type Lang, type Localized, WA } from "@/lib/core";

export { type Lang, type Localized, PHONE, PHONE_E164, translator, WA, waLink } from "@/lib/core";

// --- Klinik bilgileri --------------------------------------------------------
export const SITE = "https://dent32.com";
/** Kurumun ruhsat türüne uygun tam adı (poliklinik). Altlıkta, Hakkımızda'da ve kurumsal kayıtta kullanılır. */
export const OFFICIAL_NAME = "Dent32 Ağız ve Diş Sağlığı Polikliniği";
export const EMAIL = "info@dent32.com";
export const STREET = "Barış Mah., Ginza Lavinya, E-5 Yanyolu No:30 D:179";
export const ADDRESS = `${STREET}, 34520 Beylikdüzü / İstanbul`;
export const GEO = { lat: 41.0100185, lng: 28.6530091 };
/** Google Haritalar'daki Dent32 kaydının kimliği (CID): harita koordinat yerine doğrudan kliniği gösterir */
const MAPS_CID = "16282045604847102906";
export const MAP_EMBED = (hl: Lang) =>
  `https://maps.google.com/maps?cid=${MAPS_CID}&z=17&hl=${hl}&output=embed`;
export const GMB = "https://maps.app.goo.gl/ZyUfuxXdQUzmkPH89";
export const IG = "https://www.instagram.com/dent.32/";
export const SOCIAL = [
  { key: "instagram", name: "Instagram", url: IG, icon: "sosyal-instagram.png" },
  { key: "facebook", name: "Facebook", url: "https://www.facebook.com/pages/category/Doctor/DENT-32-153857862092782/", icon: "sosyal-facebook.svg" },
  { key: "whatsapp", name: "WhatsApp", url: WA, icon: "sosyal-whatsapp.png" },
  { key: "youtube", name: "YouTube", url: "https://www.youtube.com/channel/UCFzDdXSD2lG0HSAKhkEds5Q", icon: "sosyal-youtube.png" },
  { key: "tiktok", name: "TikTok", url: "https://www.tiktok.com/@dent.32", icon: "sosyal-tiktok.svg" },
] as const;
/** Basında Dent32: Hakkımızda sayfası ve llms.txt buradan beslenir. Yeni haber çıkınca outlets'e ekleyin. */
export const PRESS = {
  date: "2026-10-23",
  title: "Dr. Hüseyin Aşçı: Ağız ve diş sağlığı genel sağlığın aynasıdır",
  postKey: "genelsaglik",
  outlets: [
    { name: "DHA", url: "https://www.dha.com.tr/saglik-yasam/dr-huseyin-asci-agiz-ve-dis-sagligi-genel-sagligin-aynasidir-2968378" },
    { name: "Haberton", url: "https://haberton.com/dis-sagligini-ihmal-edenler-dikkat-dr-huseyin-ascidan-genel-saglik-icin-kritik-uyari/" },
    { name: "Çukurova Gazetesi", url: "https://cukurovagazetesi.com/dis-eti-hastaliklari-genel-sagligi-tkileyebilir" },
    { name: "Avrupa Gazete", url: "https://www.avrupagazete.co.uk/dr-huseyin-asci-agiz-ve-dis-sagligi-genel-sagligin-aynasidir" },
  ],
} as const;
/**
 * Sağlık Hizmetlerinde Tanıtım ve Bilgilendirme Faaliyetleri Hakkında Yönetmelik (RG 12.11.2025, 33075):
 * - md. 5/1-ı: sitede son güncelleme tarihi ve site editörüne ulaşılacak iletişim bilgisi açıkça yazılır (altlık).
 * - md. 7/k: yurt içi tanıtımdaki görsel içeriklerde aşağıdaki uyarı kolay okunur biçimde yer alır.
 * Site her derlemede yeniden üretildiği için derleme tarihi sitenin son güncelleme tarihidir.
 */
export const SITE_UPDATED = new Date().toISOString().slice(0, 10);
export const VISUAL_WARNING = {
  tr: "Her cerrahi veya girişimsel işlemde sonuçlar kişiden kişiye değişiklik gösterebilir. İşlem öncesinde hekiminizden detaylı görüş almanız önerilir.",
  en: "Results of any surgical or interventional procedure may vary from person to person. You are advised to obtain a detailed opinion from your dentist before any procedure.",
} as const;

/** Kliniğin günlük saatleri netleşince doldurun, ör. ["09:00", "19:00"]. Boşken JSON-LD'de saat yazılmaz. */
export const CLINIC_HOURS: [string, string] | null = null;

// --- İçerik ------------------------------------------------------------------
export type Post = {
  key: string; date: string; cat: string; cover: string; slug: string;
  title: string; desc: string; lead: string;
  /** İçerik sonradan düzeltildiyse son güncelleme tarihi (yazıda ve JSON-LD dateModified'da gösterilir) */
  updated?: string;
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

export const { treatments: TREATMENTS, strip: STRIP, team: TEAM, clinic: CLINIC, reels: REELS } = siteData;
export type Treatment = (typeof TREATMENTS)[number];
export const treatmentById = (id: string) => TREATMENTS.find((t) => t.id === id)!;
export const treatmentBySlug = (lang: Lang, slug: string) => TREATMENTS.find((t) => t.slug[lang] === slug);
/** Yazının bağlandığı tedavi sayfası: yazının `posts` listesinde ilk geçtiği tedavi */
export const treatmentForPost = (key: string) => TREATMENTS.find((t) => t.posts.includes(key));

// --- Rotalar -----------------------------------------------------------------
const STATIC_ROUTES = {
  home: { tr: "/", en: "/en/" },
  treat: { tr: "/tedaviler/", en: "/en/treatments/" },
  about: { tr: "/hakkimizda/", en: "/en/about/" },
  gallery: { tr: "/galeri/", en: "/en/gallery/" },
  blog: { tr: "/blog/", en: "/en/blog/" },
  contact: { tr: "/iletisim/", en: "/en/contact/" },
} satisfies Record<string, Localized>;

export type PageKey = keyof typeof STATIC_ROUTES | `post-${string}` | `treat-${string}`;

export function route(key: PageKey, lang: Lang, hash?: string): string {
  let path: string;
  if (key.startsWith("post-")) {
    const post = postByKey(lang, key.slice(5));
    path = lang === "tr" ? `/blog/${post.slug}/` : `/en/blog/${post.slug}/`;
  } else if (key.startsWith("treat-")) {
    // Tedavi sayfası: /tedaviler/implant-tedavisi/ · /en/treatments/dental-implants/
    path = `${STATIC_ROUTES.treat[lang]}${treatmentById(key.slice(6)).slug[lang]}/`;
  } else {
    path = STATIC_ROUTES[key as keyof typeof STATIC_ROUTES][lang];
  }
  return hash ? `${path}#${hash}` : path;
}

export const absUrl = (key: PageKey, lang: Lang) => SITE + route(key, lang);
export const ALL_PAGE_KEYS: PageKey[] = [
  ...(Object.keys(STATIC_ROUTES) as PageKey[]),
  ...TREATMENTS.map((t) => `treat-${t.id}` as PageKey),
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
