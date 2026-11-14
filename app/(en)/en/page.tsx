import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata: Metadata = pageMetadata({
  key: "home",
  lang: "en",
  title: "Dental Clinic & Dentist in Beylikdüzü, Istanbul | Dent32",
  description: "Dental clinic in Beylikdüzü, Istanbul: implants, zirconia and porcelain crowns, smile design, root canals and clear aligners. Open 7 days, English spoken.",
  image: "hekim-huseyin-asci",
});

export default function Page() {
  return <Home lang="en" />;
}
