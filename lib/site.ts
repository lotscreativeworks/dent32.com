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

// --- Blog listesi: kategoriler ve sayfalama ----------------------------------
/** Sayfa başına yazı: ızgara masaüstünde 3, tablette 2 sütun; 24 ikisine de tam bölünür */
export const BLOG_PER_PAGE = 24;
/**
 * Blog kategorileri (sekme sırası). `name` yazıların `cat` alanıyla birebir aynı olmalı.
 * title/desc arama sonucunda, h1/lead sayfada görünür. Yeni kategori eklenirse buraya da eklenir.
 */
export const BLOG_CATS = [
  {
    id: "rehber", name: { tr: "Rehber", en: "Guide" }, slug: { tr: "rehber", en: "guide" },
    title: { tr: "Diş Sağlığı Rehberi: Belirtiler ve Bakım", en: "Dental Health Guide: Symptoms and Care" },
    desc: {
      tr: "Diş ağrısı, diş eti kanaması, ağız kokusu, çekim sonrası bakım ve çocuklarda diş sağlığı hakkında sade ve kısa rehberler.",
      en: "Plain-language guides on toothache, bleeding gums, bad breath, aftercare following an extraction and children's teeth.",
    },
    h1: { tr: "Diş sağlığı rehberi", en: "Dental health guide" },
    lead: {
      tr: "Belirtiler, günlük bakım ve tedavi öncesinde ya da sonrasında merak edilenler hakkında sade ve kısa yazılar.",
      en: "Short, plain-language articles on symptoms, everyday care and common questions before and after treatment.",
    },
  },
  {
    id: "tedavi", name: { tr: "Tedavi", en: "Treatment" }, slug: { tr: "tedavi", en: "treatment" },
    title: { tr: "Diş Tedavileri: Kanal, Dolgu, Çekim", en: "Dental Treatments: Root Canals, Fillings, Extractions" },
    desc: {
      tr: "Kanal tedavisi, dolgu, diş çekimi, diş eti ve çocuk diş tedavileri: süreç nasıl işler, ne kadar sürer, sonrasında nelere dikkat edilir.",
      en: "Root canal treatment, fillings, extractions, gum and children's treatment: how each works, how long it takes and what to expect afterwards.",
    },
    h1: { tr: "Tedavi yazıları", en: "Treatment articles" },
    lead: {
      tr: "Kanal tedavisi, dolgu, çekim ve diş eti tedavilerinin nasıl yapıldığını, ne kadar sürdüğünü ve sonrasında nelere dikkat edileceğini anlatıyoruz.",
      en: "How root canal treatment, fillings, extractions and gum treatment are done, how long they take and what to look out for afterwards.",
    },
  },
  {
    id: "implant", name: { tr: "İmplant", en: "Implants" }, slug: { tr: "implant", en: "implants" },
    title: { tr: "İmplant Rehberi: Süreç, İyileşme ve Bakım", en: "Dental Implant Guide: Process, Healing and Care" },
    desc: {
      tr: "Diş implantı kimlere uygundur, tedavi ve iyileşme nasıl ilerler, all-on-four ve kemik tozu nedir; implant bakımı hakkında yazılar.",
      en: "Who dental implants suit, how treatment and healing progress, what all-on-four and bone grafting involve, and how to care for implants.",
    },
    h1: { tr: "İmplant yazıları", en: "Implant articles" },
    lead: {
      tr: "Diş implantının kimlere uygun olduğunu, tedavi sürecini, iyileşmeyi ve uzun vadeli bakımı adım adım anlatıyoruz.",
      en: "Who dental implants are suitable for, how treatment and healing work, and how to look after implants over the long term.",
    },
  },
  {
    id: "estetik", name: { tr: "Estetik", en: "Aesthetics" }, slug: { tr: "estetik", en: "aesthetics" },
    title: { tr: "Estetik Diş Hekimliği: Gülüş Tasarımı, Lamine", en: "Cosmetic Dentistry: Smile Design, Veneers, Whitening" },
    desc: {
      tr: "Gülüş tasarımı, lamine kaplama, diş beyazlatma ve bonding: hangi yöntem kime uygundur, süreç nasıl işler, nelere dikkat edilir.",
      en: "Smile design, veneers, teeth whitening and bonding: which option suits whom, how the process works and what to keep in mind.",
    },
    h1: { tr: "Estetik diş hekimliği yazıları", en: "Cosmetic dentistry articles" },
    lead: {
      tr: "Gülüş tasarımı, lamine kaplama, beyazlatma ve bonding gibi estetik uygulamaların kime uygun olduğunu ve nasıl yapıldığını anlatıyoruz.",
      en: "Who cosmetic treatments such as smile design, veneers, whitening and bonding suit, and how they are carried out.",
    },
  },
  {
    id: "ortodonti", name: { tr: "Ortodonti", en: "Orthodontics" }, slug: { tr: "ortodonti", en: "orthodontics" },
    title: { tr: "Ortodonti Rehberi: Şeffaf Plak ve Diş Teli", en: "Orthodontics Guide: Clear Aligners and Braces" },
    desc: {
      tr: "Şeffaf plak ile diş teli arasındaki farklar, tedavi süresi, yetişkin ve çocuklarda ortodonti, tedavi sırasında bakım hakkında yazılar.",
      en: "How clear aligners and braces differ, how long treatment takes, orthodontics for adults and children, and care during treatment.",
    },
    h1: { tr: "Ortodonti yazıları", en: "Orthodontics articles" },
    lead: {
      tr: "Şeffaf plak ve diş teli seçeneklerini, tedavi süresini ve tedavi boyunca günlük bakımı anlatıyoruz.",
      en: "Clear aligners and braces compared, how long treatment takes and how to look after your teeth along the way.",
    },
  },
  {
    id: "kaplama", name: { tr: "Kaplama", en: "Crowns" }, slug: { tr: "kaplama", en: "crowns" },
    title: { tr: "Diş Kaplama Rehberi: Zirkonyum, E-max, Köprü", en: "Dental Crowns Guide: Zirconia, E-max and Bridges" },
    desc: {
      tr: "Zirkonyum ve e-max kaplama, köprü ve kaplama sonrası bakım: çeşitleri, farkları, ömrü ve kaplama altında oluşabilecek sorunlar.",
      en: "Zirconia and e-max crowns, bridges and aftercare: the types, how they differ, how long they last and problems that can develop under a crown.",
    },
    h1: { tr: "Diş kaplama yazıları", en: "Dental crown articles" },
    lead: {
      tr: "Zirkonyum, e-max ve köprü gibi kaplama çeşitlerini, aralarındaki farkları ve kaplama sonrası bakımı anlatıyoruz.",
      en: "Types of crowns such as zirconia, e-max and bridges, how they differ and how to care for them afterwards.",
    },
  },
] as const satisfies readonly {
  id: string; name: Localized; slug: Localized; title: Localized; desc: Localized; h1: Localized; lead: Localized;
}[];
export type BlogCat = (typeof BLOG_CATS)[number];
export const blogCatById = (id: string) => BLOG_CATS.find((c) => c.id === id);
export const blogCatBySlug = (lang: Lang, slug: string) => BLOG_CATS.find((c) => c.slug[lang] === slug);
/** Kategorideki yazılar (en yeni başta); kategori yoksa tüm yazılar */
export const postsInCat = (lang: Lang, cat: BlogCat | null) => (cat ? POSTS[lang].filter((p) => p.cat === cat.name[lang]) : POSTS[lang]);
export const blogPageCount = (lang: Lang, cat: BlogCat | null) => Math.max(1, Math.ceil(postsInCat(lang, cat).length / BLOG_PER_PAGE));
/** Blog listesi sayfasının anahtarı; tüm yazıların ilk sayfası mevcut "blog" anahtarıdır */
export const blogListKey = (catId: string | null, page: number): PageKey =>
  catId === null && page === 1 ? "blog" : `bloglist-${catId ?? "all"}-${page}`;

