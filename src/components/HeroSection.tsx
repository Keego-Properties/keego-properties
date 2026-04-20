import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-dubai.jpg";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [propertyType, setPropertyType] = useState("");
  const [searchText, setSearchText] = useState("");
  const tabs = ["Buy", "Rent"];
  const heroVideoSrc = "https://res.cloudinary.com/dy0t4agoh/video/upload/110923-689949643_medium_gvjpcc.mp4";
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("type", activeTab);
    if (propertyType) params.set("category", propertyType);
    if (searchText.trim()) params.set("search", searchText.trim());
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideoSrc}
        autoPlay
        muted
        loop
        playsInline
        poster={heroImage}
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="text-gold font-medium tracking-[0.3em] uppercase text-sm mb-4 animate-fade-in">
          At the Heart of Every Home is You
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-8 animate-fade-in leading-tight">
          Let's Find Your Perfect
          <br />
          <span className="text-gradient-gold">Haven Together</span>
        </h1>

        <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex justify-center gap-1 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.toLowerCase()
                    ? "bg-primary-foreground text-foreground shadow-lg"
                    : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-primary-foreground/95 backdrop-blur-md rounded-2xl p-2 flex items-center gap-2 shadow-xl">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="flex-1 bg-transparent text-foreground px-4 py-3 text-sm outline-none border-r border-border cursor-pointer"
            >
              <option value="">Choose Property Type</option>
              <option value="Apartments">Apartments</option>
              <option value="Villa">Villa</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Penthouse">Penthouse</option>
            </select>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Community or Building..."
              className="flex-[2] bg-transparent text-foreground px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
            <Button
              onClick={handleSearch}
              className="bg-navy hover:bg-navy-light text-primary-foreground rounded-xl px-6 h-12 transition-all duration-300"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" className="text-navy hover:bg-muted rounded-xl h-12 px-3">
              <SlidersHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2">
          <div className="w-1.5 h-3 bg-gold rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
