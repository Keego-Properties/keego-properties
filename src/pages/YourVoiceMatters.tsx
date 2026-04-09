import { Heart, MessageCircle, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const feedbackHighlights = [
  { value: "4.9/5", label: "Average client score" },
  { value: "98%", label: "Repeat customer rate" },
  { value: "1,850+", label: "verified feedbacks" },
];

const testimonials = [
  {
    name: "Aisha Al Mazrouei",
    role: "Investor",
    quote: "Prime Properties made my sale easy, quick, and transparent. The feedback team listened and improved the whole process.",
  },
  {
    name: "Omar Khalid",
    role: "Home Buyer",
    quote: "I felt heard from the first conversation. Their team used my feedback to tailor a service that actually matched my needs.",
  },
  {
    name: "Sara Hassan",
    role: "Seller",
    quote: "The customer experience was smooth and the support was always responsive. A service designed around the client.",
  },
];

const featureCards = [
  { icon: MessageCircle, title: "Share freely", description: "Tell us exactly what worked for you and what could improve." },
  { icon: TrendingUp, title: "We act fast", description: "Your feedback helps our team refine service quality immediately." },
  { icon: Sparkles, title: "Better experiences", description: "Every review makes the next client journey smoother and more reliable." },
];

const YourVoiceMatters = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-12 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">Customer Feedback</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Your voice matters to every experience.
          </h1>
          <p className="mx-auto max-w-3xl text-primary-foreground/70 leading-relaxed">
            Share your story and help us improve the way Dubai buys, sells, and values property. Your feedback shapes our service and supports future clients.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {feedbackHighlights.map((item) => (
              <div key={item.label} className="rounded-[2rem] bg-card p-8 text-center shadow-[var(--shadow-card)]">
                <p className="text-4xl font-bold text-foreground mb-2">{item.value}</p>
                <p className="text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] bg-card p-8 shadow-[var(--shadow-card)]">
              <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Why feedback matters</p>
              <h2 className="font-serif text-3xl font-bold mb-4">Every review improves the experience.</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our customers are the best source of insight. We use every comment to refine communication, speed, and reliability across every listing and valuation service.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featureCards.map((feature) => (
                <div key={feature.title} className="rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <p className="text-gold uppercase tracking-[0.2em] text-xs mb-3">Share your experience</p>
            <h3 className="font-serif text-3xl font-bold mb-5">Let us know how we did.</h3>
            <form className="space-y-4">
              <Input placeholder="Name" />
              <Input type="email" placeholder="Email" />
              <Input placeholder="Property or service used" />
              <Textarea placeholder="Tell us about your experience" rows={5} />
              <Button className="w-full rounded-full bg-gold text-primary-foreground hover:bg-gold/90">Submit feedback</Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-gold uppercase tracking-[0.2em] text-sm mb-3">Trusted voices</p>
            <h2 className="font-serif text-3xl font-bold text-primary-foreground">Real stories from satisfied clients.</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-[2rem] bg-card p-8 shadow-[var(--shadow-card)]">
                <p className="text-muted-foreground leading-relaxed mb-6">“{item.quote}”</p>
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-border bg-card p-10 shadow-[var(--shadow-card)]">
            <Heart className="mx-auto mb-4 h-12 w-12 rounded-3xl bg-gold/10 p-3 text-gold" />
            <h3 className="font-serif text-3xl font-bold mb-3">Feedback drives better service.</h3>
            <p className="text-muted-foreground leading-relaxed">
              We review every submission and use customer insights to refine our listings, valuation process, and support. When you share your voice, we make the next experience stronger.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default YourVoiceMatters;
