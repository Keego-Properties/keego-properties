import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, ArrowUpRight, Building2, MapPin, Sparkles, MessageSquareHeart, ListPlus, PhoneCall } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import logoImage from "@/assets/eagb.png";

interface Developer {
  id: string;
  name: string;
  website?: string;
}

interface ServiceItem {
  id: string;
  title: string;
  status?: "published" | "draft";
  displayOrder?: number;
}

interface Community {
  id: string;
  name: string;
  location?: string;
  propertiesCount?: number;
}

const generateSlug = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [buyMenuOpen, setBuyMenuOpen] = useState(false);
  const [rentMenuOpen, setRentMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [communitiesMenuOpen, setCommunitiesMenuOpen] = useState(false);
  const [developersMenuOpen, setDevelopersMenuOpen] = useState(false);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [showTopHeader, setShowTopHeader] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const buyTimeoutRef = useRef<NodeJS.Timeout>();
  const rentTimeoutRef = useRef<NodeJS.Timeout>();
  const servicesTimeoutRef = useRef<NodeJS.Timeout>();
  const communitiesTimeoutRef = useRef<NodeJS.Timeout>();
  const developersTimeoutRef = useRef<NodeJS.Timeout>();

  const handleBuyMouseEnter = () => {
    setMoreMenuOpen(false);
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
    }
    if (rentTimeoutRef.current) {
      clearTimeout(rentTimeoutRef.current);
    }
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    if (communitiesTimeoutRef.current) {
      clearTimeout(communitiesTimeoutRef.current);
    }
    if (developersTimeoutRef.current) {
      clearTimeout(developersTimeoutRef.current);
    }
    setServicesMenuOpen(false);
    setCommunitiesMenuOpen(false);
    setDevelopersMenuOpen(false);
    setRentMenuOpen(false);
    setBuyMenuOpen(true);
  };

  const handleBuyMouseLeave = () => {
    buyTimeoutRef.current = setTimeout(() => {
      setBuyMenuOpen(false);
    }, 150);
  };

  const handleRentMouseEnter = () => {
    setMoreMenuOpen(false);
    if (rentTimeoutRef.current) {
      clearTimeout(rentTimeoutRef.current);
    }
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
    }
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    if (communitiesTimeoutRef.current) {
      clearTimeout(communitiesTimeoutRef.current);
    }
    if (developersTimeoutRef.current) {
      clearTimeout(developersTimeoutRef.current);
    }
    setBuyMenuOpen(false);
    setServicesMenuOpen(false);
    setCommunitiesMenuOpen(false);
    setDevelopersMenuOpen(false);
    setRentMenuOpen(true);
  };

  const handleRentMouseLeave = () => {
    rentTimeoutRef.current = setTimeout(() => {
      setRentMenuOpen(false);
    }, 150);
  };

  const handleServicesMouseEnter = () => {
    setMoreMenuOpen(false);
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
    }
    if (rentTimeoutRef.current) {
      clearTimeout(rentTimeoutRef.current);
    }
    if (communitiesTimeoutRef.current) {
      clearTimeout(communitiesTimeoutRef.current);
    }
    if (developersTimeoutRef.current) {
      clearTimeout(developersTimeoutRef.current);
    }
    setBuyMenuOpen(false);
    setRentMenuOpen(false);
    setCommunitiesMenuOpen(false);
    setDevelopersMenuOpen(false);
    setServicesMenuOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 150);
  };

  const handleCommunitiesMouseEnter = () => {
    setMoreMenuOpen(false);
    if (communitiesTimeoutRef.current) {
      clearTimeout(communitiesTimeoutRef.current);
    }
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
    }
    if (rentTimeoutRef.current) {
      clearTimeout(rentTimeoutRef.current);
    }
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    if (developersTimeoutRef.current) {
      clearTimeout(developersTimeoutRef.current);
    }
    setBuyMenuOpen(false);
    setRentMenuOpen(false);
    setServicesMenuOpen(false);
    setDevelopersMenuOpen(false);
    setCommunitiesMenuOpen(true);
  };

  const handleCommunitiesMouseLeave = () => {
    communitiesTimeoutRef.current = setTimeout(() => {
      setCommunitiesMenuOpen(false);
    }, 150);
  };

  const handleDevelopersMouseEnter = () => {
    setMoreMenuOpen(false);
    if (developersTimeoutRef.current) {
      clearTimeout(developersTimeoutRef.current);
    }
    if (buyTimeoutRef.current) {
      clearTimeout(buyTimeoutRef.current);
    }
    if (rentTimeoutRef.current) {
      clearTimeout(rentTimeoutRef.current);
    }
    if (servicesTimeoutRef.current) {
      clearTimeout(servicesTimeoutRef.current);
    }
    if (communitiesTimeoutRef.current) {
      clearTimeout(communitiesTimeoutRef.current);
    }
    setBuyMenuOpen(false);
    setRentMenuOpen(false);
    setServicesMenuOpen(false);
    setCommunitiesMenuOpen(false);
    setDevelopersMenuOpen(true);
  };

  const handleDevelopersMouseLeave = () => {
    developersTimeoutRef.current = setTimeout(() => {
      setDevelopersMenuOpen(false);
    }, 150);
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const [servicesSnap, communitiesSnap, developersSnap] = await Promise.all([
          getDocs(collection(db, "services")),
          getDocs(collection(db, "communities")),
          getDocs(collection(db, "developers")),
        ]);

        setServices(
          servicesSnap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() } as ServiceItem))
            .filter((service) => service.status !== "draft")
            .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)),
        );
        setCommunities(
          communitiesSnap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() } as Community))
            .sort((a, b) => a.name.localeCompare(b.name)),
        );
        setDevelopers(
          developersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Developer)),
        );
      } catch (error) {
        console.error("Error fetching navbar menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

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
      if (servicesTimeoutRef.current) {
        clearTimeout(servicesTimeoutRef.current);
      }
      if (communitiesTimeoutRef.current) {
        clearTimeout(communitiesTimeoutRef.current);
      }
      if (developersTimeoutRef.current) {
        clearTimeout(developersTimeoutRef.current);
      }
    };
  }, []);

  const navLinks = [
    { name: "Developers", path: "/developers", mobileOnly: true },
    { name: "Services", path: "/services", mobileOnly: true },
    { name: "Home", path: "/" },
    { name: "Sell", path: "/list-property" },
    { name: "Community", path: "/communities", mobileOnly: true },
    { name: "About", path: "/about" },
    { name: "Careers", path: "/careers" },
  ];

  const topLinks = [
    { name: "Your Voice Matters", path: "/your-voice-matters", icon: MessageSquareHeart },
    { name: "List Property", path: "/list-property", highlight: true, icon: ListPlus },
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
  const isServicesActive = location.pathname === "/services";
  const isCommunitiesActive = location.pathname === "/communities" || location.pathname.startsWith("/community/");
  const isDevelopersActive = location.pathname === "/developers";
  const isMoreActive =
    location.pathname === "/about" ||
    location.pathname === "/careers" ||
    location.pathname === "/holiday-homes" ||
    location.pathname === "/contact";
  const openMegaMenuType = buyMenuOpen ? "buy" : rentMenuOpen ? "rent" : null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className={`flex flex-wrap items-center justify-between gap-3 overflow-hidden text-xs uppercase tracking-[0.24em] text-slate-600 transition-[max-height,opacity,transform,padding,border-color] duration-500 ease-in-out ${showTopHeader ? "max-h-20 translate-y-0 border-b border-slate-200 py-2 opacity-100" : "pointer-events-none max-h-0 -translate-y-full border-b border-transparent py-0 opacity-0"}`}>
          <div className="flex-1 flex gap-4 justify-center">
            <div className="flex gap-4 items-center gap-2">
              {topLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 transition-all duration-200 ${
                    link.highlight
                      ? "bg-gold text-navy-dark shadow-[0_10px_24px_rgba(212,175,55,0.3)] hover:bg-gold/90"
                      : "hover:text-slate-900"
                  }`}
                >
                  <link.icon className="h-3 w-3 shrink-0" />
                  {link.name}
                </Link>
              ))}
            </div>
              <a href="tel:+971543912231" className="hidden lg:inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors text-sm">
                  <Phone className="w-4 h-4" />
                  +971 54 391 2231
              </a>
          </div>
        </div>

        <div className="flex items-center justify-around h-20 py-3">
          <Link to="/" className="flex items-end gap-1">
            <img src={logoImage} alt="KeeGo Properties" className="h-16 w-auto rounded-xl object-contain" />
            <div>
              <div className="font-brand leading-none tracking-tight">
                <span className="text-xl font-extrabold text-slate-900">
                  KeeGo
                </span>
                <span className="ml-1 text-xl font-bold text-gold">
                  Properties
                </span>
              </div>
              <p className="text-slate-500 text-[10px] tracking-[0.2em] uppercase">
                Dubai & Beyond
              </p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors duration-200 pb-1 ${
                isActive("/")
                  ? "text-gold"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Home
            </Link>

            <div
              className="flex"
              onMouseEnter={handleBuyMouseEnter}
              onMouseLeave={handleBuyMouseLeave}
            >
                <button
                  type="button"
                  onClick={() => navigate("/properties?type=buy")}
                  className={`min-w-[4.75rem] justify-center text-sm font-medium inline-flex items-center gap-1 transition-colors duration-200 pb-1 ${
                    isBuyActive
                      ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                      : "text-slate-700 shadow-[0_2px_0_0_transparent] hover:text-slate-900 hover:shadow-[0_2px_0_0_#FFD700]"
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
                  onClick={() => navigate("/properties?type=rent")}
                  className={`min-w-[4.75rem] justify-center text-sm font-medium inline-flex items-center gap-1 transition-colors duration-200 pb-1 ${
                    isRentActive
                      ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                      : "text-slate-700 shadow-[0_2px_0_0_transparent] hover:text-slate-900 hover:shadow-[0_2px_0_0_#FFD700]"
                  }`}
                >
                  Rent
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${rentMenuOpen ? "rotate-180" : ""}`} />
                </button>
            </div>

            <Link
              to="/list-property"
              className={`text-sm font-medium transition-colors duration-200 pb-1 ${
                isActive("/list-property")
                  ? "text-gold"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              Sell
            </Link>

            <div
              className="flex"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                onClick={() => navigate("/services")}
                className={`min-w-[5.75rem] justify-center text-sm font-medium inline-flex items-center gap-1 transition-colors duration-200 pb-1 ${
                  isServicesActive || servicesMenuOpen
                    ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                    : "text-slate-700 shadow-[0_2px_0_0_transparent] hover:text-slate-900 hover:shadow-[0_2px_0_0_#FFD700]"
                }`}
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            <div
              className="flex"
              onMouseEnter={handleCommunitiesMouseEnter}
              onMouseLeave={handleCommunitiesMouseLeave}
            >
              <button
                type="button"
                onClick={() => navigate("/communities")}
                className={`min-w-[6.75rem] justify-center text-sm font-medium inline-flex items-center gap-1 transition-colors duration-200 pb-1 ${
                  isCommunitiesActive || communitiesMenuOpen
                    ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                    : "text-slate-700 shadow-[0_2px_0_0_transparent] hover:text-slate-900 hover:shadow-[0_2px_0_0_#FFD700]"
                }`}
              >
                Community
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${communitiesMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            <div
              className="flex"
              onMouseEnter={handleDevelopersMouseEnter}
              onMouseLeave={handleDevelopersMouseLeave}
            >
              <button
                type="button"
                onClick={() => navigate("/developers")}
                className={`min-w-[6.75rem] justify-center text-sm font-medium inline-flex items-center gap-1 transition-colors duration-200 pb-1 ${
                  isDevelopersActive || developersMenuOpen
                    ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                    : "text-slate-700 shadow-[0_2px_0_0_transparent] hover:text-slate-900 hover:shadow-[0_2px_0_0_#FFD700]"
                }`}
              >
                Developers
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${developersMenuOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200 pb-1 ${
                  isMoreActive || moreMenuOpen
                    ? "text-gold shadow-[0_2px_0_0_#FFD700]"
                    : "text-slate-700 shadow-[0_2px_0_0_transparent] hover:text-slate-900 hover:shadow-[0_2px_0_0_#FFD700]"
                }`}
              >
                More
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${moreMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {moreMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  <Link
                    to="/about"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    About
                  </Link>
                  <Link
                    to="/careers"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    Careers
                  </Link>
                  <Link
                    to="/holiday-homes"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    Holiday Homes
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                  >
                    Contact
                  </Link>
                </div>
              )}
            </div>
          </div>

          <button
            className="lg:hidden text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {servicesMenuOpen && (
        <div
          className="hidden lg:block w-full border-t border-slate-200 bg-white/95"
          onMouseEnter={handleServicesMouseEnter}
          onMouseLeave={handleServicesMouseLeave}
        >
          <div className="container mx-auto px-4 py-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Services</p>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
                >
                  View all
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              {services.length === 0 ? (
                <div className="py-4 text-center text-sm text-slate-500">No services added yet.</div>
              ) : (
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={`/services/${service.id}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Sparkles className="h-4 w-4 text-gold" />
                      <span>{service.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {communitiesMenuOpen && (
        <div
          className="hidden lg:block w-full border-t border-slate-200 bg-white/95"
          onMouseEnter={handleCommunitiesMouseEnter}
          onMouseLeave={handleCommunitiesMouseLeave}
        >
          <div className="container mx-auto px-4 py-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Communities</p>
                <Link
                  to="/communities"
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
                >
                  View all
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              {communities.length === 0 ? (
                <div className="py-4 text-center text-sm text-slate-500">No communities added yet.</div>
              ) : (
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {communities.map((community) => (
                    <Link
                      key={community.id}
                      to={`/community/${generateSlug(community.name)}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      <MapPin className="h-4 w-4 text-gold" />
                      <span>{community.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {developersMenuOpen && (
        <div
          className="hidden lg:block w-full border-t border-slate-200 bg-white/95"
          onMouseEnter={handleDevelopersMouseEnter}
          onMouseLeave={handleDevelopersMouseLeave}
        >
          <div className="container mx-auto px-4 py-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Developers</p>
                <Link
                  to="/developers"
                  className="inline-flex items-center gap-1 text-sm font-medium text-slate-700 transition-colors hover:text-slate-900"
                >
                  View all
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              {developers.length === 0 ? (
                <div className="py-4 text-center text-sm text-slate-500">No developers added yet.</div>
              ) : (
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {developers.map((developer) => (
                    <Link
                      key={developer.id}
                      to={`/developers/${developer.id}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      <Building2 className="h-4 w-4 text-gold" />
                      <span>{developer.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {openMegaMenuType && (
        <div
          className="hidden lg:block w-full border-t border-slate-200 bg-white/95"
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
                      className="block rounded-sm px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      {item === "Office" ? "Offices" : item}
                    </Link>
                  ))}
                  {group.footer?.map((footer) => (
                    <Link
                      key={`${openMegaMenuType}-${group.title}-${footer.label}`}
                      to={`/properties?type=${openMegaMenuType}`}
                      className="block rounded-sm px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
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
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {topLinks.map((action) => (
              <Link
                key={action.name}
                to={action.path}
                onClick={() => setIsOpen(false)}
                className={`block rounded-full px-4 py-3 text-center text-sm font-medium transition-colors ${
                  action.highlight
                    ? "bg-gold text-navy-dark"
                    : "border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900"
                }`}
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
                  isActive(link.path) ? "text-gold" : "text-slate-700"
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
