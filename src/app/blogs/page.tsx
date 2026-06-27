import Blog from "@/pages/Blog";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/blogs");

export default function Page() {
  return <Blog />;
}
