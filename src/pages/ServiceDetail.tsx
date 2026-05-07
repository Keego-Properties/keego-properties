import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { defaultServices, iconMap, serviceContentMap, ServiceItem } from "@/lib/servicesData";

const callHref = "tel:+971501234567";
const whatsappHref = "https://wa.me/971501234567";

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
  const detailContent = id ? serviceContentMap[id] : undefined;

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="bg-navy-dark pb-14 pt-32">
        <div className="container mx-auto px-4">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <div className="max-w-4xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">
              {detailContent?.division ?? "Service Detail"}
            </p>
            <h1 className="font-serif text-4xl font-bold text-primary-foreground md:text-5xl leading-tight mb-5">
              {service.title}
            </h1>
            <p className="max-w-3xl leading-relaxed text-primary-foreground/75">
              {detailContent?.intro ?? service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-cream">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Our Services</h2>
            {detailContent?.lifecycle && (
              <p className="text-muted-foreground leading-relaxed mb-6">{detailContent.lifecycle}</p>
            )}
            {!detailContent?.lifecycle && (
              <p className="text-muted-foreground leading-relaxed mb-6">
                We provide end-to-end support for this service division, combining local market expertise,
                structured execution, and transparent communication to deliver measurable outcomes.
              </p>
            )}

            <div className="grid gap-4">
              {(detailContent?.services ?? [
                {
                  title: "Specialist Advisory",
                  description: "Dedicated consultation tailored to your property goals, timeline, and budget.",
                },
                {
                  title: "Execution Support",
                  description: "Practical support across planning, coordination, and transaction milestones.",
                },
                {
                  title: "Reporting & Guidance",
                  description: "Clear updates and strategic recommendations to help you make confident decisions.",
                },
              ]).map((item) => (
                <div key={item.title} className="rounded-xl bg-muted/40 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {detailContent?.whyChoose && (
              <div className="mt-8 rounded-2xl border border-gold/25 bg-gold/5 p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-gold mb-2">Why Choose Keego Properties</p>
                <p className="text-sm leading-relaxed text-foreground/90">{detailContent.whyChoose}</p>
              </div>
            )}

            {!!detailContent?.faqs?.length && (
              <div className="mt-8">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h3>
                <div className="grid gap-3">
                  {detailContent.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-xl border border-border bg-card px-4 py-3">
                      <p className="text-sm font-semibold text-foreground mb-1">{faq.question}</p>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 rounded-2xl bg-navy-dark p-6 text-primary-foreground">
              <p className="text-sm uppercase tracking-[0.12em] text-gold mb-2">Consultation CTA</p>
              <h4 className="font-serif text-2xl font-bold mb-4">{detailContent?.ctaTitle ?? "Talk to our service team"}</h4>
              <div className="flex flex-wrap gap-3">
                <Button asChild className="rounded-full bg-gold text-primary-foreground hover:bg-gold/90">
                  <a href={callHref}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-5">Other Services</h3>
            <div className="space-y-3">
              {relatedServices.map((item) => {
                const RelatedIcon = iconMap[item.icon];
                return (
                  <Link
                    key={item.id}
                    to={`/services/${item.id}`}
                    className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted/40"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold/10 text-gold">
                      <RelatedIcon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium text-foreground">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
