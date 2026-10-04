# Dent32 — Next.js

Next.js 16 (App Router) · TypeScript (strict) · Tailwind CSS 4 · statik çıktı (`output: "export"`).

## Komutlar

    npm install
    npm run dev     # http://localhost:3000
    npm run build   # out/ klasörü: yayınlanacak statik site
    npm run lint

## Yayın (Netlify)

- **Elle:** `npm run build`, ardından `out/` klasörünü app.netlify.com → *Deploy manually* alanına sürükleyin.
- **Git ile:** depoyu bağlayın; `netlify.toml` derleme ayarlarını içerir (`npm run build`, yayın klasörü `out`).

## Yapı

| Klasör | İçerik |
|---|---|
| `app/(tr)/…` | Türkçe rotalar (`/`, `/tedaviler/`, `/blog/[slug]/` …), `<html lang="tr">` |
| `app/(en)/en/…` | İngilizce rotalar (`/en/`, `/en/treatments/` …), `<html lang="en">` |
| `views/` | Sayfa bileşenleri; iki dil aynı bileşeni `lang` ile kullanır |
| `components/` | Başlık/altlık (`Shell`), kartlar (`blocks`), `client/` altında etkileşimli parçalar |
| `lib/site.ts` | Klinik bilgileri, rota haritası, tarih yardımcıları, `CLINIC_HOURS` |
| `lib/seo.ts` | Sayfa metadata'sı: canonical, hreflang (+x-default), Open Graph, Twitter |
| `content/*.json` | Tedaviler, yorumlar, kadro, klinik fotoğrafları ve 16 blog yazısı |
| `app/globals.css` | Tailwind + marka tokenları (`@theme`) + tasarım sistemi (`@layer components`) |
| `public/img/` | WebP görseller ve SVG ikonlar |

İçerik değişikliği için `content/*.json` dosyalarını düzenleyin. Yeni blog yazısı eklerken
`blog.tr.json` ve `blog.en.json` dosyalarına aynı `key` ile birer kayıt ekleyin.
