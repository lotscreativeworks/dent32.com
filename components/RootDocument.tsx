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
};

export const rootViewport: Viewport = { themeColor: "#0A1C2E" };

/** İki root layout'un (TR / EN) ortak <html> iskeleti */
export function RootDocument({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    // "js" sınıfı aşağıdaki betikle hidrasyondan önce eklenir; JS yoksa içerik görünür kalır
    // data-scroll-behavior: Next 16 sayfa geçişinde smooth scroll'u geçici kapatır (yoksa yeni sayfa yanlış konumda açılır)
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: 'document.documentElement.classList.add("js")' }} />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
