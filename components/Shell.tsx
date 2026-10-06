import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { HeaderControls } from "@/components/client/HeaderControls";
import { WaGlyph } from "@/components/Icon";
import {
  ADDRESS, EMAIL, type Lang, type PageKey, PHONE, PHONE_E164, route, SOCIAL, translator, TREATMENTS, WA,
} from "@/lib/site";

const NAV = [
  ["home", "Anasayfa", "Home"],
  ["treat", "Tedaviler", "Treatments"],
  ["about", "Hakkımızda", "About"],
  ["gallery", "Galeri", "Gallery"],
  ["blog", "Blog", "Blog"],
  ["contact", "İletişim", "Contact"],
] as const;

function Header({ lang, pageKey }: { lang: Lang; pageKey: PageKey }) {
  const t = translator(lang);
  const active = pageKey.startsWith("post-") ? "blog" : pageKey;
  const nav = (
    <>
      <ul>
        {NAV.map(([key, tr, en]) => (
          <li key={key}>
            <Link href={route(key, lang)} aria-current={key === active ? "page" : undefined}>{t(tr, en)}</Link>
          </li>
        ))}
      </ul>
      <Link className="btn btn-primary nav__cta" href={route("contact", lang)}>{t("Randevu al", "Book an appointment")}</Link>
    </>
  );
  const actions = (
    <>
      <div className="lang" role="group" aria-label={t("Dil seçimi", "Language")}>
        {/* Bulunulan sayfanın diğer dildeki karşılığına gider */}
        <a href={route(pageKey, "tr")} hrefLang="tr" lang="tr" aria-current={lang === "tr" ? "true" : undefined}>TR</a>
        <a href={route(pageKey, "en")} hrefLang="en" lang="en" aria-current={lang === "en" ? "true" : undefined}>EN</a>
      </div>
      <a className="wa-pill" href={WA} target="_blank" rel="noopener" aria-label={`${t("WhatsApp ile yazın", "Message us on WhatsApp")}: ${PHONE}`}>
        <span className="wa-ico"><Image src="/img/sosyal-whatsapp.png" width={26} height={26} alt="" /></span>
        <span className="wa-num">{PHONE}</span>
      </a>
      <Link className="btn btn-primary btn-sm header-cta" href={route("contact", lang)}>{t("Randevu al", "Book now")}</Link>
    </>
  );

  return (
    <header className="site-header">
      <div className="wrap header-in">
        <Link className="brand" href={route("home", lang)} aria-label={t("Dent32 anasayfa", "Dent32 home")}>
          <Image src="/logo.svg" width={104} height={49} alt="Dent32" preload />
        </Link>
        <HeaderControls nav={nav} actions={actions} menuLabel={t("Ana menü", "Main menu")}
          openLabel={t("Menüyü aç", "Open menu")} closeLabel={t("Menüyü kapat", "Close menu")} />
      </div>
    </header>
  );
}

function Footer({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="f-brand">
          <Image className="f-logo" src="/logo.svg" width={116} height={55} alt="Dent32" />
          <p>{t("Beylikdüzü'nde, haftanın yedi günü açık diş kliniği. Her tedaviyi açıkça anlatılan bir planla yürütüyoruz.",
            "A dental clinic in Beylikdüzü, Istanbul, open seven days a week. Every treatment follows a clearly explained plan.")}</p>
          <ul className="social" aria-label={t("Sosyal medya", "Social media")}>
            {SOCIAL.map((s) => (
              <li key={s.key}>
                <a href={s.url} target="_blank" rel="noopener" aria-label={`Dent32 ${s.name}`}>
                  <Image src={`/img/${s.icon}`} width={28} height={28} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{t("Tedaviler", "Treatments")}</h2>
          <ul>
            {TREATMENTS.map((tr) => (
              <li key={tr.id}><Link href={route("treat", lang, tr.id)}>{tr.title[lang]}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2>{t("Klinik", "Clinic")}</h2>
          <ul>
            <li><Link href={route("about", lang)}>{t("Hakkımızda", "About us")}</Link></li>
            <li><Link href={route("about", lang, "kadro")}>{t("Hekim kadrosu", "Our dentists")}</Link></li>
            <li><Link href={route("gallery", lang)}>{t("Galeri", "Gallery")}</Link></li>
            <li><Link href={route("blog", lang)}>Blog</Link></li>
            <li><Link href={route("contact", lang)}>{t("İletişim", "Contact")}</Link></li>
          </ul>
        </div>
        <div>
          <h2>{t("İletişim", "Contact")}</h2>
          <ul>
            <li><address style={{ fontStyle: "normal" }}>{ADDRESS}</address></li>
            <li><a href={`tel:${PHONE_E164}`}>{PHONE}</a></li>
            <li><a href={WA} target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <div className="footer-bottom__start">
          <p>© 2026 Dent32. {t("Tüm hakları saklıdır.", "All rights reserved.")}</p>
          <p className="credit">
            <span>{t("Tasarım ve geliştirme", "Design & development")}</span>
            <a className="credit__link" href="https://www.instagram.com/lotscreativeworks/" target="_blank" rel="noopener" aria-label={t("Lots Creative Works Instagram hesabı", "Lots Creative Works on Instagram")}>
              <Image className="credit__logo" src="/img/lots-logo.png" width={48} height={24} alt="" />
            </a>
            <span className="credit__tag">Digital marketing partner for clinics</span>
          </p>
        </div>
        <p>{t("Bu sitedeki bilgiler tanı ve tedavi yerine geçmez.", "The information on this site does not replace diagnosis or treatment.")}</p>
      </div>
    </footer>
  );
}

/** Her sayfanın iskeleti: içeriğe geç bağlantısı, başlık, ana içerik, altlık, yüzen WhatsApp */
export function Shell({ lang, pageKey, children }: { lang: Lang; pageKey: PageKey; children: ReactNode }) {
  const t = translator(lang);
  return (
    <>
      <a className="skip" href="#main">{t("İçeriğe geç", "Skip to content")}</a>
      <Header lang={lang} pageKey={pageKey} />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer lang={lang} />
      <a className="wa-float" href={WA} target="_blank" rel="noopener" aria-label={t("WhatsApp ile yazın", "Message us on WhatsApp")}>
        <span className="wa-float__icon" aria-hidden="true"><WaGlyph /></span>
        <span className="wa-float__text" aria-hidden="true">
          <small>{t("Sorunuz mu var?", "Have a question?")}</small>
          <b>{t("WhatsApp'tan yazın", "Message on WhatsApp")}</b>
        </span>
      </a>
    </>
  );
}
