import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Search } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  type: "sale" | "rent";
  status: "available" | "sold" | "rented";
  image: string;
  category?: string;
}

const Properties = () => {
  const location = useLocation();
  const [activeType, setActiveType] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(location.search);
  const typeParam = params.get("type");
  const lockedType = typeParam === "buy" ? "sale" : typeParam === "rent" ? "rent" : null;
  const effectiveType = lockedType ?? activeType;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get("type");
    const categoryParam = params.get("category");

    setActiveType(
      typeParam === "buy"
        ? "sale"
        : typeParam === "rent"
        ? "rent"
        : "all"
    );
    setActiveCategory(categoryParam ? decodeURIComponent(categoryParam) : "all");
  }, [location.search]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snap = await getDocs(collection(db, "properties"));
        const fetchedProperties = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as Property));
        setProperties(fetchedProperties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const filtered = properties.filter((p) => {
    const typeMatches = effectiveType === "all" || p.type === effectiveType;
    const categoryMatches =
      activeCategory === "all" || (p.category?.toLowerCase() === activeCategory.toLowerCase());
    return typeMatches && categoryMatches;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-8 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Discover</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            {activeCategory === "all"
              ? "Our Properties"
              : `${activeCategory}${effectiveType === "all" ? "" : ` for ${effectiveType === "sale" ? "Sale" : "Rent"}`}`}
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            {activeCategory === "all"
              ? "Browse our curated selection of premium properties across Dubai's most sought-after communities."
              : `Showing ${activeCategory.toLowerCase()}${effectiveType === "all" ? "" : ` for ${effectiveType === "sale" ? "sale" : "rent"}`}.`}
          </p>
        </div>
      </section>

      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2 flex-wrap">
              {lockedType ? (
                <span className="px-5 py-2 rounded-full text-sm font-medium bg-navy text-primary-foreground">
                  {lockedType === "sale" ? "For Sale" : "For Rent"}
                </span>
              ) : (
                ["all", "sale", "rent"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                      activeType === type
                        ? "bg-navy text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-navy/10"
                    }`}
                  >
                    {type === "all" ? "All" : type === "sale" ? "For Sale" : "For Rent"}
                  </button>
                ))
              )}
              {activeCategory !== "all" && (
                <span className="px-4 py-2 rounded-full text-sm font-medium bg-muted text-muted-foreground">
                  {activeCategory}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search properties..."
                className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-48"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <p className="text-muted-foreground text-sm mb-6">
            {loading ? "Loading properties..." : `${filtered.length} properties found`}
          </p>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] animate-pulse">
                  <div className="aspect-[4/3] bg-muted"></div>
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="flex gap-4 pt-4">
                      <div className="h-4 bg-muted rounded w-16"></div>
                      <div className="h-4 bg-muted rounded w-16"></div>
                      <div className="h-4 bg-muted rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No properties found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Properties;
