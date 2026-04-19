import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Developer {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string;
}

const Developers = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    getDocs(collection(db, "developers")).then((snap) => {
      setDevelopers(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Developer)));
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-8 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Developer Access</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Build smarter with our developer portal.
          </h1>
          <p className="text-primary-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Partner with KeeGo Properties to showcase your projects, connect with qualified buyers, and access premium marketing support across Dubai's best communities.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <div className="mb-8">
                <p className="text-gold uppercase tracking-[0.2em] text-xs mb-2">Why partner with us</p>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-4">A trusted launchpad for developers.</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our platform delivers exposure to high-intent investors, streamlined project listings, and a dedicated support team that helps you close more sales faster.
                </p>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                  <h3 className="font-semibold text-xl text-foreground mb-2">Project Showcase</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Promote off-plan and completed developments with premium listing placement, rich media, and performance analytics.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                  <h3 className="font-semibold text-xl text-foreground mb-2">Lead Generation</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Access verified buyer enquiries and receive tailored introductions from our sales specialists.
                  </p>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
                  <h3 className="font-semibold text-xl text-foreground mb-2">Market Intelligence</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Benefit from insights on pricing, demand, and community performance so you can make informed development decisions.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-gradient-to-br from-gold/20 via-transparent to-navy-dark border border-gold/20 p-8 shadow-[var(--shadow-card)]">
              <p className="text-gold uppercase tracking-[0.2em] text-xs mb-3">Developer partners</p>
              <h3 className="text-2xl font-semibold text-primary-foreground mb-6">Trusted names in Dubai development</h3>
              <div className="grid gap-4">
                {developers.length === 0 ? (
                  <p className="text-primary-foreground/50 text-sm">No developers listed yet.</p>
                ) : (
                  developers.map((dev) => (
                    <div key={dev.id} className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)] flex items-center gap-4">
                      {dev.logo && (
                        <img src={dev.logo} alt={dev.name} className="h-10 w-10 object-contain rounded flex-shrink-0" />
                      )}
                      <div>
                        {dev.website ? (
                          <a href={dev.website} target="_blank" rel="noopener noreferrer" className="font-medium text-foreground hover:text-primary transition-colors">
                            {dev.name}
                          </a>
                        ) : (
                          <span className="font-medium text-foreground">{dev.name}</span>
                        )}
                        {dev.description && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{dev.description}</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Developers;
