import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { RevealObserver } from "@/components/client/RevealObserver";
import { type Lang, SITE } from "@/lib/site";
import "@/app/globals.css";

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE),
  // Google arama sonucundaki simge için 48'in katı boyutta PNG/ICO da sunulur
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  // Pinterest işletme hesabının ("dent32 | Beylikdüzü Diş Kliniği") site sahiplenme etiketi; silinirse sahiplik düşer
  other: { "p:domain_verify": "c31f2fbe10616d1987eb6f24d37d9027" },
};

export const rootViewport: Viewport = { themeColor: "#0A1C2E" };

/**
 * Hidrasyondan önce çalışan küçük betik:
 * - "js" sınıfı: giriş animasyonları yalnızca JS varken gizli başlar.
 *   · Botlar, yapay zekâ ajanları ve otomatik/headless tarayıcılar (navigator.webdriver) bu sınıfı
 *     almaz: sayfayı kaydırmadan tam sayfa görüntü aldıklarında bölümler opacity 0 kalıp sayfa
 *     "bembeyaz" görünüyordu. Onlara içerik animasyonsuz, baştan görünür sunulur.
 *   · Güvenlik ağı: JS paketleri 3 sn içinde yüklenip RevealObserver çalışmazsa ("rv-ok" yoksa)
 *     sınıf geri alınır; ağ hatasında ya da engellenen betikte içerik gizli kalmaz.
 * - Yenilemede/ilk açılışta sayfa her zaman en üstten başlasın: tarayıcı eski kaydırma konumunu
 *   geri yüklemesin (yoksa altta yenilenen sayfa yine altta açılır). Sayfa içi gezinmede geri/ileri
 *   tuşu ve #bağlantılar tarayıcının normal davranışıyla çalışır.
 */
const BOOT = `(function(){var de=document.documentElement,nv=navigator;
if(nv.webdriver||/bot|crawl|spider|slurp|headless|lighthouse|preview|inspect|gpt|claude|perplexity|facebookexternalhit/i.test(nv.userAgent))return;
de.classList.add("js");setTimeout(function(){if(!de.classList.contains("rv-ok"))de.classList.remove("js")},3000)})();
try{if("scrollRestoration" in history){var h=history,n=performance.getEntriesByType("navigation")[0];
if(n&&n.type!=="back_forward"&&!location.hash){h.scrollRestoration="manual";scrollTo(0,0);
addEventListener("load",function(){setTimeout(function(){h.scrollRestoration="auto"},0)},{once:true})}
addEventListener("pagehide",function(){if(!location.hash)h.scrollRestoration="manual"})}}catch(e){}`;

/** İki root layout'un (TR / EN) ortak <html> iskeleti */
export function RootDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    // "js" sınıfı aşağıdaki betikle hidrasyondan önce eklenir; JS yoksa içerik görünür kalır
    // data-scroll-behavior: Next 16 sayfa geçişinde smooth scroll'u geçici kapatır (yoksa yeni sayfa yanlış konumda açılır)
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
