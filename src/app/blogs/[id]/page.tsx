import BlogDetail from "@/pages/BlogDetail";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/blogs/example");

export default function Page() {
  return <BlogDetail />;
}
