import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { defaultServices, iconMap, serviceContentMap, ServiceItem } from "@/lib/servicesData";

const Services = () => {
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

  const visibleServices = useMemo(() => {
    const source = services.length > 0 ? services : defaultServices;
    return source
      .filter((service) => service.status !== "draft")
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [services]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="bg-navy-dark pb-16 pt-32">
        <div className="container mx-auto px-4">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">Our Services</p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold text-primary-foreground md:text-5xl">
            Service divisions built for every stage of your Dubai property journey.
          </h1>
          <p className="mt-5 max-w-2xl leading-relaxed text-primary-foreground/70">
            From asset management and short-term rentals to mortgage, valuation, and investment strategy, KeeGo Properties delivers specialist support with one integrated team.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="py-12 text-center text-muted-foreground">Loading services...</div>
          ) : visibleServices.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">No services available right now.</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleServices.map((service) => {
                const Icon = iconMap[service.icon];
                const content = serviceContentMap[service.id];
                return (
              <article
                key={service.title}
                id={service.id}
                className="group rounded-[1.75rem] border border-border bg-card p-7 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold/20">
                  <Icon className="h-6 w-6" />
                </div>
                {content?.division && (
                  <p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-gold">{content.division}</p>
                )}
                <h2 className="mb-3 font-serif text-2xl font-bold text-foreground">{service.title}</h2>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <div className="flex items-center gap-4">
                  <Link
                    to={`/services/${service.id}`}
                    className="text-sm font-semibold uppercase tracking-[0.12em] text-gold transition-colors hover:text-gold-dark"
                  >
                    View details
                  </Link>
                  <Link
                    to="/contact"
                    className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Request service
                  </Link>
                </div>
              </article>
                );
              })}
            </div>
          )}

          <div className="mt-12 rounded-[2rem] border border-gold/30 bg-white p-8 text-center shadow-[var(--shadow-card)]">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-gold">Need custom support?</p>
            <h3 className="font-serif text-3xl font-bold text-foreground">Let us tailor a service plan for your goals.</h3>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Speak with our team to design a strategy for resale, leasing, or long-term investment across Dubai.
            </p>
            <div className="mt-6 flex justify-center">
              <Button asChild className="rounded-full bg-gold px-8 text-primary-foreground hover:bg-gold/90">
                <Link to="/contact">Talk to an expert</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
