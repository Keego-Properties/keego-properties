import YourVoiceMatters from "@/pages/YourVoiceMatters";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata("/your-voice-matters");

export default function Page() {
  return <YourVoiceMatters />;
}
