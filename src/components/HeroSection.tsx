import { useState, useRef, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-dubai.jpg";
import communityMarinaImage from "@/assets/community-marina.jpg";
import communityDowntownImage from "@/assets/community-downtown.jpg";

// ─── Slides config ───────────────────────────────────────────────────────────
// Add a videoSrc URL for each slide. Leave videoSrc empty ("") to show the
// poster image for FALLBACK_DURATION milliseconds, then auto-advance.
const slides = [
  {
    videoSrc: "https://res.cloudinary.com/dy0t4agoh/video/upload/110923-689949643_medium_gvjpcc.mp4",
    poster: heroImage,
  },
  {
    videoSrc: "https://res.cloudinary.com/dy0t4agoh/video/upload/q_auto/f_auto/v1776611195/265261_medium_xcl5tk.mp4",
    poster: communityMarinaImage,
  },
  {
    videoSrc: "https://res.cloudinary.com/dy0t4agoh/video/upload/q_auto/f_auto/v1778088269/istockphoto-1908736020-640_adpp_is_lkpijj.mp4",
    poster: communityDowntownImage,
  },
];

const FALLBACK_DURATION = 5000; // ms to display image-only slides before advancing

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [propertyType, setPropertyType] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabs = ["Buy", "Rent"];
  const navigate = useNavigate();

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const slide = slides[currentSlide];
    if (fallbackTimer.current) clearTimeout(fallbackTimer.current);

    if (!slide.videoSrc) {
      fallbackTimer.current = setTimeout(goToNext, FALLBACK_DURATION);
      return () => { if (fallbackTimer.current) clearTimeout(fallbackTimer.current); };
    }

    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});

    return () => { if (fallbackTimer.current) clearTimeout(fallbackTimer.current); };
  }, [currentSlide, goToNext]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    params.set("type", activeTab);
    if (propertyType) params.set("category", propertyType);
    if (searchText.trim()) params.set("search", searchText.trim());
    navigate(`/properties?${params.toString()}`);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Poster / background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${slide.poster})` }}
      />

      {/* Video (rendered only when a src is provided) */}
      {slide.videoSrc && (
        <video
          ref={videoRef}
          key={slide.videoSrc}
          className="absolute inset-0 h-full w-full object-cover"
          src={slide.videoSrc}
          autoPlay
          muted
          playsInline
          poster={slide.poster}
          onEnded={goToNext}
        />
      )}

      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-8 animate-fade-in leading-tight">
          Find Exceptional Properties.
          <br />
          <span className="text-gradient-gold">Build Lasting Value.</span>
        </h1>
        <p className="mx-auto mb-8 max-w-3xl text-sm leading-relaxed text-primary-foreground/85 md:text-base animate-fade-in" style={{ animationDelay: "0.1s" }}>
          Luxury homes, investment opportunities, and integrated property solutions tailored for modern investors, homeowners, and businesses.
        </p>

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

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentSlide ? "w-6 bg-gold" : "w-1.5 bg-primary-foreground/40 hover:bg-primary-foreground/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
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
