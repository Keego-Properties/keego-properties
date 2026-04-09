import { Award, Users, Building2, Globe, Target, Shield, Eye, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import aboutTeam from "@/assets/about-team.jpg";

const values = [
  { icon: Target, title: "Excellence", description: "We strive for the highest standards in every transaction." },
  { icon: Shield, title: "Integrity", description: "Trust and transparency are at the core of everything we do." },
  { icon: Eye, title: "Innovation", description: "We leverage technology to deliver a seamless experience." },
  { icon: Heart, title: "Client First", description: "Your satisfaction is our top priority." },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-8 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Who We Are</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            About KeeGo Properties
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Dubai's trusted real estate partner since 2010, delivering exceptional property experiences.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Our Story</p>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                Building Dreams in Dubai
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Founded in 2010, KeeGo Properties has grown to become one of Dubai's most trusted real estate agencies. With a team of over 200 dedicated professionals, we have helped thousands of clients find their perfect home in the UAE.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our deep understanding of the Dubai market, combined with our commitment to personalized service, sets us apart. We don't just sell properties — we build lasting relationships.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Whether you're a first-time buyer, a seasoned investor, or looking for your dream rental, our expert team is here to guide you every step of the way.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)]">
              <img src={aboutTeam} alt="Our Team" className="w-full h-full object-cover" width={1200} height={600} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">What Drives Us</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 text-center hover-lift shadow-[var(--shadow-card)]">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
