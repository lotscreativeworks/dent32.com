"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Img";

type Props = {
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
  label: string;
  tagBefore: string;
  tagAfter: string;
};

/** Öncesi/sonrası karşılaştırma: sürükleme, tıklama ve klavye (role="slider") */
export function BeforeAfter({ before, after, altBefore, altAfter, label, tagBefore, tagAfter }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [active, setActive] = useState(false);

  const set = (v: number) => setPos(Math.min(100, Math.max(0, v)));
  const fromX = (x: number) => {
    const r = box.current!.getBoundingClientRect();
    set(((x - r.left) / r.width) * 100);
  };

  /**
   * Dokunmatik: yatay hareket karşılaştırmayı kaydırır, dikey hareket sayfayı kaydırır.
   * Kart yatay kaydırmalı bir şeridin (anasayfa) içindeyken, şerit parmağı kapmasın diye
   * yatay hareket preventDefault ile burada tutulur (iOS Safari touch-action'a tam uymaz).
   */
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    let sx = 0, sy = 0, mode: "x" | "y" | null = null;
    const at = (x: number) => {
      const r = el.getBoundingClientRect();
      setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
    };
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; mode = null; };
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if (!mode && Math.max(Math.abs(dx), Math.abs(dy)) > 6) {
        mode = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (mode === "x") setActive(true);
      }
      if (mode === "x") { e.preventDefault(); e.stopPropagation(); at(t.clientX); }
    };
    const onEnd = (e: TouchEvent) => {
      if (!mode) at(e.changedTouches[0].clientX); // kısa dokunuş: çizgiyi oraya taşı
      mode = null; setActive(false);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, []);

  return (
    <div ref={box} className={`ba ${active ? "is-active" : ""}`} style={{ ["--pos" as string]: `${pos}%` }}
      onPointerDown={(e) => {
        // Dokunmatik yukarıdaki touch olaylarıyla yönetilir (dikey kaydırmada çizgi zıplamasın)
        if (e.pointerType === "touch" || (e.pointerType === "mouse" && e.button !== 0)) return;
        setActive(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        fromX(e.clientX);
        e.stopPropagation();
      }}
      onPointerMove={(e) => active && fromX(e.clientX)}
      onPointerUp={() => setActive(false)}
      onPointerCancel={() => setActive(false)}>
      <Img name={after} w={1000} h={750} alt={altAfter} />
      <Img name={before} w={1000} h={750} alt={altBefore} className="ba__before" />
      <span className="ba__tag ba__tag--l" aria-hidden="true">{tagBefore}</span>
      <span className="ba__tag ba__tag--r" aria-hidden="true">{tagAfter}</span>
      <div className="ba__handle" role="slider" tabIndex={0} aria-label={label}
        aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pos)} aria-valuetext={`${Math.round(pos)}%`}
        onKeyDown={(e) => {
          const s = e.shiftKey ? 10 : 5;
          const map: Record<string, number> = { ArrowLeft: pos - s, ArrowDown: pos - s, ArrowRight: pos + s, ArrowUp: pos + s, Home: 0, End: 100 };
          if (e.key in map) { e.preventDefault(); set(map[e.key]); }
        }}>
        <span className="ba__knob"><Icon name="lr" /></span>
      </div>
    </div>
  );
}
