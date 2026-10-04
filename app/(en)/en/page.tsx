import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Home } from "@/views/Home";

export const metadata: Metadata = pageMetadata({
  key: "home",
  lang: "en",
  title: "Dent32 Dental Clinic | Beylikdüzü, Istanbul",
  description: "Dental clinic in Beylikdüzü, Istanbul. Implants, zirconia, smile design and clear aligners with a clear, planned approach. Open seven days a week.",
  image: "hekim-huseyin-asci",
});

export default function Page() {
  return <Home lang="en" />;
}
