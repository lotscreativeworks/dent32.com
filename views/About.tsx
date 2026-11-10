import { delay, LangRail, NextStep, PageHead, SecHead, SIZES_GRID3 } from "@/components/blocks";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { DENTIST_ID, dentistLd, jsonLd } from "@/lib/seo";
import { absUrl, CLINIC, dateLong, type Lang, OFFICIAL_NAME, PRESS, route, SITE, TEAM, translator } from "@/lib/site";

export function About({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const days = lang === "tr"
    ? ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"]
    : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const hours = ["08.00–18.30", "08.00–14.00", "08.00–16.00", null, "08.00–16.00", "08.00–16.00", null];

  const ways = lang === "tr" ? [
    ["Muayene ve kayıt", "Ayrıntılı ağız içi muayene; gerekiyorsa röntgen, tomografi ve fotoğraflarla durumunuzu kayıt altına alıyoruz."],
    ["Plan ve seçenekler", "Bulguları anlatıyor, uygun seçenekleri artıları, riskleri ve maliyetiyle birlikte yazılı olarak sunuyoruz."],
    ["Tedavi", "Onayladığınız planı adım adım uyguluyoruz. Her randevunun başında o gün ne yapılacağını anlatıyoruz."],
    ["Kontrol ve bakım", "Tedavi bitince iş bitmez: kontrol randevuları ve evde bakım önerileriyle sonucu birlikte koruyoruz."],
  ] : [
    ["Examination and records", "A thorough clinical examination; where needed, we record your situation with X-rays, CT scans and photos."],
    ["Plan and options", "We explain the findings and present suitable options in writing, with their pros, risks and cost."],
    ["Treatment", "We carry out the plan you approved step by step, and explain at the start of each visit what will be done that day."],
    ["Follow-up and care", "Treatment doesn't end at the last session: check-ups and home-care advice help us protect the result together."],
  ];

  // Hakkımızda sayfası kliniği (ve kurucu hekim ile kadroyu) anlatır: Google'a aynı @id ile bağlanır
  const aboutLd = {
    "@context": "https://schema.org", "@type": "AboutPage", "@id": `${absUrl("about", lang)}#webpage`, url: absUrl("about", lang),
    name: t("Dent32 hakkında", "About Dent32"), inLanguage: lang, isPartOf: { "@id": `${SITE}/#website` },
    about: { "@id": DENTIST_ID }, mainEntity: { "@id": DENTIST_ID },
  };

  return (
    <Shell lang={lang} pageKey="about">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(aboutLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(dentistLd(lang))} />
      <PageHead lang={lang} pageKey="about" title={t("Dent32'yi tanıyın", "Get to know Dent32")} crumb={t("Hakkımızda", "About")}
        eyebrow={t("Beylikdüzü diş kliniği", "Dental clinic in Beylikdüzü")}
        lead={t(`${OFFICIAL_NAME}: Beylikdüzü'nde, haftanın yedi günü açık bir diş polikliniği. Her tedaviyi açıkça anlatılan, yazılı bir planla yürütüyoruz.`,
          `${OFFICIAL_NAME} (Dent32 Dental Polyclinic): a dental practice in Beylikdüzü, Istanbul, open seven days a week. Every treatment follows a clearly explained, written plan.`)} />

      <section className="section">
        <div className="wrap bio">
          <div className="bio__portrait zoom rv">
            <Img name="hakkimizda-huseyin-asci" w={900} h={1200} alt={t("Dr. Hüseyin Aşçı portresi", "Portrait of Dr. Hüseyin Aşçı")}
              sizes="(max-width: 860px) 92vw, 450px" />
          </div>
          <div className="rv" style={delay(1)}>
            <p className="eyebrow">{t("Kurucu hekim", "Founder")}</p>
            <h2>Dr. Hüseyin Aşçı</h2>
            <p className="bio__role">{t("Diş hekimi · Kurucu hekim", "Dentist · Founder")}</p>
            <p>{t("Dr. Hüseyin Aşçı, Dent32'nin kurucusu ve İstanbul Üniversitesi Diş Hekimliği Fakültesi mezunu bir diş hekimidir. Klinikteki ilgi alanları çapraşık dişlerin düzeltilmesi, şeffaf plak tedavileri ve gülüş tasarımıdır.",
              "Dr. Hüseyin Aşçı is the founder of Dent32 and a graduate of the Istanbul University Faculty of Dentistry. His clinical interests are straightening crowded teeth, clear aligner treatment and smile design.")}</p>
            <p>{t("Tedaviye yaklaşımı basit bir ilkeye dayanır: hasta, ne yapılacağını ve neden yapılacağını başlamadan önce bilmeli. Bu yüzden her plan muayene bulguları, seçenekler, olası riskler ve maliyetle birlikte yazılı olarak paylaşılır.",
              "His approach rests on a simple principle: patients should know what will be done, and why, before anything starts. So every plan is shared in writing, together with the findings, options, possible risks and cost.")}</p>
            <p>{t("Kapsamlı vakalarda implant, protez ve diş eti tedavileri ekipteki hekimlerle birlikte planlanır; böylece hasta tek bir yol haritasıyla ilerler.",
              "In complex cases, implant, prosthetic and gum treatment is planned together with the other dentists on the team, so the patient follows a single roadmap.")}</p>
            <table className="hours">
              <caption>{t("Dr. Hüseyin Aşçı'nın klinikte olduğu günler", "Days Dr. Hüseyin Aşçı is in the clinic")}</caption>
              <tbody>
                {days.map((d, i) => (
                  <tr key={d} className={hours[i] ? undefined : "off"}>
                    <th scope="row">{d}</th><td>{hours[i] ?? t("Klinikte değil", "Not in clinic")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="hours-note">{t("Klinik haftanın yedi günü açıktır. Randevu için WhatsApp'tan yazabilirsiniz.", "The clinic is open seven days a week. Message us on WhatsApp to book.")}</p>

            <aside className="press" aria-labelledby="h-press">
              <h3 id="h-press" className="press__title">{t("Basında", "In the press")}</h3>
              <p className="press__headline">
                <span lang="tr">“{PRESS.title}”</span>
                <span className="press__date">{t(`DHA röportajı, ${dateLong(PRESS.date, lang)}`, `Interview with the DHA news agency (in Turkish), ${dateLong(PRESS.date, lang)}`)}</span>
              </p>
              <ul className="press__list">
                {PRESS.outlets.map((o) => (
                  <li key={o.name}><a href={o.url} target="_blank" rel="noopener">{o.name} <Icon name="arrow" /></a></li>
                ))}
              </ul>
              <Link className="text-link" href={route(`post-${PRESS.postKey}`, lang)}>{t("Röportajın özetini okuyun", "Read our summary of the interview")}</Link>
            </aside>
          </div>
        </div>
      </section>

      <section className="section section--mist" id="kadro" aria-labelledby="h-team">
        <div className="wrap">
          <SecHead eyebrow={t("Ekip", "Team")} title={t("Hekim kadrosu", "Our dentists")} id="h-team" />
          <div className="team">
            {TEAM.map((m, i) => (
              <figure key={m.name} className="doc lift rv" style={delay(i)}>
                <div className="doc__img zoom"><Img name={m.img} w={880} h={1100} alt={m.name} sizes={SIZES_GRID3} /></div>
                <figcaption><h3>{m.name}</h3><p>{m.role[lang]}</p></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="h-ways">
        <div className="wrap">
          <SecHead eyebrow={t("Çalışma biçimimiz", "How we work")} title={t("Her tedavide aynı dört adım.", "The same four steps for every treatment.")} id="h-ways" />
          <div className="ways">
            {ways.map(([title, text], i) => (
              <article key={title} className="way lift" style={delay(i)}>
                <span className="way__num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h3><span className="visually-hidden">{i + 1}. </span>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-clinic">
        <div className="wrap">
          {/* U+2011: "E-5" satır sonunda bölünmesin */}
          <SecHead eyebrow={t("Kliniğimiz", "Our clinic")} title={t("Beylikdüzü, E‑5 yanyolu üzerinde.", "On the E‑5 service road in Beylikdüzü.")} id="h-clinic" />
          <LangRail lang={lang} label={t("Klinik fotoğrafları", "Clinic photos")} className="hx-rail--clinic">
            {CLINIC.map((c) => (
              <figure key={c.img} className="clinic-shot zoom">
                <Img name={c.img} w={1250} h={750} alt={c.caption[lang]} sizes="(max-width: 640px) 80vw, 500px" />
                <figcaption>{c.caption[lang]}</figcaption>
              </figure>
            ))}
          </LangRail>
        </div>
      </section>

      <NextStep lang={lang} />
    </Shell>
  );
}
