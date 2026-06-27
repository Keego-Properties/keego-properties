"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown, CheckCircle2, Phone, Mail, MessageCircle,
  Star, Shield, TrendingUp, Calendar, Camera, Home, Users,
  Sparkles, ArrowRight, ClipboardList, Paintbrush, BarChart3, Headphones, Wrench, Smile
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

const steps = [
  {
    number: "01",
    icon: Phone,
    title: "Free Consultation",
    desc: "A no-obligation conversation about your property, goals, and realistic earning potential. No pressure, just honest advice.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "DTCM Registration",
    desc: "We handle the entire DTCM registration process — paperwork, compliance, and all — so your property is fully licensed and legal.",
  },
  {
    number: "03",
    icon: Paintbrush,
    title: "Interior Styling Advice",
    desc: "We guide you on presenting your property at its best, and connect you with trusted interior designers and furnishing suppliers.",
  },
  {
    number: "04",
    icon: Camera,
    title: "Professional Photography",
    desc: "High-quality photography that turns browsers into bookings — because great photos are the foundation of a great listing.",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Multi-Platform Marketing",
    desc: "Listed and actively marketed on Airbnb, Booking.com, and our own Keego network, with dynamic pricing to maximise income.",
  },
  {
    number: "06",
    icon: MessageCircle,
    title: "Booking Management",
    desc: "We handle all guest communication, confirmations, and check-in instructions. You never deal with a midnight message.",
  },
  {
    number: "07",
    icon: Shield,
    title: "Security Deposits",
    desc: "We collect and manage security deposits on your behalf — protecting your property and giving you peace of mind every stay.",
  },
  {
    number: "08",
    icon: Headphones,
    title: "Guest Concierge",
    desc: "A premium guest experience with local recommendations and support throughout every stay. Happy guests leave great reviews.",
  },
  {
    number: "09",
    icon: Sparkles,
    title: "Cleaning & Housekeeping",
    desc: "A thorough professional clean and inspection after every checkout — so your property is always perfect for the next guest.",
  },
  {
    number: "10",
    icon: Wrench,
    title: "Maintenance Between Stays",
    desc: "Regular maintenance checks and fast repairs keep your property in top condition and protect its long-term value.",
  },
];

const ownerBenefits = [
  {
    icon: TrendingUp,
    title: "Earn More Income",
    desc: "Short-term rentals consistently outperform long-term leases in Dubai by up to 20% annually, with dynamic seasonal pricing doing the work for you.",
  },
  {
    icon: Calendar,
    title: "Stay Flexible",
    desc: "Block out dates for personal use whenever you like. Unlike a long-term tenancy, your property is never locked away — it stays yours.",
  },
  {
    icon: Shield,
    title: "No Long-Term Headaches",
    desc: "Shorter stays, fresh guests, and far less risk of the tenant disputes that traditional leasing can bring.",
  },
  {
    icon: Sparkles,
    title: "Always Looks Its Best",
    desc: "We inspect and clean between every single stay, maintaining your property to a consistently high standard.",
  },
];

const guestBenefits = [
  {
    icon: Home,
    title: "More Space and Privacy",
    desc: "A private kitchen, living room, and in some cases a pool — a completely different experience that guests are willing to pay for.",
  },
  {
    icon: Star,
    title: "Live Like a Resident",
    desc: "Experience Dubai the way residents do — in a real neighbourhood, a real home, with real comfort.",
  },
  {
    icon: Users,
    title: "Perfect for Families",
    desc: "Families and groups can all stay together, cook their own meals, and have space to actually relax — things a hotel simply cannot offer.",
  },
  {
    icon: Shield,
    title: "Safe and Fully Managed",
    desc: "Every property is secure, well-maintained, and fully prepared for guests. Safety is taken seriously, and guests feel that from the start.",
  },
];

const whyKeego = [
  "RERA-licensed and DTCM-compliant management",
  "End-to-end service — you do nothing, we do everything",
  "Dynamic pricing strategy to maximise income year-round",
  "Professional photography and multi-platform marketing",
  "Thorough guest screening and secure deposit handling",
  "Regular cleaning, inspections, and maintenance after every stay",
  "Transparent monthly income reports with full visibility",
  "Dedicated property manager assigned to your home",
];

