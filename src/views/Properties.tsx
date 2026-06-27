"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyEnquiryForm from "@/components/PropertyEnquiryForm";
import { Search, ChevronDown } from "lucide-react";

const BUY_FAQS = [
  {
    q: "Can foreigners buy property in Dubai?",
    a: "Yes. Foreign investors can buy freehold properties in designated areas across Dubai, with full ownership rights in approved communities.",
  },
  {
    q: "What documents are required to buy property in Dubai?",
    a: "Typically, buyers need a valid passport, proof of funds or mortgage approval, and other transaction-related documents depending on the property and financing structure.",
  },
  {
    q: "Can I buy property in Dubai with a mortgage?",
    a: "Yes. Both residents and eligible non-residents can explore mortgage options through approved financial institutions in Dubai, subject to eligibility and approval.",
  },
  {
    q: "What additional costs should I consider when buying property?",
    a: "In addition to the property price, buyers should consider registration fees, agency fees, mortgage-related charges, and other transaction costs.",
  },
  {
    q: "Is Dubai a good place for property investment?",
    a: "Dubai continues to attract global investors with strong rental demand, tax advantages, modern infrastructure, and long-term growth opportunities.",
  },
];

const RENT_FAQS = [
  {
    q: "What documents are required to rent a property in Dubai?",
    a: "Tenants usually need a valid Emirates ID or passport, visa copy, and supporting documents required for tenancy registration.",
  },
  {
    q: "What is EJARI in Dubai?",
    a: "EJARI is the official tenancy registration system in Dubai that legalizes rental agreements between landlords and tenants.",
  },
  {
    q: "How much security deposit is required for renting?",
    a: "Security deposits vary depending on the property type and landlord requirements, and are usually discussed during the leasing process.",
  },
  {
    q: "Can you help with both residential and commercial rentals?",
    a: "Yes. Keego Properties assists clients with apartments, villas, office spaces, retail units, and other leasing opportunities across Dubai.",
  },
  {
    q: "Do you help with lease renewal and documentation?",
    a: "Yes. Our team supports lease negotiations, contract preparation, tenancy registration, and renewal assistance.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-black rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t-2 border-black pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

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
  subCategory?: string;
}

const Properties = () => {
  const searchParams = useSearchParams();
  const [activeType, setActiveType] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBeds, setActiveBeds] = useState<number | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const typeParam = searchParams.get("type");
  const lockedType = typeParam === "buy" ? "sale" : typeParam === "rent" ? "rent" : null;
  const effectiveType = lockedType ?? activeType;
  const enquiryType: "buy" | "rent" | "all" =
    lockedType === "sale" ? "buy" : lockedType === "rent" ? "rent" : "all";
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const typeParam = searchParams.get("type");
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    const bedsParam = searchParams.get("beds");

    setActiveType(
      typeParam === "buy"
        ? "sale"
        : typeParam === "rent"
        ? "rent"
        : "all"
    );
    setActiveCategory(categoryParam ? decodeURIComponent(categoryParam) : "all");
    setSearchQuery(searchParam ? decodeURIComponent(searchParam) : "");
    setActiveBeds(bedsParam !== null && bedsParam !== "" ? parseInt(bedsParam, 10) : null);
  }, [searchParams]);

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
      activeCategory === "all" ||
      p.subCategory?.toLowerCase() === activeCategory.toLowerCase() ||
      p.category?.toLowerCase() === activeCategory.toLowerCase();
    const bedsMatches =
      activeBeds === null ||
      (activeBeds === 5 ? p.beds >= 5 : p.beds === activeBeds);
    const searchMatches =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatches && categoryMatches && bedsMatches && searchMatches;
  });

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <section className="pt-56 md:pt-32 pb-8 bg-navy-dark">
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

      <section className="py-8 border-b border-border bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
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
            </div>
            <div className="flex items-center gap-2 bg-muted rounded-full px-4 py-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search properties..."
                className="bg-transparent text-sm outline-none placeholder:text-muted-foreground w-48"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
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
      <PropertyEnquiryForm defaultType={enquiryType} />

      {/* FAQ Section */}
      {effectiveType !== "all" && (
        <section className="py-16 bg-muted/30 bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Need Help?</p>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                {effectiveType === "sale" ? "Buy Property in Dubai — FAQs" : "Rent Property in Dubai — FAQs"}
              </h2>
            </div>
            <div className="space-y-3">
              {(effectiveType === "sale" ? BUY_FAQS : RENT_FAQS).map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Properties;
