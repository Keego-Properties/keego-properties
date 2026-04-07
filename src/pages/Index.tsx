import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import CommunitiesSection from "@/components/CommunitiesSection";
import ServicesGrid from "@/components/ServicesGrid";
import StatsSection from "@/components/StatsSection";
import NewsSection from "@/components/NewsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <CommunitiesSection />
      <ServicesGrid />
      <StatsSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