// --- Rotalar -----------------------------------------------------------------
const STATIC_ROUTES = {
  home: { tr: "/", en: "/en/" },
  treat: { tr: "/tedaviler/", en: "/en/treatments/" },
  about: { tr: "/hakkimizda/", en: "/en/about/" },
  gallery: { tr: "/galeri/", en: "/en/gallery/" },
  blog: { tr: "/blog/", en: "/en/blog/" },
  contact: { tr: "/iletisim/", en: "/en/contact/" },
} satisfies Record<string, Localized>;

export type PageKey = keyof typeof STATIC_ROUTES | `post-${string}` | `treat-${string}` | `bloglist-${string}`;

export function route(key: PageKey, lang: Lang, hash?: string): string {
  let path: string;
  if (key.startsWith("post-")) {
    const post = postByKey(lang, key.slice(5));
    path = lang === "tr" ? `/blog/${post.slug}/` : `/en/blog/${post.slug}/`;
  } else if (key.startsWith("treat-")) {
    // Tedavi sayfası: /tedaviler/implant-tedavisi/ · /en/treatments/dental-implants/
    path = `${STATIC_ROUTES.treat[lang]}${treatmentById(key.slice(6)).slug[lang]}/`;
  } else if (key.startsWith("bloglist-")) {
    // Blog listesi: /blog/sayfa/2/ · /blog/kategori/implant/ · /blog/kategori/rehber/sayfa/2/
    // EN: /en/blog/page/2/ · /en/blog/category/implants/ · /en/blog/category/guide/page/2/
    const [, catId, n] = key.split("-");
    const cat = catId === "all" ? null : blogCatById(catId)!;
    const seg = lang === "tr" ? { cat: "kategori", page: "sayfa" } : { cat: "category", page: "page" };
    path = STATIC_ROUTES.blog[lang] + (cat ? `${seg.cat}/${cat.slug[lang]}/` : "") + (Number(n) > 1 ? `${seg.page}/${n}/` : "");
  } else {
    path = STATIC_ROUTES[key as keyof typeof STATIC_ROUTES][lang];
  }
  return hash ? `${path}#${hash}` : path;
}

export const absUrl = (key: PageKey, lang: Lang) => SITE + route(key, lang);
export const ALL_PAGE_KEYS: PageKey[] = [
  ...(Object.keys(STATIC_ROUTES) as PageKey[]),
  // Kategori sayfalarının ilk sayfası site haritasında; sonraki sayfalar yalnızca sayfa bağlantılarıyla bulunur
  ...BLOG_CATS.map((c) => blogListKey(c.id, 1)),
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
