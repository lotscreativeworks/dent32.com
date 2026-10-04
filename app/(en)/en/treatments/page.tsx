import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Treatments } from "@/views/Treatments";

export const metadata: Metadata = pageMetadata({
  key: "treat",
  lang: "en",
  title: "Treatments | Dent32 Dental Clinic",
  description: "Implants, zirconia and porcelain crowns, smile design, clear aligners, whitening, root canal treatment, children's dentistry and gum treatment.",
  image: "tedavi-implant",
});

export default function Page() {
  return <Treatments lang="en" />;
}
