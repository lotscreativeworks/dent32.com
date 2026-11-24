import { GalleryGrid } from "@/components/client/GalleryGrid";
import { BaCard, NextStep, PageHead, SIZES_GRID3 } from "@/components/blocks";
import { Shell } from "@/components/Shell";
import { type Lang, translator, VISUAL_WARNING } from "@/lib/site";

// Her tedavideki vaka sayısı: yeni vaka eklenince public/img/vaka-<tedavi><n>-oncesi/sonrasi.webp ekleyip sayıyı artırın.
const COUNTS: [string, number][] = [["implant", 3], ["zirkonyum", 5], ["lamine", 1]];
const CASES: [string, number][] = COUNTS.flatMap(([k, c]) => Array.from({ length: c }, (_, i): [string, number] => [k, i + 1]));
const count = (k: string) => COUNTS.find(([c]) => c === k)?.[1] ?? 0;

export function Gallery({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const status = (n: number) => t(`${n} vaka gösteriliyor`, `Showing ${n} cases`);
  return (
    <Shell lang={lang} pageKey="gallery">
      <PageHead lang={lang} pageKey="gallery" title={t("Öncesi ve sonrası", "Before and after")} crumb={t("Galeri", "Gallery")}
        lead={t("Kliniğimizde tedavi edilen hastaların rötuşsuz fotoğrafları. Tutamağı sürükleyerek ya da ok tuşlarıyla karşılaştırabilirsiniz.",
          "Unretouched photos of patients treated at our clinic. Drag the handle, or use the arrow keys, to compare.")} />
      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <GalleryGrid groupLabel={t("Tedaviye göre filtrele", "Filter by treatment")}
            filters={[
              { key: "all", label: t("Tümü", "All"), status: status(CASES.length) },
              { key: "implant", label: t("İmplant", "Implant"), status: status(count("implant")) },
              { key: "zirkonyum", label: t("Zirkonyum", "Zirconia"), status: status(count("zirkonyum")) },
              { key: "lamine", label: t("Lamine", "Veneers"), status: status(count("lamine")) },
            ]}
            cards={CASES.map(([k, n], i) => ({ cat: k, node: <BaCard lang={lang} kind={k} n={n} d={i % 3} sizes={SIZES_GRID3} /> }))} />
          <p className="legal-note">{VISUAL_WARNING[lang]}</p>
        </div>
      </section>
      <NextStep lang={lang} />
    </Shell>
  );
}
