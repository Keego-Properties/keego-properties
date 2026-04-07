import { Award, Users, Building2, Globe } from "lucide-react";

const stats = [
  { icon: Building2, value: "5,000+", label: "Properties Listed" },
  { icon: Users, value: "3,500+", label: "Happy Clients" },
  { icon: Award, value: "20+", label: "Industry Awards" },
  { icon: Globe, value: "15+", label: "Years Experience" },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-navy-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">
            Our Track Record
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground">
            Award-Winning Excellence
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-gold" />
              </div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                {stat.value}
              </p>
              <p className="text-primary-foreground/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
