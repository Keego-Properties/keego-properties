import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="bg-navy-dark rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-gold rounded-full blur-[100px]" />
          </div>
          <div className="relative z-10">
            <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-3">
              Ready to Make a Move?
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Let Us Help You Find Your Dream Home
            </h2>
            <p className="text-primary-foreground/60 max-w-2xl mx-auto mb-8">
              Whether you're buying, selling, or renting, our expert team is here to guide you through every step of your real estate journey in Dubai.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="bg-gold hover:bg-gold-dark text-primary-foreground rounded-full px-8 h-12 text-base font-medium transition-all duration-300">
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/properties">
                <Button variant="outline" className="bg-gold hover:bg-gold-dark text-primary-foreground rounded-full px-8 h-12 text-base font-medium transition-all duration-300">
                  Browse Properties
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
