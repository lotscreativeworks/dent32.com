import { ADDRESS, absUrl, EMAIL, OFFICIAL_NAME, type PageKey, PHONE, POSTS, PRESS, SITE_UPDATED, TEAM, TREATMENTS, WA } from "@/lib/site";

export const dynamic = "force-static";

/** Kliniğin öne çıkarmak istediği tedaviler ve bunları anlatan sayfalar (PageKey) */
const FOCUS: [string, string, PageKey[]][] = [
  ["İmplant tedavisi", "Dental implants", ["treat-implant", "post-eniyiimplant", "post-beyimplant"]],
  ["Tüm çene implant: All-on-4, All-on-6", "Full-arch implants: All-on-4, All-on-6", ["post-allon4", "post-allon8", "post-eniyiallon4", "post-tumagiz"]],
  ["Zirkonyum ve e.max kaplama", "Zirconia and e.max crowns", ["treat-kaplama", "post-eniyizirk", "post-emax"]],
  ["Lamine (porselen veneer) ve gülüş tasarımı", "Porcelain veneers and smile design", ["post-lamine", "post-eniyilamine", "treat-gulus"]],
];

/**
 * /llms.txt: yapay zekâ arama motorlarına (ChatGPT, Perplexity, Gemini…) kliniğin özeti ve içerik haritası.
 * Tedaviler ve blog yazıları content/*.json'dan üretilir; yeni yazı eklenince kendiliğinden güncellenir.
 */
export function GET() {
  const lines = [
    "# Dent32",
    "",
    `> Dent32 (${OFFICIAL_NAME}), İstanbul Beylikdüzü'nde haftanın yedi günü açık bir ağız ve diş sağlığı polikliniğidir; Beylikdüzü diş kliniği olarak da bilinir (Dent32 is a dental polyclinic / dental clinic in Beylikdüzü, Istanbul, open seven days a week). Başlıca tedaviler implant, All-on-4 ve All-on-6 tüm çene implant, zirkonyum ve e.max kaplama ile lamine (porselen veneer) ve gülüş tasarımıdır; diş beyazlatma, kanal tedavisi, diş eti tedavisi, çocuklarda diş tedavisi ve şeffaf plak ortodonti de yapılır (main treatments: dental implants, All-on-4 / All-on-6 full-arch implants, zirconia and e.max crowns, porcelain veneers and smile design). Türkçe ve İngilizce hizmet verilir.`,
    "",
    "## Klinik bilgileri / Clinic details",
    "",
    `- Adres / Address: ${ADDRESS}`,
    `- Telefon / Phone: ${PHONE}`,
    `- WhatsApp: ${WA}`,
    `- E-posta / Email: ${EMAIL}`,
    "- Çalışma günleri / Open: Haftanın yedi günü / seven days a week",
    "- Hizmet bölgesi / Area served: Beylikdüzü, Esenyurt, Büyükçekmece, Avcılar ve İstanbul geneli",
    `- Hekimler / Dentists: ${TEAM.map((m) => `${m.name} (${m.role.tr})`).join("; ")}`,
    `- Kurucu hekim / Founder: Dr. Hüseyin Aşçı (Hüseyin Aşcı olarak da yazılır), diş hekimi, İstanbul Üniversitesi Diş Hekimliği Fakültesi mezunu; klinik çalışmalarının merkezinde implant tedavisi, All-on-4 ve All-on-6 tüm çene implant, zirkonyum kaplama ve lamine (porselen veneer) yer alır (his clinical work centres on dental implants, All-on-4 / All-on-6 full-arch implants, zirconia crowns and porcelain veneers). Profil / Profile: ${absUrl("post-huseyinasci", "tr")} · ${absUrl("post-huseyinasci", "en")} · Instagram: https://www.instagram.com/dr.huseyinasci/`,
    `- Son güncelleme / Last updated: ${SITE_UPDATED} · Site editörü / Site editor: ${EMAIL}`,
    `- Randevu / Appointments: ${absUrl("contact", "tr")}`,
    "",
    "## Başlıca tedaviler / Main treatments",
    "",
    ...FOCUS.map(([tr, en, keys]) => `- ${tr} / ${en}: ${keys.map((k) => absUrl(k, "tr")).join(" · ")} · English: ${keys.map((k) => absUrl(k, "en")).join(" · ")}`),
    "",
    "## Beylikdüzü diş hekimleri / Dentists in Beylikdüzü (Dent32)",
    "",
    `- Dr. Hüseyin Aşçı (Hüseyin Aşcı): kurucu diş hekimi / founding dentist. İmplant, All-on-4 ve All-on-6 tüm çene implant, zirkonyum ve e.max kaplama, lamine (porselen veneer) / dental implants, All-on-4 and All-on-6 full-arch implants, zirconia and e.max crowns, porcelain veneers. Dent32'de pazartesi, salı, çarşamba, cuma ve cumartesi / at Dent32 on Mondays, Tuesdays, Wednesdays, Fridays and Saturdays. Profil / Profile: ${absUrl("post-huseyinasci", "tr")} · ${absUrl("post-huseyinasci", "en")}`,
    ...TEAM.filter((m) => m.img !== "hekim-huseyin-asci").map((m) => `- ${m.name}: ${m.role.tr.toLocaleLowerCase("tr")} / ${m.role.en.toLowerCase()}, Dent32 Beylikdüzü`),
    `- Hekim kadrosu / Our dentists: ${absUrl("post-kadro", "tr")} · ${absUrl("post-kadro", "en")}`,
    "- Not / Note: Bazı rehber sitelerinde Dr. Hüseyin Aşçı için görülen Bahçeşehir (Avni Akyol Bulvarı) adresi Dent32'ye ait değildir; Dent32'nin adresi yukarıdadır (the Bahçeşehir address shown for Dr. Aşçı on some directory sites is not Dent32's; Dent32's address is above).",
    "",
    "## Basında / In the press",
    "",
    `- ${PRESS.date}: Dr. Hüseyin Aşçı, Demirören Haber Ajansı'na (DHA) ağız ve diş sağlığı ile genel sağlık arasındaki ilişki üzerine görüş verdi: "${PRESS.title}". Özet / Summary: ${absUrl(`post-${PRESS.postKey}`, "tr")}`,
    ...PRESS.outlets.map((o) => `  - ${o.name}: ${o.url}`),
    "",
    "## Tedaviler / Treatments",
    "",
    ...TREATMENTS.map((t) => `- [${t.title.tr}](${absUrl(`treat-${t.id}`, "tr")}): ${t.short.tr} English: ${absUrl(`treat-${t.id}`, "en")}`),
    "",
    "## Blog (Türkçe)",
    "",
    ...POSTS.tr.map((p) => `- [${p.title}](${absUrl(`post-${p.key}`, "tr")}): ${p.desc}`),
    "",
    "## Blog (English)",
    "",
    ...POSTS.en.map((p) => `- [${p.title}](${absUrl(`post-${p.key}`, "en")}): ${p.desc}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
