"use client";

import { type ReactNode, useEffect, useState } from "react";

type Props = { nav: ReactNode; actions: ReactNode; openLabel: string; closeLabel: string; menuLabel: string };

/** Başlığın etkileşimli kısmı: kaydırma gölgesi + mobil menü (Esc ile kapanır) */
export function HeaderControls({ nav, actions, openLabel, closeLabel, menuLabel }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1021px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => { document.removeEventListener("keydown", onKey); mq.removeEventListener("change", onMq); };
  }, [open]);

  useEffect(() => {
    document.querySelector(".site-header")?.classList.toggle("is-scrolled", scrolled);
  }, [scrolled]);

  return (
    <>
      <nav className={`nav ${open ? "is-open" : ""}`} id="nav" aria-label={menuLabel}
        onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}>
        {nav}
      </nav>
      <div className="header-actions">
        {actions}
        <button className="burger" type="button" aria-expanded={open} aria-controls="nav"
          aria-label={open ? closeLabel : openLabel} onClick={() => setOpen((o) => !o)}>
          <span />
        </button>
      </div>
    </>
  );
}
