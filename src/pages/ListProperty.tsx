import { useState } from "react";
import { CheckCircle2, ArrowRight, Building2, Users, TrendingUp, Shield, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

const stats = [
  { label: "Active Listings", value: "1,240+" },
  { label: "Verified Leads", value: "4,820+" },
  { label: "Trusted Sellers", value: "980+" },
  { label: "Avg. Days to Offer", value: "18" },
];

const steps = [
  {
    number: "01",
    title: "Submit Your Details",
    desc: "Fill in the quick form with your property information and preferred contact time.",
  },
  {
    number: "02",
    title: "Expert Review",
    desc: "A dedicated listing specialist reviews your property and prepares a tailored market strategy.",
  },
  {
    number: "03",
    title: "Premium Exposure",
    desc: "Your listing goes live across our platform, reaching qualified buyers in Dubai and globally.",
  },
  {
    number: "04",
    title: "Close the Deal",
    desc: "We manage viewings, negotiations, and documentation — right through to handover.",
  },
];

const benefits = [
  { icon: Users, title: "High-Intent Buyers", desc: "Access our verified pool of active buyers across Dubai and international markets." },
  { icon: TrendingUp, title: "Market Insights", desc: "Receive a free property valuation report and market comparison before listing." },
  { icon: Building2, title: "Full Listing Support", desc: "Professional photography guidance, floor plan prep, and compelling copy — all included." },
  { icon: Shield, title: "Dedicated Specialist", desc: "One point of contact who handles enquiries, viewings, and buyer follow-up for you." },
];

const faqs = [
  {
    q: "How do I start listing my property?",
    a: "Complete the contact form and our listing team will guide you through pricing, marketing, and legal support — usually within 24 hours.",
  },
  {
    q: "What documents do I need for listing?",
    a: "We typically ask for property ownership documents, floor plans, and current photos so we can prepare a compelling listing.",
  },
  {
    q: "Can I get a dedicated listing manager?",
    a: "Yes — every seller receives a dedicated specialist who handles enquiries, viewings, and buyer follow-up.",
  },
  {
    q: "How long does it take to list my property?",
    a: "Once we receive your details and documents, your listing can go live within 48 hours.",
  },
  {
    q: "Is there a fee to list my property?",
    a: "Contact our team to discuss listing packages. We offer flexible options tailored to your property type and goals.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-medium text-foreground hover:text-gold transition-colors"
      >
        <span>{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <p className="pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      )}
    </div>
  );
}

const ListProperty = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    propertyType: "",
    listingPurpose: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await addDoc(collection(db, "submissions"), {
        source: "list_property",
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        propertyName: form.propertyAddress.trim(),
        category: form.propertyType,
        lookingTo: form.listingPurpose,
        message: form.message.trim(),
        createdAt: Timestamp.now(),
      });

      toast({
        title: "Request submitted",
        description: "Our listing specialist will contact you within 24 hours.",
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        propertyAddress: "",
        propertyType: "",
        listingPurpose: "",
        message: "",
      });
    } catch (error) {
      console.error("List property form submission failed:", error);
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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-navy-dark overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">List Your Property</p>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              Sell smarter.<br />Reach the right buyers.
            </h1>
            <p className="text-primary-foreground/65 text-lg leading-relaxed mb-10 max-w-xl">
              List your property with Keego Properties and connect with qualified buyers, verified leads, and a team that handles everything — from listing to handover.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#list-form">
                <Button className="rounded-full bg-gold text-navy-dark font-semibold px-8 py-3 hover:bg-gold/90 h-auto">
                  List My Property <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a href="tel:+971543912231">
                <Button variant="outline" className="rounded-full border-gold text-white bg-transparent hover:bg-gold/10 px-8 py-3 h-auto">
                  <Phone className="mr-2 w-4 h-4" /> Call Us
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gold py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-navy-dark text-3xl font-bold font-serif">{s.value}</p>
                <p className="text-navy-dark/70 text-sm mt-1 font-medium">{s.label}</p>
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
            <h2 className="font-serif text-4xl font-bold">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-gold/40 to-transparent z-0" />
                )}
                <div className="relative z-10 bg-card rounded-2xl p-7 border border-border shadow-[var(--shadow-card)] h-full">
                  <span className="text-gold font-serif text-4xl font-bold opacity-30">{step.number}</span>
                  <h3 className="font-semibold text-lg mt-3 mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why list + Form */}
      <section id="list-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-start">

            {/* Benefits */}
            <div>
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Why List With Us</p>
              <h2 className="font-serif text-4xl font-bold mb-10">Everything you need to sell with confidence.</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {benefits.map((b) => (
                  <div key={b.title} className="bg-card rounded-2xl border border-border p-6 shadow-[var(--shadow-card)]">
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold mb-4">
                      <b.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-base mb-2">{b.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>

              {/* Contact strip */}
              <div className="mt-10 rounded-2xl bg-navy-dark p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1">
                  <p className="text-primary-foreground font-semibold mb-1">Prefer to talk to someone?</p>
                  <p className="text-primary-foreground/55 text-sm">Our listing team is available Sun–Thu, 9AM–6PM.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:+971543912231" className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:underline">
                    <Phone className="w-3.5 h-3.5" /> +971 54 391 2231
                  </a>
                  <a href="mailto:info@keegoproperties.com" className="inline-flex items-center gap-2 text-gold text-sm font-medium hover:underline">
                    <Mail className="w-3.5 h-3.5" /> info@keegoproperties.com
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sticky top-28">
              <p className="text-gold font-medium uppercase tracking-[0.2em] text-xs mb-2">Start Your Listing</p>
              <h2 className="font-serif text-2xl font-bold mb-2">List your property in minutes.</h2>
              <p className="text-muted-foreground text-sm mb-7 leading-relaxed">
                Fill in your details and a dedicated specialist will reach out within 24 hours.
              </p>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))}
                    required
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Property community or address"
                  value={form.propertyAddress}
                  onChange={(e) => setForm((prev) => ({ ...prev, propertyAddress: e.target.value }))}
                  required
                />
                <div className="grid grid-cols-2 gap-4">
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
                    <option>Office</option>
                    <option>Other</option>
                  </select>
                  <select
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-muted-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                    value={form.listingPurpose}
                    onChange={(e) => setForm((prev) => ({ ...prev, listingPurpose: e.target.value }))}
                    required
                  >
                    <option value="">Listing purpose</option>
                    <option>For Sale</option>
                    <option>For Rent</option>
                  </select>
                </div>
                <Textarea
                  placeholder="Any additional details about the property (size, floors, features...)"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-full bg-gold text-navy-dark font-semibold hover:bg-gold/90 h-11"
                >
                  {submitting ? "Submitting..." : "Submit Listing Request"} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  By submitting, you agree to our{" "}
                  <a href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Got Questions?</p>
              <h2 className="font-serif text-4xl font-bold">Frequently asked questions</h2>
            </div>
            <div className="bg-card rounded-3xl border border-border px-8 shadow-[var(--shadow-card)]">
              {faqs.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-navy-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(212,175,55,0.12),transparent_60%)]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-4">Ready to Sell?</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Let's find the right buyer for your property.
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto mb-10">
            Join hundreds of sellers who trust Keego Properties to market, manage, and close their property deals in Dubai.
          </p>
          <a href="#list-form">
            <Button className="rounded-full bg-gold text-navy-dark font-semibold px-10 py-3 hover:bg-gold/90 h-auto text-base">
              Get Started Today <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ListProperty;
