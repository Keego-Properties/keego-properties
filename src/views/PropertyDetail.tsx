"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouteId } from "@/hooks/use-route-id";
import { collection, getDoc, getDocs, query, where, doc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyEnquiryForm from "@/components/PropertyEnquiryForm";
import { Heart, Bed, Bath, Maximize, MapPin, Phone, MessageCircle, Share2, ChevronLeft, ChevronRight, Check, Building, Calendar, Layers, Car, Trees, Dumbbell, Waves, ShieldCheck, Users, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Seo from "@/components/Seo";
import { truncate } from "@/lib/seo";

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
  images?: string[];
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
  const id = useRouteId("property");
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [otherProperties, setOtherProperties] = useState<Property[]>([]);
  const [staff, setStaff] = useState<{id: string, name: string, email: string, phone: string, photo: string, role: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (idx: number) => { setCurrentImage(idx); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);

  const [imageCount, setImageCount] = useState(4);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentImage(p => (p + 1) % imageCount);
      if (e.key === "ArrowLeft") setCurrentImage(p => (p - 1 + imageCount) % imageCount);
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, imageCount]);

  const normalizedAmenities = property ? (
    Array.isArray(property.amenities)
      ? property.amenities
      : typeof property.amenities === "string"
        ? (property.amenities as string).split(",").map((amenity) => amenity.trim()).filter(Boolean)
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
        setStaff(staffSnap.docs.map(d => ({ id: d.id, ...d.data() } as { id: string; name: string; email: string; phone: string; photo: string; role: string })));
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
          <Link href="/properties" className="text-gold hover:underline">Back to Properties</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Use stored gallery images if available, fallback to single image
  const images = (() => {
    if (property.images && property.images.length > 1) return property.images;
    const base = [property.image];
    return base;
  })();
  // sync count for keyboard nav
  if (imageCount !== images.length) setImageCount(images.length);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const firstMember = property.assignedStaff?.length
    ? staff.find((s) => s.id === property.assignedStaff![0])
    : null;
  const contactPhone = (firstMember?.phone || "+971543912231").trim();
  const callHref = `tel:${contactPhone.replace(/\s+/g, "")}`;
  const whatsappNumber = contactPhone.replace(/[^\d]/g, "") || "971543912231";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`;

  const shareProperty = async () => {
    const currentPropertyUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          url: currentPropertyUrl,
        });
        return;
      } catch {
        // Fall back to copying the URL if native share is canceled or fails.
      }
    }

    await navigator.clipboard.writeText(currentPropertyUrl);
    toast({ title: "Link copied to clipboard" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
      {property && (
        <Seo
          title={`${property.title} | ${property.location} | KeeGo Properties`}
          description={truncate(property.description?.trim() || `${property.title} in ${property.location}. Explore pricing, amenities, images, and enquiry options with KeeGo Properties.`, 160)}
          image={property.image}
          type="article"
          path={`/property/${id}`}
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: property.title,
            description: property.description || `${property.title} in ${property.location}`,
            image: property.images?.length ? property.images : [property.image],
            brand: property.developer ? { "@type": "Brand", name: property.developer } : undefined,
            offers: {
              "@type": "Offer",
              priceCurrency: "AED",
              price: property.price,
              availability: property.status === "available" ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
            },
          }}
        />
      )}
      <Navbar />

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all z-10"
            onClick={closeLightbox}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all z-10"
            onClick={(e) => { e.stopPropagation(); setCurrentImage(p => (p - 1 + images.length) % images.length); }}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="max-w-5xl max-h-[85vh] w-full px-20" onClick={e => e.stopPropagation()}>
            <img
              src={images[currentImage]}
              alt={`${property.title} – photo ${currentImage + 1}`}
              className="w-full h-full object-contain max-h-[80vh] rounded-xl"
            />
            <p className="text-center text-white/50 text-sm mt-3">{currentImage + 1} / {images.length}</p>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all z-10"
            onClick={(e) => { e.stopPropagation(); setCurrentImage(p => (p + 1) % images.length); }}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot strip */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                className={`rounded-full transition-all duration-300 ${
                  i === currentImage ? "w-6 h-2 bg-[#D4AF37]" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Hero Gallery ── */}
      <section className="pt-32 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 mt-2">
            <Link href="/" className="hover:text-slate-700 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-slate-700 transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-slate-600 font-medium truncate max-w-[200px]">{property.title}</span>
          </nav>

          {/* Split gallery */}
          <div className={`grid gap-2 rounded-2xl overflow-hidden ${images.length > 1 ? "md:grid-cols-2" : "grid-cols-1"}`} style={{ height: 520 }}>

            {/* Main large image */}
            <div className="relative group cursor-pointer h-full" onClick={() => openLightbox(0)}>
              <img
                src={images[0]}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Photo count badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                <Camera className="w-3.5 h-3.5" />
                {images.length}
              </div>
              {/* Heart */}
              <button className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center transition-all group/heart">
                <Heart className="w-4 h-4 text-slate-500 group-hover/heart:text-red-500 transition-colors" />
              </button>
            </div>

            {/* Thumbnail grid — only if there are extra images */}
            {images.length > 1 && (
              <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
                {[1, 2, 3, 4].map((idx) => {
                  const imgSrc = images[idx];
                  if (!imgSrc && idx > 1) return null;
                  const isLast = idx === 4;
                  const moreCount = images.length - 5;
                  return (
                    <div
                      key={idx}
                      className="relative group cursor-pointer overflow-hidden bg-slate-100"
                      onClick={() => imgSrc ? openLightbox(idx) : openLightbox(4)}
                    >
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={`${property.title} ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-100">
                          <Camera className="w-6 h-6 text-slate-300" />
                        </div>
                      )}
                      {isLast && moreCount > 0 && imgSrc && (
                        <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">+{moreCount} photos</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ── Key Stats Bar ── */}
      <div className="bg-[#0b1628]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Title + price row */}
          <div className="flex flex-wrap items-start justify-between gap-4 pt-8 pb-6 border-b border-white/10">
            <div>
              {property.status !== "available" && (
                <span className="inline-block mb-2 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest bg-red-500/20 text-red-400">
                  {property.status === "sold" ? "Sold" : "Rented"}
                </span>
              )}
              <h1 className="font-serif text-2xl md:text-4xl font-bold text-white leading-tight mb-2">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{property.location}</span>
                {property.category && (
                  <span className="text-[#D4AF37] font-medium">· {property.category}</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
                {property.type === "sale" ? "Sale Price" : "Rental Price"}
              </p>
              <p className="font-serif text-3xl md:text-4xl font-bold text-[#D4AF37]">{property.price}</p>
              <button
                onClick={shareProperty}
                className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" /> Share
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { icon: Bed, label: "Bedrooms", value: property.beds },
              { icon: Bath, label: "Bathrooms", value: property.baths },
              { icon: Maximize, label: "Area", value: property.area },
              { icon: Building, label: "Listing", value: property.type === "sale" ? "For Sale" : "For Rent" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 px-6 py-5">
                <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">{value}</p>
                  <p className="text-white/45 text-xs">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <section className="py-16 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-10">

              {/* Description */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-8">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-3">Overview</p>
                <h2 className="font-serif text-2xl font-bold text-[#0b1628] mb-4">About This Property</h2>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {property.description || "A beautiful property offering modern living spaces and premium amenities in one of Dubai's most sought-after locations."}
                </p>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-8">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-3">Specifications</p>
                <h2 className="font-serif text-2xl font-bold text-[#0b1628] mb-6">Property Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[30px] gap-y-0 divide-y sm:divide-y-0 sm:divide-x-0">
                  {[
                    property.year && { icon: Calendar, label: "Year Built", value: property.year },
                    property.parking && { icon: Car, label: "Parking", value: `${property.parking} Spaces` },
                    property.floors && { icon: Layers, label: "Floor", value: property.floors },
                    property.developer && { icon: Building, label: "Developer", value: property.developer },
                  ].filter(Boolean).map((item: any) => (
                    <div key={item.label} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0">
                      <span className="flex items-center gap-2 text-slate-500 text-sm">
                        <item.icon className="w-4 h-4 text-[#D4AF37]" />
                        {item.label}
                      </span>
                      <span className="font-semibold text-[#0b1628] text-sm">{item.value}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-4 border-b border-slate-100">
                    <span className="flex items-center gap-2 text-slate-500 text-sm">
                      <Bed className="w-4 h-4 text-[#D4AF37]" />
                      Bedrooms
                    </span>
                    <span className="font-semibold text-[#0b1628] text-sm">{property.beds}</span>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-slate-100">
                    <span className="flex items-center gap-2 text-slate-500 text-sm">
                      <Bath className="w-4 h-4 text-[#D4AF37]" />
                      Bathrooms
                    </span>
                    <span className="font-semibold text-[#0b1628] text-sm">{property.baths}</span>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <span className="flex items-center gap-2 text-slate-500 text-sm">
                      <Maximize className="w-4 h-4 text-[#D4AF37]" />
                      Total Area
                    </span>
                    <span className="font-semibold text-[#0b1628] text-sm">{property.area}</span>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {normalizedAmenities.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-8">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-3">Features</p>
                  <h2 className="font-serif text-2xl font-bold text-[#0b1628] mb-6">Amenities & Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {normalizedAmenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 bg-[#fafaf9] border border-slate-100 rounded-xl px-4 py-3 text-sm text-[#0b1628]"
                      >
                        <span className="text-[#D4AF37]">
                          {amenityIcons[amenity] || <Check className="w-4 h-4" />}
                        </span>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property ID footer */}
              <div className="flex items-center gap-6 text-xs text-slate-400 px-1">
                <span>Property ID: <span className="text-slate-600 font-medium">{property.id.slice(0, 8).toUpperCase()}</span></span>
                {property.createdAt && (
                  <span>Listed: <span className="text-slate-600 font-medium">{property.createdAt.toDate().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span></span>
                )}
              </div>
            </div>

            {/* Right: Sticky Sidebar */}
            <div className="space-y-6">
              {/* Price card */}
              <div className="relative overflow-hidden bg-[#0b1628] rounded-2xl p-6 shadow-[0_8px_32px_rgba(11,22,40,0.2)]">
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#D4AF37]/10 blur-2xl" />
                <div
                  className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)" }}
                />
                {/* Agent avatar */}
                <div className="relative z-10 flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
                  <div className="relative shrink-0">
                    <img
                      src={firstMember?.photo || "https://ui-avatars.com/api/?name=Keego+Agent&background=D4AF37&color=0b1628&bold=true"}
                      alt={firstMember?.name || "Keego Agent"}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#D4AF37]/40"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0b1628]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm leading-tight truncate">
                      {firstMember?.name || "Keego Properties"}
                    </p>
                    <p className="text-white/45 text-xs">{firstMember?.role || "Property Specialist"}</p>
                    <p className="text-emerald-400 text-[10px] font-medium mt-0.5">● Available now</p>
                  </div>
                </div>
                <div className="space-y-3 relative z-10">
                  <a
                    href={callHref}
                    className="flex items-center justify-center gap-2 w-full bg-[#D4AF37] hover:bg-[#c9a72f] text-[#0b1628] font-semibold py-3 rounded-xl transition-colors text-sm shadow-[0_4px_16px_rgba(212,175,55,0.3)]"
                  >
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full border border-white/20 hover:border-white/40 text-white hover:text-white font-medium py-3 rounded-xl transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp
                  </a>
                  <button
                    onClick={shareProperty}
                    className="flex items-center justify-center gap-2 w-full border border-white/20 hover:border-white/40 text-white hover:text-white font-medium py-3 rounded-xl transition-colors text-sm"
                  >
                    <Share2 className="w-4 h-4" /> Share Property
                  </button>
                  <p className="text-center text-[11px] text-white/45 pt-1">
                    Direct line: {contactPhone}
                  </p>
                </div>
              </div>

              {/* Existing CTA moved below contact card */}
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-2">Need More Details?</p>
                <h3 className="font-serif text-xl font-bold text-[#0b1628] mb-3">Get Personalized Assistance</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Request a callback and our specialists will guide you through pricing, financing, and availability.
                </p>
                <a
                  href={callHref}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0b1628] hover:text-[#D4AF37] transition-colors"
                >
                  <Phone className="w-4 h-4" /> Speak with an agent
                </a>
              </div>

              {/* Assigned Staff */}
              {property.assignedStaff && property.assignedStaff.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-6">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-1">Your Team</p>
                  <h3 className="font-semibold text-[#0b1628] mb-4 text-sm">Property Specialists</h3>
                  <div className="space-y-3">
                    {property.assignedStaff.map((staffId) => {
                      const member = staff.find((s) => s.id === staffId);
                      return member ? (
                        <div key={staffId} className="flex items-center gap-3 p-3 bg-[#fafaf9] rounded-xl border border-slate-100">
                          <img
                            src={member.photo || "/placeholder-avatar.jpg"}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]/30"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-[#0b1628] text-sm">{member.name}</p>
                            <p className="text-xs text-slate-500">{member.role}</p>
                          </div>
                          <div className="flex gap-1">
                            {member.phone && (
                              <a
                                href={`tel:${member.phone}`}
                                className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {/* Why KeeGo trust block */}
              <div className="bg-[#fafaf9] rounded-2xl border border-slate-100 p-6">
                <p className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-3">Why KeeGo</p>
                {[
                  "Verified listings, zero surprises",
                  "Expert guidance at every step",
                  "Trusted by 10,000+ happy clients",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-2.5 mb-2.5 last:mb-0">
                    <div className="w-4 h-4 rounded-full bg-[#D4AF37]/15 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#D4AF37]" />
                    </div>
                    <p className="text-xs text-slate-600">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Enquiry Form ── */}
      <PropertyEnquiryForm
        defaultType={property.type === "sale" ? "buy" : "rent"}
        propertyName={property.title}
      />

      {/* ── Similar Properties ── */}
      {otherProperties.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[#D4AF37] font-medium tracking-[0.2em] uppercase text-xs mb-2">Explore More</p>
                <h2 className="font-serif text-3xl font-bold text-[#0b1628]">Similar Properties</h2>
              </div>
              <Link
                href="/properties"
                className="text-sm font-medium text-[#D4AF37] hover:underline hidden md:block"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProperties.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default PropertyDetail;
