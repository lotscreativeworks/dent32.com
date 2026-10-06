"use client";

import { useEffect, useRef } from "react";

/**
 * Hero arka plan videosu: sessiz, döngüde, dekoratif (aria-hidden).
 * - iOS otomatik oynatma için `muted` DOM özelliği burada kesinleştirilir (React bunu HTML'e her zaman yazmaz).
 * - Hareket azaltma tercihinde ya da veri tasarrufu modunda video oynatılmaz, yalnızca kapak karesi görünür.
 * - Telefonlarda daha küçük (540p) dosya yüklenir.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const apply = () => {
      if (reduce.matches || saveData) { v.pause(); return; }
      v.muted = true;
      v.play().catch(() => { /* tarayıcı engellerse kapak karesi kalır */ });
    };
    apply();
    reduce.addEventListener("change", apply);
    return () => reduce.removeEventListener("change", apply);
  }, []);

  return (
    <div className="hero__video" aria-hidden="true">
      <video ref={ref} muted loop playsInline preload="metadata" poster="/video/hero-poster.webp" disablePictureInPicture>
        <source src="/video/hero-540.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/video/hero-720.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
