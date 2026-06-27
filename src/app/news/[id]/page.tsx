import NewsDetail from "@/pages/NewsDetail";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/news/example");

export default function Page() {
  return <NewsDetail />;
}
