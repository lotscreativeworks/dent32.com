/**
 * İçerik dosyası (blog/site JSON) içe aktarmayan hafif yardımcılar.
 * İstemci bileşenleri ("use client") yalnızca buradan alsın: lib/site.ts tüm blog yazılarını
 * içe aktardığı için oradan alınan tek bir sabit bile yüzlerce KB'yi her sayfanın JS'ine ekler.
 */
export type Lang = "tr" | "en";
export type Localized<T = string> = Record<Lang, T>;

/** İki dilli metin seçici: t("Merhaba", "Hello") */
export const translator = (lang: Lang) => (tr: string, en: string) => (lang === "tr" ? tr : en);

export const PHONE = "+90 555 011 33 68";
export const PHONE_E164 = "+905550113368";
export const WA = "https://wa.me/905550113368";

export const waLink = (text: string) => `${WA}?text=${encodeURIComponent(text)}`;
