import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Privacy } from "@/views/Privacy";

export const metadata: Metadata = pageMetadata({
  key: "privacy",
  lang: "en",
  title: "Cookie Policy and Privacy Notice | Dent32",
  description: "The cookies used on the Dent32 website, Google Ads measurement, your consent and your rights under Turkish data protection law (KVKK).",
});

export default function Page() {
  return <Privacy lang="en" />;
}
