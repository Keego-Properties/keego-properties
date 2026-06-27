import NotFound from "@/pages/NotFound";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/404");

export default function Page() {
  return <NotFound />;
}
