import PropertyValuation from "@/pages/PropertyValuation";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/property-valuation");

export default function Page() {
  return <PropertyValuation />;
}
