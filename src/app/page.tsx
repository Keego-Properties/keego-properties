import Index from "@/pages/Index";
import { getPageMetadata, organizationSchema, websiteSchema } from "@/lib/metadata";

export const metadata = getPageMetadata("/");

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema]),
        }}
      />
      <Index />
    </>
  );
}
