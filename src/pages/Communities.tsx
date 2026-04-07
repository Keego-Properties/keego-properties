import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import communityDowntown from "@/assets/community-downtown.jpg";
import communityMarina from "@/assets/community-marina.jpg";
import communityPalm from "@/assets/community-palm.jpg";
import communityHills from "@/assets/community-hills.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";

const communities = [
  { name: "Dubai Downtown", image: communityDowntown, properties: 245, description: "The vibrant heart of Dubai featuring the iconic Burj Khalifa and Dubai Mall." },
  { name: "Dubai Marina", image: communityMarina, properties: 189, description: "A waterfront community with stunning marina views and a buzzing nightlife." },
  { name: "Palm Jumeirah", image: communityPalm, properties: 156, description: "The world-famous man-made island offering exclusive beachfront living." },
  { name: "Dubai Hills Estate", image: communityHills, properties: 203, description: "A master-planned community with lush green parks and a championship golf course." },
  { name: "Business Bay", image: property1, properties: 178, description: "Dubai's central business district with luxury high-rise apartments." },
  { name: "Jumeirah Village Circle", image: property2, properties: 312, description: "An affordable family-friendly community with parks and schools." },
];

const Communities = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-8 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Explore</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Dubai Communities
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Discover Dubai's most desirable neighborhoods and find the perfect community for your lifestyle.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communities.map((community, index) => {
              const slug = community.name.toLowerCase().replace(/\s+/g, "-");
              return (
              <Link key={index} to={`/community/${slug}`} className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover-lift block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-gold/90 text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                      {community.properties} Properties
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {community.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {community.description}
                  </p>
                  <span className="flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all duration-300">
                    Explore Community
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Communities;
