import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Providers from "./providers";
import { getPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...getPageMetadata("/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
