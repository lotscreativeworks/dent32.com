import type { Metadata } from "next";
import Link from "next/link";
import { Faq } from "@/components/client/Faq";
import { Toc } from "@/components/client/Toc";
import { BlogCard, PageHead } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { breadcrumbLd, DENTIST_ID, jsonLd, pageMetadata, postExtraLd } from "@/lib/seo";
import {
  absUrl, ADDRESS, BLOG_CATS, BLOG_PER_PAGE, type BlogCat, blogListKey, blogPageCount, dateLong, type Lang, OFFICIAL_NAME, PHONE, PHONE_E164,
  type Post, POSTS, postsInCat, readMinutes, route, SITE, translator, treatmentForPost, WA,
} from "@/lib/site";

/** Sayfa bağlantıları listenin başına (kategori sekmelerine) iner */
const listAnchor = (lang: Lang) => (lang === "tr" ? "yazilar" : "articles");

/** Blog listesi sayfalarının başlık ve açıklaması: tüm yazılar / kategori, 1. sayfa / sonraki sayfalar */
export function blogListMetadata(lang: Lang, cat: BlogCat | null, page: number): Metadata {
  const t = translator(lang);
  const key = blogListKey(cat?.id ?? null, page);
  const image = cat ? postsInCat(lang, cat)[0].cover : "blog-gulus-tasarimi";
  const desc = cat ? cat.desc[lang] : t(
    "İmplant, kaplama, kanal tedavisi, diş eti, çocuk diş sağlığı ve estetik diş hekimliği üzerine Beylikdüzü'ndeki Dent32 hekimlerinden kısa rehberler.",
    "Short guides on implants, crowns, root canals, gum health, children's teeth and cosmetic dentistry from the Dent32 team in Beylikdüzü, Istanbul.");
  if (page === 1) {
    const title = cat ? `${cat.title[lang]} | Dent32 Blog`
      : t("Beylikdüzü Diş Sağlığı Blogu: Tedavi Rehberleri | Dent32", "Dental Health Blog: Implant, Crown and Treatment Guides | Dent32");
    return pageMetadata({ key, lang, title, description: desc, image });
  }
  // Sonraki sayfalar: başlık ve açıklama 1. sayfadan farklı olsun (Google'da yinelenen başlık olmasın)
  const name = cat ? cat.h1[lang] : t("Tüm yazılar", "All articles");
  const of = blogPageCount(lang, cat);
  return pageMetadata({
    key, lang, image,
    title: `${name} – ${t("Sayfa", "Page")} ${page} | Dent32 Blog`,
    description: `${t(`Sayfa ${page}/${of}.`, `Page ${page} of ${of}.`)} ${desc}`,
  });
}

/** Kategori sekmeleri: her biri ayrı bir sayfa (Google da tarar); etkin sekme vurgulanır */
function BlogTabs({ lang, active, page }: { lang: Lang; active: string | null; page: number }) {
  const t = translator(lang);
  const tabs = [
    { id: null, name: t("Tümü", "All"), n: POSTS[lang].length },
    ...BLOG_CATS.map((c) => ({ id: c.id, name: c.name[lang], n: postsInCat(lang, c).length })),
  ];
  return (
    <nav className="filters blog-tabs" aria-label={t("Blog kategorileri", "Blog categories")}>
      {tabs.map((tab) => (
        <Link key={tab.id ?? "all"} className="filter" href={route(blogListKey(tab.id, 1), lang)}
          aria-current={tab.id === active ? (page === 1 ? "page" : "true") : undefined}>
          {tab.name}<span className="filter__n">{tab.n}</span>
        </Link>
      ))}
    </nav>
  );
}

