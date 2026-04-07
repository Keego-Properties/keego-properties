import { Heart, Bed, Bath, Maximize, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface PropertyCardProps {
  image: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  type: "sale" | "rent";
}

const PropertyCard = ({ image, title, price, location, beds, baths, area, type }: PropertyCardProps) => {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return (
    <Link to={`/property/${slug}`} className="block group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover-lift">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          width={800}
          height={600}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-gold text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
            For {type === "sale" ? "Sale" : "Rent"}
          </span>
        </div>
        <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-primary-foreground/80 backdrop-blur flex items-center justify-center hover:bg-primary-foreground transition-all text-muted-foreground hover:text-destructive">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5">
        <p className="text-gold font-bold text-lg mb-1">{price}</p>
        <h3 className="font-serif text-foreground font-semibold text-base mb-2 line-clamp-1 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
          <MapPin className="w-3.5 h-3.5" />
          {location}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-border text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4" />
            <span>{beds} Bed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4" />
            <span>{baths} Bath</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4" />
            <span>{area}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
