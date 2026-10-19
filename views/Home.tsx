import Image from "next/image";
import Link from "next/link";
import { Faq } from "@/components/client/Faq";
import { HeroVideo } from "@/components/client/HeroVideo";
import { IgEmbed } from "@/components/client/IgEmbed";
import { WaForm } from "@/components/client/WaForm";
import { BaCard, BlogCard, delay, LangRail, NextStep, SecHead } from "@/components/blocks";
import { Icon, Star } from "@/components/Icon";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { dentistLd, jsonLd, websiteLd } from "@/lib/seo";
import { ADDRESS, GMB, IG, type Lang, PHONE, PHONE_E164, POSTS, REELS, REVIEWS, route, STRIP, translator } from "@/lib/site";

/** Anasayfadaki "Beylikdüzü diş rehberleri" listesi: [yazı anahtarı, TR, EN] */
const LOCAL_GUIDES: [string, string, string][] = [
  ["beydis", "Beylikdüzü diş hekimi", "Dentist in Beylikdüzü"],
  ["beyimplant", "İmplant tedavisi", "Dental implants"],
  ["beyzirk", "Zirkonyum kaplama", "Zirconia crowns"],
  ["beylamine", "Lamine kaplama", "Laminate veneers"],
  ["beygulus", "Gülüş tasarımı", "Smile design"],
  ["beyorto", "Ortodonti ve şeffaf plak", "Orthodontics and aligners"],
  ["beybeyaz", "Diş beyazlatma", "Teeth whitening"],
  ["beykanal", "Kanal tedavisi", "Root canal treatment"],
  ["beydiseti", "Diş eti tedavisi", "Gum treatment"],
  ["beycocuk", "Çocuk diş hekimi", "Children's dentist"],
  ["beyprotez", "Protez diş", "Dentures"],
  ["beyhaftasonu", "Hafta sonu açık diş kliniği", "Weekend dentist"],
  ["beyfiyat", "Diş tedavisi fiyatları", "Treatment prices"],
  ["beyilce", "Esenyurt, Avcılar, Büyükçekmece", "From Esenyurt, Avcılar, Büyükçekmece"],
];

