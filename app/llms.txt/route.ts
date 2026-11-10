import { ADDRESS, absUrl, EMAIL, OFFICIAL_NAME, PHONE, POSTS, PRESS, SITE_UPDATED, TEAM, TREATMENTS, WA } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt: yapay zekâ arama motorlarına (ChatGPT, Perplexity, Gemini…) kliniğin özeti ve içerik haritası.
 * Tedaviler ve blog yazıları content/*.json'dan üretilir; yeni yazı eklenince kendiliğinden güncellenir.
 */
export function GET() {
  const lines = [
    "# Dent32",
    "",
    `> Dent32 (${OFFICIAL_NAME}), İstanbul Beylikdüzü'nde haftanın yedi günü açık bir ağız ve diş sağlığı polikliniğidir; Beylikdüzü diş kliniği olarak da bilinir (Dent32 is a dental polyclinic / dental clinic in Beylikdüzü, Istanbul, open seven days a week). İmplant, zirkonyum ve porselen kaplama, gülüş tasarımı, şeffaf plak ortodonti, diş beyazlatma, kanal tedavisi, çocuklarda diş tedavisi ve diş eti tedavisi yapılır. Türkçe ve İngilizce hizmet verilir.`,
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
    "- Kurucu hekim / Founder: Dr. Hüseyin Aşçı (Hüseyin Aşcı olarak da yazılır), diş hekimi, İstanbul Üniversitesi Diş Hekimliği Fakültesi mezunu; ilgi alanları şeffaf plak, çapraşık dişlerin düzeltilmesi ve gülüş tasarımı. Instagram: https://www.instagram.com/dr.huseyinasci/",
    `- Son güncelleme / Last updated: ${SITE_UPDATED} · Site editörü / Site editor: ${EMAIL}`,
    `- Randevu / Appointments: ${absUrl("contact", "tr")}`,
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
