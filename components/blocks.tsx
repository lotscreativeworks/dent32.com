import Link from "next/link";
import type { ReactNode } from "react";
import { BeforeAfter } from "@/components/client/BeforeAfter";
import { Rail } from "@/components/client/Rail";
import { Icon } from "@/components/Icon";
import { Img } from "@/components/Img";
import { dateBadge, type Lang, type Post, route, translator, WA } from "@/lib/site";

/** Gecikmeli giriş animasyonu için stil: --d */
export const delay = (d: number) => ({ ["--d" as string]: d });

export function LangRail({ lang, ...rest }: { lang: Lang; label: string; className?: string; drag?: boolean; children: ReactNode }) {
  const t = translator(lang);
  return <Rail {...rest} prevLabel={t("Önceki", "Previous")} nextLabel={t("Sonraki", "Next")} />;
}

const CAT: Record<string, [string, string]> = { implant: ["İmplant", "Implant"], zirkonyum: ["Zirkonyum", "Zirconia"] };

export function BaCard({ lang, kind, n, d = 0 }: { lang: Lang; kind: string; n: number; d?: number }) {
  const t = translator(lang);
  const name = t(...CAT[kind]);
  return (
    <figure className="ba-card rv" style={delay(d)}>
      <BeforeAfter before={`vaka-${kind}${n}-oncesi`} after={`vaka-${kind}${n}-sonrasi`}
        altBefore={t(`${name} vakası ${n}: tedavi öncesi`, `${name} case ${n}: before treatment`)}
        altAfter={t(`${name} vakası ${n}: tedavi sonrası`, `${name} case ${n}: after treatment`)}
        label={t(`${name} vakası ${n}: öncesi ve sonrası karşılaştırma`, `${name} case ${n}: before and after comparison`)}
        tagBefore={t("Öncesi", "Before")} tagAfter={t("Sonrası", "After")} />
      <figcaption>{name}</figcaption>
    </figure>
  );
}

export function BlogCard({ lang, post, d = 0, as: H = "h3" }: { lang: Lang; post: Post; d?: number; as?: "h2" | "h3" }) {
  const { day, month } = dateBadge(post.date, lang);
  return (
    <Link className="b-card lift rv" style={delay(d)} href={route(`post-${post.key}`, lang)}>
      <div className="b-card__media">
        <div className="b-card__img zoom"><Img name={post.cover} w={900} h={675} alt="" /></div>
        <time className="date-badge" dateTime={post.date}><b>{day}</b><small>{month}</small></time>
      </div>
      <p className="b-card__cat">{post.cat}</p>
      <H>{post.title}</H>
      <p className="b-card__desc">{post.desc}</p>
    </Link>
  );
}

export function PageHead({ lang, title, lead, crumb, eyebrow }: { lang: Lang; title: string; lead: string; crumb: string; eyebrow?: string }) {
  const t = translator(lang);
  return (
    <section className="page-head">
      <div className="wrap">
        <nav className="crumbs" aria-label={t("Sayfa yolu", "Breadcrumb")}>
          <ol>
            <li><Link href={route("home", lang)}>{t("Anasayfa", "Home")}</Link></li>
            <li><span aria-current="page">{crumb}</span></li>
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}

export function SecHead({ eyebrow, title, id, children }: { eyebrow: string; title: ReactNode; id: string; children?: ReactNode }) {
  return (
    <div className="sec-head rv">
      <div><p className="eyebrow">{eyebrow}</p><h2 id={id}>{title}</h2></div>
      {children}
    </div>
  );
}

export function NextStep({ lang }: { lang: Lang }) {
  const t = translator(lang);
  const items = lang === "tr"
    ? ["Ayrıntılı muayene ve gerekli görüntüleme", "Seçenekler, riskler ve alternatifler açıkça anlatılır", "Kalem kalem yazılı tedavi planı ve maliyet", "Tedavi sonrası kontrol randevuları"]
    : ["A thorough examination and any imaging needed", "Options, risks and alternatives explained clearly", "An itemised written treatment plan and cost", "Follow-up appointments after treatment"];
  return (
    <section className="section">
      <div className="wrap">
        <div className="next rv">
          <div>
            <p className="eyebrow">{t("Sonraki adım", "Next step")}</p>
            <h2>{t("Önce konuşalım, sonra planlayalım.", "Let's talk first, then plan.")}</h2>
            <p>{t("WhatsApp'tan yazın ya da randevu alın. İlk görüşmede durumunuzu dinliyor, muayene sonrası seçenekleri artıları ve eksileriyle anlatıyoruz. Tedaviye başlamak için acele etmeniz gerekmez.",
              "Message us on WhatsApp or book an appointment. In the first conversation we listen to you, and after the examination we explain the options with their pros and cons. There's no rush to start treatment.")}</p>
            <div className="btn-row">
              <Link className="btn btn-primary" href={route("contact", lang)}>{t("Randevu al", "Book an appointment")}</Link>
              <a className="btn btn-ghost" href={WA} target="_blank" rel="noopener">{t("WhatsApp'tan yazın", "Message on WhatsApp")}</a>
            </div>
          </div>
          <ul className="checklist">
            {items.map((it) => <li key={it}><Icon name="check" /><span>{it}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
