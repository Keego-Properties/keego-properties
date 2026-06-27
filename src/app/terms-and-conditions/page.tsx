import TermsAndConditions from "@/pages/TermsAndConditions";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/terms-and-conditions");

export default function Page() {
  return <TermsAndConditions />;
}
