import HolidayHomes from "@/pages/HolidayHomes";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/holiday-homes");

export default function Page() {
  return <HolidayHomes />;
}
