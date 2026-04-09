import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const listingStats = [
  { label: "Active Listings", value: "1,240" },
  { label: "Verified Leads", value: "4,820" },
  { label: "Trusted Sellers", value: "980" },
];

const listingChartData = [
  { month: "Jan", listings: 42 },
  { month: "Feb", listings: 53 },
  { month: "Mar", listings: 68 },
  { month: "Apr", listings: 82 },
  { month: "May", listings: 96 },
  { month: "Jun", listings: 110 },
];

const benefits = [
  "Reach high-intent buyers across Dubai and beyond.",
  "Professional listing support with verified property exposure.",
  "Fast lead delivery and seller-friendly listing packages.",
  "Smart analytics to track listing performance in real time.",
];

const faqs = [
  {
    question: "How do I start listing my property?",
    answer: "Complete the contact form and our listing team will guide you through pricing, marketing, and legal support."
  },
  {
    question: "What documents do I need for listing?",
    answer: "We typically ask for property ownership documents, floor plans, and current photos so we can prepare a compelling listing."
  },
  {
    question: "Can I get a dedicated listing manager?",
    answer: "Yes — every seller receives a dedicated specialist who handles enquiries, viewings, and buyer follow-up."
  },
];

const ListProperty = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-12 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">List Your Property</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Reach buyers faster with a premium property listing.
          </h1>
          <p className="mx-auto max-w-3xl text-primary-foreground/70 leading-relaxed">
            List your property on Prime Properties and connect with qualified buyers, verified leads, and dedicated support tailored to your sale.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] items-start">
            <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
              <div className="mb-8">
                <p className="text-gold font-medium uppercase tracking-[0.2em] text-xs mb-2">Start Your Listing</p>
                <h2 className="font-serif text-3xl font-bold mb-4">List your property in minutes.</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out a quick form and our property listing team will review your details, prepare the best market presentation, and connect you to active buyers.
                </p>
              </div>
              <form className="space-y-4">
                <Input placeholder="Full name" />
                <Input type="email" placeholder="Email address" />
                <Input placeholder="Phone number" />
                <Input placeholder="Property address or community" />
                <Textarea placeholder="Tell us about your property and any special features" rows={5} />
                <Button className="w-full rounded-full bg-gold text-primary-foreground hover:bg-gold/90">Submit listing request</Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {listingStats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl bg-navy-dark/80 p-6 text-center shadow-[var(--shadow-card)]">
                    <p className="text-gold text-sm uppercase tracking-[0.2em] mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary-foreground">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-[2rem] overflow-hidden bg-gradient-to-br from-gold/20 via-transparent to-navy-dark border border-gold/20 p-6 shadow-[var(--shadow-card)]">
                <div className="mb-6">
                  <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Why list with us</p>
                  <h3 className="text-2xl font-semibold text-primary-foreground">The smarter way to sell.</h3>
                </div>
                <div className="space-y-3">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex gap-3 items-start">
                      <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gold text-navy-dark">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>
                      <p className="text-muted-foreground leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold uppercase tracking-[0.2em] text-sm mb-3">Listing performance</p>
            <h2 className="font-serif text-3xl font-bold">Listings that convert with confidence.</h2>
          </div>
          <div className="rounded-[2rem] bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={listingChartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cfcfcf" opacity={0.35} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: "rgba(255,255,255,0.08)" }} />
                  <Bar dataKey="listings" fill="#F59E0B" radius={[16, 16, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {faqs.map((item) => (
              <div key={item.question} className="rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
                <p className="text-xl font-semibold text-foreground mb-3">{item.question}</p>
                <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ListProperty;
