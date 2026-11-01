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
  // Lighthouse "geçerli kaynak eşlemeleri": tarayıcı JS'i için .map dosyaları da yayınlanır
  productionBrowserSourceMaps: true,
  // experimental.inlineCss denendi: CSS her HTML'e iki kez gömülüyor (sıkıştırılmış anasayfa 23 → 47 KB),
  // sayfalar arası önbellek de kayboluyor; ~50 ms'lik render-blocking kazancına değmiyor.
};

export default nextConfig;
