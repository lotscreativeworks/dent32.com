import { ADDRESS, absUrl, EMAIL, PHONE, POSTS, route, SITE, TEAM, TREATMENTS, WA } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt: yapay zekâ arama motorlarına (ChatGPT, Perplexity, Gemini…) kliniğin özeti ve içerik haritası.
 * Tedaviler ve blog yazıları content/*.json'dan üretilir; yeni yazı eklenince kendiliğinden güncellenir.
 */
export function GET() {
  const lines = [
    "# Dent32",
    "",
    "> Dent32, İstanbul Beylikdüzü'nde haftanın yedi günü açık bir diş kliniğidir (Dent32 is a dental clinic in Beylikdüzü, Istanbul, open seven days a week). İmplant, zirkonyum ve porselen kaplama, gülüş tasarımı, şeffaf plak ortodonti, diş beyazlatma, kanal tedavisi, çocuk diş hekimliği ve diş eti tedavisi yapılır. Türkçe ve İngilizce hizmet verilir.",
    "",
    "## Klinik bilgileri / Clinic details",
    "",
    `- Adres / Address: ${ADDRESS}`,
    `- Telefon / Phone: ${PHONE}`,
    `- WhatsApp: ${WA}`,
    `- E-posta / Email: ${EMAIL}`,
    "- Çalışma günleri / Open: Haftanın yedi günü / seven days a week",
    "- Hizmet bölgesi / Area served: Beylikdüzü, Esenyurt, Büyükçekmece, Avcılar ve İstanbul geneli; yurt dışından gelen hastalar",
    `- Hekimler / Dentists: ${TEAM.map((m) => `${m.name} (${m.role.tr})`).join("; ")}`,
    `- Randevu / Appointments: ${absUrl("contact", "tr")}`,
    "",
    "## Tedaviler / Treatments",
    "",
    ...TREATMENTS.map((t) => `- [${t.title.tr}](${SITE}${route("treat", "tr", t.id)}): ${t.short.tr}`),
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
