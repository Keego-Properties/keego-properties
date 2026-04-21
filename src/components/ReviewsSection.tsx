import { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "James Whitfield",
    role: "Property Investor",
    location: "London, UK",
    rating: 5,
    text: "KeeGo Properties made my off-plan investment completely seamless. Their market knowledge and after-sales support are truly world-class. I closed on two units in Downtown Dubai within a week.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Fatima Al Rashidi",
    role: "Homeowner",
    location: "Dubai, UAE",
    rating: 5,
    text: "Finding our family villa in Arabian Ranches felt overwhelming until KeeGo stepped in. They listened to every detail, showed us only the right options, and negotiated a fantastic price.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Marcus Chen",
    role: "Commercial Tenant",
    location: "Singapore",
    rating: 5,
    text: "We leased our DIFC office through KeeGo and the process was faster than any agency I've used globally. Professional, proactive, and genuinely invested in finding the right fit.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Priya Sharma",
    role: "First-Time Buyer",
    location: "Mumbai, India",
    rating: 5,
    text: "As a first-time buyer in Dubai, I was nervous. KeeGo held my hand through every step — from mortgage pre-approval to handover day. I couldn't be happier with my apartment in JVC.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Oliver Braun",
    role: "Developer Partner",
    location: "Frankfurt, Germany",
    rating: 5,
    text: "We partnered with KeeGo to market our Palm Jumeirah project. Their network, digital reach, and sales strategy moved units faster than projected. A truly premium partner.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    name: "Aisha Nkemdirim",
    role: "Rental Tenant",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "I relocated to Dubai for work and KeeGo found me a stunning furnished apartment in Business Bay within 48 hours. Their responsiveness and professionalism are unmatched.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=100&q=80",
  },
];

const ReviewsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % reviews.length);
      }
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#0b1628] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-[#D4AF37] font-medium tracking-[0.2em] uppercase text-xs mb-3">
            Client Stories
          </p>
          <h2 className="font-serif text-4xl font-bold text-white">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-white/45 text-sm mt-3 max-w-md mx-auto leading-relaxed">
            Real experiences from clients who found their perfect property with KeeGo.
          </p>
        </div>

        {/* 3D carousel */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{ height: 300 }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {reviews.map((review, i) => {
            let o = i - activeIndex;
            if (o > reviews.length / 2) o -= reviews.length;
            if (o < -reviews.length / 2) o += reviews.length;
            const abs = Math.abs(o);
            const isActive = o === 0;
            const scale = isActive ? 1 : abs === 1 ? 0.82 : 0.68;
            const translateX = o * 340;
            const zIndex = 20 - abs;
            const opacity = abs > 2 ? 0 : abs === 2 ? 0.25 : 1;

            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className="absolute cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition:
                    "transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 1s cubic-bezier(0.16,1,0.3,1)",
                  willChange: "transform, opacity",
                  width: 360,
                }}
              >
                <div
                  className="relative rounded-3xl p-8"
                  style={{
                    background: isActive
                      ? "linear-gradient(160deg, #1e2f50 0%, #131f38 100%)"
                      : "rgba(255,255,255,0.04)",
                    border: isActive
                      ? "1px solid rgba(212,175,55,0.45)"
                      : "1px solid rgba(255,255,255,0.07)",
                    boxShadow: isActive
                      ? "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.12), inset 0 1px 0 rgba(255,255,255,0.06)"
                      : "none",
                  }}
                >
                  {/* Top shimmer */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(212,175,55,0.7), transparent)",
                      }}
                    />
                  )}

                  {/* Quote icon */}
                  <Quote
                    className="w-7 h-7 mb-4"
                    style={{ color: isActive ? "rgba(212,175,55,0.6)" : "rgba(255,255,255,0.15)" }}
                  />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="w-3.5 h-3.5 fill-current"
                        style={{ color: isActive ? "#D4AF37" : "rgba(255,255,255,0.3)" }}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p
                    className="text-sm leading-relaxed mb-6 line-clamp-4"
                    style={{ color: isActive ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.35)" }}
                  >
                    "{review.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-10 h-10 rounded-full object-cover"
                      style={{
                        border: isActive
                          ? "2px solid rgba(212,175,55,0.5)"
                          : "2px solid rgba(255,255,255,0.1)",
                      }}
                    />
                    <div>
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)" }}
                      >
                        {review.name}
                      </p>
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: isActive ? "rgba(212,175,55,0.8)" : "rgba(255,255,255,0.25)" }}
                      >
                        {review.role} · {review.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active reviewer label */}
        <div className="text-center mt-8 mb-5">
          <p className="font-serif text-lg font-bold text-white">{reviews[activeIndex].name}</p>
          <p className="text-sm text-[#D4AF37]/70 mt-0.5">
            {reviews[activeIndex].role} · {reviews[activeIndex].location}
          </p>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-2 bg-[#D4AF37]"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
