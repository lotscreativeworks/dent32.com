import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Istanbul } from "@/views/Istanbul";

export const metadata: Metadata = pageMetadata({
  key: "istanbul",
  lang: "en",
  title: "Dental Clinic in Istanbul | Dent32, Beylikdüzü (European Side)",
  description: "Dent32 dental clinic in Beylikdüzü on Istanbul's European side: getting here by metrobus or the E-5, visit planning if you travel far, treatments and FAQs.",
  image: "klinik-01-bina",
});

export default function Page() {
  return <Istanbul lang="en" />;
}
