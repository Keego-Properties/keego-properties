import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, TrendingDown, MapPin, CreditCard, Shield, 
  Key, Building, Truck, Train, Eye 
} from "lucide-react";

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

  // Auto-rotation logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (!pausedRef.current) {
        setActiveIndex((prev) => (prev + 1) % services.length);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#fdfcf9] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#d4af37] font-medium tracking-[0.2em] uppercase text-sm mb-2">
            Made to Suit You
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#1a2744]">
            Refined Living, Tailored to You
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          className="relative flex items-center justify-center overflow-visible"
          style={{ height: 320 }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {services.map((service, i) => {
            // Calculate relative position for the infinite loop
            let offset = i - activeIndex;
            if (offset > services.length / 2) offset -= services.length;
            if (offset < -services.length / 2) offset += services.length;

            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            
            // Visual logic based on distance from center
            const scale = isActive ? 1.1 : 1 - absOffset * 0.15;
            const x = offset * 220; // Distance between cards
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.4;
            const zIndex = 10 - absOffset;

            return (
              <motion.div
                key={i}
                onClick={() => setActiveIndex(i)}
                initial={false}
                animate={{
                  x,
                  scale,
                  opacity,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                  mass: 0.8
                }}
                className="absolute cursor-pointer select-none"
                style={{ width: 220, height: 260 }}
              >
                <div
                  className={`relative w-full h-full rounded-[2rem] p-8 text-center transition-colors duration-500 flex flex-col items-center justify-center ${
                    isActive 
                      ? "shadow-[0_25px_50px_-12px_rgba(26,39,68,0.3)]" 
                      : "shadow-md"
                  }`}
                  style={{
                    background: isActive
                      ? "linear-gradient(165deg, #1a2744 0%, #0a1120 100%)"
                      : "linear-gradient(165deg, #ffffff 0%, #f3f0e8 100%)",
                    border: isActive
                      ? "1px solid rgba(212,175,55,0.4)"
                      : "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {/* Decorative Shimmer for Active Card */}
                  {isActive && (
                    <motion.div 
                      layoutId="shimmer"
                      className="absolute inset-0 rounded-[2rem] opacity-20"
                      style={{
                        background: "radial-gradient(circle at 50% 0%, #d4af37 0%, transparent 70%)"
                      }}
                    />
                  )}

                  {/* Icon Wrapper */}
                  <div className="relative z-10 w-16 h-16 flex items-center justify-center mb-6">
                    <div
                      className={`absolute inset-0 rounded-2xl rotate-45 transition-transform duration-700 ${isActive ? 'rotate-[225deg]' : ''}`}
                      style={{
                        background: isActive ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.03)",
                        border: isActive ? "1px solid rgba(212,175,55,0.3)" : "1px solid transparent",
                      }}
                    />
                    <service.icon
                      className="w-8 h-8 relative z-10"
                      style={{ color: isActive ? "#d4af37" : "#1a2744" }}
                    />
                  </div>

                  <h3
                    className="text-base font-bold mb-2 tracking-tight transition-colors duration-500"
                    style={{ color: isActive ? "#ffffff" : "#1a2744" }}
                  >
                    {service.label}
                  </h3>
                  <p
                    className="text-xs font-medium uppercase tracking-widest opacity-80"
                    style={{ color: isActive ? "#d4af37" : "#888b91" }}
                  >
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Labeling */}
        <div className="text-center mt-12 mb-8 h-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-serif text-xl font-semibold text-[#1a2744]">
                {services[activeIndex].label}
              </h4>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="relative h-2 transition-all duration-500 ease-out overflow-hidden"
              style={{
                width: i === activeIndex ? "40px" : "8px",
                borderRadius: "4px",
                backgroundColor: i === activeIndex ? "#d4af37" : "rgba(26,39,68,0.1)"
              }}
            >
              {i === activeIndex && (
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;