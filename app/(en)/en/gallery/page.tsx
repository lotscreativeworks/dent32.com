import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Gallery } from "@/views/Gallery";

export const metadata: Metadata = pageMetadata({
  key: "gallery",
  lang: "en",
  title: "Before and After Gallery | Dent32 Dental Clinic, Beylikdüzü",
  description: "Unretouched before and after photos of implant and zirconia treatments at Dent32 dental clinic in Beylikdüzü, Istanbul.",
  image: "vaka-zirkonyum1-sonrasi",
});

export default function Page() {
  return <Gallery lang="en" />;
}
