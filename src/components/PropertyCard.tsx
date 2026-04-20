import { Bed, Bath, Maximize, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

interface PropertyCardProps {
  id?: string;
  image: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  area: string;
  type: "sale" | "rent";
  category?: string;
}

const PropertyCard = ({ id, image, title, price, location, beds, baths, area, type, category }: PropertyCardProps) => {
  const propertyPath = id ?? generateSlug(title);
  return (
    <Link
      to={`/property/${propertyPath}`}
      className="block group relative bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          width={800}
          height={600}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gold/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            {category || "Property"} · {type === "sale" ? "For Sale" : "For Rent"}
          </span>
        </div>

        {/* Arrow icon */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-2">
            <ArrowUpRight className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Price pinned on image bottom */}
        <div className="absolute bottom-4 left-4">
          <p className="text-white font-bold text-xl tracking-tight drop-shadow-lg">{price}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="font-serif text-foreground font-semibold text-base line-clamp-1 group-hover:text-gold transition-colors duration-300">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-gold/30 via-border to-transparent" />

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="bg-gold/10 rounded-md p-1.5">
              <Bed className="w-3.5 h-3.5 text-gold" />
            </div>
            <span>{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-gold/10 rounded-md p-1.5">
              <Bath className="w-3.5 h-3.5 text-gold" />
            </div>
            <span>{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="bg-gold/10 rounded-md p-1.5">
              <Maximize className="w-3.5 h-3.5 text-gold" />
            </div>
            <span>{area}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
