import Link from "next/link";
import { delay, NextStep, PageHead, SecHead } from "@/components/blocks";
import { Faq } from "@/components/client/Faq";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { DENTIST_ID, jsonLd } from "@/lib/seo";
import { absUrl, ADDRESS, GMB, type Lang, MAP_EMBED, OFFICIAL_NAME, PHONE, PHONE_E164, route, SITE, translator, TREATMENTS, waLink } from "@/lib/site";
import { TreatGrid } from "@/views/Treatments";

/** Sayfanın altındaki semt ve planlama rehberleri: [yazı anahtarı, TR, EN] */
const AREA_GUIDES: [string, string, string][] = [
  ["beymahalle", "Beylikdüzü mahallelerinden ve Esenyurt, Avcılar, Büyükçekmece, Bahçeşehir'den ulaşım", "Getting here from Beylikdüzü's neighbourhoods and from Esenyurt, Avcılar, Büyükçekmece and Bahçeşehir"],
  ["istanbul", "Yurt dışından İstanbul'a diş tedavisi", "Coming to Istanbul from abroad for dental treatment"],
  ["beynobet", "Nöbetçi, acil ve hafta sonu diş hekimi", "On-call, emergency and weekend dentist in Beylikdüzü"],
  ["ruhsat", "Ruhsatlı diş polikliniği nasıl anlaşılır?", "How to tell if a dental practice is licensed"],
];

/**
 * /istanbul-dis-klinigi/ · /en/dental-clinic-istanbul/: "İstanbul diş kliniği" aramaları için açılış sayfası.
 * Klinik Beylikdüzü'nde; sayfa bunu saklamadan İstanbul'un farklı semtlerinden ve yurt dışından gelenler için ulaşımı ve planlamayı anlatır.
 */
