import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  highlights: string;
  propertiesCount: number;
  avgPrice: string;
  createdAt: Timestamp;
}

const Communities = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCommunities = async () => {
    try {
      const snap = await getDocs(collection(db, "communities"));
      const communitiesData = snap.docs.map(d => ({ id: d.id, ...d.data() } as Community));
      setCommunities(communitiesData);
    } catch (error) {
      console.error("Error fetching communities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-40 pb-8 sm:pt-32 bg-navy-dark">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Explore</p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Dubai Communities
            </h1>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">
              Loading communities...
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-40 pb-8 sm:pt-32 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Explore</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Dubai Communities
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Discover Dubai's most desirable neighborhoods and find the perfect community for your lifestyle.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {communities.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No communities available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {communities.map((community) => {
                const slug = community.name.toLowerCase().replace(/\s+/g, "-");
                return (
                  <Link key={community.id} to={`/community/${slug}`} className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover-lift block">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        width={800}
                        height={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-gold/90 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                          {community.propertiesCount} Properties
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                        {community.name}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {community.description}
                      </p>
                      <span className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300">
                        Explore Community
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Communities;
