import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Seo from "@/components/Seo";
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE, SITE_URL } from "@/lib/seo";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: BRAND_NAME,
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  telephone: "+971543912231",
  email: "info@keegoproperties.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Wafi Residence Office Block : LHEU -FF-06, Al Razi Street, Dubai Health Care City",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  areaServed: "Dubai",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND_NAME,
  url: SITE_URL,
};

const routeDefaults: Array<{
  matches: (pathname: string) => boolean;
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}> = [
  {
    matches: (pathname) => pathname === "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    jsonLd: [organizationSchema, websiteSchema],
  },
  {
    matches: (pathname) => pathname === "/properties",
    title: `Properties for Sale & Rent in Dubai | ${BRAND_NAME}`,
    description: "Browse Dubai properties for sale and rent with KeeGo Properties, including apartments, villas, townhouses, penthouses, and investment listings.",
    path: "/properties",
  },
  {
    matches: (pathname) => pathname.startsWith("/property/"),
    title: `Property Details | ${BRAND_NAME}`,
    description: "View Dubai property details including price, location, amenities, and enquiry options with KeeGo Properties.",
  },
  {
    matches: (pathname) => pathname === "/communities",
    title: `Dubai Communities Guide | ${BRAND_NAME}`,
    description: "Explore Dubai communities, neighborhoods, and lifestyle destinations with KeeGo Properties.",
    path: "/communities",
  },
  {
    matches: (pathname) => pathname.startsWith("/community/"),
    title: `Community Guide | ${BRAND_NAME}`,
    description: "Discover community insights, available listings, and market information for Dubai neighborhoods.",
  },
  {
    matches: (pathname) => pathname === "/developers",
    title: `Dubai Developers | ${BRAND_NAME}`,
    description: "Explore trusted Dubai property developers and development partners with KeeGo Properties.",
    path: "/developers",
  },
  {
    matches: (pathname) => pathname.startsWith("/developers/"),
    title: `Developer Profile | ${BRAND_NAME}`,
    description: "Read developer profiles, highlights, and project information curated by KeeGo Properties.",
  },
  {
    matches: (pathname) => pathname === "/services",
    title: `Real Estate Services in Dubai | ${BRAND_NAME}`,
    description: "Discover KeeGo Properties services including sales, leasing, valuation, investment advisory, and portfolio support in Dubai.",
    path: "/services",
  },
  {
    matches: (pathname) => pathname.startsWith("/services/"),
    title: `Service Details | ${BRAND_NAME}`,
    description: "Learn more about KeeGo Properties real estate services and specialist advisory offerings in Dubai.",
  },
  {
    matches: (pathname) => pathname === "/news",
    title: `Dubai Property News | ${BRAND_NAME}`,
    description: "Stay updated with Dubai property news, market updates, and real estate insights from KeeGo Properties.",
    path: "/news",
  },
  {
    matches: (pathname) => pathname.startsWith("/news/"),
    title: `News Article | ${BRAND_NAME}`,
    description: "Read the latest Dubai property news and real estate market commentary from KeeGo Properties.",
  },
  {
    matches: (pathname) => pathname === "/blogs" || pathname === "/blog",
    title: `Real Estate Blog | ${BRAND_NAME}`,
    description: "Explore KeeGo Properties blog articles covering Dubai real estate, investment insights, and lifestyle guidance.",
    path: "/blogs",
  },
  {
    matches: (pathname) => pathname.startsWith("/blogs/") || pathname.startsWith("/blog/"),
    title: `Blog Article | ${BRAND_NAME}`,
    description: "Read expert Dubai real estate guidance, insights, and stories from the KeeGo Properties blog.",
  },
  {
    matches: (pathname) => pathname === "/about",
    title: `About ${BRAND_NAME}`,
    description: "Learn about KeeGo Properties, our vision, mission, values, and premium real estate approach in Dubai.",
    path: "/about",
  },
  {
    matches: (pathname) => pathname === "/contact",
    title: `Contact ${BRAND_NAME}`,
    description: "Contact KeeGo Properties for expert real estate support in Dubai, including buying, renting, selling, and investment advice.",
    path: "/contact",
  },
  {
    matches: (pathname) => pathname === "/careers",
    title: `Real Estate Careers in Dubai | ${BRAND_NAME}`,
    description: "Explore career opportunities with KeeGo Properties and join a growing real estate team in Dubai.",
  },
  {
    matches: (pathname) => pathname === "/holiday-homes",
    title: `Holiday Homes in Dubai | ${BRAND_NAME}`,
    description: "Discover holiday home and short-term stay opportunities in Dubai with KeeGo Properties.",
  },
  {
    matches: (pathname) => pathname === "/list-property",
    title: `List Your Property in Dubai | ${BRAND_NAME}`,
    description: "List your Dubai property with KeeGo Properties and connect with qualified buyers, tenants, and investors.",
  },
  {
    matches: (pathname) => pathname === "/property-valuation",
    title: `Property Valuation in Dubai | ${BRAND_NAME}`,
    description: "Request a Dubai property valuation with KeeGo Properties for sales, leasing, refinancing, or investment planning.",
  },
  {
    matches: (pathname) => pathname === "/your-voice-matters",
    title: `Your Voice Matters | ${BRAND_NAME}`,
    description: "Share your feedback, questions, or concerns with the KeeGo Properties team.",
  },
  {
    matches: (pathname) => pathname === "/privacy-policy",
    title: `Privacy Policy | ${BRAND_NAME}`,
    description: "Read the KeeGo Properties privacy policy covering personal data, cookies, and information use.",
  },
  {
    matches: (pathname) => pathname === "/terms-and-conditions",
    title: `Terms and Conditions | ${BRAND_NAME}`,
    description: "Review the terms and conditions governing the use of KeeGo Properties and related services.",
  },
  {
    matches: (pathname) => pathname.startsWith("/admin"),
    title: `Admin | ${BRAND_NAME}`,
    description: DEFAULT_DESCRIPTION,
    noindex: true,
  },
];

const RouteSeo = () => {
  const location = useLocation();

  const config = useMemo(() => {
    return routeDefaults.find((item) => item.matches(location.pathname)) || {
      title: `Page Not Found | ${BRAND_NAME}`,
      description: DEFAULT_DESCRIPTION,
      noindex: true,
    };
  }, [location.pathname]);

  return (
    <Seo
      title={config.title}
      description={config.description}
      noindex={config.noindex}
      path={config.path || location.pathname}
      jsonLd={config.jsonLd}
    />
  );
};

export default RouteSeo;
