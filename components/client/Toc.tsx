"use client";

import { useEffect, useState } from "react";

type Props = { items: { id: string; h: string }[]; label: string; className: string };

/** İçindekiler: kaydırdıkça okunan bölüm koyulaşır ve soldaki hat maviye döner */
export function Toc({ items, label, className }: Props) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const spy = () => {
      const line = window.innerHeight * 0.3;
      let current: string | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < line) current = id;
      }
      setActive(current);
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    return () => window.removeEventListener("scroll", spy);
  }, [items]);

  return (
    <nav className={`toc ${className}`} aria-label={label}>
      <p className="toc__label">{label}</p>
      <ol>
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className={active === it.id ? "is-active" : undefined}
              aria-current={active === it.id ? "location" : undefined}>{it.h}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
