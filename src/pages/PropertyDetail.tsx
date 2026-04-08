import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Heart, Bed, Bath, Maximize, MapPin, Phone, Mail, Share2, ChevronLeft, ChevronRight, Check, Building, Calendar, Layers, Car, Trees, Dumbbell, Waves, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const allProperties = [
  { image: property1, title: "Luxury Marina Apartment with Sea View", price: "AED 170,200 /yr", location: "Dubai Marina, Dubai", beds: 1, baths: 1, area: "823 sq-ft", type: "rent" as const, description: "Experience luxury waterfront living in this stunning 1-bedroom apartment in Dubai Marina. Featuring floor-to-ceiling windows with breathtaking sea views, premium finishes, and access to world-class amenities. The open-plan living and dining area is flooded with natural light, while the modern kitchen comes fully equipped with high-end appliances.", year: "2022", parking: "1", floors: "32nd", developer: "Emaar Properties", amenities: ["Swimming Pool", "Gym", "Concierge", "Parking", "Security", "Garden", "Beach Access", "Kids Play Area"] },
  { image: property2, title: "Modern Villa with Private Pool", price: "AED 3,000,000", location: "Palm Jumeirah, Dubai", beds: 4, baths: 5, area: "3,548 sq-ft", type: "sale" as const, description: "An exceptional modern villa situated on the prestigious Palm Jumeirah. This 4-bedroom masterpiece features a private infinity pool, landscaped garden, and direct beach access. The contemporary design incorporates smart home technology throughout, with premium marble flooring and custom Italian fixtures.", year: "2021", parking: "2", floors: "G+1", developer: "Nakheel", amenities: ["Private Pool", "Beach Access", "Gym", "Smart Home", "Garden", "Security", "Maid's Room", "Driver's Room"] },
  { image: property3, title: "Premium Penthouse | Panoramic Views", price: "AED 5,200,000", location: "Downtown Dubai", beds: 3, baths: 4, area: "4,815 sq-ft", type: "sale" as const, description: "A rare penthouse offering 360-degree panoramic views of the Burj Khalifa and Dubai Fountain. This exceptional 3-bedroom residence features double-height ceilings, a private terrace, and bespoke interiors crafted by world-renowned designers. The epitome of luxury living in Downtown Dubai.", year: "2023", parking: "3", floors: "Penthouse", developer: "Emaar Properties", amenities: ["Private Terrace", "Swimming Pool", "Gym", "Spa", "Concierge", "Valet Parking", "Wine Cellar", "Smart Home"] },
  { image: property4, title: "Family Townhouse | Garden View", price: "AED 2,042,000", location: "Dubai Hills Estate, Dubai", beds: 3, baths: 3, area: "2,100 sq-ft", type: "sale" as const, description: "A beautifully designed townhouse in the heart of Dubai Hills Estate, perfect for families. Overlooking lush green parks and the championship golf course, this 3-bedroom home offers contemporary living spaces, a private garden, and close proximity to top schools and shopping.", year: "2020", parking: "2", floors: "G+1", developer: "Meraas", amenities: ["Garden", "Community Pool", "Gym", "Parks", "Golf Course", "Schools Nearby", "Shopping Mall", "Cycling Tracks"] },
  { image: property3, title: "Spacious Apartment | Pool View", price: "AED 1,170,000", location: "JVC, Dubai", beds: 1, baths: 2, area: "846 sq-ft", type: "sale" as const, description: "A bright and spacious apartment in Jumeirah Village Circle offering stunning pool views. Modern open-plan design with quality finishes, built-in wardrobes, and a fully fitted kitchen. Perfect for investors or first-time buyers looking for value in a thriving community.", year: "2023", parking: "1", floors: "8th", developer: "Danube Properties", amenities: ["Swimming Pool", "Gym", "Garden", "Parking", "Security", "Kids Play Area", "BBQ Area", "Jogging Track"] },
  { image: property1, title: "Beachfront Studio | Fully Furnished", price: "AED 95,000 /yr", location: "JBR, Dubai", beds: 0, baths: 1, area: "520 sq-ft", type: "rent" as const, description: "A fully furnished beachfront studio in the vibrant JBR community. Wake up to stunning sea views every morning. This turnkey unit includes premium furniture, a fully equipped kitchen, and access to The Walk and the beach. Ideal for professionals or holiday home investors.", year: "2019", parking: "1", floors: "15th", developer: "Dubai Properties", amenities: ["Beach Access", "Swimming Pool", "Gym", "Concierge", "Parking", "Security", "Retail", "Restaurants"] },
  { image: property4, title: "Executive Villa | Golf Course View", price: "AED 8,500,000", location: "Emirates Hills, Dubai", beds: 5, baths: 6, area: "7,200 sq-ft", type: "sale" as const, description: "A magnificent executive villa in the prestigious Emirates Hills gated community. This 5-bedroom residence offers panoramic views of the Montgomerie Golf Course, a private pool, landscaped gardens, and luxurious interiors with marble flooring and custom woodwork throughout.", year: "2018", parking: "3", floors: "G+1", developer: "Emaar Properties", amenities: ["Private Pool", "Garden", "Golf Course", "Gym", "Security", "Maid's Room", "Driver's Room", "Smart Home"] },
  { image: property2, title: "Waterfront Apartment | Maid's Room", price: "AED 250,000 /yr", location: "Dubai Creek Harbour", beds: 2, baths: 3, area: "1,450 sq-ft", type: "rent" as const, description: "A premium waterfront apartment in Dubai Creek Harbour with stunning views of the creek and Dubai skyline. This spacious 2-bedroom unit includes a maid's room, modern kitchen, and access to world-class amenities. Located near the upcoming Dubai Creek Tower.", year: "2022", parking: "1", floors: "22nd", developer: "Emaar Properties", amenities: ["Swimming Pool", "Gym", "Garden", "Parking", "Security", "Concierge", "Kids Play Area", "Retail"] },
];

