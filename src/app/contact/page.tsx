import Contact from "@/pages/Contact";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/contact");

export default function Page() {
  return <Contact />;
}
