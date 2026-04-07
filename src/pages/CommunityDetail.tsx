import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { MapPin, Home, TrendingUp, School, ShoppingBag, TreePine, ArrowRight } from "lucide-react";
import communityDowntown from "@/assets/community-downtown.jpg";
import communityMarina from "@/assets/community-marina.jpg";
import communityPalm from "@/assets/community-palm.jpg";
import communityHills from "@/assets/community-hills.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";

const communitiesData = [
  {
    id: "dubai-downtown",
    name: "Dubai Downtown",
    image: communityDowntown,
    properties: 245,
    description: "The vibrant heart of Dubai featuring the iconic Burj Khalifa and Dubai Mall.",
    longDescription: "Dubai Downtown is the city's most prestigious address, home to the world's tallest building — the Burj Khalifa — and the expansive Dubai Mall. This master-planned community by Emaar Properties offers a unique blend of luxury residences, world-class dining, and unparalleled entertainment. Residents enjoy stunning fountain views, walkable boulevards, and a cosmopolitan lifestyle that defines modern Dubai.",
    avgPrice: "AED 2,200 /sq-ft",
    priceRange: "AED 800K - AED 50M",
    highlights: ["Burj Khalifa Views", "Dubai Mall Access", "Dubai Fountain", "Opera District", "Walking Boulevards", "Metro Connected"],
    stats: { avgRoi: "6.2%", schools: 12, restaurants: 200, parks: 8 },
  },
  {
    id: "dubai-marina",
    name: "Dubai Marina",
    image: communityMarina,
    properties: 189,
    description: "A waterfront community with stunning marina views and a buzzing nightlife.",
    longDescription: "Dubai Marina is one of the world's largest man-made marinas and a premier waterfront destination. Stretching along a 3-kilometer canal, this vibrant community features a stunning collection of high-rise towers, The Walk at JBR, and Marina Walk promenade. Residents enjoy yacht-lined waters, beach proximity, and an exciting array of restaurants and entertainment venues.",
    avgPrice: "AED 1,800 /sq-ft",
    priceRange: "AED 600K - AED 30M",
    highlights: ["Marina Views", "Beach Proximity", "JBR Walk", "Yacht Club", "Tram Connected", "Fine Dining"],
    stats: { avgRoi: "7.1%", schools: 8, restaurants: 150, parks: 5 },
  },
  {
    id: "palm-jumeirah",
    name: "Palm Jumeirah",
    image: communityPalm,
    properties: 156,
    description: "The world-famous man-made island offering exclusive beachfront living.",
    longDescription: "Palm Jumeirah is an engineering marvel and the world's most iconic man-made island. Shaped like a palm tree, this exclusive community offers ultra-luxury villas, premium apartments, and five-star hotel residences. With private beach access, world-class resorts like Atlantis The Royal, and breathtaking views of the Arabian Gulf, Palm Jumeirah represents the pinnacle of waterfront living.",
    avgPrice: "AED 3,000 /sq-ft",
    priceRange: "AED 1.2M - AED 150M",
    highlights: ["Private Beaches", "Atlantis Resort", "Boardwalk", "Monorail", "Sea Views", "Ultra Luxury"],
    stats: { avgRoi: "5.8%", schools: 5, restaurants: 80, parks: 6 },
  },
  {
    id: "dubai-hills-estate",
    name: "Dubai Hills Estate",
    image: communityHills,
    properties: 203,
    description: "A master-planned community with lush green parks and a championship golf course.",
    longDescription: "Dubai Hills Estate is a sprawling master-planned community developed by Emaar and Meraas. Centered around the 18-hole championship golf course, this green community offers a diverse range of villas, townhouses, and apartments. With Dubai Hills Mall, top-rated schools, and over 1.4 million sq-ft of parkland, it's the ideal family-friendly neighborhood combining suburban tranquility with urban convenience.",
    avgPrice: "AED 1,500 /sq-ft",
    priceRange: "AED 500K - AED 25M",
    highlights: ["Golf Course", "Dubai Hills Mall", "Parks & Gardens", "Top Schools", "Hospital", "Cycling Tracks"],
    stats: { avgRoi: "6.8%", schools: 15, restaurants: 60, parks: 20 },
  },
  {
    id: "business-bay",
    name: "Business Bay",
    image: property1,
    properties: 178,
    description: "Dubai's central business district with luxury high-rise apartments.",
    longDescription: "Business Bay is Dubai's dynamic central business district, stretching along the Dubai Water Canal. This thriving neighborhood offers a mix of commercial towers and luxury residential buildings with stunning canal and Burj Khalifa views. Its central location provides easy access to Downtown Dubai, DIFC, and major highways, making it a top choice for professionals and investors alike.",
    avgPrice: "AED 1,600 /sq-ft",
    priceRange: "AED 500K - AED 20M",
    highlights: ["Canal Views", "Central Location", "Burj Khalifa Proximity", "Metro Access", "Waterfront Dining", "Business Hub"],
    stats: { avgRoi: "7.5%", schools: 6, restaurants: 90, parks: 4 },
  },
  {
    id: "jumeirah-village-circle",
    name: "Jumeirah Village Circle",
    image: property2,
    properties: 312,
    description: "An affordable family-friendly community with parks and schools.",
    longDescription: "Jumeirah Village Circle (JVC) is one of Dubai's most popular and affordable communities. Designed as a self-contained village, JVC features a circular layout with lush landscaping, community parks, and a growing selection of amenities. It offers excellent value with a range of apartments, townhouses, and villas, making it ideal for young families and first-time buyers.",
    avgPrice: "AED 900 /sq-ft",
    priceRange: "AED 350K - AED 5M",
    highlights: ["Affordable", "Family Friendly", "Community Parks", "Schools Nearby", "Pet Friendly", "Growing Area"],
    stats: { avgRoi: "8.2%", schools: 10, restaurants: 40, parks: 15 },
  },
];

