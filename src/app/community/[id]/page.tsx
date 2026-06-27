import CommunityDetail from "@/pages/CommunityDetail";
import { getPageMetadata } from "@/lib/metadata";
import { getStaticFallbackParams } from "@/lib/staticParams";

export function generateStaticParams() {
  return getStaticFallbackParams();
}

export const metadata = getPageMetadata("/community/example");

export default function Page() {
  return <CommunityDetail />;
}
