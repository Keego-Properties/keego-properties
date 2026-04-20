import { useState, useEffect, useRef } from "react";
import { Home, TrendingDown, MapPin, CreditCard, Shield, Key, Building, Truck, Train, Eye } from "lucide-react";

const services = [
  { icon: Home, label: "Newly Constructed", desc: "Brand new builds" },
  { icon: TrendingDown, label: "Reduced Price", desc: "Best value deals" },
  { icon: MapPin, label: "Prime Locations", desc: "Heart of the city" },
  { icon: CreditCard, label: "Flexible Payment", desc: "Easy plans" },
  { icon: Shield, label: "Gated Community", desc: "Safe & secure" },
  { icon: Eye, label: "Open House", desc: "Visit anytime" },
  { icon: Key, label: "Ready to Move In", desc: "Immediate handover" },
  { icon: Building, label: "Commercial", desc: "Office & retail" },
  { icon: Truck, label: "Pet-Friendly", desc: "Welcome all pets" },
  { icon: Train, label: "Near Transport", desc: "Metro connected" },
];

const ServicesGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-cream overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">
            Made to Suit You
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Refined Living, Tailored to You
          </h2>
        </div>

        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{ height: 260 }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {services.map((service, i) => {
            let o = i - activeIndex;
            if (o > services.length / 2) o -= services.length;
            if (o < -services.length / 2) o += services.length;
            const abs = Math.abs(o);
            const isActive = o === 0;
            const scale = isActive ? 1 : abs === 1 ? 0.82 : 0.68;
            const translateX = o * 200;
            const zIndex = 20 - abs;
            const opacity = abs > 2 ? 0 : abs === 2 ? 0.3 : 1;

            return (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                className="absolute cursor-pointer"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale})`,
                  zIndex,
                  opacity,
                  transition: "transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 1s cubic-bezier(0.16,1,0.3,1)",
                  willChange: "transform, opacity",
                  width: 190,
                  height: 230,
                }}
              >
                <div
                  className="relative w-full h-full rounded-3xl p-7 text-center"
                  style={{
                    background: isActive
                      ? "linear-gradient(160deg, #1a2744 0%, #0f1a35 100%)"
                      : "linear-gradient(160deg, #f5f2ec 0%, #e8e3d8 100%)",
                    border: isActive
                      ? "1px solid rgba(212,175,55,0.5)"
                      : "1px solid rgba(0,0,0,0.07)",
                    boxShadow: isActive
                      ? "0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,175,55,0.15), inset 0 1px 0 rgba(255,255,255,0.08)"
                      : "0 8px 24px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Top shimmer line */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 right-0 h-px rounded-t-3xl"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)" }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative w-16 h-16 mx-auto mb-5">
                    <div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))"
                          : "rgba(0,0,0,0.06)",
                        border: isActive ? "1px solid rgba(212,175,55,0.3)" : "1px solid rgba(0,0,0,0.06)",
                      }}
                    />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <service.icon
                        className="w-7 h-7"
                        style={{ color: isActive ? "#d4af37" : "#1a2744" }}
                      />
                    </div>
                  </div>

                  <p
                    className="text-sm font-bold leading-tight mb-1.5"
                    style={{ color: isActive ? "#ffffff" : "#1a2744" }}
                  >
                    {service.label}
                  </p>
                  <p
                    className="text-[11px] tracking-wide"
                    style={{ color: isActive ? "rgba(212,175,55,0.8)" : "#888" }}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6 mb-5">
          <p className="font-serif text-lg font-bold text-foreground">{services[activeIndex].label}</p>
          <p className="text-sm text-muted-foreground mt-1">{services[activeIndex].desc}</p>
        </div>

        <div className="flex justify-center gap-2">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 h-2 bg-gold" : "w-2 h-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
