import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logoImage from "@/assets/eagb.png";

const Footer = () => {
  return (
    <footer className="bg-navy-dark pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logoImage} alt="KeeGo Properties" className="h-12 w-auto rounded-xl object-contain" />
              <div>
                <span className="font-serif text-xl font-bold text-primary-foreground">KeeGo</span>
                <span className="font-serif text-xl font-bold text-gold ml-1">Properties</span>
              </div>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed mb-6">
              Your trusted partner in Dubai real estate. We help you find the perfect property for your lifestyle.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-primary-foreground/20 flex items-center justify-center text-primary-foreground/50 hover:text-gold hover:border-gold transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-serif text-primary-foreground font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["Buy Property", "Rent Property", "Communities", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link to="/" className="text-primary-foreground/50 hover:text-gold text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-primary-foreground font-semibold mb-4">Popular Areas</h4>
            <ul className="space-y-3">
              {["Dubai Marina", "Downtown Dubai", "Palm Jumeirah", "Dubai Hills", "JVC", "Business Bay"].map((item) => (
                <li key={item}>
                  <Link to="/communities" className="text-primary-foreground/50 hover:text-gold text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-primary-foreground font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <a href="tel:+971501234567" className="flex items-center gap-3 text-primary-foreground/50 hover:text-gold text-sm transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +971 50 123 4567
              </a>
              <a href="mailto:info@primeproperties.ae" className="flex items-center gap-3 text-primary-foreground/50 hover:text-gold text-sm transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@primeproperties.ae
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/50 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Business Bay, Dubai, United Arab Emirates
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-primary-foreground/30 text-sm">
            © 2026 KeeGo Properties. All rights reserved. RERA ORN: 12345
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
