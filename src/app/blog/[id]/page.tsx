import BlogDetail from "@/pages/BlogDetail";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/blog/example");

export default function Page() {
  return <BlogDetail />;
}