const sampleProperties = [
  { image: property1, title: "Luxury Apartment with City View", price: "AED 1,850,000", location: "", beds: 2, baths: 2, area: "1,200 sq-ft", type: "sale" as const },
  { image: property3, title: "Premium Penthouse | High Floor", price: "AED 4,500,000", location: "", beds: 3, baths: 3, area: "3,200 sq-ft", type: "sale" as const },
  { image: property4, title: "Modern Studio | Fully Furnished", price: "AED 85,000 /yr", location: "", beds: 0, baths: 1, area: "520 sq-ft", type: "rent" as const },
  { image: property2, title: "Spacious Villa | Garden View", price: "AED 3,200,000", location: "", beds: 4, baths: 4, area: "3,800 sq-ft", type: "sale" as const },
];

const CommunityDetail = () => {
  const { id } = useParams();
  const community = communitiesData.find(c => c.id === id);

  if (!community) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Community Not Found</h1>
          <Link to="/communities" className="text-gold hover:underline">Back to Communities</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const propertiesInCommunity = sampleProperties.map(p => ({ ...p, location: community.name + ", Dubai" }));

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-4">
              <Link to="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link to="/communities" className="hover:text-gold transition-colors">Communities</Link>
              <span>/</span>
              <span className="text-primary-foreground">{community.name}</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-3">{community.name}</h1>
            <div className="flex items-center gap-2 text-primary-foreground/80">
              <MapPin className="w-4 h-4" />
              <span>{community.properties} Properties Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-navy py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-gold font-bold text-xl md:text-2xl">{community.stats.avgRoi}</p>
              <p className="text-primary-foreground/60 text-sm">Avg. ROI</p>
            </div>
            <div>
              <p className="text-gold font-bold text-xl md:text-2xl">{community.stats.schools}</p>
              <p className="text-primary-foreground/60 text-sm">Schools</p>
            </div>
            <div>
              <p className="text-gold font-bold text-xl md:text-2xl">{community.stats.restaurants}+</p>
              <p className="text-primary-foreground/60 text-sm">Restaurants</p>
            </div>
            <div>
              <p className="text-gold font-bold text-xl md:text-2xl">{community.stats.parks}</p>
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
              <p className="text-muted-foreground leading-relaxed mb-8">{community.longDescription}</p>

              <h3 className="font-serif text-lg font-bold text-foreground mb-4">Community Highlights</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {community.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground">
                    <span className="text-gold"><ArrowRight className="w-4 h-4" /></span>
                    {h}
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
                    <span className="text-sm text-muted-foreground">Price Range</span>
                    <span className="font-semibold text-foreground text-sm">{community.priceRange}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-sm text-muted-foreground">Available</span>
                    <span className="font-semibold text-foreground">{community.properties} Listings</span>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">Avg. ROI</span>
                    <span className="font-semibold text-gold">{community.stats.avgRoi}</span>
                  </div>
                </div>
                <Link to="/contact">
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
            <Link to="/properties" className="text-gold text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {propertiesInCommunity.map((p, i) => (
              <PropertyCard key={i} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Other Communities */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-8">Explore Other Communities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communitiesData.filter(c => c.id !== community.id).slice(0, 3).map((c, i) => (
              <Link key={i} to={`/community/${c.id}`} className="group">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10]">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-serif text-xl font-bold text-primary-foreground mb-1">{c.name}</h3>
                    <p className="text-primary-foreground/70 text-sm">{c.properties} Properties</p>
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
