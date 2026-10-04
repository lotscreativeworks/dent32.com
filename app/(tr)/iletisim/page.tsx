import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Contact } from "@/views/Contact";

export const metadata: Metadata = pageMetadata({
  key: "contact",
  lang: "tr",
  title: "İletişim ve randevu | Dent32 Diş Kliniği",
  description: "Dent32 iletişim: +90 555 011 33 68, info@dent32.com. Barış Mah., Ginza Lavinya, E-5 Yanyolu No:30 D:179, 34520 Beylikdüzü / İstanbul. WhatsApp'tan randevu alın.",
  image: "klinik-01-bina",
});

export default function Page() {
  return <Contact lang="tr" />;
}
