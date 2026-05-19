import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  highlights: string;
  propertiesCount: number;
  avgPrice: string;
  featured: boolean;
  createdAt: Timestamp;
}

const isFeaturedCommunity = (value: unknown) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  if (typeof value === "number") return value === 1;
  return false;
};

const getCreatedAtMillis = (value: unknown) => {
  if (value && typeof value === "object" && "toMillis" in value && typeof (value as { toMillis?: unknown }).toMillis === "function") {
    return (value as { toMillis: () => number }).toMillis();
  }
  if (value instanceof Date) return value.getTime();
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const CommunitiesSection = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const snap = await getDocs(collection(db, "communities"));
        const all = snap.docs
          .map((d) => ({ id: d.id, ...d.data() } as Partial<Community>))
          .filter((community) => Boolean(community.name && community.image));

        const featured = all.filter((community) => isFeaturedCommunity(community.featured));
        const communitiesData = (featured.length > 0 ? featured : all)
          .sort((a, b) => getCreatedAtMillis(b.createdAt) - getCreatedAtMillis(a.createdAt))
          .slice(0, 4);

        setCommunities(communitiesData as Community[]);
      } catch (error) {
        console.error("Error fetching communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);
  const generateSlug = (name: string) => name.toLowerCase().trim().replace(/\s+/g, "-");

  return (
    <section className="py-20 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-navy/70 font-medium tracking-[0.2em] uppercase text-sm mb-2">
              Explore Dubai
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-dark">
              Featured Communities
            </h2>
          </div>
          <Link
            to="/communities"
            className="hidden md:flex items-center gap-2 text-navy-dark font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Communities
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[3/4] animate-pulse">
                <div className="w-full h-full bg-muted"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communities.length === 0 ? (
              <div className="col-span-4 text-center py-8">
                <p className="text-navy/80">No communities available at the moment.</p>
              </div>
            ) : (
              communities.map((community) => {
                const slug = generateSlug(community.name);
                return (
                  <Link
                    key={community.id}
                    to={`/community/${slug}`}
                    className="group relative rounded-2xl overflow-hidden aspect-[3/4] hover-lift"
                  >
                    <img
                      src={community.image}
                      alt={community.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-xl font-bold text-primary-foreground mb-1">
                        {community.name}
                      </h3>
                      <p className="text-primary-foreground/60 text-sm">
                        {community.propertiesCount} Properties
                      </p>
                      <div className="mt-3 w-8 h-8 rounded-full bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <ArrowRight className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunitiesSection;
