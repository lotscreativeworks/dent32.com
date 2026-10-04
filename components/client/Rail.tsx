"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";

type Props = {
  children: ReactNode;
  label: string;
  className?: string;
  /** false: fareyle sürükleme kapalı (ör. iframe içeren Instagram şeridi) */
  drag?: boolean;
  prevLabel: string;
  nextLabel: string;
};

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** --hx-ease'e (cubic-bezier(.16,1,.3,1)) yakın: hızlı başlar, uzun ve yumuşak yavaşlar */
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Yatay kaydırmalı kart dizisi: ilerleme çubuğu, oklar, fareyle sürükle + en yakın karta otur */
export function Rail({ children, label, className = "", drag = true, prevLabel, nextLabel }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const anim = useRef<number | null>(null);
  const target = useRef(0);
  const moved = useRef(0);
  const [state, setState] = useState({ ratio: 1, progress: 0, atStart: true, atEnd: false });
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      ratio: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
      progress: max > 0 ? el.scrollLeft / max : 0,
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= max - 2,
    });
  }, []);

  const stopGlide = useCallback(() => {
    if (anim.current !== null) cancelAnimationFrame(anim.current);
    anim.current = null;
    root.current?.classList.remove("is-gliding");
  }, []);

  /**
   * Yumuşak kayma: tarayıcının smooth scroll'u kısa ve serttir; burada mesafeye göre
   * uzayan, yavaşlayarak duran bir animasyon kullanılır. Süresince scroll-snap kapalıdır.
   */
  const glide = useCallback((dest: number) => {
    const el = track.current;
    if (!el) return;
    stopGlide();
    const max = el.scrollWidth - el.clientWidth;
    const to = Math.max(0, Math.min(max, dest));
    target.current = to;
    const from = el.scrollLeft;
    const dist = to - from;
    if (Math.abs(dist) < 1) return;
    if (reduceMotion()) { el.scrollLeft = to; return; }

    const duration = Math.min(1100, 650 + Math.abs(dist) * 0.25);
    const start = performance.now();
    root.current?.classList.add("is-gliding");
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      el.scrollLeft = from + dist * easeOutExpo(t);
      if (t < 1) anim.current = requestAnimationFrame(frame);
      else { anim.current = null; root.current?.classList.remove("is-gliding"); update(); }
    };
    anim.current = requestAnimationFrame(frame);
  }, [stopGlide, update]);

  /** Kartların başlangıç konumları (kaydırma koordinatında) */
  const snapPoints = useCallback(() => {
    const el = track.current!;
    const base = el.getBoundingClientRect().left - el.scrollLeft;
    return Array.from(el.children).map((it) => it.getBoundingClientRect().left - base);
  }, []);

  const nearest = useCallback((x: number) => {
    return snapPoints().reduce((best, p) => (Math.abs(p - x) < Math.abs(best - x) ? p : best), 0);
  }, [snapPoints]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const first = el?.firstElementChild;
    if (!el || !first) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const w = first.getBoundingClientRect().width + gap;
    const per = Math.max(1, Math.floor((el.clientWidth + gap) / w));
    // Animasyon sürerken art arda basılırsa yeni hedef, gidilmekte olan hedeften hesaplanır
    const from = anim.current !== null ? target.current : el.scrollLeft;
    glide(nearest(from + dir * w * per));
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("resize", update); stopGlide(); };
  }, [update, stopGlide]);

  // Kullanıcı tekerlek ya da dokunmayla kaydırırsa animasyonu bırak
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.addEventListener("wheel", stopGlide, { passive: true });
    el.addEventListener("touchstart", stopGlide, { passive: true });
    return () => { el.removeEventListener("wheel", stopGlide); el.removeEventListener("touchstart", stopGlide); };
  }, [stopGlide]);

  // Fareyle sürükleme (dokunmatikte yerel kaydırma kullanılır)
  useEffect(() => {
    const el = track.current;
    if (!drag || !el) return;
    let down = false, startX = 0, startLeft = 0, active = false;
    let lastX = 0, lastT = 0, velocity = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || (e.target as Element).closest(".ba")) return;
      stopGlide();
      down = true; active = false; moved.current = 0;
      startX = lastX = e.clientX; startLeft = el.scrollLeft; lastT = performance.now(); velocity = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!active && Math.abs(dx) < 5) return;
      if (!active) { active = true; setDragging(true); }
      const now = performance.now();
      velocity = (e.clientX - lastX) / Math.max(1, now - lastT); // px/ms
      lastX = e.clientX; lastT = now;
      moved.current = Math.abs(dx);
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      if (!active) return;
      setDragging(false);
      // Bırakınca savrulma payı eklenir, sonra en yakın karta yumuşakça oturur
      glide(nearest(el.scrollLeft - velocity * 220));
    };
    const swallowClick = (e: MouseEvent) => {
      if (moved.current > 5) { e.preventDefault(); e.stopPropagation(); moved.current = 0; }
    };
    const noNativeDrag = (e: DragEvent) => e.preventDefault();

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", swallowClick, true);
    el.addEventListener("dragstart", noNativeDrag);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", swallowClick, true);
      el.removeEventListener("dragstart", noNativeDrag);
    };
  }, [drag, glide, nearest, stopGlide]);

  const thumb = Math.max(state.ratio, 0.08);
  return (
    <div ref={root} className={`hx-rail ${className} ${dragging ? "is-dragging" : ""}`} data-drag={drag ? "true" : "false"}>
      <div ref={track} className="hx-rail__track" tabIndex={0} role="region" aria-label={label} onScroll={update}
        onKeyDown={(e) => {
          if (e.target !== e.currentTarget) return;
          if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
          if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
        }}>
        {children}
      </div>
      <div className="hx-rail__ctrl">
        <div className="hx-rail__bar" aria-hidden="true">
          <span style={{ width: `${thumb * 100}%`, transform: `translateX(${state.progress * (1 / thumb - 1) * 100}%)` }} />
        </div>
        <button className="hx-rail__btn" type="button" aria-label={prevLabel} disabled={state.atStart} onClick={() => step(-1)}>
          <Icon name="arrow-l" />
        </button>
        <button className="hx-rail__btn" type="button" aria-label={nextLabel} disabled={state.atEnd} onClick={() => step(1)}>
          <Icon name="arrow-r" />
        </button>
      </div>
    </div>
  );
}
