import type { Metadata } from "next";
import {
  absUrl, CLINIC_HOURS, EMAIL, GEO, GMB, type Lang, OFFICIAL_NAME, type PageKey, PHONE_E164, PRESS, route, SITE, SOCIAL, STREET, TEAM, translator,
  TREATMENTS,
} from "@/lib/site";

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

/** Kliniğin tüm sayfalarda aynı @id ile anılan kaydı; yerel aramada ilçe ve hizmetleri tanıtır */
export const DENTIST_ID = `${SITE}/#dentist`;

/** Klinikten hasta gelen ilçeler (Google'a hizmet bölgesi olarak bildirilir) */
const AREA_SERVED = ["Beylikdüzü", "Esenyurt", "Büyükçekmece", "Avcılar", "İstanbul"];

/** Kliniğin aranırken kullanılan diğer adları */
const ALTERNATE_NAMES = [OFFICIAL_NAME, "Dent32 Beylikdüzü", "Dent32 Beylikdüzü Diş Kliniği", "Dent32 Beylikdüzü Diş Polikliniği", "Dent32 Diş Kliniği", "Dent 32"];

/** Kliniğin öne çıkardığı tedaviler (JSON-LD knowsAbout); kurucu hekimin çalışma alanıyla aynı */
const CLINIC_FOCUS: Record<Lang, string[]> = {
  tr: ["İmplant tedavisi", "Tüm çene implant (All-on-4, All-on-6)", "Zirkonyum kaplama", "Lamine (porselen veneer)", "Gülüş tasarımı", "İmplant üstü protez"],
  en: ["Dental implants", "Full-arch implants (All-on-4, All-on-6)", "Zirconia crowns", "Porcelain veneers", "Smile design", "Implant-supported dentures"],
};

const FOUNDER_ID = `${SITE}/#huseyin-asci`;
const FOUNDER_IMG = "hekim-huseyin-asci";

/** Hekimlerin çalıştığı yer: rehber sitelerindeki eski adreslerle karışmasın diye her hekim kaydında Beylikdüzü adresi yazılır */
const workPlace = () => ({
  "@type": "Place", name: "Dent32, Beylikdüzü",
  address: { "@type": "PostalAddress", streetAddress: STREET, addressLocality: "Beylikdüzü", addressRegion: "İstanbul", postalCode: "34520", addressCountry: "TR" },
});

/**
 * Kurucu hekim Dr. Hüseyin Aşçı: klinik kaydında (founder) ve profil yazısında (ProfilePage) aynı nesne.
 * Çalışma alanı implant, tüm çene implant, zirkonyum ve lamine; ortodontiyle anılmaması klinik tercihidir.
 */
export function founderLd(lang: Lang) {
  const t = translator(lang);
  return {
    "@type": "Person", "@id": FOUNDER_ID, name: "Dr. Hüseyin Aşçı", alternateName: ["Hüseyin Aşçı", "Hüseyin Aşcı", "Dt. Hüseyin Aşçı"],
    jobTitle: t("Diş hekimi, Dent32 kurucusu", "Dentist, founder of Dent32"),
    description: t("Beylikdüzü'ndeki Dent32'nin kurucu diş hekimi; klinik çalışmalarının merkezinde implant, All-on-4 ve All-on-6 tüm çene implant, zirkonyum kaplama ve lamine yer alır.",
      "Founding dentist of Dent32 in Beylikdüzü, Istanbul; his clinical work centres on dental implants, All-on-4 and All-on-6 full-arch implants, zirconia crowns and porcelain veneers."),
    url: absUrl("post-huseyinasci", lang), image: `${SITE}/img/${FOUNDER_IMG}.webp`,
    alumniOf: { "@type": "CollegeOrUniversity", name: "İstanbul Üniversitesi Diş Hekimliği Fakültesi" },
    hasOccupation: {
      "@type": "Occupation", name: t("Diş hekimi", "Dentist"),
      occupationLocation: { "@type": "City", name: "Beylikdüzü, İstanbul" },
      skills: CLINIC_FOCUS[lang].join(", "),
    },
    knowsAbout: CLINIC_FOCUS[lang],
    worksFor: { "@id": DENTIST_ID }, workLocation: workPlace(),
    knowsLanguage: ["tr", "en"],
    sameAs: ["https://www.instagram.com/dr.huseyinasci/"],
    subjectOf: PRESS.outlets.map((o) => ({
      "@type": "NewsArticle", headline: PRESS.title, datePublished: PRESS.date, url: o.url, publisher: { "@type": "Organization", name: o.name },
    })),
  };
}

type TeamMember = (typeof TEAM)[number];

