import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Buy", path: "/properties?type=buy" },
    { name: "Rent", path: "/properties?type=rent" },
    { name: "Communities", path: "/communities" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
              <span className="font-serif font-bold text-primary-foreground text-lg">P</span>
            </div>
            <div>
              <span className="font-serif text-xl font-bold text-primary-foreground">
                Prime
              </span>
              <span className="font-serif text-xl font-bold text-gold ml-1">
                Properties
              </span>
              <p className="text-primary-foreground/50 text-[10px] tracking-[0.2em] uppercase">
                Dubai & Beyond
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-gold"
                    : "text-primary-foreground/80 hover:text-gold"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+971501234567" className="flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors text-sm">
              <Phone className="w-4 h-4" />
              +971 50 123 4567
            </a>
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-300 rounded-full px-6">
              List Property
            </Button>
          </div>

          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-navy-dark border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block py-2 text-sm font-medium ${
                  isActive(link.path) ? "text-gold" : "text-primary-foreground/80"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-primary-foreground rounded-full mt-4">
              List Property
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
