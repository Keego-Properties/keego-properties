import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/privacy-policy");

export default function Page() {
  return <PrivacyPolicy />;
}
