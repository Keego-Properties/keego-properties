import Properties from "@/pages/Properties";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/properties");

export default function Page() {
  return <Properties />;
}
