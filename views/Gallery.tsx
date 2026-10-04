import { GalleryGrid } from "@/components/client/GalleryGrid";
import { BaCard, NextStep, PageHead } from "@/components/blocks";
import { Shell } from "@/components/Shell";
import { type Lang, translator } from "@/lib/site";

const CASES: [string, number][] = ["implant", "zirkonyum"].flatMap((k) => [1, 2, 3].map((n): [string, number] => [k, n]));

export function Gallery({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const status = (n: number) => t(`${n} vaka gösteriliyor`, `Showing ${n} cases`);
  return (
    <Shell lang={lang} pageKey="gallery">
      <PageHead lang={lang} title={t("Öncesi ve sonrası", "Before and after")} crumb={t("Galeri", "Gallery")}
        lead={t("Kliniğimizde tedavi edilen hastalarımızdan rötuşsuz fotoğraflar. Tutamağı sürükleyerek ya da ok tuşlarıyla karşılaştırabilirsiniz. Her ağız farklıdır; sonuçlar kişiden kişiye değişir.",
          "Unretouched photos of patients treated at our clinic. Drag the handle, or use the arrow keys, to compare. Every mouth is different; results vary from person to person.")} />
      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <GalleryGrid groupLabel={t("Tedaviye göre filtrele", "Filter by treatment")}
            filters={[
              { key: "all", label: t("Tümü", "All"), status: status(6) },
              { key: "implant", label: t("İmplant", "Implant"), status: status(3) },
              { key: "zirkonyum", label: t("Zirkonyum", "Zirconia"), status: status(3) },
            ]}
            cards={CASES.map(([k, n], i) => ({ cat: k, node: <BaCard lang={lang} kind={k} n={n} d={i % 3} /> }))} />
        </div>
      </section>
      <NextStep lang={lang} />
    </Shell>
  );
}