/** Numaralı sayfa bağlantıları; en fazla ~8 sayfa olduğu için hepsi gösterilir */
function Pager({ lang, catId, page, pages }: { lang: Lang; catId: string | null; page: number; pages: number }) {
  const t = translator(lang);
  const href = (n: number) => route(blogListKey(catId, n), lang, listAnchor(lang));
  return (
    <nav className="pager" aria-label={t("Sayfalar", "Pages")}>
      {page > 1 && (
        <Link className="pager__step" href={href(page - 1)} rel="prev">
          <Icon name="arrow-l" /><span className="pager__label">{t("Önceki", "Previous")}</span>
        </Link>
      )}
      <ol>
        {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
          <li key={n}>
            {n === page
              ? <span className="pager__num" aria-current="page">{n}</span>
              : <Link className="pager__num" href={href(n)} aria-label={t(`Sayfa ${n}`, `Page ${n}`)}>{n}</Link>}
          </li>
        ))}
      </ol>
      {page < pages && (
        <Link className="pager__step" href={href(page + 1)} rel="next">
          <span className="pager__label">{t("Sonraki", "Next")}</span><Icon name="arrow-r" />
        </Link>
      )}
    </nav>
  );
}

export function BlogList({ lang, cat = null, page = 1 }: { lang: Lang; cat?: BlogCat | null; page?: number }) {
  const t = translator(lang);
  const key = blogListKey(cat?.id ?? null, page);
  const pages = blogPageCount(lang, cat);
  // En yeni yazı başta
  const items = postsInCat(lang, cat).slice((page - 1) * BLOG_PER_PAGE, page * BLOG_PER_PAGE);
  const pageLabel = `${t("Sayfa", "Page")} ${page}`;
  const crumb = cat ? (page > 1 ? `${cat.name[lang]} · ${pageLabel}` : cat.name[lang]) : page > 1 ? pageLabel : "Blog";
  return (
    <Shell lang={lang} pageKey={key}>
      <PageHead lang={lang} pageKey={key} crumb={crumb} eyebrow="Blog"
        parent={key === "blog" ? undefined : { label: "Blog", key: "blog" }}
        title={cat ? cat.h1[lang] : t("Kısa ve net rehberler", "Short, clear guides")}
        lead={cat ? cat.lead[lang] : t("Tedaviler hakkında merak edilenleri; süreleri, riskleri ve maliyeti belirleyen etkenlerle birlikte sade bir dille anlatıyoruz.",
          "Plain-language answers to common questions about treatment, including timelines, risks and what affects the cost.")} />
      <section className="section" id={listAnchor(lang)} style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          <BlogTabs lang={lang} active={cat?.id ?? null} page={page} />
          <div className="blog-grid">
            {items.map((p, i) => <BlogCard key={p.key} lang={lang} post={p} d={i % 3} as="h2" />)}
          </div>
          {pages > 1 && <Pager lang={lang} catId={cat?.id ?? null} page={page} pages={pages} />}
        </div>
      </section>
    </Shell>
  );
}

/** Statik çıktı için sayfa numaraları (2. sayfadan itibaren; 1. sayfa kendi adresinde) */
export const blogPageParams = (lang: Lang, cat: BlogCat | null) =>
  Array.from({ length: blogPageCount(lang, cat) - 1 }, (_, i) => ({ page: String(i + 2) }));

