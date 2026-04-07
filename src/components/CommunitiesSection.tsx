import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import communityDowntown from "@/assets/community-downtown.jpg";
import communityMarina from "@/assets/community-marina.jpg";
import communityPalm from "@/assets/community-palm.jpg";
import communityHills from "@/assets/community-hills.jpg";

const communities = [
  { name: "Dubai Downtown", image: communityDowntown, properties: 245 },
  { name: "Dubai Marina", image: communityMarina, properties: 189 },
  { name: "Palm Jumeirah", image: communityPalm, properties: 156 },
  { name: "Dubai Hills Estate", image: communityHills, properties: 203 },
];

const CommunitiesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">
              Explore Dubai
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
              Featured Communities
            </h2>
          </div>
          <Link
            to="/communities"
            className="hidden md:flex items-center gap-2 text-gold font-medium hover:gap-3 transition-all duration-300"
          >
            View All Communities
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {communities.map((community, index) => (
            <Link
              key={index}
              to="/communities"
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] hover-lift"
            >
              <img
                src={community.image}
                alt={community.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl font-bold text-primary-foreground mb-1">
                  {community.name}
                </h3>
                <p className="text-primary-foreground/60 text-sm">
                  {community.properties} Properties
                </p>
                <div className="mt-3 w-8 h-8 rounded-full bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitiesSection;
