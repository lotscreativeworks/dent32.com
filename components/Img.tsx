import Image from "next/image";

type Props = {
  name: string;
  w: number;
  h: number;
  alt: string;
  className?: string;
  /** Ekranın üstündeki ana görsel: önceden yüklenir, lazy değil */
  preload?: boolean;
  sizes?: string;
};

/** public/img altındaki WebP görselleri: width/height yazılı, varsayılan lazy */
export function Img({ name, w, h, alt, className, preload, sizes }: Props) {
  return (
    <Image src={`/img/${name}.webp`} width={w} height={h} alt={alt} className={className}
      preload={preload} loading={preload ? "eager" : "lazy"} sizes={sizes} />
  );
}
