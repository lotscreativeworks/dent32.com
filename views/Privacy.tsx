import Link from "next/link";
import { PageHead } from "@/components/blocks";
import { ConsentButton } from "@/components/client/Consent";
import { Shell } from "@/components/Shell";
import { ADDRESS, EMAIL, type Lang, OFFICIAL_NAME, route, translator } from "@/lib/site";

/** /cerez-politikasi/: çerezler ve site üzerinden işlenen veriler hakkında aydınlatma (KVKK md. 10) */
export function Privacy({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <Shell lang={lang} pageKey="privacy">
      <PageHead lang={lang} pageKey="privacy" title={t("Çerez politikası ve aydınlatma metni", "Cookie policy and privacy notice")} crumb={t("Çerez politikası", "Cookie policy")}
        eyebrow="Dent32"
        lead={t("Bu sitede hangi çerezlerin neden kullanıldığını ve tercihinizi nasıl değiştirebileceğinizi açıklıyoruz.",
          "Which cookies this site uses, why, and how you can change your choice.")} />
      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <div className="prose treat-guide">
            <h2>{t("Veri sorumlusu", "Data controller")}</h2>
            <p>{t(`${OFFICIAL_NAME} (Dent32), ${ADDRESS}. İletişim: `, `${OFFICIAL_NAME} (Dent32), ${ADDRESS}. Contact: `)}<a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>

            <h2>{t("Sitede kişisel veri kaydediliyor mu?", "Does this site store personal data?")}</h2>
            <p>{t("Hayır. İletişim ve ön görüşme formları bilgilerinizi sunucumuza göndermez; yazdıklarınızı bir WhatsApp mesajına dönüştürür. Mesaj, siz WhatsApp'ta gönder dediğinizde bize ulaşır. WhatsApp üzerinden yapılan yazışmalarda WhatsApp'ın kendi gizlilik koşulları da geçerlidir.",
              "No. The contact and call-back forms don't send your details to our server; they turn what you type into a WhatsApp message, which reaches us only when you press send in WhatsApp. WhatsApp's own privacy terms also apply to conversations there.")}</p>

            <h2>{t("Zorunlu kayıt", "Strictly necessary storage")}</h2>
            <p>{t("Çerez tercihinizi (kabul ya da ret) hatırlamak için tarayıcınızda \"dent32-consent\" adlı küçük bir kayıt (localStorage) tutulur. Bu kayıt sizi tanımlamaz, bize ya da başka bir yere gönderilmez ve sitenin çalışması için gereklidir.",
              "To remember your cookie choice (accept or reject), a small entry named \"dent32-consent\" is kept in your browser (localStorage). It doesn't identify you, isn't sent to us or anyone else, and is needed for the site to work.")}</p>

            <h2>{t("İsteğe bağlı reklam ve ölçüm çerezleri", "Optional advertising and measurement cookies")}</h2>
            <p>{t("Yalnızca çerez çubuğunda \"Kabul et\" derseniz Google Etiket Yöneticisi (Google Tag Manager) yüklenir; Google Ads ve Google Analytics çerezleri (ör. _gcl_au, _ga) kullanılır. Onay vermezseniz bu araçlar hiç yüklenmez ve Google'a sitemiz üzerinden veri gönderilmez.",
              "Only if you choose \"Accept\" in the cookie bar is Google Tag Manager loaded and are Google Ads and Google Analytics cookies (e.g. _gcl_au, _ga) used. If you don't consent, these tools aren't loaded at all and no data is sent to Google through our site.")}</p>
            <ul>
              <li><strong>{t("Amaç", "Purpose")}:</strong> {t("Google reklamlarımızın işe yarayıp yaramadığını ölçmek (örneğin bir reklamdan gelen ziyaretçinin bizi arayıp aramadığını, WhatsApp'tan yazıp yazmadığını ya da formu kullanıp kullanmadığını saymak) ve Google Analytics ile sitemizin nasıl kullanıldığını (hangi sayfaların okunduğunu, ziyaretçilerin nereden geldiğini) toplu istatistiklerle görmek.",
                "To measure whether our Google ads work (for example by counting whether a visitor who came from an ad called us, messaged us on WhatsApp or used the form) and, with Google Analytics, to see in aggregate statistics how our site is used (which pages are read, where visitors come from).")}</li>
              <li><strong>{t("İşlenen veriler", "Data processed")}:</strong> {t("Çerez kimliği, ziyaret edilen sayfa, reklam tıklama kimliği, tıklanan bağlantı türü (telefon, WhatsApp, form), tarayıcı ve cihaz bilgisi, IP adresi. Formlara yazdığınız ad, telefon ya da mesaj Google'a gönderilmez.",
                "Cookie ID, page visited, ad click ID, type of link clicked (phone, WhatsApp, form), browser and device information, IP address. The name, phone number or message you type into the forms is never sent to Google.")}</li>
              <li><strong>{t("Alıcı ve yurt dışı aktarım", "Recipient and transfer abroad")}:</strong> {t("Veriler Google (Google Ireland Ltd. / Google LLC) tarafından işlenir ve yurt dışındaki sunuculara aktarılabilir. Hukuki dayanak, KVKK md. 5/1 ve md. 9 kapsamında açık rızanızdır.",
                "The data is processed by Google (Google Ireland Ltd. / Google LLC) and may be transferred to servers outside Türkiye. The legal basis is your explicit consent under Articles 5(1) and 9 of the Turkish Personal Data Protection Law (KVKK).")}</li>
              <li><strong>{t("Süre", "Duration")}:</strong> {t("Google Ads çerezleri genellikle 90 güne, Google Analytics çerezleri 2 yıla kadar tarayıcınızda kalır. Google Analytics'teki ziyaret verileri 2 ay sonra silinir.", "Google Ads cookies usually stay in your browser for up to 90 days and Google Analytics cookies for up to 2 years. Visit data in Google Analytics is deleted after 2 months.")}</li>
            </ul>

            <h2>{t("Tercihinizi değiştirme", "Changing your choice")}</h2>
            <p>{t("Onayınızı dilediğiniz zaman geri alabilirsiniz. Geri aldığınızda Google çerezleri tarayıcınızdan silinir, sayfa yenilenir ve Google araçları artık yüklenmez. ",
              "You can withdraw your consent at any time. When you do, Google cookies are deleted from your browser, the page reloads and Google's tools are no longer loaded. ")}
              <ConsentButton label={t("Çerez tercihlerini aç", "Open cookie preferences")} /></p>
            <p>{t("Çerezleri tarayıcı ayarlarınızdan da silebilir ya da engelleyebilirsiniz.", "You can also delete or block cookies in your browser settings.")}</p>

            <h2>{t("Haklarınız", "Your rights")}</h2>
            <p>{t("KVKK md. 11 kapsamında verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini ya da silinmesini isteme ve itiraz etme haklarınız vardır. Başvurularınızı ",
              "Under Article 11 of KVKK you have the right to ask whether your data is processed, to request correction or deletion, and to object. Send your requests to ")}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>{t(" adresine iletebilirsiniz.", ".")}</p>

            <p><Link className="text-link" href={route("contact", lang)}>{t("İletişim bilgilerimiz", "Our contact details")}</Link></p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