export function Home({ lang }: { lang: Lang }) {
  const t = translator(lang);

  const faq = lang === "tr" ? [
    { q: "Dent32 Beylikdüzü'nün neresinde?", a: `Barış Mahallesi'nde, E-5 yanyolu üzerindeki Ginza Lavinya'dayız (No:30 D:179, 34520 Beylikdüzü / İstanbul). Esenyurt, Avcılar ve Büyükçekmece'den de kolayca ulaşılır; harita ve yol tarifi <a class="text-link" href="${route("contact", lang)}">iletişim sayfamızda</a>.` },
    { q: "Hafta sonu ve pazar günü açık mısınız?", a: `Evet, klinik haftanın yedi günü açıktır. Güncel saatler ve randevu için WhatsApp'tan yazabilirsiniz. Hafta sonu yapılabilen işlemleri <a class="text-link" href="${route("post-beyhaftasonu", lang)}">bu yazımızda</a> anlattık.` },
    { q: "İlk muayenede ne yapılıyor?", a: "Ağız içi muayene yapıyor, gerekirse röntgen ya da tomografi çekiyoruz. Ardından bulguları anlatıyor, tedavi seçeneklerini ve yaklaşık maliyeti yazılı olarak paylaşıyoruz. Muayene sonrası tedaviye başlamak zorunda değilsiniz." },
    { q: "Tedavi fiyatlarını önceden öğrenebilir miyim?", a: "Fiyat; diş sayısına, kullanılacak malzemeye ve ek işlem gerekip gerekmediğine göre değişir. Fotoğraf ve röntgen gönderirseniz ön bilgi verebiliriz; kesin plan ve maliyet muayeneden sonra kalem kalem yazılı olarak verilir." },
    { q: "Yurt dışından geliyorum, tedavimi nasıl planlarım?", a: `Röntgen ve fotoğraflarınızı WhatsApp'tan gönderin. Hekim ön değerlendirme yapar; kaç ziyaret gerektiğini ve İstanbul'da ne kadar kalmanız gerektiğini birlikte konuşuruz. Ayrıntılar için <a class="text-link" href="${route("post-istanbul", lang)}">planlama rehberimize</a> bakabilirsiniz.` },
    { q: "Tedavi sırasında ağrı hissedecek miyim?", a: "İşlemlerin çoğu lokal anestezi altında yapılır ve tedavi sırasında belirgin ağrı beklenmez. İşlem sonrası olabilecek hassasiyeti ve ne yapmanız gerektiğini önceden anlatırız. Diş hekimi kaygınız varsa randevu alırken bize söyleyin." },
  ] : [
    { q: "Where in Beylikdüzü is Dent32?", a: `We're at Ginza Lavinya on the E-5 service road in Barış (No:30 D:179, 34520 Beylikdüzü, Istanbul), easy to reach from Esenyurt, Avcılar and Büyükçekmece too. The map and directions are on our <a class="text-link" href="${route("contact", lang)}">contact page</a>.` },
    { q: "Are you open at weekends and on Sundays?", a: `Yes, the clinic is open seven days a week. Message us on WhatsApp for current hours and appointments. We explain what can be done at the weekend in <a class="text-link" href="${route("post-beyhaftasonu", lang)}">this article</a>.` },
    { q: "What happens at the first examination?", a: "We carry out a clinical examination and take X-rays or a CT scan if needed. We then explain the findings and share the treatment options and an approximate cost in writing. You're under no obligation to start treatment after the examination." },
    { q: "Can I find out treatment prices in advance?", a: "Price depends on the number of teeth, the materials used and whether additional procedures are needed. If you send photos and X-rays we can give preliminary information; the final plan and cost are given in writing, itemised, after the examination." },
    { q: "I'm coming from abroad. How do I plan my treatment?", a: `Send your X-rays and photos via WhatsApp. The dentist will make a preliminary assessment, and together we'll discuss how many visits you need and how long to stay in Istanbul. See our <a class="text-link" href="${route("post-istanbul", lang)}">planning guide</a> for details.` },
    { q: "Will I feel pain during treatment?", a: "Most procedures are done under local anaesthetic, and no significant pain is expected during treatment. We explain any sensitivity you might have afterwards and what to do. If you feel anxious about the dentist, let us know when booking." },
  ];

  const badges: [string, string, number][] = [
    ["iso-13485", t("ISO 13485:2016 tıbbi cihaz kalite yönetimi", "ISO 13485:2016 medical devices quality management"), 124],
    ["saglik-bakanligi", t("T.C. Sağlık Bakanlığı", "Republic of Türkiye Ministry of Health"), 124],
    ["health-turkiye", "Health Türkiye", 195],
  ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })),
  };

  return (
    <Shell lang={lang} pageKey="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(dentistLd(lang))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(websiteLd(lang))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />

      <section className="hero">
        <HeroVideo />
        <div className="wrap hero__grid">
          <div>
            {/* Üst satır da başlığın parçası: arama motoru H1'i "Beylikdüzü diş kliniği" ile başlar, görünüm aynı kalır */}
            <h1 className="hero__title">
              <span className="eyebrow hero__fade">{t("Beylikdüzü diş kliniği · Dent32, İstanbul", "Dental clinic in Beylikdüzü, Istanbul · Dent32")}</span>
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
              {badges.map(([n, alt, w]) => <li key={n}><Image unoptimized src={`/img/rozet-${n}.webp`} width={w} height={124} alt={alt} /></li>)}
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
                <IgEmbed code={code} title={`${t("Dent32 Instagram videosu", "Dent32 Instagram video")} ${i + 1}`} />
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

      <section className="section" aria-labelledby="h-local">
        <div className="wrap local">
          <div className="rv">
            <p className="eyebrow">Beylikdüzü</p>
            <h2 id="h-local">{t("Beylikdüzü'nde diş kliniği", "A dental clinic in Beylikdüzü")}</h2>
            <p>{t("Dent32, Beylikdüzü Barış Mahallesi'nde, E-5 yanyolu üzerindeki Ginza Lavinya'da hizmet veren bir diş kliniğidir. İmplant, zirkonyum ve lamine kaplama, gülüş tasarımı, şeffaf plak ortodonti, diş beyazlatma, kanal tedavisi, diş eti tedavisi ve çocuk diş hekimliği aynı çatı altında, birlikte plan yapan bir hekim ekibiyle yürütülür.",
              "Dent32 is a dental clinic at Ginza Lavinya on the E-5 service road in Barış, Beylikdüzü. Implants, zirconia crowns and veneers, smile design, clear aligner orthodontics, teeth whitening, root canal treatment, gum care and children's dentistry are all under one roof, with a team that plans together.")}</p>
            <p>{t("Klinik hafta sonu dahil her gün açıktır. Beylikdüzü'nün tüm mahallelerinden ve Esenyurt, Avcılar, Büyükçekmece gibi komşu ilçelerden gelen hastalarımız için randevuları ziyaret sayısını azaltacak şekilde planlıyoruz. Türkçe ve İngilizce hizmet veriyoruz.",
              "The clinic is open every day, including weekends. For patients from every part of Beylikdüzü and neighbouring districts such as Esenyurt, Avcılar and Büyükçekmece, we plan appointments to keep the number of visits down. We work in Turkish and English.")}</p>
            <ul className="info">
              <li><span className="info__ico"><Icon name="pin" /></span><div><strong>{t("Adres", "Address")}</strong><address style={{ fontStyle: "normal" }}>{ADDRESS}</address></div></li>
              <li><span className="info__ico"><Icon name="clock" /></span><div><strong>{t("Çalışma günleri", "Opening days")}</strong>{t("Haftanın yedi günü, hafta sonu dahil", "Seven days a week, including weekends")}</div></li>
              <li><span className="info__ico"><Icon name="phone" /></span><div><strong>{t("Telefon ve WhatsApp", "Phone and WhatsApp")}</strong><a href={`tel:${PHONE_E164}`}>{PHONE}</a></div></li>
            </ul>
          </div>
          <div className="rv" style={delay(1)}>
            <h3 className="local__title">{t("Beylikdüzü diş rehberleri", "Beylikdüzü dental guides")}</h3>
            <ul className="local__links">
              {LOCAL_GUIDES.map(([key, tr, en]) => (
                <li key={key}><Link href={route(`post-${key}`, lang)}>{t(tr, en)} <Icon name="arrow" /></Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-faq">
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
