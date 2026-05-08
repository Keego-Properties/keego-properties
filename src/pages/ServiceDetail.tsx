import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle, ChevronRight, Star, Shield, TrendingUp, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { defaultServices, iconMap, serviceContentMap, ServiceItem, ServicePageContent } from "@/lib/servicesData";

const callHref = "tel:+971543912231";
const whatsappHref = "https://wa.me/971543912231";

const ServiceDetail = () => {
  const { id } = useParams();
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const snap = await getDocs(collection(db, "services"));
        setServices(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ServiceItem)));
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const source = useMemo(() => {
    if (services.length === 0) return defaultServices;
    return services
      .filter((service) => service.status !== "draft")
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [services]);

  const service = source.find((item) => item.id === id);
  const relatedServices = source.filter((item) => item.id !== id).slice(0, 3);
  const detailContent = useMemo(() => {
    const fromDb = service as ServicePageContent | undefined;
    if (fromDb?.services?.length || fromDb?.faqs?.length || fromDb?.intro || fromDb?.division) {
      return fromDb;
    }
    return id ? serviceContentMap[id] : undefined;
  }, [id, service]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 text-center">
          <p className="text-muted-foreground">Loading service...</p>
        </section>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/services" className="text-gold hover:underline">Back to Services</Link>
        </section>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[service.icon];
  const serviceBlocks = detailContent?.services ?? [
    { title: "Specialist Advisory", description: "Dedicated consultation tailored to your property goals, timeline, and budget." },
    { title: "Execution Support", description: "Practical support across planning, coordination, and transaction milestones." },
    { title: "Reporting & Guidance", description: "Clear updates and strategic recommendations to help you make confident decisions." },
  ];

  const trustBadges = [
    { icon: Star, label: "Premium Quality" },
    { icon: Shield, label: "Fully Compliant" },
    { icon: TrendingUp, label: "Market-Led Strategy" },
    { icon: Clock, label: "End-to-End Support" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-foreground">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[75vh] flex-col justify-end overflow-hidden bg-navy-dark pb-0 pt-40">
        {service.image ? (
          <div className="absolute inset-0">
            <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/60 via-navy-dark/70 to-navy-dark" />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy-dark via-[#1a2540] to-[#0d1a2e]" />
        )}

        {/* glow accents */}
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-gold/8 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-72 w-72 rounded-full bg-blue-400/8 blur-[100px]" />

        <div className="container relative z-10 mx-auto px-4 pb-0">
          {/* breadcrumb */}
          <Link
            to="/services"
            className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition hover:border-gold/40 hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Services
          </Link>

          {/* title block */}
          <div className="max-w-3xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              <Icon className="h-3.5 w-3.5" />
              {detailContent?.division ?? "Premium Service"}
            </span>
            <h1 className="font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/65">
              {detailContent?.intro ?? service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-full bg-gold px-7 py-2.5 text-navy-dark font-semibold hover:bg-gold/90">
                <a href={callHref}><Phone className="mr-2 h-4 w-4" />Call Now</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white/30 bg-white/10 px-7 text-white backdrop-blur-sm hover:bg-white/20">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />WhatsApp Us
                </a>
              </Button>
            </div>
          </div>

          {/* trust strip */}
          <div className="mt-14 grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 md:grid-cols-4">
            {trustBadges.map(({ icon: BadgeIcon, label }) => (
              <div key={label} className="flex items-center gap-2.5 px-6 py-4">
                <BadgeIcon className="h-4 w-4 shrink-0 text-gold" />
                <span className="text-xs font-medium text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BODY ─────────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">

            {/* LEFT COLUMN */}
            <div className="space-y-10">

              {/* Lifecycle highlight */}
              {detailContent?.lifecycle && (
                <div className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold/10 via-[#fdf6e3] to-white px-8 py-7">
                  <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-gold/10 blur-2xl" />
                  <p className="relative text-base leading-relaxed text-foreground/85 font-medium italic">
                    "{detailContent.lifecycle}"
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="h-px flex-1 bg-gold/30" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold">Keego Properties</span>
                  </div>
                </div>
              )}

              {/* Service breakdown */}
              <div>
                <div className="mb-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gold">What We Offer</p>
                    <h2 className="font-serif text-3xl font-bold text-foreground mt-1">Service Breakdown</h2>
                  </div>
                </div>

                <div className="space-y-4">
                  {serviceBlocks.map((item, idx) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-white px-6 py-5 shadow-sm transition hover:shadow-md hover:border-gold/30"
                    >
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-gold/60 to-transparent rounded-l-2xl" />
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F8F6F1] text-lg font-bold text-gold font-serif">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Choose */}
              {detailContent?.whyChoose && (
                <div className="relative overflow-hidden rounded-3xl bg-navy-dark px-8 py-10 text-primary-foreground">
                  <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold/10 blur-3xl" />
                  <div className="absolute -left-6 bottom-0 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl" />
                  <p className="relative mb-2 text-xs font-semibold uppercase tracking-widest text-gold">Why Choose Us</p>
                  <h3 className="relative font-serif text-2xl font-bold mb-4">The Keego Difference</h3>
                  <p className="relative max-w-2xl text-sm leading-relaxed text-primary-foreground/75">
                    {detailContent.whyChoose}
                  </p>
                </div>
              )}

              {/* FAQ */}
              {!!detailContent?.faqs?.length && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-1">Got Questions?</p>
                  <h3 className="font-serif text-3xl font-bold text-foreground mb-6">Frequently Asked</h3>
                  <div className="space-y-3">
                    {detailContent.faqs.map((faq, idx) => (
                      <details
                        key={faq.question}
                        className="group rounded-2xl border border-border/60 bg-white open:border-gold/30 open:shadow-sm transition"
                      >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5">
                          <span className="font-semibold text-sm text-foreground">{faq.question}</span>
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border group-open:border-gold group-open:bg-gold/10 transition">
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-open:rotate-90 group-open:text-gold transition-transform" />
                          </span>
                        </summary>
                        <div className="border-t border-border/50 px-6 pb-5 pt-4">
                          <p className="text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-6 lg:sticky lg:top-28 lg:self-start">

              {/* CTA Card */}
              <div className="relative overflow-hidden rounded-3xl bg-navy-dark p-7 text-primary-foreground">
                <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gold/15 blur-2xl" />
                <div className="relative">
                  <span className="mb-4 inline-block rounded-full bg-gold/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold">
                    Free Consultation
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-snug mb-3">
                    {detailContent?.ctaTitle ?? "Speak with our specialists"}
                  </h3>
                  <p className="text-sm text-primary-foreground/65 mb-6 leading-relaxed">
                    Get tailored advice built around your property goals — no obligation.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Button asChild className="w-full rounded-full bg-gold font-semibold text-navy-dark hover:bg-gold/90">
                      <a href={callHref}><Phone className="mr-2 h-4 w-4" />Call Now</a>
                    </Button>
                    <Button asChild variant="outline" className="w-full rounded-full border-white/25 bg-white/10 text-white hover:bg-white/20">
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />WhatsApp Us
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Icon card */}
              <div className="flex items-center gap-4 rounded-2xl border border-gold/20 bg-white px-5 py-4 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-gold">{detailContent?.division ?? "Service"}</p>
                  <p className="font-semibold text-foreground">{service.title}</p>
                </div>
              </div>

              {/* Other Services */}
              <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-foreground mb-4">Other Services</h3>
                <div className="space-y-2">
                  {relatedServices.map((item) => {
                    const RelatedIcon = iconMap[item.icon];
                    return (
                      <Link
                        key={item.id}
                        to={`/services/${item.id}`}
                        className="flex items-center justify-between gap-3 rounded-xl border border-border/50 px-4 py-3 transition hover:border-gold/30 hover:bg-[#F8F6F1]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold/10 text-gold">
                            <RelatedIcon className="h-4 w-4" />
                          </span>
                          <span className="text-sm font-medium text-foreground">{item.title}</span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    );
                  })}
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

export default ServiceDetail;
