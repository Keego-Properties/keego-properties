import Services from "@/pages/Services";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/services");

export default function Page() {
  return <Services />;
}
