import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import CommunitiesSection from "@/components/CommunitiesSection";
import ServicesGrid from "@/components/ServicesGrid";
import StatsSection from "@/components/StatsSection";
import NewsSection from "@/components/NewsSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import FirstVisitCallbackPopup from "@/components/FirstVisitCallbackPopup";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FirstVisitCallbackPopup />
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <PromoBanner />
      <CommunitiesSection />
      <ServicesGrid />
      <StatsSection />
      <NewsSection />
      <ReviewsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
