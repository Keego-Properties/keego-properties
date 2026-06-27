"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Home, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
      <Navbar />

      <section className="bg-navy-dark pt-56 md:pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-gold">Error 404</p>
          <h1 className="mb-4 font-serif text-5xl font-bold text-primary-foreground md:text-7xl">Page Not Found</h1>
          <p className="mx-auto max-w-lg text-primary-foreground/60">
            The page you are looking for does not exist or may have been moved.
          </p>
          {pathname !== "/" && (
            <p className="mt-4 text-sm text-primary-foreground/40">
              Requested URL: <span className="text-primary-foreground/70">{pathname}</span>
            </p>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] md:p-12">
            <p className="mb-6 text-muted-foreground leading-relaxed">
              Let us help you get back on track. Explore our properties or return to the homepage.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild className="rounded-full bg-gold px-8 text-navy-dark hover:bg-gold/90">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-navy px-8 text-navy hover:bg-navy/5">
                <Link href="/properties">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Properties
                </Link>
              </Button>
            </div>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;
