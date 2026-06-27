import About from "@/pages/About";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/about");

export default function Page() {
  return <About />;
}
