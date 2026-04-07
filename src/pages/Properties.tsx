import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const allProperties = [
  { image: property1, title: "Luxury Marina Apartment with Sea View", price: "AED 170,200 /yr", location: "Dubai Marina, Dubai", beds: 1, baths: 1, area: "823 sq-ft", type: "rent" as const },
  { image: property2, title: "Modern Villa with Private Pool", price: "AED 3,000,000", location: "Palm Jumeirah, Dubai", beds: 4, baths: 5, area: "3,548 sq-ft", type: "sale" as const },
  { image: property3, title: "Premium Penthouse | Panoramic Views", price: "AED 5,200,000", location: "Downtown Dubai", beds: 3, baths: 4, area: "4,815 sq-ft", type: "sale" as const },
  { image: property4, title: "Family Townhouse | Garden View", price: "AED 2,042,000", location: "Dubai Hills Estate, Dubai", beds: 3, baths: 3, area: "2,100 sq-ft", type: "sale" as const },
  { image: property3, title: "Spacious Apartment | Pool View", price: "AED 1,170,000", location: "JVC, Dubai", beds: 1, baths: 2, area: "846 sq-ft", type: "sale" as const },
  { image: property1, title: "Beachfront Studio | Fully Furnished", price: "AED 95,000 /yr", location: "JBR, Dubai", beds: 0, baths: 1, area: "520 sq-ft", type: "rent" as const },
  { image: property4, title: "Executive Villa | Golf Course View", price: "AED 8,500,000", location: "Emirates Hills, Dubai", beds: 5, baths: 6, area: "7,200 sq-ft", type: "sale" as const },
  { image: property2, title: "Waterfront Apartment | Maid's Room", price: "AED 250,000 /yr", location: "Dubai Creek Harbour", beds: 2, baths: 3, area: "1,450 sq-ft", type: "rent" as const },
];

const Properties = () => {
  const [activeType, setActiveType] = useState("all");

  const filtered = activeType === "all" ? allProperties : allProperties.filter(p => p.type === activeType);

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-8 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Discover</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Our Properties
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Browse our curated selection of premium properties across Dubai's most sought-after communities.
          </p>
        </div>
      </section>

      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {["all", "sale", "rent"].map((type) => (
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
              ))}
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
          <p className="text-muted-foreground text-sm mb-6">{filtered.length} properties found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((property, index) => (
              <PropertyCard key={index} {...property} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Properties;
