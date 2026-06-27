"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TrendingUp, Users, BarChart3, Building2, ChevronDown } from "lucide-react";

interface Developer {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
}

const features = [
  {
    icon: Building2,
    title: "Project Showcase",
    description:
      "Promote off-plan and completed developments with premium listing placement, rich media, and performance analytics.",
  },
  {
    icon: Users,
    title: "Lead Generation",
    description:
      "Access verified buyer enquiries and receive tailored introductions from our sales specialists.",
  },
  {
    icon: TrendingUp,
    title: "Market Intelligence",
    description:
      "Benefit from insights on pricing, demand, and community performance to make informed decisions.",
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description:
      "Track listing visibility, enquiry rates, and conversion metrics with our dedicated dashboard.",
  },
];

const developerFaqs = [
  {
    q: "Why Invest in Off-Plan Properties?",
    a: "Dubai's off-plan market offers flexible payment plans, competitive pricing, and strong long-term investment potential. Partnering with trusted developers gives buyers access to premium communities and future growth opportunities. With Keego Properties, clients receive expert guidance on project selection, location, and investment strategy to make confident property decisions.",
  },
  {
    q: "What is an off-plan property?",
    a: "An off-plan property is a property purchased directly from a developer before construction is completed. Buyers often benefit from flexible payment plans and early investment opportunities.",
  },
  {
    q: "Can foreigners buy off-plan property in Dubai?",
    a: "Yes. Foreign investors can purchase freehold properties in designated areas across Dubai, subject to the developer's terms and Dubai property regulations.",
  },
  {
    q: "How do I choose the right developer in Dubai?",
    a: "Choosing the right developer depends on project quality, delivery history, location, payment plans, and long-term investment potential. Our team helps clients evaluate each opportunity with confidence.",
  },
  {
    q: "Are off-plan properties a good investment?",
    a: "Off-plan properties in Dubai continue to attract investors through strong capital appreciation potential, flexible payment options, and access to premium upcoming communities.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

const Developers = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    getDocs(collection(db, "developers")).then((snap) => {
      setDevelopers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Developer)));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        {/* background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-navy-dark" />

        <div className="relative z-10 container mx-auto px-4 pb-16 pt-36">
          <p className="text-gold font-medium tracking-[0.25em] uppercase text-xs mb-3">
            Developer Partners
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white max-w-3xl leading-tight mb-5">
            Build the future of Dubai with KeeGo.
          </h1>
          <p className="text-white/60 max-w-2xl leading-relaxed text-base md:text-lg">
            Partner with KeeGo Properties to showcase your projects, connect with
            qualified buyers, and access premium marketing support across Dubai's
            finest communities.
          </p>
        </div>
      </section>

      {/* ── Developers in Dubai Intro ── */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Developers in Dubai</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-5">
              Explore Dubai's Leading Real Estate Developers
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At Keego Properties, we connect homebuyers and investors with trusted real estate developers across Dubai, offering access to premium residences, off-plan opportunities, and high-potential investment projects.
              </p>
              <p>
                Through our developer network and market expertise, we help clients discover projects that align with their lifestyle goals, investment strategy, and long-term growth plans in Dubai's evolving real estate market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Partner ── */}
      <section className="py-20 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Why partner with us</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              A trusted launchpad for developers.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Everything you need to reach the right audience and accelerate your sales pipeline.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)] hover:border-gold/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                  <f.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Developer Partners Grid ── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Our partners</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Trusted names in Dubai development.
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              We work with the region's most respected developers to bring world-class properties to discerning buyers.
            </p>
          </div>

          {developers.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-10">
              No developers listed yet.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0.5 rounded-3xl overflow-hidden shadow-xl border border-border">
              {developers.map((dev, i) => {
                const palettes = [
                  "bg-[#a8c4e0]/50",
                  "bg-[#b5aee0]/50",
                  "bg-[#e0c9a8]/50",
                  "bg-[#a8d4b8]/50",
                  "bg-[#e0a8b4]/50",
                  "bg-[#a8d0e0]/50",
                  "bg-[#d4bfa8]/50",
                  "bg-[#a8d4ac]/50",
                ];
                const bg = palettes[i % palettes.length];
                return (
                  <Link
                    key={dev.id}
                    href={`/developers/${dev.id}`}
                    className={`group relative ${bg} aspect-[4/3] flex flex-col items-center justify-center p-8 overflow-hidden cursor-pointer`}
                  >
                    {/* logo */}
                    <div className="relative z-10 w-full flex flex-col items-center gap-3">
                      {dev.logo ? (
                        <img
                          src={dev.logo}
                          alt={dev.name}
                          className="max-h-17 max-w-[70%] object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <>
                          <Building2 className="w-10 h-10 text-foreground/40" />
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Frequently Asked Questions</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {developerFaqs.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Developers;
