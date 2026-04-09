import { Award, CheckCircle2, Home, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const valuationStats = [
  { icon: Award, value: "1,240+", label: "valuated properties" },
  { icon: Shield, value: "98%", label: "verified estimates" },
  { icon: Home, value: "450+", label: "trusted agents" },
];

const valuationReasons = [
  "Know the true value of your property before you list or renew.",
  "Receive a transparent market estimate backed by local expertise.",
  "Improve seller confidence with verified valuations and trust signals.",
];

const PropertyValuation = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-12 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Free Valuation</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Get a trusted property valuation today.
          </h1>
          <p className="mx-auto max-w-3xl text-primary-foreground/70 leading-relaxed">
            Request a free valuation and discover how much your property could be worth in Dubai's fast-moving market.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
              <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Why valuation matters</p>
              <h2 className="font-serif text-3xl font-bold mb-4">Turn insight into stronger decisions.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Property valuation helps you choose the right price, improve negotiation strength, and reduce time on market.
              </p>
              <div className="space-y-4">
                {valuationReasons.map((reason) => (
                  <div key={reason} className="flex gap-4 rounded-3xl bg-white/80 p-5 shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {valuationStats.map((stat) => (
                <div key={stat.label} className="rounded-[2rem] bg-card p-6 text-center shadow-[var(--shadow-card)]">
                  <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-3">Request a valuation</p>
            <h3 className="font-serif text-3xl font-bold mb-5">Start with a quick property review.</h3>
            <form className="space-y-4">
              <Input placeholder="Full name" />
              <Input type="email" placeholder="Email address" />
              <Input placeholder="Phone number" />
              <Input placeholder="Property address or community" />
              <Textarea placeholder="Tell us what type of valuation you need" rows={5} />
              <Button className="w-full rounded-full bg-gold text-primary-foreground hover:bg-gold/90">
                Request valuation now
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
              <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Valuation insights</p>
              <h2 className="font-serif text-3xl font-bold mb-4">Pricing confidence for every owner.</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our valuations are based on current market demand, neighbourhood comparables, and verified transaction data. That means you get a clear, high-conversion price estimate that buyers trust.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gold/10 text-gold">✓</span> Data-backed recommendations to maximize resale value.</li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gold/10 text-gold">✓</span> Verified property valuations for buyer confidence.</li>
                <li className="flex items-start gap-3"><span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gold/10 text-gold">✓</span> Tailored advice for selling, refinancing, or renting out your asset.</li>
              </ul>
            </div>

            <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-gold/10 via-transparent to-navy-dark border border-gold/20 p-8 shadow-[var(--shadow-card)]">
              <div className="mb-6">
                <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Market-ready visuals</p>
                <h3 className="text-3xl font-semibold text-foreground mb-4">Professional valuation insights.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A valuation report that looks polished, reads clearly, and gives clients the confidence to move forward.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[2rem] bg-white/90 p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-gold mb-3">Verified data</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">Every report is backed by authenticated sales and current market insights.</p>
                </div>
                <div className="rounded-[2rem] bg-white/90 p-6 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-gold mb-3">Fast delivery</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">Receive a clear estimate within 24 hours of your valuation request.</p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="overflow-hidden rounded-[2rem] bg-muted shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80"
                    alt="Property evaluation report"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[2rem] bg-muted shadow-sm">
                  <img
                    src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80"
                    alt="Verified property valuation"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyValuation;
