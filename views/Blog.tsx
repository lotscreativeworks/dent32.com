import Link from "next/link";
import { Faq } from "@/components/client/Faq";
import { Toc } from "@/components/client/Toc";
import { BlogCard, PageHead } from "@/components/blocks";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { Shell } from "@/components/Shell";
import { jsonLd } from "@/lib/seo";
import { absUrl, dateLong, type Lang, type Post, POSTS, readMinutes, route, SITE, translator, WA } from "@/lib/site";

export function BlogList({ lang }: { lang: Lang }) {
  const t = translator(lang);
  return (
    <Shell lang={lang} pageKey="blog">
      <PageHead lang={lang} title={t("Kısa ve net rehberler", "Short, clear guides")} crumb="Blog" eyebrow="Blog"
        lead={t("Tedaviler hakkında merak edilenleri; süreleri, riskleri ve maliyeti belirleyen etkenlerle birlikte sade bir dille anlatıyoruz.",
          "Plain-language answers to common questions about treatment, including timelines, risks and what affects the cost.")} />
      <section className="section" style={{ paddingTop: "clamp(40px,5vw,64px)" }}>
        <div className="wrap">
          {/* En yeni yazı başta */}
          <div className="blog-grid">
            {POSTS[lang].map((p, i) => <BlogCard key={p.key} lang={lang} post={p} d={i % 3} as="h2" />)}
          </div>
        </div>
      </section>
    </Shell>
  );
}

export function BlogPost({ lang, post }: { lang: Lang; post: Post }) {
  const t = translator(lang);
  const author = t("Dent32 hekim ekibi", "Dent32 dental team");
  const mins = readMinutes(post);
  const toc = post.sections.map(({ id, h }) => ({ id, h }));
  const related = POSTS[lang]
    .filter((p) => p.key !== post.key)
    .sort((a, b) => Number(a.cat !== post.cat) - Number(b.cat !== post.cat) || b.date.localeCompare(a.date))
    .slice(0, 3);

  const posting = {
    "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.desc,
    image: `${SITE}/img/${post.cover}.webp`, datePublished: post.date, dateModified: post.date, inLanguage: lang,
    mainEntityOfPage: absUrl(`post-${post.key}`, lang), articleSection: post.cat,
    author: { "@type": "Organization", name: author, url: SITE },
    publisher: { "@type": "Organization", name: "Dent32", logo: { "@type": "ImageObject", url: `${SITE}/logo.svg` } },
  };
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: post.faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } })),
  };

  return (
    <Shell lang={lang} pageKey={`post-${post.key}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(posting)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd)} />
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
                <span><Icon name="clock" />{t(`${mins} dk okuma`, `${mins} min read`)}</span>
              </p>
            </header>
            <figure className="post__cover"><Img name={post.cover} w={900} h={675} alt="" preload sizes="(max-width: 960px) 100vw, 780px" /></figure>
            <Toc items={toc} label={t("İçindekiler", "Contents")} className="toc--mobile" />
            <div className="prose">
              {post.sections.map((s) => (
                <section key={s.id}>
                  <h2 id={s.id}>{s.h}</h2>
                  <div dangerouslySetInnerHTML={{ __html: s.html }} />
                </section>
              ))}
            </div>
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
