"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { type Lang, translator } from "@/lib/core";

/**
 * Çerez onayı + Google Tag Manager (Google Ads dönüşüm ölçümü + Google Analytics 4).
 *
 * KVKK Çerez Rehberi gereği reklam/ölçüm çerezleri açık rızaya bağlıdır. Bu yüzden:
 * - GTM kapsayıcısı yalnızca ziyaretçi "Kabul et" dedikten sonra yüklenir; onay yokken Google'a
 *   hiçbir istek gitmez (Consent Mode "basic" kurulumu). Sayfa hızı da bu sayede korunur.
 * - Google Consent Mode v2 sinyalleri yine gönderilir: önce "denied" varsayılanı, onayla "granted".
 * - Seçim yalnızca bu tarayıcıda (localStorage) tutulur; alt bilgideki "Çerez tercihleri"
 *   düğmesiyle her an değiştirilebilir. Geri çekilirse Google çerezleri silinir ve sayfa GTM'siz yenilenir.
 * - Botlarda/otomatik tarayıcılarda çubuk gösterilmez, GTM yüklenmez.
 */
export const GTM_ID = "GTM-PFZ4NVLD";
const KEY = "dent32-consent";
/** Alt bilgideki düğme bu olayla çubuğu yeniden açar */
export const CONSENT_OPEN_EVENT = "dent32:consent-open";

type Choice = "granted" | "denied";
type DL = unknown[];
declare global { interface Window { dataLayer?: DL } }

const read = (): Choice | null => {
  try { const v = localStorage.getItem(KEY); return v === "granted" || v === "denied" ? v : null; } catch { return null; }
};
const save = (v: Choice) => { try { localStorage.setItem(KEY, v); } catch { /* gizli pencere vb. */ } };

// gtag() dataLayer'a "arguments" nesnesi itmeli; GTM dizi değil bu biçimi bekler
const gtag: (...args: unknown[]) => void = function () {
  // eslint-disable-next-line prefer-rest-params
  (window.dataLayer = window.dataLayer || []).push(arguments);
};
const consentState = (v: Choice) => ({ ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });

function loadGtm() {
  if (document.getElementById("gtm-js")) return;
  gtag("consent", "default", { ...consentState("denied"), wait_for_update: 500 });
  gtag("consent", "update", consentState("granted"));
  window.dataLayer!.push({ "gtm.start": Date.now(), event: "gtm.js" });
  const s = document.createElement("script");
  s.id = "gtm-js";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(s);
}

/** Onay geri çekildiğinde Google reklam/ölçüm çerezlerini (ör. _gcl_au, _ga) siler */
function clearGoogleCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!/^(_gcl|_ga|_gid|_gac|_gat|FPGCL|FPID)/.test(name)) continue;
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
  }
}

const isBot = () => {
  const nv = navigator;
  return nv.webdriver || /bot|crawl|spider|slurp|headless|lighthouse|preview|inspect|gpt|claude|perplexity|facebookexternalhit/i.test(nv.userAgent);
};

export function Consent({ lang, policyHref }: { lang: Lang; policyHref: string }) {
  const t = translator(lang);
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    const choice = read();
    let raf = 0;
    if (choice === "granted") loadGtm();
    // Onay çubuğu ilk boyamadan sonra açılır (sayfa içeriğini kaydırmaz, sabit konumlu)
    else if (choice === null && !isBot()) raf = requestAnimationFrame(() => setOpen(true));
    return () => { cancelAnimationFrame(raf); window.removeEventListener(CONSENT_OPEN_EVENT, onOpen); };
  }, []);

  // Çubuk açıkken yüksekliğini CSS'e bildir: yüzen WhatsApp düğmesi çubuğun üstüne çıksın
  useEffect(() => {
    const root = document.documentElement;
    if (!open || !box.current) { root.style.removeProperty("--cc-h"); return; }
    const el = box.current;
    const set = () => root.style.setProperty("--cc-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => { ro.disconnect(); root.style.removeProperty("--cc-h"); };
  }, [open]);

  const choose = useCallback((v: Choice) => {
    const prev = read();
    save(v);
    setOpen(false);
    if (v === "granted") loadGtm();
    else if (prev === "granted") {
      // Onay geri çekildi: sinyali gönder, çerezleri sil, sayfayı GTM'siz yeniden yükle
      if (window.dataLayer) gtag("consent", "update", consentState("denied"));
      clearGoogleCookies();
      location.reload();
    }
  }, []);

  if (!open) return null;
  return (
    <div ref={box} className="cc" role="region" aria-label={t("Çerez tercihi", "Cookie preferences")}>
      <p className="cc__text">
        {t("Reklamlarımızın işe yarayıp yaramadığını ve sitemizin nasıl kullanıldığını ölçmek için, izin verirseniz Google reklam ve analiz çerezleri kullanıyoruz. Zorunlu olmayan hiçbir çerez onayınız olmadan çalışmaz. ",
          "With your permission, we use Google advertising and analytics cookies to measure whether our ads work and how our site is used. No non-essential cookies run without your consent. ")}
        <Link href={policyHref}>{t("Çerez politikası", "Cookie policy")}</Link>
      </p>
      <div className="cc__btns">
        <button type="button" className="btn btn-sm cc__btn" onClick={() => choose("denied")}>{t("Reddet", "Reject")}</button>
        <button type="button" className="btn btn-sm cc__btn" onClick={() => choose("granted")}>{t("Kabul et", "Accept")}</button>
      </div>
    </div>
  );
}

/** Alt bilgideki "Çerez tercihleri" düğmesi */
export function ConsentButton({ label }: { label: string }) {
  return (
    <button type="button" className="cc-link" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>{label}</button>
  );
}
