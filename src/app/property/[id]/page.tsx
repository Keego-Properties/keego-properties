import PropertyDetail from "@/pages/PropertyDetail";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/property/example");

export default function Page() {
  return <PropertyDetail />;
}
