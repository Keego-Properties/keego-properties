import { useState, useRef, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
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

interface Community {
  id: string;
  name: string;
}

const HeroSection = () => {
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [community, setCommunity] = useState("");
  const [communities, setCommunities] = useState<Community[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const snap = await getDocs(collection(db, "communities"));
        const fetched = snap.docs
          .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Community, "id">) }))
          .filter((item) => Boolean(item.name))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCommunities(fetched);
      } catch (error) {
        console.error("Error fetching communities:", error);
      }
    };

    fetchCommunities();
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
    if (propertyType) params.set("category", propertyType);
    if (bedrooms) params.set("beds", bedrooms);
    if (community) params.set("search", community);
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

        <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-stretch">
              {/* Property Type */}
              <div className="flex-1 flex items-center border-r border-gray-100 px-4 py-1 min-w-0">
                <div className="w-full">
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5 leading-none">
                    Property Type
                  </label>
                  <div className="relative">
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-transparent text-center [text-align-last:center] text-foreground text-sm font-medium outline-none cursor-pointer py-1 pr-6 appearance-none"
                    >
                      <option value="">Any Type</option>
                      <option value="Apartments">Apartments</option>
                      <option value="Villas">Villas</option>
                      <option value="Town House">Town House</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Office">Office</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div className="flex-1 flex items-center border-r border-gray-100 px-4 py-1 min-w-0">
                <div className="w-full">
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5 leading-none">
                    Bedrooms
                  </label>
                  <div className="relative">
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full bg-transparent text-center [text-align-last:center] text-foreground text-sm font-medium outline-none cursor-pointer py-1 pr-6 appearance-none"
                    >
                      <option value="">Any</option>
                      <option value="0">Studio</option>
                      <option value="1">1 BR</option>
                      <option value="2">2 BR</option>
                      <option value="3">3 BR</option>
                      <option value="4">4 BR</option>
                      <option value="5">5+ BR</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Community */}
              <div className="flex-[2] flex items-center border-r border-gray-100 px-4 py-1 min-w-0">
                <div className="w-full">
                  <label className="block text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5 leading-none">
                    Community
                  </label>
                  <div className="relative">
                    <select
                      value={community}
                      onChange={(e) => setCommunity(e.target.value)}
                      className="w-full bg-transparent text-center [text-align-last:center] text-foreground text-sm font-medium outline-none cursor-pointer py-1 pr-6 appearance-none"
                    >
                      <option value="">Any Community</option>
                      {communities.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>
              </div>

              {/* Search button */}
              <div className="flex items-center justify-center">
                <button
                  onClick={handleSearch}
                  className="flex items-center gap-2 rounded py-2 px-4 bg-gold hover:bg-gold/90 text-navy-dark font-bold text-sm  transition-colors duration-200 shrink-0"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </div>
              {/* Advanced filters */}
              <button
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground px-5 border-l border-gray-100 transition-colors duration-200 shrink-0"
                title="Advanced Filters"
                onClick={() => navigate("/properties")}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>

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
