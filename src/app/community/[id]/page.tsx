import CommunityDetail from "@/pages/CommunityDetail";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/community/example");

export default function Page() {
  return <CommunityDetail />;
}
