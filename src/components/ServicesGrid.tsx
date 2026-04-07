import { Home, TrendingDown, MapPin, CreditCard, Shield, Key, Building, Truck, Train, Eye } from "lucide-react";

const services = [
  { icon: Home, label: "Newly Constructed" },
  { icon: TrendingDown, label: "Reduced Price" },
  { icon: MapPin, label: "Prime Locations" },
  { icon: CreditCard, label: "Flexible Payment" },
  { icon: Shield, label: "Gated Community" },
  { icon: Eye, label: "Open House" },
  { icon: Key, label: "Ready to Move In" },
  { icon: Building, label: "Commercial" },
  { icon: Truck, label: "Pet-Friendly" },
  { icon: Train, label: "Near Transport" },
];

const ServicesGrid = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">
            Tailored to You
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            Your Home, Your Way
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <button
              key={index}
              className="group bg-card rounded-2xl p-6 text-center hover-lift cursor-pointer border border-transparent hover:border-gold/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-navy/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/10 transition-colors duration-300">
                <service.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors duration-300" />
              </div>
              <p className="text-sm font-medium text-foreground">{service.label}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
