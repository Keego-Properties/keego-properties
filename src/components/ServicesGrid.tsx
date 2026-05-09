import { Home, TrendingDown, MapPin, CreditCard, Shield, Key, Building, Truck, Train, Eye } from "lucide-react";
import { Link } from "react-router-dom";

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
  // Duplicate for seamless loop
  const track = [...services, ...services];

  return (
    <section className="py-20 bg-cream overflow-hidden">
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-left  { animation: marquee-left  28s linear infinite; }
        .marquee-right { animation: marquee-right 28s linear infinite; }
        .marquee-wrap:hover .marquee-left,
        .marquee-wrap:hover .marquee-right { animation-play-state: paused; }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">
            Made to Suit You
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Refined Living, Tailored to You
          </h2>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="marquee-wrap overflow-hidden mb-4">
        <div className="marquee-left flex gap-4 w-max">
          {track.map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="marquee-wrap overflow-hidden">
        <div className="marquee-right flex gap-4 w-max">
          {[...track].reverse().map((service, i) => (
            <ServiceCard key={i} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service }: { service: typeof services[number] }) => (
  <Link
    to="/contact"
    aria-label={`Contact us about ${service.label}`}
    className="flex-shrink-0 w-[180px] rounded-2xl p-5 text-center select-none transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold/50"
    style={{
      background: "linear-gradient(160deg, #f5f2ec 0%, #e8e3d8 100%)",
      border: "1px solid rgba(0,0,0,0.07)",
      boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
    }}
  >
    <div
      className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
      style={{ background: "rgba(212,175,55,0.12)", border: "1px solid rgba(212,175,55,0.25)" }}
    >
      <service.icon className="w-5 h-5 text-[#1a2744]" />
    </div>
    <p className="text-sm font-bold text-[#1a2744] leading-tight mb-1">{service.label}</p>
    <p className="text-[11px] text-slate-500 tracking-wide">{service.desc}</p>
  </Link>
);

export default ServicesGrid;