export function BlogPost({ lang, post }: { lang: Lang; post: Post }) {
  const t = translator(lang);
  const author = t("Dent32 hekim ekibi", "Dent32 dental team");
  const mins = readMinutes(post);
  const treat = treatmentForPost(post.key);
  const toc = post.sections.map(({ id, h }) => ({ id, h }));
  const related = POSTS[lang]
    .filter((p) => p.key !== post.key)
    .sort((a, b) => Number(a.cat !== post.cat) - Number(b.cat !== post.cat) || b.date.localeCompare(a.date))
    .slice(0, 3);

  const posting = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.desc,
    image: `${SITE}/img/${post.cover}.webp`, datePublished: post.date, dateModified: post.updated ?? post.date, inLanguage: lang,
    mainEntityOfPage: absUrl(`post-${post.key}`, lang), articleSection: post.cat,
    author: { "@type": "Organization", name: author, url: SITE },
    publisher: { "@type": "Organization", "@id": DENTIST_ID, name: "Dent32", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/logo.svg` } },
  };
  const crumbs = breadcrumbLd([
    [t("Anasayfa", "Home"), route("home", lang)], ["Blog", route("blog", lang)], [post.title, route(`post-${post.key}`, lang)],
  ]);
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: post.faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })),
  };
  const extraLd = postExtraLd(post.key, lang, post.title);

  return (
    <Shell lang={lang} pageKey={`post-${post.key}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(posting)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(crumbs)} />
      {extraLd && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(extraLd)} />}
      <div className="wrap post-wrap">
        {/* Başlık bloğu ve gövde aynı sütunda; içindekiler başlığın hizasından başlar */}
        <div className="post-layout">
          <article className="post">
            <nav className="crumbs" aria-label={t("Sayfa yolu", "Breadcrumb")}>
              <ol>
                <li><Link href={route("home", lang)}>{t("Anasayfa", "Home")}</Link></li>
                <li><Link href={route("blog", lang)}>Blog</Link></li>
                <li><span aria-current="page">{post.cat}</span></li>
              </ol>
            </nav>
            <header className="post__head">
              <h1>{post.title}</h1>
              <p className="lead">{post.lead}</p>
              <p className="post__meta">
                <span><Icon name="user" />{author}</span>
                <span><Icon name="cal" /><time dateTime={post.date}>{dateLong(post.date, lang)}</time></span>
                {post.updated && post.updated !== post.date && (
                  <span>{t("Son güncelleme", "Last updated")}: <time dateTime={post.updated}>{dateLong(post.updated, lang)}</time></span>
                )}
                <span><Icon name="clock" />{t(`${mins} dk okuma`, `${mins} min read`)}</span>
              </p>
            </header>
            <figure className="post__cover"><Img name={post.cover} w={900} h={675} alt={post.title} preload sizes="(max-width: 960px) 100vw, 780px" /></figure>
            <Toc items={toc} label={t("İçindekiler", "Contents")} className="toc--mobile" />
            <div className="prose">
              {post.sections.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id}>{s.h}</h2>
                  <div dangerouslySetInnerHTML={{ __html: s.html }} />
                </section>
              ))}
            </div>
            {/* Yazıdan ilgili tedavi sayfasına bağlantı (iç bağlantı: tedavi sayfaları yerel aramada güçlensin) */}
            {treat && (
              <aside className="note">
                <strong>{t("İlgili tedavi", "Related treatment")}</strong>
                <p><Link className="text-link" href={route(`treat-${treat.id}`, lang)}>{treat.h1[lang]}</Link>: {treat.short[lang]}</p>
              </aside>
            )}
            <section className="post__faq" aria-labelledby="h-faq">
              <h2 id="h-faq">{t("Sık sorulan sorular", "Frequently asked questions")}</h2>
              <Faq items={post.faq} />
            </section>
            <aside className="note" style={{ marginTop: 40 }}>
              <strong>{t("Bu yazı bilgilendirme amaçlıdır", "This article is for information only")}</strong>
              <p>
                {t("Size uygun tedavi ancak muayeneyle belirlenebilir. Sorularınız için", "The right treatment for you can only be decided after an examination. For questions,")}{" "}
                <a className="text-link" href={WA} target="_blank" rel="noopener">{t("WhatsApp'tan yazın", "message us on WhatsApp")}</a>.
              </p>
              {/* Her yazıda klinik adı, adresi ve anasayfa bağlantısı (yerel aramada tutarlı NAP) */}
              <p>
                <Link className="text-link" href={route("home", lang)}>{t("Dent32 Beylikdüzü diş kliniği", "Dent32 dental clinic in Beylikdüzü")}</Link>
                {" "}({t(OFFICIAL_NAME, `${OFFICIAL_NAME}, Dent32 Dental Polyclinic`)})
                {" · "}{ADDRESS}{" · "}{t("Haftanın yedi günü açık", "Open seven days a week")}{" · "}
                <a className="text-link" href={`tel:${PHONE_E164}`}>{PHONE}</a>
              </p>
            </aside>
          </article>
          <Toc items={toc} label={t("İçindekiler", "Contents")} className="toc--side" />
        </div>
      </div>
      <section className="section section--mist" aria-labelledby="h-rel">
        <div className="wrap">
          <div className="sec-head"><h2 id="h-rel">{t("İlgili yazılar", "Related articles")}</h2></div>
          <div className="blog-grid">{related.map((p, i) => <BlogCard key={p.key} lang={lang} post={p} d={i} />)}</div>
        </div>
      </section>
    </Shell>
  );
}
