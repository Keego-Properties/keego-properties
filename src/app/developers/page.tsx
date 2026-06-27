import Developers from "@/pages/Developers";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/developers");

export default function Page() {
  return <Developers />;
}