const faqs = [
  {
    q: "What is a holiday home in Dubai?",
    a: "A holiday home is a fully furnished property rented out to guests on a short-term basis — anywhere from a few nights to a few weeks. It is a legal and increasingly popular alternative to hotel stays, regulated by the Dubai Department of Tourism and Commerce Marketing (DTCM).",
  },
  {
    q: "Do I need a licence to rent my property as a holiday home?",
    a: "Yes. All holiday homes in Dubai must be registered with the DTCM. Keego Properties handles the entire registration and compliance process on your behalf, so you are always operating legally and correctly.",
  },
  {
    q: "Can I still use my property if it is listed as a holiday home?",
    a: "Absolutely. One of the biggest advantages of holiday home management over long-term leasing is that you can block out dates for your own personal use whenever you choose.",
  },
  {
    q: "How much can I earn from a holiday home in Dubai?",
    a: "This depends on your property type, location, and the time of year — but short-term rentals in Dubai regularly outperform long-term leases by up to 20% in annual income. We provide a realistic earnings estimate during your free consultation.",
  },
  {
    q: "What happens if a guest damages my property?",
    a: "We collect a security deposit from every guest before their stay. In the event of any damage, this deposit covers the cost of repairs. Our post-stay inspection process also ensures any issues are caught and dealt with immediately.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-medium text-white hover:text-gold transition-colors"
      >
        <span>{q}</span>
        <ChevronDown className={`w-4 h-4 text-white/40 flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="pb-5 text-sm text-white/60 leading-relaxed">{a}</p>
      )}
    </div>
  );
}

const HolidayHomes = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, "submissions"), {
        source: "holiday_homes",
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        propertyName: form.propertyAddress.trim(),
        category: form.propertyType,
        message: form.message.trim(),
        read: false,
        createdAt: Timestamp.now(),
      });

      toast({
        title: "Consultation requested",
        description: "Our holiday homes team will contact you within 24 hours.",
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyAddress: "",
        propertyType: "",
        message: "",
      });
    } catch (error) {
      console.error("Holiday homes form submission failed:", error);
      toast({
        title: "Submission failed",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/35 via-gold/20 to-cream text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-28 bg-navy-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.07),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 text-gold text-xs font-semibold uppercase tracking-[0.2em] px-4 py-2 rounded-full mb-6">
              <Home className="w-3.5 h-3.5" /> Holiday Homes in Dubai
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Turn Your Property Into a High-Earning Holiday Home.
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-2xl">
              We handle everything — from DTCM registration and photography to guest management and housekeeping. You earn more. We do the work.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#enquire">
                <Button className="rounded-full bg-gold text-navy-dark font-semibold px-8 h-12 hover:bg-gold/90 text-base">
                  Get a Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="https://wa.me/971543912231" target="_blank" rel="noopener noreferrer">
                <Button className="rounded-full bg-transparent border border-white text-white hover:bg-white/10 font-semibold px-8 h-12 text-base">
                  <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gold stat bar */}
      <section className="bg-gold py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "Up to 20%", label: "More than Long-Term Rent" },
              { value: "RERA", label: "Licensed Agency" },
              { value: "DTCM", label: "Compliant Management" },
              { value: "10-Step", label: "End-to-End Process" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-navy-dark text-2xl md:text-3xl font-bold font-serif">{s.value}</p>
                <p className="text-navy-dark/65 text-sm mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why list intro */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Your Property Could Earn More</p>
            <h2 className="font-serif text-4xl font-bold mb-5">Is your property leaving money on the table?</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              If your Dubai property is on a long-term tenancy, short-term holiday home rentals can earn up to 20% more — and with Keego Properties managing everything from listing to guest checkout, you don't need to do a thing.
            </p>
          </div>

          {/* Owner benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ownerBenefits.map((b) => (
              <div key={b.title} className="bg-card rounded-2xl border border-border p-6 shadow-[var(--shadow-card)]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold mb-4">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-base mb-2">{b.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">The Process</p>
            <h2 className="font-serif text-4xl font-bold">How It Works — Step by Step</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.number} className="bg-card rounded-2xl border border-border p-6 shadow-[var(--shadow-card)] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gold font-serif text-3xl font-bold opacity-25">{step.number}</span>
                  <div className="h-9 w-9 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                    <step.icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed flex-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why guests love it */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Guest Experience</p>
            <h2 className="font-serif text-4xl font-bold">Why Guests Love Staying in a Holiday Home</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guestBenefits.map((b) => (
              <div key={b.title} className="relative bg-navy-dark rounded-2xl p-7 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold mb-4 relative z-10">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-base mb-2 relative z-10">{b.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed relative z-10">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Keego + CTA */}
      <section id="enquire" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-start">

            {/* Why Keego */}
            <div>
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Why Choose Keego</p>
              <h2 className="font-serif text-4xl font-bold mb-4">Your property managed like it's our own.</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We are not a booking platform. We are a dedicated team of Dubai real estate professionals who handle every detail so you don't have to.
              </p>
              <div className="space-y-3 mb-10">
                {whyKeego.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-gold" />
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+971543912231">
                  <Button className="rounded-full bg-gold text-navy-dark font-semibold px-7 h-11 hover:bg-gold/90">
                    <Phone className="mr-2 w-4 h-4" /> Call Now
                  </Button>
                </a>
                <a href="https://wa.me/971543912231" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-full bg-transparent border border-navy-dark text-navy-dark hover:bg-navy-dark/10 font-semibold px-7 h-11">
                    <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp Us
                  </Button>
                </a>
                <a href="mailto:info@keegoproperties.com">
                  <Button variant="outline" className="rounded-full px-7 h-11">
                    <Mail className="mr-2 w-4 h-4" /> Email Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Enquiry form */}
            <div className="bg-card rounded-3xl border border-border p-8 shadow-[var(--shadow-card)]">
              <p className="text-gold font-medium uppercase tracking-[0.2em] text-xs mb-2">Free Consultation</p>
              <h3 className="font-serif text-2xl font-bold mb-2">Get a Holiday Home Estimate</h3>
              <p className="text-muted-foreground text-sm mb-7 leading-relaxed">
                Tell us about your property and we'll get back to you within 24 hours with a realistic earnings estimate.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <input
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <input
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <input
                  placeholder="Property community or address"
                  value={form.propertyAddress}
                  onChange={(e) => setForm((prev) => ({ ...prev, propertyAddress: e.target.value }))}
                  required
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                />
                <select
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                  value={form.propertyType}
                  onChange={(e) => setForm((prev) => ({ ...prev, propertyType: e.target.value }))}
                  required
                >
                  <option value="">Property type</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Townhouse</option>
                  <option>Penthouse</option>
                  <option>Other</option>
                </select>
                <textarea
                  placeholder="Any additional details (size, current rental status, any questions...)"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold resize-none"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-gold text-navy-dark font-semibold hover:bg-gold/90 h-11"
                >
                  {submitting ? "Submitting..." : "Request Free Consultation"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <Link href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(212,175,55,0.1),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Got Questions?</p>
              <h2 className="font-serif text-4xl font-bold text-white">Frequently Asked Questions</h2>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl px-8">
              {faqs.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gold">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-navy-dark mb-5">
            Ready to earn more from your property?
          </h2>
          <p className="text-navy-dark/65 max-w-xl mx-auto mb-10 text-lg">
            Join property owners across Dubai who trust Keego Properties to manage, market, and maximise their holiday homes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#enquire">
              <Button className="rounded-full bg-navy-dark text-white font-semibold px-10 h-12 hover:bg-navy-dark/90 text-base">
                Get a Free Consultation <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </a>
            <a href="https://wa.me/971543912231" target="_blank" rel="noopener noreferrer">
              <Button className="rounded-full bg-transparent border border-navy-dark text-navy-dark hover:bg-navy-dark/10 font-semibold px-10 h-12 text-base">
                <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HolidayHomes;
