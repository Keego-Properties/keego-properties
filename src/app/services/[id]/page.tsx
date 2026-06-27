import ServiceDetail from "@/pages/ServiceDetail";
import { getPageMetadata } from "@/lib/metadata";
import { getStaticFallbackParams } from "@/lib/staticParams";

export function generateStaticParams() {
  return getStaticFallbackParams();
}

export const metadata = getPageMetadata("/services/example");

export default function Page() {
  return <ServiceDetail />;
}
