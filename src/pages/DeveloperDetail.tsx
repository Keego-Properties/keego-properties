import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { ArrowLeft, Building2, Globe, Phone, Mail, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/lib/firebase";

interface Developer {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  highlights?: string[] | string;
}

const normalizeHighlights = (value: Developer["highlights"]) => {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const DeveloperDetail = () => {
  const { id } = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [relatedDevelopers, setRelatedDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const developerDoc = await getDoc(doc(db, "developers", id));

        if (!developerDoc.exists()) {
          setLoading(false);
          return;
        }

        const currentDeveloper = {
          id: developerDoc.id,
          ...developerDoc.data(),
        } as Developer;

        setDeveloper(currentDeveloper);

        const allDevelopersSnap = await getDocs(collection(db, "developers"));
        const others = allDevelopersSnap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Developer))
          .filter((item) => item.id !== currentDeveloper.id)
          .slice(0, 4);

        setRelatedDevelopers(others);
      } catch (error) {
        console.error("Error fetching developer detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 text-center">
          <p className="text-muted-foreground">Loading developer details...</p>
        </section>
        <Footer />
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-36 pb-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Developer Not Found</h1>
          <Link to="/developers" className="text-gold hover:underline">Back to Developers</Link>
        </section>
        <Footer />
      </div>
    );
  }

  const highlights = normalizeHighlights(developer.highlights);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-36 pb-12 bg-navy-dark">
        <div className="container mx-auto px-4">
          <Link
            to="/developers"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/80 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Developers
          </Link>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-xs mb-2">Developer Profile</p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-white">{developer.name}</h1>
            </div>
            {developer.logo ? (
              <img
                src={developer.logo}
                alt={developer.name}
                className="h-24 w-auto max-w-[220px] rounded-xl bg-white/90 p-3 object-contain"
              />
            ) : (
              <div className="h-24 w-24 rounded-2xl bg-white/10 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-gold" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container mx-auto px-4 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About {developer.name}</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {developer.description?.trim() || "More information about this developer will be available soon."}
            </p>

            {highlights.length > 0 && (
              <div className="mt-6">
                <h3 className="font-serif text-lg font-bold text-foreground mb-3">Developer Highlights</h3>
                <div className="flex flex-wrap gap-2">
                  {highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="inline-flex items-center rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
            <h3 className="font-serif text-xl font-bold text-foreground mb-4">Contact Our Team</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Phone</p>
                  <a href="tel:+971543912231" className="text-sm font-medium text-foreground hover:text-gold transition-colors">
                    +971 54 391 2231
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <a href="mailto:info@keegoproperties.com" className="text-sm font-medium text-foreground hover:text-gold transition-colors break-all">
                    info@keegoproperties.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Address</p>
                  <p className="text-sm font-medium text-foreground">Wafi Residence Office Block : LHEU -FF-06, Al Razi Street, Dubai Health Care City, Dubai, UAE</p>
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gold px-4 py-2.5 text-sm font-semibold text-navy-dark transition-colors hover:bg-gold/90"
            >
              <Globe className="h-4 w-4" />
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>

      {relatedDevelopers.length > 0 && (
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Other Developers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedDevelopers.map((item) => (
                <Link
                  key={item.id}
                  to={`/developers/${item.id}`}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-20 items-center justify-center rounded-xl bg-muted/60 p-3">
                    {item.logo ? (
                      <img src={item.logo} alt={item.name} className="max-h-full w-auto object-contain" />
                    ) : (
                      <Building2 className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">{item.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default DeveloperDetail;