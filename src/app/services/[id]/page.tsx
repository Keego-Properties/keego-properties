import ServiceDetail from "@/pages/ServiceDetail";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/services/example");

export default function Page() {
  return <ServiceDetail />;
}
