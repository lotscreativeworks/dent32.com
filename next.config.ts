import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statik çıktı: `npm run build` → out/ klasörü (Netlify'a sürükle-bırak)
  output: "export",
  // /tedaviler → /tedaviler/index.html: her statik sunucuda çalışır
  trailingSlash: true,
  // Görseller önceden WebP'ye çevrildi; statik çıktıda sunucu tarafı optimizasyon yok.
  // Yükleyici, scripts/img-variants.py'nin ürettiği 480/800 px sürümleri srcset'e koyar.
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    deviceSizes: [480, 800, 1600],
    imageSizes: [256],
  },
};

export default nextConfig;
