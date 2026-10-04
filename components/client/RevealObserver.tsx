"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * .rv ve .ways öğeleri ekrana girince "in" sınıfı alır (CSS `translate` ile belirir;
 * hover'daki `transform` ile çakışmaz). Her sayfa geçişinde yeni öğeleri tarar.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv:not(.in), .ways:not(.in)"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
