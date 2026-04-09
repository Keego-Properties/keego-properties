import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { collection, getDoc, getDocs, query, where, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Heart, Bed, Bath, Maximize, MapPin, Phone, Mail, Share2, ChevronLeft, ChevronRight, Check, Building, Calendar, Layers, Car, Trees, Dumbbell, Waves, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

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
  description?: string;
  year?: string;
  parking?: string;
  floors?: string;
  developer?: string;
  slug?: string;
  amenities?: string[];
  assignedStaff?: string[];
  category?: string;
  createdAt: Timestamp;
}

const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
  const [property, setProperty] = useState<Property | null>(null);
  const [otherProperties, setOtherProperties] = useState<Property[]>([]);
  const [staff, setStaff] = useState<{id: string, name: string, email: string, phone: string, photo: string, role: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  const normalizedAmenities = property ? (
    Array.isArray(property.amenities)
      ? property.amenities
      : typeof property.amenities === "string"
        ? property.amenities.split(",").map((amenity) => amenity.trim()).filter(Boolean)
        : []
  ) : [];

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        let propertyData: Property | null = null;

        // Try direct document ID first
        const directDoc = await getDoc(doc(db, "properties", id));
        if (directDoc.exists()) {
          propertyData = { id: directDoc.id, ...directDoc.data() } as Property;
        } else {
          const slugQuery = query(collection(db, "properties"), where("slug", "==", id));
          const slugSnap = await getDocs(slugQuery);

          if (!slugSnap.empty) {
            propertyData = { id: slugSnap.docs[0].id, ...slugSnap.docs[0].data() } as Property;
          } else {
            // Fallback for older documents or titles without slug field
            const propertyTitle = id.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
            const titleQuery = query(collection(db, "properties"), where("title", "==", propertyTitle));
            const titleSnap = await getDocs(titleQuery);
            if (!titleSnap.empty) {
              propertyData = { id: titleSnap.docs[0].id, ...titleSnap.docs[0].data() } as Property;
            }
          }
        }

        if (propertyData) {
          setProperty(propertyData);

          // Fetch other properties
          const allPropertiesSnap = await getDocs(collection(db, "properties"));
          const allProperties = allPropertiesSnap.docs
            .map(d => ({ id: d.id, ...d.data() } as Property))
            .filter(p => p.id !== propertyData.id && p.status === "available")
            .slice(0, 3);
          setOtherProperties(allProperties);
        }

        // Fetch staff members
        const staffSnap = await getDocs(collection(db, "staff"));
        setStaff(staffSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
        <Footer />
      </div>
    );
  }

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

  // Sample images for now - in a real app, these would be stored in the database
  const images = [property.image, "/placeholder-property.jpg", "/placeholder-property.jpg", "/placeholder-property.jpg"];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const shareProperty = () => {
    navigator.share?.({
      title: property.title,
      text: `Check out this property: ${property.title}`,
      url: window.location.href,
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied to clipboard" });
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Image Gallery */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img src={images[currentImage]} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/20" />

        {/* Navigation */}
        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 text-white transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 text-white transition-colors">
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`w-2 h-2 rounded-full transition-colors ${i === currentImage ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-gold text-primary-foreground px-4 py-2 rounded-full font-semibold">
          {property.price}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 text-white transition-colors">
            <Heart className="w-5 h-5" />
          </button>
          <button onClick={shareProperty} className="bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-3 text-white transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Property Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                <span>/</span>
                <Link to="/properties" className="hover:text-gold transition-colors">Properties</Link>
                <span>/</span>
                <span className="text-foreground">{property.title}</span>
              </nav>

              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{property.title}</h1>

              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="w-4 h-4" />
                <span>{property.location}</span>
                {property.category && <span className="text-gold font-medium"> • {property.category}</span>}
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gold mb-2">
                    <Bed className="w-5 h-5" />
                    <span className="font-bold text-xl">{property.beds}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gold mb-2">
                    <Bath className="w-5 h-5" />
                    <span className="font-bold text-xl">{property.baths}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gold mb-2">
                    <Maximize className="w-5 h-5" />
                    <span className="font-bold text-xl">{property.area}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Area</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gold mb-2">
                    <Building className="w-5 h-5" />
                    <span className="font-bold text-xl">{property.type === "sale" ? "For Sale" : "For Rent"}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Type</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description || "A beautiful property offering modern living spaces and premium amenities."}
                </p>
              </div>

              {/* Property Details */}
              <div className="mb-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.year && (
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Year Built
                      </span>
                      <span className="font-semibold">{property.year}</span>
                    </div>
                  )}
                  {property.parking && (
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        Parking
                      </span>
                      <span className="font-semibold">{property.parking} Spaces</span>
                    </div>
                  )}
                  {property.floors && (
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Floor
                      </span>
                      <span className="font-semibold">{property.floors}</span>
                    </div>
                  )}
                  {property.developer && (
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-muted-foreground flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Developer
                      </span>
                      <span className="font-semibold">{property.developer}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Amenities */}
              {normalizedAmenities.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {normalizedAmenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3 text-sm">
                        {amenityIcons[amenity] || <Check className="w-4 h-4 text-gold" />}
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Sidebar */}
            <div>
              <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 space-y-6 sticky top-28">
                <h3 className="font-serif text-xl font-bold text-foreground">Interested in this property?</h3>
                <p className="text-muted-foreground text-sm">Get in touch with our property experts for more information.</p>

                <div className="space-y-4">
                  <Button className="w-full bg-gold hover:bg-gold/90 text-primary-foreground">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Button>
                </div>

                {/* Assigned Staff */}
                {property.assignedStaff && property.assignedStaff.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Your Property Team
                    </h4>
                    <div className="space-y-3">
                      {property.assignedStaff.map(staffId => {
                        const staffMember = staff.find(s => s.id === staffId);
                        return staffMember ? (
                          <div key={staffId} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <img 
                              src={staffMember.photo || "/placeholder-avatar.jpg"} 
                              alt={staffMember.name} 
                              className="w-10 h-10 rounded-full object-cover" 
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-foreground">{staffMember.name}</p>
                              <p className="text-xs text-muted-foreground">{staffMember.role}</p>
                            </div>
                            <div className="flex gap-1">
                              {staffMember.phone && (
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Phone className="w-3 h-3" />
                                </Button>
                              )}
                              {staffMember.email && (
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Mail className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Property ID: {property.id.slice(0, 8)}</p>
                  <p className="text-sm text-muted-foreground">Listed: {property.createdAt?.toDate().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Properties */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProperties.map((p) => (
              <PropertyCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertyDetail;