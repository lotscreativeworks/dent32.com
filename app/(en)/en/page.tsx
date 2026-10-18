import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata: Metadata = pageMetadata({
  key: "home",
  lang: "en",
  title: "Dental Clinic in Beylikdüzü, Istanbul: Implants & Crowns | Dent32",
  description: "Dental clinic in Beylikdüzü, Istanbul. Dental implants, zirconia and porcelain crowns, smile design, root canal treatment and clear aligners. Open seven days a week.",
  image: "hekim-huseyin-asci",
});

export default function Page() {
  return <Home lang="en" />;
}
