"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import qrCode from "@/assets/qr-code.png";

import { brandLogo } from "@/lib/brand";

const logoImage = brandLogo;

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M18.244 2H21.5l-7.113 8.13L22.75 22h-6.547l-5.127-6.708L5.21 22H1.95l7.608-8.697L1.25 2h6.713l4.634 6.117L18.244 2Zm-1.142 18.05h1.804L6.988 3.846H5.053L17.102 20.05Z" />
  </svg>
);

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
        { label: "Home", to: "/" },
        { label: "Communities", to: "/communities" },
        { label: "Developers", to: "/developers" },
        { label: "Services", to: "/services" }
      ],
    },
  ];

  const legalLinks = [
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
    { label: "Privacy Policy", to: "/privacy-policy" }
  ];

  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61589446539778", label: "Facebook" },
    { Icon: Instagram, href: "https://www.instagram.com/keego_luxury/", label: "Instagram" },
    { Icon: Linkedin, href: "https://www.linkedin.com/company/keego-properties", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto_1fr]">
          <div className="flex flex-col justify-start">
            <img src={logoImage} alt="KeeGo Properties" className="h-48 w-auto object-contain" />
          </div>
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h4 className="mb-4 text-sm font-medium tracking-wide text-primary-foreground">{column.title}</h4>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.to}
                      className="text-sm text-primary-foreground/55 transition-colors duration-200 hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          ))}

          {/* Newsletter */}
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

          {/* QR Code */}
          <div className="flex flex-col items-center justify-start gap-2">
            <img src={qrCode.src} alt="Scan to visit Keego Properties" className="w-28 h-28 rounded-lg border border-primary-foreground/20 bg-white p-1 object-contain" />
            <span className="text-xs text-primary-foreground/45 text-center leading-snug">Scan and verify</span>
          </div>
        </div>

        {/* Contact Info — horizontal strip */}
        <div className="border-t border-primary-foreground/15 py-6">
            <div className="flex flex-wrap gap-x-10 gap-y-2 justify-center text-center">
              <a href="tel:+971543912231" className="text-sm text-primary-foreground/55 transition-colors duration-200 hover:text-gold">+971 54 391 2231</a>
              <a href="mailto:info@keegoproperties.com" className="text-sm text-primary-foreground/55 transition-colors duration-200 hover:text-gold">info@keegoproperties.com</a>
              <Link href="/contact" className="text-sm text-primary-foreground/55 transition-colors duration-200 hover:text-gold">Wafi Residence Office Block : LHEU -FF-06, Al Razi Street, Dubai Health Care City, Dubai, UAE</Link>
            </div>
        </div>

        <div className="border-t border-primary-foreground/15 pt-5">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="KeeGo Properties" className="h-7 w-auto rounded-md object-contain" />
              <span className="text-xs text-center text-primary-foreground/45">
                Copyright © 2026 KeeGo Properties. All rights reserved. <br></br>Design and Developed by{" "}
                <a
                  href="https://www.mentecode.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 underline underline-offset-2 transition-colors hover:text-gold"
                >
                  Mentecode
                </a>
                .
              </span>
            </div>
            <div className="flex items-center gap-3">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-primary-foreground/55 transition-colors hover:text-gold">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalLinks.map((link) => (
                <Link key={link.label} href={link.to} className="text-xs text-primary-foreground/45 transition-colors hover:text-gold">
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
