import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Contact } from "@/views/Contact";

export const metadata: Metadata = pageMetadata({
  key: "contact",
  lang: "en",
  title: "Contact and appointments | Dent32 Dental Clinic",
  description: "Contact Dent32: +90 555 011 33 68, info@dent32.com. Barış Mah., Ginza Lavinya, E-5 Yanyolu No:30 D:179, 34520 Beylikdüzü / İstanbul. Book via WhatsApp.",
  image: "klinik-01-bina",
});

export default function Page() {
  return <Contact lang="en" />;
}
