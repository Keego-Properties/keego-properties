import News from "@/pages/News";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/news");

export default function Page() {
  return <News />;
}
