"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero arka plan videosu: sessiz, döngüde, dekoratif (aria-hidden).
 * - Önce hafif kapak görseli gelir; video sayfa yüklendikten sonra indirilir, açılışı yavaşlatmaz.
 * - Telefonlarda daha küçük (540p) dosya yüklenir.
 * - iOS düşük güç modu gibi otomatik oynatmanın engellendiği durumlarda ilk dokunuşta yeniden denenir.
 * - Hareket azaltma tercihinde, veri tasarrufu modunda ya da yavaş bağlantıda (3G ve altı) video oynatılmaz, kapak görseli kalır.
 * - Telefonda video sayfa yüklendikten 2,5 sn sonra iner: ilk ekrandaki görseller ve betikler bant genişliğini paylaşmasın (LCP).
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const saveData = conn?.saveData || ["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "");
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const gestures = ["touchend", "click", "keydown"] as const;
    let timer = 0;

    const tryPlay = () => {
      if (reduce.matches || saveData) return;
      if (!v.src) {
        v.src = mobile ? "/video/hero-540.mp4" : "/video/hero-720.mp4";
      }
      // iOS otomatik oynatma için `muted` DOM özelliği burada kesinleştirilir
      v.muted = true;
      v.play().catch(() => {
        // Tarayıcı engelledi: kullanıcının ilk dokunuşunda bir kez daha dene
        gestures.forEach((g) => window.addEventListener(g, onGesture, { once: true, passive: true }));
      });
    };
    const onGesture = () => {
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      tryPlay();
    };
    const onPlaying = () => setPlaying(true);
    const onMotionChange = () => {
      if (reduce.matches) { v.pause(); setPlaying(false); } else tryPlay();
    };

    // Kapak görseli ve sayfanın kendisi önce yüklensin, video ardından gelsin
    const start = () => { timer = window.setTimeout(tryPlay, mobile ? 2500 : 300); };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    v.addEventListener("playing", onPlaying);
    reduce.addEventListener("change", onMotionChange);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", start);
      gestures.forEach((g) => window.removeEventListener(g, onGesture));
      v.removeEventListener("playing", onPlaying);
      reduce.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div className={`hero__video${playing ? " is-playing" : ""}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element -- kapak: srcset elle verildi, ilk boyamada gelmeli */}
      <img src="/video/hero-poster.webp" srcSet="/video/hero-poster-640.webp 640w, /video/hero-poster-960.webp 960w, /video/hero-poster.webp 1280w"
        sizes="100vw" width={1280} height={720} alt="" fetchPriority="high" decoding="async" />
      <video ref={ref} muted loop playsInline preload="none" disablePictureInPicture />
    </div>
  );
}
