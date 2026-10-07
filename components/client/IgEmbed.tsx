"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Instagram gömmesi yalnızca kart ekrana yaklaşınca yüklenir. Her gömme ağır bir betik ve
 * birkaç yüz KB getirdiği için sayfa açılışını (özellikle telefonda) kilitlemesin diye ertelenir.
 */
export function IgEmbed({ code, title }: { code: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setShow(true); io.disconnect(); }
    }, { rootMargin: "200px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="ig-embed">
      {show && (
        <iframe src={`https://www.instagram.com/reel/${code}/embed/`} scrolling="no" title={title}
          allow="encrypted-media; picture-in-picture; clipboard-write" />
      )}
    </div>
  );
}
