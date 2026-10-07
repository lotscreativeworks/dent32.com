/**
 * next/image yükleyicisi (statik çıktı): public/img/ad.webp için scripts/img-variants.py'nin
 * ürettiği ad-480.webp / ad-800.webp sürümlerini srcset'e koyar; telefonlar küçük dosyayı indirir.
 * `unoptimized` verilen görseller (logo, simgeler) buraya hiç uğramaz.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const m = src.match(/^\/img\/(?!rozet-)(.+)\.webp$/);
  if (!m) return src;
  if (width <= 480) return `/img/${m[1]}-480.webp`;
  if (width <= 800) return `/img/${m[1]}-800.webp`;
  return src;
}
