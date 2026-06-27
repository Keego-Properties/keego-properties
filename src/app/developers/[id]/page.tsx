import DeveloperDetail from "@/pages/DeveloperDetail";
import { getPageMetadata } from "@/lib/metadata";
import { getStaticFallbackParams } from "@/lib/staticParams";

export function generateStaticParams() {
  return getStaticFallbackParams();
}

export const metadata = getPageMetadata("/developers/example");

export default function Page() {
  return <DeveloperDetail />;
}
