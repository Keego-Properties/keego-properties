import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import logoImage from "@/assets/eagb.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buyMenuOpen, setBuyMenuOpen] = useState(false);
  const [rentMenuOpen, setRentMenuOpen] = useState(false);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const location = useLocation();

  const buyTimeoutRef = useRef<NodeJS.Timeout>();
  const rentTimeoutRef = useRef<NodeJS.Timeout>();

  const handleBuyMouseEnter = () => {
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
    }
    if (rentTimeoutRef.current) {
      clearTimeout(rentTimeoutRef.current);
    }
    setRentMenuOpen(false);
    setBuyMenuOpen(true);
  };

  const handleBuyMouseLeave = () => {
    buyTimeoutRef.current = setTimeout(() => {
      setBuyMenuOpen(false);
    }, 150);
  };

  const handleRentMouseEnter = () => {
    if (rentTimeoutRef.current) {
      clearTimeout(rentTimeoutRef.current);
    }
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
    }
    setBuyMenuOpen(false);
    setRentMenuOpen(true);
  };

  const handleRentMouseLeave = () => {
    rentTimeoutRef.current = setTimeout(() => {
      setRentMenuOpen(false);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopHeader(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (buyTimeoutRef.current) {
        clearTimeout(buyTimeoutRef.current);
      }
      if (rentTimeoutRef.current) {
        clearTimeout(rentTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Communities", path: "/communities" },
    { name: "Developers", path: "/developers" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const topLinks = [
    { name: "Your Voice Matters", path: "/your-voice-matters" },
    { name: "List Property", path: "/list-property" },
    { name: "Contact Us", path: "/contact" },
  ];

  const propertyMenu = [
    {
      title: "Residential",
      buyImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      rentImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      items: ["Apartments", "Town House", "Penthouse", "Villas"],
    },
    {
      title: "Off Plan",
      buyImage: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
      rentImage: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1200&q=80",
      items: ["Apartments", "Town House", "Penthouse", "Villas"],
    },
    {
      title: "Commercial",
      buyImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
      rentImage: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
      items: ["Office"],
      footer: [{ label: "View All", value: "" }],
    },
  ];

  const isActive = (path: string) => location.pathname === path;
  const currentType = new URLSearchParams(location.search).get("type");
  const isBuyActive = location.pathname === "/properties" && currentType === "buy";
  const isRentActive = location.pathname === "/properties" && currentType === "rent";
  const openMegaMenuType = buyMenuOpen ? "buy" : rentMenuOpen ? "rent" : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className={`flex flex-wrap items-center justify-between gap-3 overflow-hidden text-xs uppercase tracking-[0.24em] text-primary-foreground/80 transition-[max-height,opacity,transform,padding,border-color] duration-500 ease-in-out ${showTopHeader ? "max-h-20 translate-y-0 border-b border-primary-foreground/10 py-2 opacity-100" : "pointer-events-none max-h-0 -translate-y-full border-b border-transparent py-0 opacity-0"}`}>
          <div className="flex-1 flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {topLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="rounded-full px-3 py-1 transition-colors duration-200 hover:text-gold"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <a
            href="tel:+971501234567"
            className="flex items-center gap-2 text-primary-foreground/80 transition-colors duration-200 hover:text-gold"
          >
            <Phone className="w-4 h-4" />
            +971 50 123 4567
          </a>
        </div>

        <div className="flex items-center justify-between h-20 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImage} alt="KeeGo Properties" className="h-12 w-auto rounded-xl object-contain" />
            <div>
              <span className="font-serif text-xl font-bold text-primary-foreground">
                KeeGo
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
            <div
              className="flex"
              onMouseEnter={handleBuyMouseEnter}
              onMouseLeave={handleBuyMouseLeave}
            >
                <button
                  type="button"
                  className={`min-w-[4.75rem] justify-center text-sm font-medium inline-flex items-center gap-1 transition-colors duration-200 pb-1 ${
                    isBuyActive
                      ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                      : "text-primary-foreground/80 shadow-[0_2px_0_0_transparent] hover:text-gold hover:shadow-[0_2px_0_0_#FFD700]"
                  }`}
                >
                  Buy
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${buyMenuOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            <div
              className="flex"
              onMouseEnter={handleRentMouseEnter}
              onMouseLeave={handleRentMouseLeave}
            >
                <button
                  type="button"
                  className={`min-w-[4.75rem] justify-center text-sm font-medium inline-flex items-center gap-1 transition-colors duration-200 pb-1 ${
                    isRentActive
                      ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                      : "text-primary-foreground/80 shadow-[0_2px_0_0_transparent] hover:text-gold hover:shadow-[0_2px_0_0_#FFD700]"
                  }`}
                >
                  Rent
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${rentMenuOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

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

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+971501234567" className="flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-colors text-sm">
              <Phone className="w-4 h-4" />
              +971 50 123 4567
            </a>
          </div>

          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {openMegaMenuType && (
        <div
          className="hidden lg:block w-full border-t border-primary-foreground/10 bg-navy-dark/95"
          onMouseEnter={openMegaMenuType === "buy" ? handleBuyMouseEnter : handleRentMouseEnter}
          onMouseLeave={openMegaMenuType === "buy" ? handleBuyMouseLeave : handleRentMouseLeave}
        >
          <div className="container mx-auto px-4 py-5">
            <div className="grid grid-cols-3 gap-8">
              {propertyMenu.map((group) => (
                <div key={group.title}>
                  <Link
                    to={`/properties?type=${openMegaMenuType}`}
                    className="group relative mb-3 block h-44 overflow-hidden rounded-xl"
                  >
                    <img
                      src={openMegaMenuType === "buy" ? group.buyImage : group.rentImage}
                      alt={`${group.title} properties`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
                    <p className="absolute bottom-3 left-3 text-base font-semibold uppercase tracking-[0.14em] text-white">
                      {group.title}
                    </p>
                  </Link>
                  {group.items.map((item) => (
                    <Link
                      key={`${openMegaMenuType}-${group.title}-${item}`}
                      to={`/properties?type=${openMegaMenuType}${item ? `&category=${encodeURIComponent(item)}` : ""}`}
                      className="block rounded-sm px-3 py-2 text-sm text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-gold"
                    >
                      {item === "Office" ? "Offices" : item}
                    </Link>
                  ))}
                  {group.footer?.map((footer) => (
                    <Link
                      key={`${openMegaMenuType}-${group.title}-${footer.label}`}
                      to={`/properties?type=${openMegaMenuType}`}
                      className="block rounded-sm px-3 py-2 text-sm text-primary-foreground/85 transition-colors hover:bg-primary-foreground/10 hover:text-gold"
                    >
                      {footer.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="lg:hidden bg-navy-dark border-t border-primary-foreground/10">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {topLinks.map((action) => (
              <Link
                key={action.name}
                to={action.path}
                onClick={() => setIsOpen(false)}
                className="block rounded-full border border-border px-4 py-3 text-center text-sm font-medium text-primary-foreground/80 hover:border-gold hover:text-gold"
              >
                {action.name}
              </Link>
            ))}
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
