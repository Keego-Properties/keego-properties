import Blog from "@/pages/Blog";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/blog");

export default function Page() {
  return <Blog />;
}
