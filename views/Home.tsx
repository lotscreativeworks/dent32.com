import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/client/Faq";
import { HeroVideo } from "@/components/client/HeroVideo";
import { WaForm } from "@/components/client/WaForm";
import { BaCard, BlogCard, delay, LangRail, NextStep, SecHead } from "@/components/blocks";
import { Icon, Star } from "@/components/Icon";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { jsonLd } from "@/lib/seo";
import {
  absUrl, CLINIC_HOURS, EMAIL, GEO, GMB, IG, type Lang, PHONE_E164, POSTS, REELS, REVIEWS, route, SITE, SOCIAL, STREET,
  STRIP, translator,
} from "@/lib/site";

export function Home({ lang }: { lang: Lang }) {
  const t = translator(lang);

  const faq = lang === "tr" ? [
    { q: "İlk muayenede ne yapılıyor?", a: "Ağız içi muayene yapıyor, gerekirse röntgen ya da tomografi çekiyoruz. Ardından bulguları anlatıyor, tedavi seçeneklerini ve yaklaşık maliyeti yazılı olarak paylaşıyoruz. Muayene sonrası tedaviye başlamak zorunda değilsiniz." },
    { q: "Tedavi fiyatlarını önceden öğrenebilir miyim?", a: "Fiyat; diş sayısına, kullanılacak malzemeye ve ek işlem gerekip gerekmediğine göre değişir. Fotoğraf ve röntgen gönderirseniz ön bilgi verebiliriz; kesin plan ve maliyet muayeneden sonra kalem kalem yazılı olarak verilir." },
    { q: "Yurt dışından geliyorum, tedavimi nasıl planlarım?", a: `Röntgen ve fotoğraflarınızı WhatsApp'tan gönderin. Hekim ön değerlendirme yapar; kaç ziyaret gerektiğini ve İstanbul'da ne kadar kalmanız gerektiğini birlikte konuşuruz. Ayrıntılar için <a class="text-link" href="${route("post-istanbul", lang)}">planlama rehberimize</a> bakabilirsiniz.` },
    { q: "Tedavi sırasında ağrı hissedecek miyim?", a: "İşlemlerin çoğu lokal anestezi altında yapılır ve tedavi sırasında belirgin ağrı beklenmez. İşlem sonrası olabilecek hassasiyeti ve ne yapmanız gerektiğini önceden anlatırız. Diş hekimi kaygınız varsa randevu alırken bize söyleyin." },
  ] : [
    { q: "What happens at the first examination?", a: "We carry out a clinical examination and take X-rays or a CT scan if needed. We then explain the findings and share the treatment options and an approximate cost in writing. You're under no obligation to start treatment after the examination." },
    { q: "Can I find out treatment prices in advance?", a: "Price depends on the number of teeth, the materials used and whether additional procedures are needed. If you send photos and X-rays we can give preliminary information; the final plan and cost are given in writing, itemised, after the examination." },
    { q: "I'm coming from abroad. How do I plan my treatment?", a: `Send your X-rays and photos via WhatsApp. The dentist will make a preliminary assessment, and together we'll discuss how many visits you need and how long to stay in Istanbul. See our <a class="text-link" href="${route("post-istanbul", lang)}">planning guide</a> for details.` },
    { q: "Will I feel pain during treatment?", a: "Most procedures are done under local anaesthetic, and no significant pain is expected during treatment. We explain any sensitivity you might have afterwards and what to do. If you feel anxious about the dentist, let us know when booking." },
  ];

  const dentist = {
    "@context": "https://schema.org", "@type": "Dentist", name: "Dent32",
    description: t("Beylikdüzü, İstanbul'da diş kliniği: implant, zirkonyum, gülüş tasarımı, şeffaf plak ortodonti.",
      "Dental clinic in Beylikdüzü, Istanbul: implants, zirconia, smile design, clear aligner orthodontics."),
    url: absUrl("home", lang), logo: `${SITE}/logo.svg`, image: `${SITE}/img/klinik-01-bina.webp`,
    telephone: PHONE_E164, email: EMAIL,
    address: { "@type": "PostalAddress", streetAddress: STREET, addressLocality: "Beylikdüzü", addressRegion: "İstanbul", postalCode: "34520", addressCountry: "TR" },
    geo: { "@type": "GeoCoordinates", latitude: GEO.lat, longitude: GEO.lng },
    hasMap: GMB, sameAs: SOCIAL.filter((s) => s.key !== "whatsapp").map((s) => s.url),
    founder: { "@type": "Person", name: "Dr. Hüseyin Aşçı" }, availableLanguage: ["tr", "en"],
    ...(CLINIC_HOURS && {
      openingHoursSpecification: [{
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: CLINIC_HOURS[0], closes: CLINIC_HOURS[1],
      }],
    }),
  };

  const badges: [string, string, number][] = [
    ["iso-13485", t("ISO 13485:2016 tıbbi cihaz kalite yönetimi", "ISO 13485:2016 medical devices quality management"), 160],
    ["saglik-bakanligi", t("T.C. Sağlık Bakanlığı", "Republic of Türkiye Ministry of Health"), 160],
    ["health-turkiye", "Health Türkiye", 251],
  ];

  return (
    <Shell lang={lang} pageKey="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(dentist)} />

      <section className="hero">
        <HeroVideo />
        <div className="wrap hero__grid">
          <div>
            <p className="eyebrow hero__fade">{t("Dent32 · Beylikdüzü, İstanbul", "Dent32 · Beylikdüzü, Istanbul")}</p>
            <h1 className="hero__title">
              <span className="line"><span style={{ ["--i" as string]: 0 }}>{t("Sağlıklı bir gülüş", "A healthy smile starts")}</span></span>
              <span className="line"><span style={{ ["--i" as string]: 1 }}>{t("doğru planla başlar.", "with the right plan.")}</span></span>
            </h1>
            <p className="lead hero__fade">{t("Dent32'de her tedavi ayrıntılı bir muayene ve size açıkça anlatılan bir planla başlar. Süreyi, riskleri ve maliyeti başlamadan önce konuşuruz.",
              "At Dent32, every treatment starts with a thorough examination and a plan explained to you clearly. We talk through timing, risks and cost before anything begins.")}</p>
            <div className="btn-row hero__fade">
              <Link className="btn btn-primary" href={route("contact", lang)}>{t("Randevu al", "Book an appointment")}</Link>
              <Link className="btn btn-ghost" href={route("treat", lang)}>{t("Tedavileri inceleyin", "Explore treatments")}</Link>
            </div>
          </div>
          <div className="hero__media">
            <div className="hero__frame">
              <Img name="hekim-huseyin-asci" w={880} h={1100} preload sizes="(max-width: 860px) 90vw, 440px"
                alt={t("Dr. Hüseyin Aşçı, Dent32 kurucu hekimi", "Dr. Hüseyin Aşçı, founder of Dent32")} />
            </div>
          </div>
        </div>
      </section>

      <div className="wrap apply">
        <div className="apply__box"><WaForm lang={lang} variant="apply" /></div>
      </div>

      <section className="section">
        <div className="wrap intro">
          <div className="collage">
            {([
              ["kolaj-ic-mekan", t("Dent32 kliniğinin iç mekânı", "Inside the Dent32 clinic")],
              ["kolaj-hekim-tedavi", t("Dr. Hüseyin Aşçı tedavi sırasında", "Dr. Hüseyin Aşçı during treatment")],
              ["kolaj-tedavi-odasi", t("Tedavi odası", "Treatment room")],
              ["kolaj-resepsiyon", t("Resepsiyon ve bekleme alanı", "Reception and waiting area")],
            ] as const).map(([name, alt], i) => (
              <figure key={name} className="zoom rv" style={delay(i)}><Img name={name} w={800} h={800} alt={alt} /></figure>
            ))}
          </div>
          <div className="rv">
            <p className="eyebrow">{t("Dent32 hakkında", "About Dent32")}</p>
            <h2>{t("Kişisel bir tedavi, milimetrik bir plan.", "Personal treatment, a precise plan.")}</h2>
            <p>{t("Dent32, Dr. Hüseyin Aşçı'nın Beylikdüzü'nde kurduğu bir diş kliniğidir. Her tedaviye ayrıntılı bir muayene ve gerekirse dijital görüntülemeyle başlıyoruz. Ne yapacağımızı, neden yapacağımızı ve alternatiflerin neler olduğunu tedaviye başlamadan önce anlatıyoruz.",
              "Dent32 is a dental clinic founded by Dr. Hüseyin Aşçı in Beylikdüzü, Istanbul. Every treatment begins with a thorough examination and, where needed, digital imaging. Before we start, we explain what we'll do, why, and what the alternatives are.")}</p>
            <p>{t("Klinik haftanın yedi günü açıktır. Ortodonti, implant ve estetik diş hekimliğinde aynı çatı altında, birlikte plan yapan bir ekiple çalışıyoruz.",
              "The clinic is open seven days a week. Orthodontics, implants and aesthetic dentistry are under one roof, with a team that plans together.")}</p>
            <ul className="badges" aria-label={t("Belgeler", "Certifications")}>
              {badges.map(([n, alt, w]) => <li key={n}><Image src={`/img/rozet-${n}.png`} width={w} height={160} alt={alt} /></li>)}
            </ul>
            <Link className="btn btn-line" href={route("about", lang, "kadro")}>{t("Hekim kadrosu", "Meet our dentists")} <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-treat">
        <div className="wrap">
          <SecHead eyebrow={t("Tedaviler", "Treatments")} title={t("Ne yaptığımızı açıkça anlatıyoruz.", "We explain clearly what we do.")} id="h-treat">
            <Link className="btn btn-line" href={route("treat", lang)}>{t("Tüm tedaviler", "All treatments")}</Link>
          </SecHead>
          <LangRail lang={lang} label={t("Tedaviler", "Treatments")} className="hx-rail--treat">
            {STRIP.map((s, i) => (
              <Link key={s.img} className="t-card lift rv" style={delay(i)} href={route("treat", lang, s.anchor)}>
                <div className="zoom" style={{ height: "100%" }}><Img name={s.img} w={720} h={960} alt="" /></div>
                <h3>{s.title[lang]}</h3>
              </Link>
            ))}
          </LangRail>
        </div>
      </section>

      <section className="section" aria-labelledby="h-ig">
        <div className="wrap">
          <SecHead eyebrow="Instagram" title={t("Klinikten kısa videolar", "Short videos from the clinic")} id="h-ig" />
          <LangRail lang={lang} label={t("Instagram videoları", "Instagram videos")} className="hx-rail--ig" drag={false}>
            {REELS.map((code, i) => (
              <div key={code} className="ig-card lift rv" style={delay(i)}>
                <iframe src={`https://www.instagram.com/reel/${code}/embed/`} loading="lazy" scrolling="no"
                  title={`${t("Dent32 Instagram videosu", "Dent32 Instagram video")} ${i + 1}`}
                  allow="encrypted-media; picture-in-picture; clipboard-write" />
              </div>
            ))}
          </LangRail>
          <div className="sec-foot">
            <a className="btn btn-line" href={IG} target="_blank" rel="noopener">{t("Instagram'da takip edin", "Follow us on Instagram")} <Icon name="ext" /></a>
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-ba">
        <div className="wrap">
          <SecHead eyebrow={t("Öncesi ve sonrası", "Before and after")} title={t("Rötuşsuz sonuçlar", "Unretouched results")} id="h-ba">
            <Link className="btn btn-line" href={route("gallery", lang)}>{t("Galeriye git", "View gallery")}</Link>
          </SecHead>
          <LangRail lang={lang} label={t("Öncesi ve sonrası vakalar", "Before and after cases")} className="hx-rail--ba">
            {([["implant", 1], ["implant", 2], ["zirkonyum", 1], ["zirkonyum", 2]] as const).map(([k, n], i) => (
              <BaCard key={`${k}${n}`} lang={lang} kind={k} n={n} d={i} />
            ))}
          </LangRail>
        </div>
      </section>

      <section className="section" aria-labelledby="h-rev">
        <div className="wrap">
          <SecHead eyebrow={t("Hasta yorumları", "Patient reviews")} title={t("Bizi hastalarımız anlatsın", "In our patients' words")} id="h-rev" />
          <LangRail lang={lang} label={t("Hasta yorumları", "Patient reviews")} className="hx-rail--reviews">
            {REVIEWS.map((r, i) => (
              <figure key={r.name} className="review rv" style={delay(Math.min(i, 4))}>
                <div className="stars" role="img" aria-label={t("5 üzerinden 5 yıldız", "5 out of 5 stars")}>
                  {[0, 1, 2, 3, 4].map((s) => <Star key={s} />)}
                </div>
                <blockquote><p style={{ margin: 0 }}>{r.text[lang]}</p></blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  <span>{r.source === "google" ? t("Google yorumu", "Google review") : t("Yandex yorumu", "Yandex review")}</span>
                  {lang === "en" && <em className="tr-note">translated from Turkish</em>}
                </figcaption>
              </figure>
            ))}
          </LangRail>
          <div className="sec-foot">
            <a className="btn btn-line" href={GMB} target="_blank" rel="noopener">{t("Google'daki tüm yorumlar", "All reviews on Google")} <Icon name="ext" /></a>
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-blog">
        <div className="wrap">
          <SecHead eyebrow="Blog" title={t("Kısa ve net rehberler", "Short, clear guides")} id="h-blog" />
          <div className="blog-grid">
            {POSTS[lang].slice(0, 3).map((p, i) => <BlogCard key={p.key} lang={lang} post={p} d={i} />)}
          </div>
          <div className="sec-foot"><Link className="btn btn-line" href={route("blog", lang)}>{t("Tüm yazılar", "All articles")}</Link></div>
        </div>
      </section>

      <section className="section" aria-labelledby="h-faq">
        <div className="wrap faq-layout">
          <div className="rv">
            <p className="eyebrow">{t("Sık sorulan sorular", "FAQ")}</p>
            <h2 id="h-faq">{t("Başlamadan önce merak edilenler", "Before you start")}</h2>
            <p>{t("Sorunuzun cevabı burada yoksa WhatsApp'tan yazın; hekimlerimiz yanıtlasın.", "If your question isn't answered here, message us on WhatsApp and our dentists will reply.")}</p>
          </div>
          <div className="rv"><Faq items={faq} /></div>
        </div>
      </section>

      <NextStep lang={lang} />
    </Shell>
  );
}
