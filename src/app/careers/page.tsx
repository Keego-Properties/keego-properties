import Careers from "@/pages/Careers";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/careers");

export default function Page() {
  return <Careers />;
}
