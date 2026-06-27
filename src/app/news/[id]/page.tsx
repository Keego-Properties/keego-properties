import NewsDetail from "@/pages/NewsDetail";
import { getPageMetadata } from "@/lib/metadata";
import { getStaticFallbackParams } from "@/lib/staticParams";

export function generateStaticParams() {
  return getStaticFallbackParams();
}

export const metadata = getPageMetadata("/news/example");

export default function Page() {
  return <NewsDetail />;
}
