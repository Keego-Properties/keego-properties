import ListProperty from "@/pages/ListProperty";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/list-property");

export default function Page() {
  return <ListProperty />;
}
