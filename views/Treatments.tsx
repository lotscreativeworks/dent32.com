import Link from "next/link";
import { BlogCard, delay, NextStep, PageHead, SecHead } from "@/components/blocks";
import { Faq } from "@/components/client/Faq";
import { Icon, TreatIcon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { DENTIST_ID, jsonLd } from "@/lib/seo";
import {
  absUrl, type Lang, postByKey, route, SITE, translator, type Treatment, TREATMENTS, VISUAL_WARNING, waLink,
} from "@/lib/site";

const askMsg = (lang: Lang, name: string) => translator(lang)(
  `Merhaba, ${name.toLocaleLowerCase("tr")} hakkında bilgi almak istiyorum.`, `Hello, I'd like some information about ${name.toLowerCase()}.`);

/** Tedavi kartları: her biri kendi sayfasına gider */
function TreatGrid({ lang, items }: { lang: Lang; items: Treatment[] }) {
  const t = translator(lang);
  return (
    <div className="svc-grid">
      {items.map((tr, i) => (
        <Link key={tr.id} className="svc lift rv" style={delay(i % 4)} href={route(`treat-${tr.id}`, lang)}>
          <TreatIcon icon={tr.icon} />
          <h3>{tr.title[lang]}</h3>
          <p>{tr.short[lang]}</p>
          <span className="svc__more">{t("Ayrıntılar", "Details")} <Icon name="arrow" /></span>
        </Link>
      ))}
    </div>
  );
}

/** /tedaviler/: tüm tedavilerin özeti; ayrıntı her tedavinin kendi sayfasında */
export function Treatments({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const list = {
    "@context": "https://schema.org", "@type": "ItemList", name: t("Dent32'de yapılan diş tedavileri", "Dental treatments at Dent32"),
    itemListElement: TREATMENTS.map((tr, i) => ({ "@type": "ListItem", position: i + 1, name: tr.title[lang], url: absUrl(`treat-${tr.id}`, lang) })),
  };
  return (
    <Shell lang={lang} pageKey="treat">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(list)} />
      <PageHead lang={lang} pageKey="treat" title={t("Beylikdüzü'nde diş tedavileri", "Dental treatments in Beylikdüzü")} crumb={t("Tedaviler", "Treatments")}
        eyebrow={t("Dent32 · Beylikdüzü diş kliniği", "Dent32 · Dental clinic in Beylikdüzü")}
        lead={t("Her tedaviyi ne olduğu, kimler için uygun olduğu ve nasıl ilerlediğiyle anlatıyoruz. Süre ve maliyet kişiye göre değişir; muayene sonrası size özel yazılı plan veriyoruz.",
          "For each treatment we explain what it is, who it suits and how it works. Timing and cost vary from person to person; after the examination you'll get a written plan made for you.")} />

      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }} aria-labelledby="h-list">
        <div className="wrap">
          <h2 id="h-list" className="visually-hidden">{t("Tedavi listesi", "List of treatments")}</h2>
          <TreatGrid lang={lang} items={TREATMENTS} />
        </div>
      </section>

      <div className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {TREATMENTS.map((tr) => {
            const name = tr.title[lang];
            const href = route(`treat-${tr.id}`, lang);
            return (
              // Eski /tedaviler/#implant bağlantıları için id korunur. Metin hep solda, görsel hep sağda.
              <section key={tr.id} className="detail" id={tr.id} aria-labelledby={`h-${tr.id}`}>
                <div className="rv">
                  <div className="detail__head"><TreatIcon icon={tr.icon} /><h2 id={`h-${tr.id}`}><Link href={href}>{name}</Link></h2></div>
                  <p>{tr.short[lang]}</p>
                  <h3>{t("Kimler için uygun?", "Who is it for?")}</h3>
                  <ul className="ticks">{tr.who[lang].map((w) => <li key={w}>{w}</li>)}</ul>
                  <div className="btn-row" style={{ alignItems: "center", gap: 20 }}>
                    <Link className="btn btn-primary" href={href}>{t(`${name}: süreç ve sorular`, `${name}: process and FAQs`)}</Link>
                    <a className="text-link" href={waLink(askMsg(lang, name))} target="_blank" rel="noopener">{t("WhatsApp'tan danışın", "Ask on WhatsApp")}</a>
                  </div>
                </div>
                <div className="detail__media zoom rv" style={delay(1)}><Img name={tr.img} w={720} h={900} alt={tr.alt[lang]} sizes="(max-width: 860px) 92vw, 480px" /></div>
              </section>
            );
          })}
          <p className="legal-note">{VISUAL_WARNING[lang]}</p>
        </div>
      </div>

      <NextStep lang={lang} />
    </Shell>
  );
}

