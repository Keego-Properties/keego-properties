import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [buyMenuOpen, setBuyMenuOpen] = useState(false);
  const [rentMenuOpen, setRentMenuOpen] = useState(false);
  const location = useLocation();

  const buyTimeoutRef = useRef<NodeJS.Timeout>();
  const rentTimeoutRef = useRef<NodeJS.Timeout>();

  const handleBuyMouseEnter = () => {
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
    }
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
    setRentMenuOpen(true);
  };

  const handleRentMouseLeave = () => {
    rentTimeoutRef.current = setTimeout(() => {
      setRentMenuOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
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
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const propertyMenu = [
    {
      title: "Residential",
      items: ["Apartments", "Town House", "Penthouse", "Villas"],
    },
    {
      title: "Off Plan",
      items: ["Apartments", "Town House", "Penthouse", "Villas"],
    },
    {
      title: "Commercial",
      items: ["Office"],
      footer: [{ label: "View All", value: "" }],
    },
  ];

  const isActive = (path: string) => location.pathname === path;
  const currentType = new URLSearchParams(location.search).get("type");
  const isBuyActive = location.pathname === "/properties" && currentType === "buy";
  const isRentActive = location.pathname === "/properties" && currentType === "rent";

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
            <DropdownMenu open={buyMenuOpen} onOpenChange={setBuyMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  onMouseEnter={handleBuyMouseEnter}
                  onMouseLeave={handleBuyMouseLeave}
                  className={`text-sm font-medium inline-flex items-center gap-1 transition-all duration-200 pb-1 ${
                    isBuyActive
                      ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                      : "text-primary-foreground/80 shadow-[0_2px_0_0_transparent] hover:text-gold hover:shadow-[0_2px_0_0_#FFD700]"
                  }`}
                >
                  Buy
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[32rem] p-4"
                onMouseEnter={handleBuyMouseEnter}
                onMouseLeave={handleBuyMouseLeave}
              >
                <div className="grid grid-cols-3 gap-6">
                  {propertyMenu.map((group) => (
                    <div key={group.title}>
                      <DropdownMenuLabel>{group.title}</DropdownMenuLabel>
                      {group.items.map((item) => (
                        <DropdownMenuItem asChild key={item}>
                          <Link to={`/properties?type=buy${item ? `&category=${encodeURIComponent(item)}` : ""}`}>
                            {item === "Office" ? "Offices" : item}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      {group.footer?.map((footer) => (
                        <DropdownMenuItem asChild key={footer.label}>
                          <Link to="/properties?type=buy">{footer.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={rentMenuOpen} onOpenChange={setRentMenuOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  onMouseEnter={handleRentMouseEnter}
                  onMouseLeave={handleRentMouseLeave}
                  className={`text-sm font-medium inline-flex items-center gap-1 transition-all duration-200 pb-1 ${
                    isRentActive
                      ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                      : "text-primary-foreground/80 shadow-[0_2px_0_0_transparent] hover:text-gold hover:shadow-[0_2px_0_0_#FFD700]"
                  }`}
                >
                  Rent
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[32rem] p-4"
                onMouseEnter={handleRentMouseEnter}
                onMouseLeave={handleRentMouseLeave}
              >
                <div className="grid grid-cols-3 gap-6">
                  {propertyMenu.map((group) => (
                    <div key={group.title}>
                      <DropdownMenuLabel>{group.title}</DropdownMenuLabel>
                      {group.items.map((item) => (
                        <DropdownMenuItem asChild key={item}>
                          <Link to={`/properties?type=rent${item ? `&category=${encodeURIComponent(item)}` : ""}`}>
                            {item === "Office" ? "Offices" : item}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                      {group.footer?.map((footer) => (
                        <DropdownMenuItem asChild key={footer.label}>
                          <Link to="/properties?type=rent">{footer.label}</Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

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