/** Kadrodaki hekim: kurucu hekim yalnızca @id ile anılır (ayrıntılar founderLd'de), diğerleri ad ve unvanla (portrelerin kaynağı doğrulanana dek görsel yok) */
function teamMemberLd(m: TeamMember, lang: Lang) {
  if (m.img === FOUNDER_IMG) return { "@type": "Person", "@id": FOUNDER_ID, name: m.name, url: absUrl("post-huseyinasci", lang) };
  return {
    "@type": "Person", name: m.name, jobTitle: m.role[lang], url: absUrl("post-kadro", lang),
    worksFor: { "@id": DENTIST_ID }, workLocation: workPlace(),
  };
}

/** Bazı yazılara özel ek JSON-LD: hekim profili (ProfilePage) ve hekim kadrosu (ItemList) */
export function postExtraLd(key: string, lang: Lang, title: string) {
  if (key === "huseyinasci") {
    return {
      "@context": "https://schema.org", "@type": "ProfilePage", url: absUrl("post-huseyinasci", lang), name: title, inLanguage: lang,
      mainEntity: founderLd(lang),
    };
  }
  if (key === "kadro") {
    return {
      "@context": "https://schema.org", "@type": "ItemList", name: title, url: absUrl("post-kadro", lang),
      itemListElement: TEAM.map((m, i) => ({ "@type": "ListItem", position: i + 1, item: m.img === FOUNDER_IMG ? founderLd(lang) : teamMemberLd(m, lang) })),
    };
  }
  return null;
}

export function dentistLd(lang: Lang) {
  const t = translator(lang);
  return {
    "@context": "https://schema.org", "@type": "Dentist", "@id": DENTIST_ID, name: "Dent32",
    alternateName: ALTERNATE_NAMES,
    description: t("Beylikdüzü, İstanbul'da ağız ve diş sağlığı polikliniği (diş kliniği): implant, All-on-4 ve All-on-6 tüm çene implant, zirkonyum kaplama, lamine (porselen veneer), gülüş tasarımı, kanal tedavisi, diş eti tedavisi, çocuklarda diş tedavisi ve şeffaf plak.",
      "Dental polyclinic (dental clinic) in Beylikdüzü, Istanbul: implants, All-on-4 and All-on-6 full-arch implants, zirconia crowns, porcelain veneers, smile design, root canal treatment, gum care, dental care for children and clear aligners."),
    // Aynı adı taşıyan başka şehirlerdeki kliniklerle karıştırılmasın
    disambiguatingDescription: t("İstanbul Beylikdüzü, Barış Mahallesi'ndeki (Ginza Lavinya, E-5 yanyolu) Dent32 Ağız ve Diş Sağlığı Polikliniği; kurucusu Dr. Hüseyin Aşçı.",
      "Dent32 dental clinic in Barış, Beylikdüzü, Istanbul (Ginza Lavinya, E-5 service road), founded by Dr. Hüseyin Aşçı."),
    url: absUrl("home", lang), logo: `${SITE}/logo.svg`, image: `${SITE}/img/klinik-01-bina.webp`,
    telephone: PHONE_E164, email: EMAIL,
    address: { "@type": "PostalAddress", streetAddress: STREET, addressLocality: "Beylikdüzü", addressRegion: "İstanbul", postalCode: "34520", addressCountry: "TR" },
    geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
    hasMap: GMB, sameAs: SOCIAL.filter((s) => s.key !== "whatsapp").map((s) => s.url),
    areaServed: AREA_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
    medicalSpecialty: "Dentistry",
    availableService: TREATMENTS.map((tr) => ({
      "@type": "MedicalProcedure", name: tr.title[lang], description: tr.short[lang], url: SITE + route(`treat-${tr.id}`, lang),
    })),
    knowsAbout: CLINIC_FOCUS[lang],
    founder: founderLd(lang),
    // Kurucu hekim aynı @id ile anılır; Google iki kaydı tek kişi olarak birleştirir
    employee: TEAM.map((m) => teamMemberLd(m, lang)),
    availableLanguage: ["tr", "en"],
    ...(CLINIC_HOURS && {
      openingHoursSpecification: [{
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: CLINIC_HOURS[0], closes: CLINIC_HOURS[1],
      }],
    }),
  };
}

/** Sitenin adı: Google arama sonucunda site adı olarak "Dent32" gösterilsin, yerel adlar da tanınsın */
export const websiteLd = (lang: Lang) => ({
  "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE}/#website`, name: "Dent32",
  alternateName: ALTERNATE_NAMES, url: `${SITE}/`, inLanguage: lang, publisher: { "@id": DENTIST_ID },
});

/** Sayfa yolu (breadcrumb) JSON-LD: [ad, yol] listesi, anasayfadan başlar */
export const breadcrumbLd = (items: [string, string][]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE + path })),
});
