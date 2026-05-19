import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";

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
  createdAt: Timestamp;
}

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const snap = await getDocs(collection(db, "properties"));
        const propertiesData = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as Property))
          .filter(property => property.status === "available") // Only show available properties
          .sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()) // Sort by newest first
          .slice(0, 4); // Show only latest 4 properties
        setProperties(propertiesData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);
  return (
    <section id="featured-properties" className="py-20 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-navy/70 font-medium tracking-[0.2em] uppercase text-sm mb-2">
              Handpicked for You
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy-dark">
              Ready Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="hidden md:flex items-center gap-2 text-navy-dark font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
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
            {properties.length === 0 ? (
              <div className="col-span-4 text-center py-8">
                <p className="text-navy/80">No properties available at the moment.</p>
              </div>
            ) : (
              properties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))
            )}
          </div>
        )}

        <Link
          to="/properties"
          className="md:hidden flex items-center justify-center gap-2 text-navy-dark font-semibold mt-8"
        >
          View All Properties
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
