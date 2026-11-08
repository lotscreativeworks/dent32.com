import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Gallery } from "@/views/Gallery";

export const metadata: Metadata = pageMetadata({
  key: "gallery",
  lang: "en",
  title: "Before and After Gallery | Dent32 Dental Clinic, Beylikdüzü",
  description: "Unretouched before and after photos of patients treated with implants and zirconia at Dent32 in Beylikdüzü, Istanbul. Results vary from person to person.",
  image: "vaka-zirkonyum1-sonrasi",
});

export default function Page() {
  return <Gallery lang="en" />;
}
