import BlogDetail from "@/pages/BlogDetail";
import { getPageMetadata } from "@/lib/metadata";
import { getStaticFallbackParams } from "@/lib/staticParams";

export function generateStaticParams() {
  return getStaticFallbackParams();
}

export const metadata = getPageMetadata("/blogs/example");

export default function Page() {
  return <BlogDetail />;
}
