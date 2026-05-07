import { Award, Users, Building2, Globe, Target, Shield, Eye, Heart, Lightbulb, Star, Handshake } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import aboutTeam from "@/assets/about-team.jpg";

const values = [
  { icon: Lightbulb, title: "Driven by Innovation", description: "We believe growth comes through continuous improvement, fresh thinking, and the ability to adapt to an evolving market. Innovation drives the way we serve, advise, and create opportunities for our clients." },
  { icon: Star, title: "Passion for Excellence", description: "Real estate is more than a business; it is a commitment to delivering meaningful results. Our passion for what we do inspires us to maintain high standards across every service we offer." },
  { icon: Handshake, title: "Stronger Together", description: "Great results are built through collaboration. We value lasting relationships with clients, partners, and communities, believing that trust and teamwork create stronger opportunities for everyone." },
  { icon: Shield, title: "Built on Responsibility", description: "Every decision we make reflects our commitment to integrity, accountability, and professionalism. We take responsibility for delivering solutions that protect client interests and create long-term value." },
];

const missionVision = [
  {
    icon: Globe,
    title: "Our Vision",
    description:
      "To be a trusted real estate brand recognized for delivering integrated property solutions, strategic investment opportunities, and specialized services that create long-term value in Dubai and beyond.",
  },
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide client-focused real estate solutions through market expertise, transparency, and professional execution, while building a sustainable ecosystem powered by innovation, specialized services, and long-term relationships.",
  },
];

const highlights = [
  {
    icon: Building2,
    title: "Integrated Property Ecosystem",
    description: "From brokerage and investment advisory to asset management and specialized services, Keego Properties delivers end-to-end real estate support under one trusted brand.",
  },
  {
    icon: Users,
    title: "Specialist Divisions",
    description: "Through Ultima Homes we deliver holiday home and short-term rental solutions, while Fixoo Nova provides professional property maintenance and building care services.",
  },
  {
    icon: Award,
    title: "RERA-Licensed & Compliant",
    description: "Operating with full RERA licensing and a strong commitment to integrity, service excellence, and long-term client partnerships across Dubai's property market.",
  },
];

const aboutBannerVideo = "https://res.cloudinary.com/dy0t4agoh/video/upload/110923-689949643_medium_gvjpcc.mp4";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="relative pt-24 sm:pt-28">
        <div className="relative h-[68vh] min-h-[420px] w-full overflow-hidden">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={aboutBannerVideo}
            autoPlay
            muted
            loop
            playsInline
            poster={aboutTeam}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy-dark/55 to-navy-dark/80" />

          <div className="relative z-10 h-full">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <p className="text-gold font-medium tracking-[0.24em] uppercase text-xs sm:text-sm mb-3">Who We Are</p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground max-w-4xl leading-tight mb-5">
                About KeeGo Properties
              </h1>
              <p className="text-primary-foreground/80 max-w-2xl text-sm sm:text-base leading-relaxed">
                A dynamic real estate company operating in Dubai's fast-evolving property market — built on trust, professionalism, and a client-first approach to creating long-term value.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-full bg-primary-foreground/12 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 text-primary-foreground text-xs sm:text-sm">
                  RERA Licensed
                </div>
                <div className="rounded-full bg-primary-foreground/12 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 text-primary-foreground text-xs sm:text-sm">
                  Ultima Homes
                </div>
                <div className="rounded-full bg-primary-foreground/12 backdrop-blur-sm border border-primary-foreground/20 px-4 py-2 text-primary-foreground text-xs sm:text-sm">
                  Fixoo Nova
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Who We Are</p>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                A Real Estate Company Built on Trust
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Driven by market expertise and a passion for delivering exceptional real estate solutions, Keego Properties is a dynamic real estate company operating in Dubai's fast-evolving property market. Built on trust, professionalism, and a client-first approach, we support homeowners, investors, and businesses through strategic real estate services designed to create long-term value and lasting relationships.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                From residential and commercial brokerage to investment advisory, asset management, and specialized property services, our focus is centered on understanding every client's unique objectives and delivering solutions with clarity, precision, and confidence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As a RERA-licensed real estate company, Keego Properties operates with a strong commitment to integrity, service excellence, and long-term partnerships. Our goal is not simply to facilitate transactions, but to create meaningful property experiences built on trust, performance, and sustainable growth.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)]">
              <img src={aboutTeam} alt="Our Team" className="w-full h-full object-cover" width={1200} height={600} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 mb-14">
          <div className="text-center mb-10">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Our Direction</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Mission & Vision</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionVision.map((item, index) => (
              <div key={index} className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)]">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 mb-14">
          <div className="text-center mb-10">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Why Clients Choose Us</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">What We Deliver</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div key={index} className="bg-card rounded-2xl p-6 shadow-[var(--shadow-card)]">
                <div className="w-11 h-11 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

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
