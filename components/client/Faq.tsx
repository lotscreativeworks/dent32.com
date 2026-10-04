"use client";

import { type MouseEvent, useRef } from "react";

type Item = { q: string; a: string };

const EASE = "cubic-bezier(.16,1,.3,1)";

function FaqItem({ q, a }: Item) {
  const details = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);

  // <details> yerel davranışını koruyup açılış/kapanışı yumuşatır
  const onClick = (e: MouseEvent) => {
    const d = details.current, b = body.current;
    if (!d || !b || !b.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    anim.current?.cancel();
    if (!d.open) {
      d.open = true;
      const h = b.offsetHeight;
      anim.current = b.animate({ height: ["0px", `${h}px`], opacity: [0, 1] }, { duration: 460, easing: EASE });
    } else {
      anim.current = b.animate({ height: [`${b.offsetHeight}px`, "0px"], opacity: [1, 0] }, { duration: 360, easing: EASE });
      anim.current.onfinish = () => { d.open = false; };
    }
  };

  return (
    <details ref={details}>
      <summary onClick={onClick}>{q}</summary>
      <div className="faq__body" ref={body}>
        <div><p dangerouslySetInnerHTML={{ __html: a }} /></div>
      </div>
    </details>
  );
}

export function Faq({ items }: { items: Item[] }) {
  return <div className="faq">{items.map((it) => <FaqItem key={it.q} {...it} />)}</div>;
}
