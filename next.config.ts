import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Statik çıktı: `npm run build` → out/ klasörü (Netlify'a sürükle-bırak)
  output: "export",
  // /tedaviler → /tedaviler/index.html: her statik sunucuda çalışır
  trailingSlash: true,
  // Görseller önceden WebP'ye çevrildi; statik çıktıda sunucu tarafı optimizasyon yok
  images: { unoptimized: true },
};

export default nextConfig;
