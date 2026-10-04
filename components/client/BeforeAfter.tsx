"use client";

import { useRef, useState } from "react";
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

  return (
    <div ref={box} className={`ba ${active ? "is-active" : ""}`} style={{ ["--pos" as string]: `${pos}%` }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
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
