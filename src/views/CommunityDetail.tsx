"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouteId } from "@/hooks/use-route-id";
import { collection, getDocs, query, where, doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MapPin, Home, TrendingUp, School, ShoppingBag, TreePine, ArrowRight } from "lucide-react";
import Seo from "@/components/Seo";
import { truncate } from "@/lib/seo";

interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  location: string;
  highlights: string;
  propertyIds?: string[];
  propertiesCount: number;
  avgPrice: string;
  createdAt: Timestamp;
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
  status: string;
  image: string;
  category?: string;
}

const CommunityDetail = () => {
  const id = useRouteId("community");
  const [community, setCommunity] = useState<Community | null>(null);
  const [otherCommunities, setOtherCommunities] = useState<Community[]>([]);
  const [communityProperties, setCommunityProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunity = async () => {
      if (!id) return;

      try {
        const communityName = id.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

        const communityQuery = query(collection(db, "communities"), where("name", "==", communityName));
        const communitySnap = await getDocs(communityQuery);

        if (!communitySnap.empty) {
          const communityData = { id: communitySnap.docs[0].id, ...communitySnap.docs[0].data() } as Community;
          setCommunity(communityData);

          const allCommunitiesSnap = await getDocs(collection(db, "communities"));
          const allCommunities = allCommunitiesSnap.docs
            .map(d => ({ id: d.id, ...d.data() } as Community))
            .filter(c => c.id !== communityData.id)
            .slice(0, 3);
          setOtherCommunities(allCommunities);

          // Fetch properties: use pinned propertyIds if set, else fallback to location match
          const propertiesSnap = await getDocs(collection(db, "properties"));
          const allProps = propertiesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Property));

          let matched: Property[];
          if (communityData.propertyIds && communityData.propertyIds.length > 0) {
            // Show all explicitly assigned properties (regardless of status)
            matched = allProps
              .filter(p => communityData.propertyIds!.includes(p.id))
              .slice(0, 12);
          } else {
            matched = allProps
              .filter(p =>
                p.status === "available" &&
                p.location?.toLowerCase().includes(communityData.name.toLowerCase())
              )
              .slice(0, 4);
          }
          setCommunityProperties(matched);
        }
      } catch (error) {
        console.error("Error fetching community:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <p className="text-muted-foreground">Loading community details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Community Not Found</h1>
          <Link href="/communities" className="text-gold hover:underline">Back to Communities</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse highlights from comma-separated string
  const highlightsArray = community.highlights ? community.highlights.split(',').map(h => h.trim()) : [];

  return (
    <div className="min-h-screen">
      {community && (
        <Seo
          title={`${community.name} Community Guide | KeeGo Properties`}
          description={truncate(community.description || `Explore ${community.name} in Dubai, including lifestyle insights, market information, and available properties.`, 160)}
          image={community.image}
          path={`/community/${id}`}
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "Place",
            name: community.name,
            description: community.description,
            image: community.image,
            address: {
              "@type": "PostalAddress",
              addressLocality: community.location || "Dubai",
              addressCountry: "AE",
            },
          }}
        />
      )}
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/communities" className="hover:text-gold transition-colors">Communities</Link>
              <span>/</span>
              <span className="text-primary-foreground">{community.name}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{community.name}</h1>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <MapPin className="w-4 h-4" />
              <span>{community.propertiesCount} Properties Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-gold font-bold text-xl md:text-2xl">6.5%</p>
              <p className="text-primary-foreground/60 text-sm">Avg. ROI</p>
            </div>
            <div>
              <p className="text-gold font-bold text-xl md:text-2xl">8</p>
              <p className="text-primary-foreground/60 text-sm">Schools</p>
            </div>
            <div>
              <p className="text-gold font-bold text-xl md:text-2xl">50+</p>
              <p className="text-primary-foreground/60 text-sm">Restaurants</p>
            </div>
            <div>
              <p className="text-gold font-bold text-xl md:text-2xl">12</p>
              <p className="text-primary-foreground/60 text-sm">Parks</p>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About {community.name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{community.description}</p>

              <h3 className="font-serif text-lg font-bold text-foreground mb-4">Community Highlights</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {highlightsArray.map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground">
                    <span className="text-gold"><ArrowRight className="w-4 h-4" /></span>
                    {highlight}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Info Sidebar */}
            <div>
              <div className="bg-card rounded-2xl shadow-[var(--shadow-card)] p-6 space-y-5 sticky top-28">
                <h3 className="font-serif text-lg font-bold text-foreground">Market Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Avg. Price</span>
                    <span className="font-semibold text-foreground">{community.avgPrice}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Location</span>
                    <span className="font-semibold text-foreground">{community.location}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Available</span>
                    <span className="font-semibold text-foreground">{community.propertiesCount} Listings</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">Avg. ROI</span>
                    <span className="font-semibold text-gold">6.5%</span>
                  </div>
                </div>
                <Link href="/contact">
                  <button className="w-full bg-gold hover:bg-gold/90 text-primary-foreground py-3 rounded-full font-medium transition-colors mt-4">
                    Get Investment Guide
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties in Community */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-foreground">Properties in {community.name}</h2>
            <Link href="/properties" className="text-gold text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityProperties.length === 0 ? (
              <p className="col-span-3 text-center py-8 text-muted-foreground text-sm">
                No properties listed for this community yet.
              </p>
            ) : (
              communityProperties.map((p) => (
                <PropertyCard key={p.id} {...p} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Other Communities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Explore Other Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCommunities.map((c) => (
              <Link key={c.id} href={`/community/${c.name.toLowerCase().replace(/\s+/g, "-")}`} className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif text-xl font-bold text-primary-foreground mb-1">{c.name}</h3>
                    <p className="text-primary-foreground/70 text-sm">{c.propertiesCount} Properties</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CommunityDetail;
