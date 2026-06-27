import Communities from "@/pages/Communities";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/communities");

export default function Page() {
  return <Communities />;
}