const amenityIcons: Record<string, React.ReactNode> = {
  "Swimming Pool": <Waves className="w-4 h-4" />,
  "Private Pool": <Waves className="w-4 h-4" />,
  "Community Pool": <Waves className="w-4 h-4" />,
  "Gym": <Dumbbell className="w-4 h-4" />,
  "Garden": <Trees className="w-4 h-4" />,
  "Parking": <Car className="w-4 h-4" />,
  "Valet Parking": <Car className="w-4 h-4" />,
  "Security": <ShieldCheck className="w-4 h-4" />,
  "Beach Access": <Waves className="w-4 h-4" />,
};

const PropertyDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [currentImage, setCurrentImage] = useState(0);

  const property = allProperties.find(p => generateSlug(p.title) === id);
  const otherProperties = allProperties.filter(p => generateSlug(p.title) !== id).slice(0, 3);

  if (!property) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Property Not Found</h1>
          <Link to="/properties" className="text-gold hover:underline">Back to Properties</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const images = [property.image, property2, property3, property4];

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Inquiry Sent!", description: "Our agent will contact you within 24 hours." });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Breadcrumb */}
      <section className="pt-24 pb-4 bg-muted">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-gold transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-foreground">{property.title}</span>
          </nav>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="pb-8 bg-muted">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <img
              src={images[currentImage]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            <button
              onClick={() => setCurrentImage(i => (i - 1 + images.length) % images.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentImage(i => (i + 1) % images.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentImage ? "bg-gold w-6" : "bg-background/60"}`}
                />
              ))}
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-gold text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                For {property.type === "sale" ? "Sale" : "Rent"}
              </span>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-all text-muted-foreground hover:text-destructive">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center hover:bg-background transition-all text-muted-foreground hover:text-foreground">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`rounded-xl overflow-hidden w-24 h-16 md:w-32 md:h-20 border-2 transition-all ${i === currentImage ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <p className="text-gold font-bold text-2xl md:text-3xl mb-2">{property.price}</p>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">{property.title}</h1>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{property.location}</span>
                </div>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: <Bed className="w-5 h-5" />, label: "Bedrooms", value: property.beds },
                  { icon: <Bath className="w-5 h-5" />, label: "Bathrooms", value: property.baths },
                  { icon: <Maximize className="w-5 h-5" />, label: "Area", value: property.area },
                  { icon: <Building className="w-5 h-5" />, label: "Floor", value: property.floors },
                  { icon: <Car className="w-5 h-5" />, label: "Parking", value: property.parking },
                  { icon: <Calendar className="w-5 h-5" />, label: "Built", value: property.year },
                  { icon: <Layers className="w-5 h-5" />, label: "Type", value: property.type === "sale" ? "Sale" : "Rent" },
                  { icon: <ShieldCheck className="w-5 h-5" />, label: "Developer", value: property.developer },
                ].map((item, i) => (
                  <div key={i} className="bg-muted rounded-xl p-4 text-center">
                    <div className="flex justify-center text-gold mb-2">{item.icon}</div>
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <p className="font-semibold text-foreground text-sm">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-4">Amenities & Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {property.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-muted rounded-lg px-3 py-2.5">
                      <span className="text-gold">{amenityIcons[amenity] || <Check className="w-4 h-4" />}</span>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground mb-4">Location</h2>
                <div className="bg-muted rounded-2xl h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="w-8 h-8 mx-auto mb-2 text-gold" />
                    <p className="font-medium">{property.location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Agent Contact */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-navy mx-auto mb-3 flex items-center justify-center text-primary-foreground font-serif text-xl font-bold">
                    DA
                  </div>
                  <h3 className="font-serif font-bold text-foreground">Dubai Agent</h3>
                  <p className="text-sm text-muted-foreground">Senior Property Consultant</p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-gold hover:bg-gold/90 text-primary-foreground rounded-full">
                    <Phone className="w-4 h-4 mr-1" /> Call
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-full">
                    <Mail className="w-4 h-4 mr-1" /> Email
                  </Button>
                </div>

                <form onSubmit={handleInquiry} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-gold/50 placeholder:text-muted-foreground"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2.5 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-gold/50 placeholder:text-muted-foreground"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2.5 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-gold/50 placeholder:text-muted-foreground"
                  />
                  <textarea
                    placeholder="I'm interested in this property..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg bg-muted text-sm outline-none focus:ring-2 focus:ring-gold/50 placeholder:text-muted-foreground resize-none"
                  />
                  <Button type="submit" className="w-full bg-navy hover:bg-navy-dark text-primary-foreground rounded-full">
                    Send Inquiry
                  </Button>
                </form>

                <p className="text-xs text-center text-muted-foreground">
                  By submitting, you agree to our Terms & Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Properties */}
      <section className="py-12 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProperties.map((p, i) => (
              <Link key={i} to={`/property/${generateSlug(p.title)}`}>
                <PropertyCard {...p} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