export function Istanbul({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const url = absUrl("istanbul", lang);

  const routes: [string, string][] = lang === "tr" ? [
    ["Metrobüs hattı boyunca (Avcılar, Küçükçekmece, Bakırköy, Zeytinburnu, Mecidiyeköy, Zincirlikuyu ve Anadolu Yakası'nda Söğütlüçeşme)", "Metrobüsle Beylikdüzü Belediye ya da Beylikdüzü durağında inilir; klinik duraklara yaklaşık 300 m uzaklıktadır."],
    ["Esenyurt, Büyükçekmece, Silivri", "E-5 (D-100) karayolu üzerinden Beylikdüzü yanyoluna gelinir; klinik doğrudan E-5 yanyolu üzerindedir."],
    ["Bahçeşehir, Başakşehir", "Araçla Esenyurt üzerinden E-5'e bağlanılır; toplu taşımada Esenyurt'tan E-5'e ulaşan hatlar ve ardından metrobüs kullanılabilir."],
    ["Yurt dışından gelenler", "Klinik Avrupa Yakası'ndadır; İstanbul Havalimanı bu bölgeye Sabiha Gökçen'e göre daha yakındır. Avrupa Yakası'nda konaklamak ziyaretleri kolaylaştırır."],
  ] : [
    ["Along the metrobus line (Avcılar, Küçükçekmece, Bakırköy, Zeytinburnu, Mecidiyeköy, Zincirlikuyu and Söğütlüçeşme on the Asian side)", "Take the metrobus to the Beylikdüzü Belediye or Beylikdüzü stop; the clinic is about 300 m from both stops."],
    ["Esenyurt, Büyükçekmece, Silivri", "Follow the E-5 (D-100) highway to the Beylikdüzü service road; the clinic is right on the E-5 service road."],
    ["Bahçeşehir, Başakşehir", "By car, join the E-5 via Esenyurt; by public transport, take a line from Esenyurt to the E-5 and then the metrobus."],
    ["From abroad", "The clinic is on the European side; Istanbul Airport is closer to this area than Sabiha Gökçen. Staying on the European side makes visits easier."],
  ];

  const visits: [string, string, string][] = lang === "tr" ? [
    ["Muayene ve diş taşı temizliği", "1", "Aynı gün"],
    ["Dolgu", "1", "Aynı gün"],
    ["Kanal tedavisi", "1–2", "Birkaç gün içinde"],
    ["Zirkonyum ya da lamine kaplama", "3–4", "Yaklaşık 1–2 hafta"],
    ["İmplant", "4–6", "Kemik durumuna göre yaklaşık 3–6 ay"],
    ["Şeffaf plak", "Başlangıç + 4–8 haftada bir kontrol", "Vakaya göre 6–24 ay"],
  ] : [
    ["Examination and scale and polish", "1", "Same day"],
    ["Filling", "1", "Same day"],
    ["Root canal treatment", "1–2", "Within a few days"],
    ["Zirconia crowns or veneers", "3–4", "About 1–2 weeks"],
    ["Dental implants", "4–6", "About 3–6 months, depending on the bone"],
    ["Clear aligners", "Start + a check every 4–8 weeks", "6–24 months, depending on the case"],
  ];

  const criteria: [string, string][] = lang === "tr" ? [
    ["Ruhsat", `Diş kliniklerinin ruhsat türü (poliklinik, muayenehane, ağız ve diş sağlığı merkezi) ve sorumlu hekimi Sağlık Bakanlığı kayıtlarından kontrol edilebilir. Nasıl bakılacağını <a class="text-link" href="${route("post-ruhsat", lang)}">bu yazımızda</a> anlattık.`],
    ["Muayene sonrası yazılı plan", "Hangi dişe ne yapılacağı, kaç ziyaret gerektiği ve yaklaşık maliyetin muayeneden sonra yazılı olarak verilmesi, seçenekleri karşılaştırmayı kolaylaştırır. Telefonda ya da muayenesiz verilen fiyatlar ancak kaba bir fikir verir."],
    ["Gerektiğinde görüntüleme", "İmplant ve gömülü diş gibi işlemlerde kemiğin üç boyutlu değerlendirilmesi gerekebilir; röntgen ya da tomografinin yalnızca gerektiğinde istenmesi beklenir."],
    ["Sterilizasyon ve hijyen", `Aletlerin nasıl sterilize edildiğini sormak hastanın hakkıdır. Neye bakılabileceğini <a class="text-link" href="${route("post-klinik", lang)}#hijyen">sterilizasyon ve hijyen</a> yazımızda topladık.`],
    ["Tedaviyi kimin yapacağı", "Muayene eden hekimle tedaviyi yapacak hekimin aynı kişi olup olmadığını ve tedavi sonrası kontrollerin nasıl yürüyeceğini önceden sormak faydalıdır."],
    ["Tanıtım kuralları", `Sağlık tanıtımı yönetmeliği nedeniyle kliniklerin sitelerinde fiyat, "en iyi" gibi ifadeler ve hasta yorumları yer almaz. Bunun nedenini <a class="text-link" href="${route("post-reklam", lang)}">burada</a> açıkladık.`],
  ] : [
    ["Licence", `A dental practice's licence type (polyclinic, private practice or oral health centre) and responsible dentist can be checked in Ministry of Health records. We explain how in <a class="text-link" href="${route("post-ruhsat", lang)}">this article</a>.`],
    ["A written plan after the examination", "Getting the treatment for each tooth, the number of visits and the approximate cost in writing after an examination makes it easier to compare options. Prices given over the phone or without an examination are only a rough guide."],
    ["Imaging when needed", "Implants and impacted teeth may need a 3D assessment of the bone; X-rays or a CT scan should only be requested when they are needed."],
    ["Sterilisation and hygiene", `Patients have every right to ask how instruments are sterilised. We list what to look for in our <a class="text-link" href="${route("post-klinik", lang)}#hijyen">sterilisation and hygiene</a> article.`],
    ["Who will treat you", "It is worth asking in advance whether the dentist who examines you will also carry out the treatment, and how follow-up visits will work."],
    ["Advertising rules", `Under Turkish health advertising rules, clinic websites do not show prices, claims such as "the best" or patient reviews. We explain why <a class="text-link" href="${route("post-reklam", lang)}">here</a>.`],
  ];

  const faq = lang === "tr" ? [
    { q: "Dent32 İstanbul'un neresinde?", a: `Dent32, İstanbul Avrupa Yakası'nda, Beylikdüzü Barış Mahallesi'nde, E-5 yanyolu üzerindeki Ginza Lavinya'dadır (${ADDRESS}). Metrobüsün Beylikdüzü Belediye ve Beylikdüzü durakları yaklaşık 300 m uzaklıktadır.` },
    { q: "Anadolu Yakası'ndan ya da İstanbul'un merkezinden gelmek mantıklı mı?", a: "Bu, tedavinin kaç ziyaret gerektirdiğine bağlıdır. Metrobüs hattı Söğütlüçeşme'den Beylikdüzü'ne kadar uzandığı için aktarmasız ulaşım mümkündür; çok ziyaretli tedavilerde randevuları mümkün olduğunca aynı güne toplayarak gelme sayısını azaltmaya çalışırız. Kararı vermeden önce röntgen ve fotoğraflarınızı WhatsApp'tan gönderip ön bilgi alabilirsiniz." },
    { q: "Uzaktan geldiğim için tedavim kaç ziyarette biter?", a: "Ziyaret sayısı tedavinin türüne, diş sayısına ve kemik ya da diş eti durumuna göre kişiden kişiye değişir. Yaklaşık sayılar bu sayfadaki tabloda; size özel ziyaret planını muayeneden sonra yazılı olarak veriyoruz." },
    { q: "Hafta sonu açık mısınız?", a: "Klinik pazartesiden cumartesiye 09.00–22.00 arası açıktır, pazar günü kapalıdır. Hafta içi gelemeyenler için cumartesi randevuları planlanabilir." },
    { q: "İngilizce hizmet veriyor musunuz?", a: "Evet, Türkçe ve İngilizce hizmet veriyoruz. Yurt dışından gelenler için planlama adımlarını ayrı bir rehberde anlattık." },
    { q: "Fiyat bilgisi alabilir miyim?", a: "Fiyat; diş sayısına, kullanılacak malzemeye ve ek işlem gerekip gerekmediğine göre değişir. Fotoğraf ve röntgen gönderirseniz ön bilgi verebiliriz; kesin plan ve maliyet muayeneden sonra kalem kalem yazılı olarak verilir. Muayeneden sonra tedaviye başlamak zorunda değilsiniz." },
  ] : [
    { q: "Where in Istanbul is Dent32?", a: `Dent32 is on Istanbul's European side, at Ginza Lavinya on the E-5 service road in Barış, Beylikdüzü (${ADDRESS}). The Beylikdüzü Belediye and Beylikdüzü metrobus stops are about 300 m away.` },
    { q: "Does it make sense to come from the Asian side or central Istanbul?", a: "That depends on how many visits your treatment needs. The metrobus runs from Söğütlüçeşme all the way to Beylikdüzü, so you can travel without changing; for treatments with several visits we try to group appointments on the same day to reduce the number of trips. Before deciding, you can send your X-rays and photos via WhatsApp for preliminary information." },
    { q: "I'm travelling a long way. How many visits will my treatment take?", a: "The number of visits varies from person to person, depending on the type of treatment, the number of teeth and the condition of the bone or gums. Approximate numbers are in the table on this page; we give you a written visit plan after the examination." },
    { q: "Are you open at weekends?", a: "The clinic is open Monday to Saturday, 9:00–22:00, and closed on Sundays. Saturday appointments can be arranged if you can't come on a weekday." },
    { q: "Do you speak English?", a: "Yes, we work in Turkish and English. We explain the planning steps for patients coming from abroad in a separate guide." },
    { q: "Can I get price information?", a: "Price depends on the number of teeth, the materials used and whether additional procedures are needed. If you send photos and X-rays we can give preliminary information; the final plan and cost are given in writing, itemised, after the examination. You are under no obligation to start treatment afterwards." },
  ];

  const page = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${url}#webpage`, url, inLanguage: lang,
    name: t("İstanbul'da diş kliniği: Beylikdüzü'ndeki Dent32", "Dental clinic in Istanbul: Dent32 in Beylikdüzü"),
    isPartOf: { "@id": `${SITE}/#website` }, about: { "@id": DENTIST_ID }, publisher: { "@id": DENTIST_ID },
    primaryImageOfPage: `${SITE}/img/klinik-01-bina.webp`,
    spatialCoverage: { "@type": "City", name: "İstanbul" },
    significantLink: TREATMENTS.map((tr) => absUrl(`treat-${tr.id}`, lang)),
  };
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };

  return (
    <Shell lang={lang} pageKey="istanbul">
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(page)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <PageHead lang={lang} pageKey="istanbul" crumb={t("İstanbul diş kliniği", "Dental clinic in Istanbul")}
        eyebrow={t("Dent32 · İstanbul Avrupa Yakası", "Dent32 · Istanbul, European side")}
        title={t("İstanbul'da diş kliniği: Beylikdüzü'ndeki Dent32", "Dental clinic in Istanbul: Dent32 in Beylikdüzü")}
        lead={t(`${OFFICIAL_NAME}, İstanbul Avrupa Yakası'nda, Beylikdüzü'nde E-5 yanyolu üzerindedir. Beylikdüzü ve çevresinin yanı sıra İstanbul'un farklı semtlerinden ve yurt dışından gelen hastalar için ulaşımı ve ziyaret planını bu sayfada anlatıyoruz.`,
          `${OFFICIAL_NAME} (Dent32 Dental Polyclinic) is on Istanbul's European side, on the E-5 service road in Beylikdüzü. On this page we explain how to get here and how visits are planned for patients from Beylikdüzü, other parts of Istanbul and abroad.`)} />

      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }} aria-labelledby="h-where">
        <div className="wrap">
          <div className="detail">
            <div className="rv">
              <h2 id="h-where">{t("Klinik nerede, nasıl gelinir?", "Where is the clinic and how do I get here?")}</h2>
              <p>{t("Dent32, İstanbul'un batısında, E-5 (D-100) karayolu ile metrobüs hattının yan yana ilerlediği Beylikdüzü'ndedir. Bu sayede İstanbul'un pek çok semtinden aktarmasız ya da tek aktarmayla ulaşılabilir.",
                "Dent32 is in Beylikdüzü, in the west of Istanbul, where the E-5 (D-100) highway and the metrobus line run side by side. This means many parts of Istanbul can reach us without changing, or with a single change.")}</p>
              <ul className="info">
                <li><span className="info__ico"><Icon name="pin" /></span><div><strong>{t("Adres", "Address")}</strong><address style={{ fontStyle: "normal" }}>{ADDRESS}</address></div></li>
                <li><span className="info__ico"><Icon name="clock" /></span><div><strong>{t("Çalışma saatleri", "Opening hours")}</strong>{t("Pazartesi–cumartesi 09.00–22.00, pazar kapalı", "Monday to Saturday 9:00–22:00, closed on Sundays")}</div></li>
                <li><span className="info__ico"><Icon name="phone" /></span><div><strong>{t("Telefon ve WhatsApp", "Phone and WhatsApp")}</strong><a href={`tel:${PHONE_E164}`}>{PHONE}</a></div></li>
              </ul>
              <div className="btn-row" style={{ alignItems: "center", gap: 20 }}>
                <a className="btn btn-primary" href={GMB} target="_blank" rel="noopener">{t("Yol tarifi al", "Get directions")}</a>
                <a className="text-link" href={waLink(t("Merhaba, İstanbul'dan tedavi için bilgi almak istiyorum.", "Hello, I'd like some information about treatment at Dent32."))} target="_blank" rel="noopener">{t("WhatsApp'tan danışın", "Ask on WhatsApp")}</a>
              </div>
            </div>
            <div className="detail__media zoom rv" style={delay(1)}>
              <Img name="klinik-01-bina" w={720} h={900} alt={t("Dent32'nin bulunduğu Ginza Lavinya binası, Beylikdüzü", "The Ginza Lavinya building in Beylikdüzü where Dent32 is located")} sizes="(max-width: 860px) 92vw, 480px" />
            </div>
          </div>

          <h3>{t("İstanbul'un farklı yerlerinden ulaşım", "Getting here from different parts of Istanbul")}</h3>
          <div className="table-wrap">
            <table>
              <thead><tr><th scope="col">{t("Nereden?", "From")}</th><th scope="col">{t("Nasıl gelinir?", "How to get here")}</th></tr></thead>
              <tbody>{routes.map(([from, how]) => <tr key={from}><td>{from}</td><td>{how}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="legal-note">{t("Yol süresi trafik saatine göre değişir; hafta sonu sabahları yollar genellikle daha rahattır.", "Travel time depends on traffic; roads are usually quieter on weekend mornings.")}</p>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-plan">
        <div className="wrap">
          <SecHead eyebrow={t("Planlama", "Planning")} title={t("Uzaktan gelenler için ziyaret planı", "Planning visits when you travel a long way")} id="h-plan" />
          <div className="local">
            <div className="rv">
              <p>{t("Yolculuk süresi uzadığında her randevunun verimli kullanılması gerekir. Bunun için:", "When the journey is longer, every appointment needs to count. To make that happen:")}</p>
              <ol className="steps">
                <li>{t("Gelmeden önce röntgeninizi ve dişlerinizin net fotoğraflarını WhatsApp'tan gönderebilirsiniz; hekim ön bilgi verir, kesin plan muayeneden sonra netleşir.", "Before you come, you can send your X-rays and clear photos of your teeth via WhatsApp; the dentist gives preliminary information, and the final plan is made after the examination.")}</li>
                <li>{t("Muayene, röntgen ve gerekiyorsa diş taşı temizliğini mümkün olduğunca aynı randevuda yaparız.", "Where possible, we do the examination, X-rays and, if needed, a scale and polish at the same appointment.")}</li>
                <li>{t("Birden fazla dolgu ya da kanal tedavisini uygunsa aynı seansta birleştiririz.", "If suitable, we combine several fillings or root canal treatments in the same session.")}</li>
                <li>{t("Kaplama tedavilerinde ölçü ve prova günlerini, implant ve şeffaf plakta kontrol tarihlerini önceden birlikte belirleriz.", "For crowns we agree measurement and try-in dates in advance, and for implants and aligners we set the check-up dates together.")}</li>
                <li>{t("Aile bireyleri için ardışık randevu verebiliriz.", "We can give family members back-to-back appointments.")}</li>
              </ol>
            </div>
            <div className="rv" style={delay(1)}>
              <div className="table-wrap">
                <table>
                  <thead><tr><th scope="col">{t("Tedavi", "Treatment")}</th><th scope="col">{t("Yaklaşık ziyaret", "Approx. visits")}</th><th scope="col">{t("Süre", "Duration")}</th></tr></thead>
                  <tbody>{visits.map(([a, b, c]) => <tr key={a}><td>{a}</td><td>{b}</td><td>{c}</td></tr>)}</tbody>
                </table>
              </div>
              <p className="legal-note">{t("Sayılar genel aralıklardır; ziyaret sayısı ve süre kişiden kişiye değişir.", "These are general ranges; the number of visits and the duration vary from person to person.")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="h-treat">
        <div className="wrap">
          <SecHead eyebrow={t("Tedaviler", "Treatments")} title={t("Dent32'de yapılan tedaviler", "Treatments at Dent32")} id="h-treat">
            <Link className="btn btn-line" href={route("treat", lang)}>{t("Tüm tedaviler", "All treatments")}</Link>
          </SecHead>
          <p>{t("Kurucu hekimimiz Dr. Hüseyin Aşcı'nın klinik çalışmalarının merkezinde implant, All-on-4 ve All-on-6 tüm çene implant, zirkonyum kaplama ve lamine yer alır. Kliniğimizde üç diş hekimi hasta kabul eder; hekimlerimizi ",
            "The clinical work of our founder, Dr. Hüseyin Aşcı, centres on dental implants, All-on-4 and All-on-6 full-arch implants, zirconia crowns and porcelain veneers. Three dentists see patients at our clinic; you can meet them in ")}
            <Link className="text-link" href={route("post-kadro", lang)}>{t("hekim kadromuz", "our dentists")}</Link>
            {t(" yazısında tanıyabilirsiniz.", ".")}</p>
          <TreatGrid lang={lang} items={TREATMENTS} />
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-choose">
        <div className="wrap">
          <SecHead eyebrow={t("Seçerken", "Choosing a clinic")} title={t("İstanbul'da diş kliniği seçerken nelere bakılabilir?", "What to look for when choosing a dental clinic in Istanbul")} id="h-choose" />
          <div className="svc-grid">
            {criteria.map(([h, p], i) => (
              <div key={h} className="svc rv" style={delay(i % 3)}>
                <h3>{h}</h3>
                <p dangerouslySetInnerHTML={{ __html: p }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="h-guides">
        <div className="wrap">
          <SecHead eyebrow={t("Rehberler", "Guides")} title={t("Semtlere ve duruma göre rehberler", "Guides by area and situation")} id="h-guides" />
          <ul className="link-list">
            {AREA_GUIDES.map(([key, tr, en]) => <li key={key}><Link href={route(`post-${key}`, lang)}>{t(tr, en)}</Link></li>)}
          </ul>
        </div>
      </section>

      <section className="section section--mist" aria-labelledby="h-faq">
        <div className="wrap faq-layout">
          <div className="rv">
            <p className="eyebrow">{t("Sık sorulan sorular", "FAQ")}</p>
            <h2 id="h-faq">{t("İstanbul'dan gelenlerin merak ettikleri", "Common questions from patients across Istanbul")}</h2>
            <p>{t("Sorunuzun cevabı burada yoksa WhatsApp'tan yazın; hekimlerimiz yanıtlasın.", "If your question isn't answered here, message us on WhatsApp and our dentists will reply.")}</p>
          </div>
          <div className="rv"><Faq items={faq} /></div>
        </div>
        <div className="wrap map rv">
          <div className="map__frame">
            <iframe src={MAP_EMBED(lang)} title={t("Dent32 konumu, Google Haritalar", "Dent32 location on Google Maps")}
              loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>
        </div>
      </section>

      <NextStep lang={lang} />
    </Shell>
  );
}
