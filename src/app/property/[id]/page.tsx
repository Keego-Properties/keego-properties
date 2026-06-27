import PropertyDetail from "@/pages/PropertyDetail";
import { getPageMetadata } from "@/lib/metadata";
import { getStaticFallbackParams } from "@/lib/staticParams";

export function generateStaticParams() {
  return getStaticFallbackParams();
}

export const metadata = getPageMetadata("/property/example");

export default function Page() {
  return <PropertyDetail />;
}