/** /tedaviler/<slug>/: tek tedavinin sayfası (yerel aramada "Beylikdüzü implant" gibi sorgular için) */
export function TreatmentDetail({ lang, tr }: { lang: Lang; tr: Treatment }) {
  const t = translator(lang);
  const name = tr.title[lang];
  const key = `treat-${tr.id}` as const;
  const url = absUrl(key, lang);
  const posts = tr.posts.map((k) => postByKey(lang, k));
  const [cards, more] = [posts.slice(0, 6), posts.slice(6)];
  const faq = tr.faq[lang];

  const page = {
    "@context": "https://schema.org", "@type": "MedicalWebPage", "@id": `${url}#webpage`, url, name: tr.seoTitle[lang],
    description: tr.seoDesc[lang], inLanguage: lang, isPartOf: { "@id": `${SITE}/#website` }, publisher: { "@id": DENTIST_ID },
    primaryImageOfPage: `${SITE}/img/${tr.img}.webp`,
    about: {
      "@type": "MedicalProcedure", name, description: tr.short[lang],
      howPerformed: tr.steps[lang].join(". ") + ".", followup: tr.after[lang].join(" "),
    },
  };
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <Shell lang={lang} pageKey={key}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(page)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <PageHead lang={lang} pageKey={key} parent={{ label: t("Tedaviler", "Treatments"), key: "treat" }} title={tr.h1[lang]} crumb={name}
        eyebrow={t("Dent32 · Beylikdüzü diş kliniği", "Dent32 · Dental clinic in Beylikdüzü")} lead={tr.short[lang]} />

      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }} aria-labelledby="h-about">
        <div className="wrap">
          <div className="detail">
            <div className="rv">
              <div className="detail__head"><TreatIcon icon={tr.icon} /><h2 id="h-about">{t(`${name} hakkında`, `About ${name.toLowerCase()}`)}</h2></div>
              {tr.paras[lang].map((p) => <p key={p}>{p}</p>)}
              <h3>{t("Kimler için uygun?", "Who is it for?")}</h3>
              <ul className="ticks">{tr.who[lang].map((w) => <li key={w}>{w}</li>)}</ul>
              <h3>{t("Süreç nasıl ilerler?", "How does it work?")}</h3>
              <ol className="steps">{tr.steps[lang].map((s) => <li key={s}>{s}</li>)}</ol>
              <h3>{t("Tedaviden sonra", "After treatment")}</h3>
              <ul className="ticks">{tr.after[lang].map((a) => <li key={a}>{a}</li>)}</ul>
              <div className="btn-row" style={{ alignItems: "center", gap: 20 }}>
                <a className="btn btn-primary" href={waLink(askMsg(lang, name))} target="_blank" rel="noopener">{t("Bu tedavi için danışın", "Ask about this treatment")}</a>
                <Link className="text-link" href={route("contact", lang)}>{t("Randevu al", "Book an appointment")}</Link>
              </div>
            </div>
            <div className="detail__media zoom rv" style={delay(1)}>
              <Img name={tr.img} w={720} h={900} alt={tr.alt[lang]} sizes="(max-width: 860px) 92vw, 480px" />
            </div>
          </div>
          <p className="legal-note">{VISUAL_WARNING[lang]}</p>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-faq">
        <div className="wrap faq-layout">
          <div className="rv">
            <p className="eyebrow">{t("Sık sorulan sorular", "FAQ")}</p>
            <h2 id="h-faq">{t(`${name} hakkında merak edilenler`, `Common questions about ${name.toLowerCase()}`)}</h2>
            <p>{t("Size uygun tedavi ancak muayeneyle belirlenebilir. Sorunuzun cevabı burada yoksa WhatsApp'tan yazın; hekimlerimiz yanıtlasın.",
              "The right treatment for you can only be decided after an examination. If your question isn't answered here, message us on WhatsApp and our dentists will reply.")}</p>
          </div>
          <div className="rv"><Faq items={faq} /></div>
        </div>
      </section>

      <section className="section" aria-labelledby="h-guides">
        <div className="wrap">
          <SecHead eyebrow={t("Rehberler", "Guides")} title={t(`${name} üzerine yazılar`, `Articles on ${name.toLowerCase()}`)} id="h-guides">
            <Link className="btn btn-line" href={route("blog", lang)}>{t("Tüm yazılar", "All articles")}</Link>
          </SecHead>
          <div className="blog-grid">{cards.map((p, i) => <BlogCard key={p.key} lang={lang} post={p} d={i % 3} />)}</div>
          {more.length > 0 && (
            <ul className="link-list">
              {more.map((p) => <li key={p.key}><Link href={route(`post-${p.key}`, lang)}>{p.title}</Link></li>)}
            </ul>
          )}
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-other">
        <div className="wrap">
          <SecHead eyebrow={t("Tedaviler", "Treatments")} title={t("Diğer tedaviler", "Other treatments")} id="h-other">
            <Link className="btn btn-line" href={route("treat", lang)}>{t("Tüm tedaviler", "All treatments")}</Link>
          </SecHead>
          <TreatGrid lang={lang} items={TREATMENTS.filter((o) => o.id !== tr.id)} />
        </div>
      </section>

      <NextStep lang={lang} />
    </Shell>
  );
}
