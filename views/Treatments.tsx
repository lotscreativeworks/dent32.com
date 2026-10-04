import Link from "next/link";
import { delay, NextStep, PageHead } from "@/components/blocks";
import { Icon, TreatIcon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { type Lang, route, translator, TREATMENTS, waLink } from "@/lib/site";

export function Treatments({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <Shell lang={lang} pageKey="treat">
      <PageHead lang={lang} title={t("Tedaviler", "Treatments")} crumb={t("Tedaviler", "Treatments")}
        lead={t("Her tedaviyi ne olduğu, kimler için uygun olduğu ve nasıl ilerlediğiyle anlatıyoruz. Süre ve maliyet kişiye göre değişir; muayene sonrası size özel yazılı plan veriyoruz.",
          "For each treatment we explain what it is, who it suits and how it works. Timing and cost vary from person to person; after the examination you'll get a written plan made for you.")} />

      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }} aria-labelledby="h-list">
        <div className="wrap">
          <h2 id="h-list" className="visually-hidden">{t("Tedavi listesi", "List of treatments")}</h2>
          <div className="svc-grid">
            {TREATMENTS.map((tr, i) => (
              <a key={tr.id} className="svc lift rv" style={delay(i % 4)} href={`#${tr.id}`}>
                <TreatIcon icon={tr.icon} />
                <h3>{tr.title[lang]}</h3>
                <p>{tr.short[lang]}</p>
                <span className="svc__more">{t("Ayrıntılar", "Details")} <Icon name="arrow" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {TREATMENTS.map((tr) => {
            const name = tr.title[lang];
            const msg = t(`Merhaba, ${name.toLocaleLowerCase("tr")} hakkında bilgi almak istiyorum.`, `Hello, I'd like some information about ${name.toLowerCase()}.`);
            return (
              // Düzen dönüşümlü değil: metin hep solda, görsel hep sağda
              <section key={tr.id} className="detail" id={tr.id} aria-labelledby={`h-${tr.id}`}>
                <div className="rv">
                  <div className="detail__head"><TreatIcon icon={tr.icon} /><h2 id={`h-${tr.id}`}>{name}</h2></div>
                  {tr.paras[lang].map((p) => <p key={p}>{p}</p>)}
                  <h3>{t("Kimler için uygun?", "Who is it for?")}</h3>
                  <ul className="ticks">{tr.who[lang].map((w) => <li key={w}>{w}</li>)}</ul>
                  <h3>{t("Süreç nasıl ilerler?", "How does it work?")}</h3>
                  <ol className="steps">{tr.steps[lang].map((s) => <li key={s}>{s}</li>)}</ol>
                  <div className="btn-row" style={{ alignItems: "center", gap: 20 }}>
                    <a className="btn btn-primary" href={waLink(msg)} target="_blank" rel="noopener">{t("Bu tedavi için danışın", "Ask about this treatment")}</a>
                    {tr.post && <Link className="text-link" href={route(`post-${tr.post}`, lang)}>{t("Rehberi okuyun", "Read the guide")}</Link>}
                  </div>
                </div>
                <div className="detail__media zoom rv" style={delay(1)}><Img name={tr.img} w={720} h={900} alt="" /></div>
              </section>
            );
          })}
        </div>
      </div>

      <NextStep lang={lang} />
    </Shell>
  );
}
