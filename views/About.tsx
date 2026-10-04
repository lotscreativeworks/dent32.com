import { delay, LangRail, NextStep, PageHead, SecHead } from "@/components/blocks";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { CLINIC, type Lang, TEAM, translator } from "@/lib/site";

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

  return (
    <Shell lang={lang} pageKey="about">
      <PageHead lang={lang} title={t("Dent32'yi tanıyın", "Get to know Dent32")} crumb={t("Hakkımızda", "About")}
        lead={t("Beylikdüzü'nde, haftanın yedi günü açık bir diş kliniği. Her tedaviyi açıkça anlatılan, yazılı bir planla yürütüyoruz.",
          "A dental clinic in Beylikdüzü, Istanbul, open seven days a week. Every treatment follows a clearly explained, written plan.")} />

      <section className="section">
        <div className="wrap bio">
          <div className="bio__portrait zoom rv">
            <Img name="hakkimizda-huseyin-asci" w={900} h={1200} alt={t("Dr. Hüseyin Aşçı portresi", "Portrait of Dr. Hüseyin Aşçı")} />
          </div>
          <div className="rv" style={delay(1)}>
            <p className="eyebrow">{t("Kurucu hekim", "Founder")}</p>
            <h2>Dr. Hüseyin Aşçı</h2>
            <p className="bio__role">{t("Ortodonti ve diş estetiği", "Orthodontics and aesthetic dentistry")}</p>
            <p>{t("Dr. Hüseyin Aşçı, Dent32'nin kurucusudur. Klinik çalışmalarının merkezinde ortodonti ve diş estetiği yer alır: çapraşık dişlerin düzeltilmesi, şeffaf plak tedavileri ve gülüş tasarımı.",
              "Dr. Hüseyin Aşçı is the founder of Dent32. His clinical work centres on orthodontics and aesthetic dentistry: straightening crowded teeth, clear aligner treatment and smile design.")}</p>
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
          </div>
        </div>
      </section>

      <section className="section section--mist" id="kadro" aria-labelledby="h-team">
        <div className="wrap">
          <SecHead eyebrow={t("Ekip", "Team")} title={t("Hekim kadrosu", "Our dentists")} id="h-team" />
          <div className="team">
            {TEAM.map((m, i) => (
              <figure key={m.name} className="doc lift rv" style={delay(i)}>
                <div className="doc__img zoom"><Img name={m.img} w={880} h={1100} alt={m.name} /></div>
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
                <Img name={c.img} w={1250} h={750} alt={c.caption[lang]} />
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
