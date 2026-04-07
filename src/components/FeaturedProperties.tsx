import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const properties = [
  {
    image: property1,
    title: "Luxury Marina Apartment with Sea View",
    price: "AED 170,200 /yr",
    location: "Dubai Marina, Dubai",
    beds: 1,
    baths: 1,
    area: "823 sq-ft",
    type: "rent" as const,
  },
  {
    image: property2,
    title: "Modern Villa with Private Pool",
    price: "AED 3,000,000",
    location: "Palm Jumeirah, Dubai",
    beds: 4,
    baths: 5,
    area: "3,548 sq-ft",
    type: "sale" as const,
  },
  {
    image: property3,
    title: "Premium Penthouse | Panoramic Views",
    price: "AED 5,200,000",
    location: "Downtown Dubai",
    beds: 3,
    baths: 4,
    area: "4,815 sq-ft",
    type: "sale" as const,
  },
  {
    image: property4,
    title: "Family Townhouse | Garden View",
    price: "AED 2,042,000",
    location: "Dubai Hills Estate, Dubai",
    beds: 3,
    baths: 3,
    area: "2,100 sq-ft",
    type: "sale" as const,
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">
              Handpicked for You
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Ready Properties
            </h2>
          </div>
          <Link
            to="/properties"
            className="hidden md:flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all duration-300"
          >
            View All Properties
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>

        <Link
          to="/properties"
          className="md:hidden flex items-center justify-center gap-2 text-gold font-medium mt-8"
        >
          View All Properties
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
