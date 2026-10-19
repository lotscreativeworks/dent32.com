import type { Metadata } from "next";
import {
  absUrl, CLINIC_HOURS, EMAIL, GEO, GMB, type Lang, type PageKey, PHONE_E164, route, SITE, SOCIAL, STREET, TEAM, translator,
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
const ALTERNATE_NAMES = ["Dent32 Beylikdüzü Diş Kliniği", "Dent32 Diş Kliniği", "Dent 32"];

export function dentistLd(lang: Lang) {
  const t = translator(lang);
  return {
    "@context": "https://schema.org", "@type": "Dentist", "@id": DENTIST_ID, name: "Dent32",
    alternateName: ALTERNATE_NAMES,
    description: t("Beylikdüzü, İstanbul'da diş kliniği: implant, zirkonyum kaplama, gülüş tasarımı, şeffaf plak, kanal tedavisi, diş eti ve çocuk diş hekimliği.",
      "Dental clinic in Beylikdüzü, Istanbul: implants, zirconia crowns, smile design, clear aligners, root canal treatment, gum care and children's dentistry."),
    url: absUrl("home", lang), logo: `${SITE}/logo.svg`, image: `${SITE}/img/klinik-01-bina.webp`,
    telephone: PHONE_E164, email: EMAIL,
    address: { "@type": "PostalAddress", streetAddress: STREET, addressLocality: "Beylikdüzü", addressRegion: "İstanbul", postalCode: "34520", addressCountry: "TR" },
    geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
    hasMap: GMB, sameAs: SOCIAL.filter((s) => s.key !== "whatsapp").map((s) => s.url),
    areaServed: AREA_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
    medicalSpecialty: "Dentistry",
    availableService: TREATMENTS.map((tr) => ({
      "@type": "MedicalProcedure", name: tr.title[lang], description: tr.short[lang], url: SITE + route("treat", lang, tr.id),
    })),
    founder: { "@type": "Person", name: "Dr. Hüseyin Aşçı" },
    employee: TEAM.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role[lang] })),
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
