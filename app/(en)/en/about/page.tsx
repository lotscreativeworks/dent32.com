import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { About } from "@/views/About";

export const metadata: Metadata = pageMetadata({
  key: "about",
  lang: "en",
  title: "About us | Dent32 Dental Clinic",
  description: "Dent32's founder Dr. Hüseyin Aşçı, our dentists, how we work and our clinic in Beylikdüzü, Istanbul.",
  image: "hakkimizda-huseyin-asci",
});

export default function Page() {
  return <About lang="en" />;
}
