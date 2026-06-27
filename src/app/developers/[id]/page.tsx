import DeveloperDetail from "@/pages/DeveloperDetail";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/developers/example");

export default function Page() {
  return <DeveloperDetail />;
}
