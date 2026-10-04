import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Gallery } from "@/views/Gallery";

export const metadata: Metadata = pageMetadata({
  key: "gallery",
  lang: "en",
  title: "Gallery: before and after | Dent32",
  description: "Unretouched before and after photos of implant and zirconia treatments.",
  image: "vaka-zirkonyum1-sonrasi",
});

export default function Page() {
  return <Gallery lang="en" />;
}
