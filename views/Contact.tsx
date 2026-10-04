import { WaForm } from "@/components/client/WaForm";
import { delay, PageHead } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { Shell } from "@/components/Shell";
import { ADDRESS, EMAIL, GMB, type Lang, MAP_EMBED, PHONE, PHONE_E164, translator, WA } from "@/lib/site";

export function Contact({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <Shell lang={lang} pageKey="contact">
      <PageHead lang={lang} title={t("İletişim ve randevu", "Contact and appointments")} crumb={t("İletişim", "Contact")}
        lead={t("Formu doldurun ya da doğrudan WhatsApp'tan yazın. Mesajınızı hekimlerimizle paylaşıp size dönüyoruz.",
          "Fill in the form or message us directly on WhatsApp. We'll share your message with our dentists and get back to you.")} />
      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <div className="contact">
            <div className="contact__form rv">
              <h2 style={{ fontSize: "1.6rem" }}>{t("Mesaj gönderin", "Send a message")}</h2>
              <p>{t("Form, bilgilerinizi bir WhatsApp mesajına dönüştürür. Gönder dediğinizde WhatsApp açılır; sitemiz hiçbir veriyi kaydetmez.",
                "The form turns your details into a WhatsApp message. When you press send, WhatsApp opens; this site doesn't store any data.")}</p>
              <WaForm lang={lang} variant="contact" />
            </div>
            <div className="rv" style={delay(1)}>
              <h2 style={{ fontSize: "1.6rem" }}>{t("Bilgiler", "Details")}</h2>
              <ul className="info">
                <li><span className="info__ico"><Icon name="pin" /></span><div><strong>{t("Adres", "Address")}</strong><address style={{ fontStyle: "normal" }}>{ADDRESS}</address></div></li>
                <li><span className="info__ico"><Icon name="phone" /></span><div><strong>{t("Telefon", "Phone")}</strong><a href={`tel:${PHONE_E164}`}>{PHONE}</a></div></li>
                <li><span className="info__ico"><Icon name="chat" /></span><div><strong>WhatsApp</strong><a href={WA} target="_blank" rel="noopener">{PHONE}</a></div></li>
                <li><span className="info__ico"><Icon name="mail" /></span><div><strong>{t("E-posta", "Email")}</strong><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div></li>
                <li><span className="info__ico"><Icon name="clock" /></span><div><strong>{t("Çalışma saatleri", "Opening hours")}</strong>
                  {t("Haftanın yedi günü açığız. Güncel saatler ve randevu için WhatsApp'tan yazabilirsiniz.", "We're open seven days a week. Message us on WhatsApp for current hours and appointments.")}</div></li>
              </ul>
            </div>
          </div>
          <div className="map rv">
            <h2 className="visually-hidden">{t("Harita", "Map")}</h2>
            <div className="map__frame">
              <iframe src={MAP_EMBED(lang)} title={t("Dent32 konumu, Google Haritalar", "Dent32 location on Google Maps")}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            </div>
            <p><a className="text-link" href={GMB} target="_blank" rel="noopener">{t("Google Haritalar'da aç ve yol tarifi al", "Open in Google Maps and get directions")}</a></p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
