"use client";

import { type FormEvent, useState } from "react";
import { Icon } from "@/components/Icon";
import { type Lang, PHONE, translator, waLink } from "@/lib/site";

type Field = "name" | "phone" | "email" | "message";

/** Sunucusuz form: bilgileri WhatsApp mesajına çevirip açar. Hatalar aria-live ile duyurulur. */
export function WaForm({ lang, variant }: { lang: Lang; variant: "apply" | "contact" }) {
  const t = translator(lang);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [invalid, setInvalid] = useState<Field | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const v = (n: Field) => ((form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "").trim();
    const fail = (field: Field, text: string) => {
      setInvalid(field);
      setMsg({ text, ok: false });
      (form.elements.namedItem(field) as HTMLElement).focus();
    };

    if (!v("name")) return fail("name", t("Lütfen adınızı yazın.", "Please enter your name."));
    if (v("phone").replace(/\D/g, "").length < 7) return fail("phone", t("Lütfen geçerli bir telefon numarası yazın.", "Please enter a valid phone number."));
    if (variant === "contact") {
      if (v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) return fail("email", t("E-posta adresi geçerli görünmüyor.", "That email address doesn't look valid."));
      if (!v("message")) return fail("message", t("Lütfen kısa bir mesaj yazın.", "Please write a short message."));
    }

    const lines = [t(`Merhaba, ben ${v("name")}.`, `Hello, my name is ${v("name")}.`), `${t("Telefon", "Phone")}: ${v("phone")}`];
    if (v("email")) lines.push(`${t("E-posta", "Email")}: ${v("email")}`);
    lines.push("", v("message") || t("Uzman görüşü almak istiyorum.", "I'd like to get a specialist's opinion."));
    const url = waLink(lines.join("\n"));

    setInvalid(null);
    setMsg({ text: t(`WhatsApp açılıyor… Açılmazsa ${PHONE} numarasına yazabilirsiniz.`, `Opening WhatsApp… If it doesn't open, message us at ${PHONE}.`), ok: true });
    if (!window.open(url, "_blank", "noopener")) window.location.assign(url);
  };

  const inv = (f: Field) => (invalid === f ? { "aria-invalid": true as const } : {});
  const status = <p className={`form-msg ${msg?.ok ? "is-ok" : ""}`} role="status" aria-live="polite">{msg?.text}</p>;

  if (variant === "apply") {
    return (
      <>
        <form className="apply__form" noValidate onSubmit={onSubmit}>
          <p className="apply__title">
            <strong>{t("Ücretsiz ön görüşme", "Free initial chat")}</strong>
            <span>{t("Sizi arayalım ya da WhatsApp'tan yazalım.", "We'll call or message you on WhatsApp.")}</span>
          </p>
          <div className="field">
            <label htmlFor="ap-name">{t("Adınız", "Your name")}</label>
            <input id="ap-name" name="name" type="text" autoComplete="name" required placeholder={t("Ad Soyad", "Full name")} {...inv("name")} />
          </div>
          <div className="field">
            <label htmlFor="ap-phone">{t("Telefon", "Phone")}</label>
            <input id="ap-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required placeholder="+90 5__ ___ __ __" {...inv("phone")} />
          </div>
          <button className="btn btn-primary" type="submit">{t("Uzmana danışın", "Ask a specialist")}</button>
        </form>
        <p className="apply__note">{t("Gönder dediğinizde bilgileriniz bir WhatsApp mesajına dönüştürülür; sitemiz hiçbir veriyi kaydetmez.", "When you submit, your details are turned into a WhatsApp message; this site doesn't store any data.")}</p>
        {status}
      </>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit}>
      <div className="grid2">
        <div className="field">
          <label htmlFor="c-name">{t("Adınız", "Your name")} *</label>
          <input id="c-name" name="name" type="text" autoComplete="name" required {...inv("name")} />
        </div>
        <div className="field">
          <label htmlFor="c-phone">{t("Telefon", "Phone")} *</label>
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required {...inv("phone")} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-email">{t("E-posta", "Email")}</label>
        <input id="c-email" name="email" type="email" autoComplete="email" {...inv("email")} />
      </div>
      <div className="field">
        <label htmlFor="c-msg">{t("Mesajınız", "Your message")} *</label>
        <textarea id="c-msg" name="message" required placeholder={t("Hangi konuda bilgi almak istiyorsunuz?", "What would you like to know?")} {...inv("message")} />
      </div>
      <button className="btn btn-primary" type="submit"><Icon name="chat" /> {t("WhatsApp ile gönder", "Send via WhatsApp")}</button>
      {status}
      <p className="hint">{t("* ile işaretli alanlar zorunludur.", "Fields marked * are required.")}</p>
    </form>
  );
}
