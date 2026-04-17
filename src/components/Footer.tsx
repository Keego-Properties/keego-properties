import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Music2,
  Send,
} from "lucide-react";
import logoImage from "@/assets/KeeGo Logo.png";

const Footer = () => {
  const footerColumns = [
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "News", to: "/news" },
        { label: "Blog", to: "/blogs" }
      ],
    },
    {
      title: "Quick Links",
      links: [
        { label: "Home", to: "/home" },
        { label: "Communities", to: "/communities" },
        { label: "Developers", to: "/developers" }
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Asset Management", to: "/buy" },
        { label: "Holiday Homes", to: "/buy" },
        { label: "Luxury Property Services", to: "/buy" }
      ],
    },
    {
      title: "Contact Info",
      links: [
        { label: "+971 50 123 4567", href: "tel:+971501234567" },
        { label: "info@keegoproperties.com", href: "mailto:info@keegoproperties.com" },
        { label: "Business Bay, Dubai, UAE", to: "/contact" }
      ],
    },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", to: "/contact" },
    { label: "Privacy Policy", to: "/contact" }
  ];

  const socialIcons = [Facebook, Twitter, Youtube, Music2, Linkedin, Instagram];

  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-[1fr_1fr_1fr_1fr_1.25fr]">
          <div className="flex flex-col justify-start">
            <img src={logoImage} alt="KeeGo Properties" className="h-36 w-auto object-contain" />
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-medium tracking-wide text-primary-foreground">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {"href" in link ? (
                      <a
                        href={link.href}
                        className="text-sm text-primary-foreground/55 transition-colors duration-200 hover:text-gold"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-sm text-primary-foreground/55 transition-colors duration-200 hover:text-gold"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>

            </div>
          ))}

          <div>
            <h4 className="mb-3 text-sm font-medium tracking-wide text-primary-foreground">Join the KeeGo Newsletter</h4>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="First Name*"
                className="h-8 w-full rounded-md border border-primary-foreground/30 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address*"
                className="h-8 w-full rounded-md border border-primary-foreground/30 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
              <label className="flex items-start gap-2 text-xs text-primary-foreground/50">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-primary-foreground/30 bg-transparent" />
                Subscribe to KeeGo marketing offers and updates.
              </label>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-md border border-primary-foreground/40 px-4 text-sm text-primary-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Submit
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-primary-foreground/15 pt-5">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="KeeGo Properties" className="h-7 w-auto rounded-md object-contain" />
              <span className="text-xs text-primary-foreground/45">
                Copyright © 2026 KeeGo Properties. All rights reserved.
              </span>
            </div>
            <div className="flex items-center gap-3">
                {socialIcons.map((Icon, idx) => (
                  <a key={idx} href="#" className="text-primary-foreground/55 transition-colors hover:text-gold">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link key={link.label} to={link.to} className="text-xs text-primary-foreground/45 transition-colors hover:text-gold">
                  {link.label}
                </Link>
              ))}
            </div>
            <button type="button" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 px-3 py-1 text-xs text-primary-foreground/60">
              <span className="text-sm leading-none" aria-hidden="true">🇦🇪</span>
              United Arab Emirates
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
