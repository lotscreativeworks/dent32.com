"use client";

import { type ReactNode, useState } from "react";

type Card = { cat: string; node: ReactNode };
type Filter = { key: string; label: string; status: string };

/** Galeri filtresi: Tümü / İmplant / Zirkonyum */
export function GalleryGrid({ cards, filters, groupLabel }: { cards: Card[]; filters: Filter[]; groupLabel: string }) {
  const [active, setActive] = useState("all");
  const [round, setRound] = useState(0);
  const current = filters.find((f) => f.key === active)!;

  return (
    <>
      <div className="filters" role="group" aria-label={groupLabel}>
        {filters.map((f) => (
          <button key={f.key} className="filter" type="button" aria-pressed={f.key === active}
            onClick={() => { setActive(f.key); setRound((r) => r + 1); }}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">{round > 0 ? current.status : ""}</p>
      <div className="gallery">
        {cards.map((c, i) => {
          const show = active === "all" || c.cat === active;
          // Kartlar yeniden mount edilmez (belirme durumu korunur); iki keyframe arasında
          // geçiş yaparak giriş animasyonu her filtrede yeniden oynatılır.
          const anim = round > 0 && show ? (round % 2 ? "is-entering" : "is-entering-alt") : "";
          return <div key={i} hidden={!show} className={anim}>{c.node}</div>;
        })}
      </div>
    </>
  );
}
