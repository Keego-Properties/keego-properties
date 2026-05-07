import {
  FaArrowTrendUp,
  FaBuilding,
  FaCalculator,
  FaChartLine,
  FaGem,
  FaHouse,
  FaLandmark,
  FaListUl,
} from "react-icons/fa6";

export const iconMap = {
  "fa-chart-line": FaChartLine,
  "fa-house": FaHouse,
  "fa-arrow-trend-up": FaArrowTrendUp,
  "fa-building": FaBuilding,
  "fa-gem": FaGem,
  "fa-calculator": FaCalculator,
  "fa-landmark": FaLandmark,
  "fa-list": FaListUl,
};

export type IconName = keyof typeof iconMap;

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  image?: string;
  status?: "published" | "draft";
  displayOrder?: number;
}

export interface ServiceSection {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServicePageContent extends ServiceItem {
  division: string;
  intro: string;
  lifecycle: string;
  services: ServiceSection[];
  whyChoose: string;
  faqs: ServiceFaq[];
  ctaTitle: string;
}

export const servicePages: ServicePageContent[] = [
  {
    id: "asset-management",
    title: "Property Asset Management in Dubai",
    division: "Keego Properties - Asset Management Division",
    description:
      "Professional management for residential, commercial, and investment properties focused on rental performance and long-term asset growth.",
    intro:
      "Keego Properties provides professional property asset management services in Dubai for residential, commercial, and investment properties. Our goal is simple: protect your asset, maximize rental performance, and support long-term growth through strategic management, market expertise, and transparent reporting.",
    lifecycle:
      "Whether you own a single property or a growing portfolio, our team manages every stage of the property lifecycle with precision, compliance, and care.",
    services: [
      {
        title: "Customer Service & Tenant Management",
        description:
          "We manage tenant communication, day-to-day enquiries, lease coordination, and ongoing support to ensure smooth occupancy, strong tenant relationships, and reduced vacancy periods.",
      },
      {
        title: "Premium Property Marketing",
        description:
          "Your property is positioned across Dubai's leading platforms including Property Finder, Bayut, and Dubizzle, supported by professional listings and targeted marketing strategies designed to attract qualified tenants.",
      },
      {
        title: "Maintenance & Property Care",
        description:
          "Through Fixoo Nova, we coordinate inspections, preventive maintenance, repairs, and property upkeep to protect long-term asset value.",
      },
      {
        title: "Financial Reporting",
        description:
          "Clear monthly reporting gives you full visibility into rental income, expenses, occupancy, and overall property performance.",
      },
    ],
    whyChoose:
      "As a RERA-licensed real estate company, Keego Properties delivers reliable asset management solutions built on market expertise, transparent communication, and a commitment to maximizing your investment returns.",
    faqs: [
      {
        question: "What is property asset management in Dubai?",
        answer:
          "Property asset management involves managing leasing, tenants, maintenance, and financial performance to protect and grow the value of your investment.",
      },
      {
        question: "Do you manage both residential and commercial properties?",
        answer:
          "Yes, we manage apartments, villas, offices, retail spaces, and investment portfolios across Dubai.",
      },
      {
        question: "Is Keego Properties RERA licensed?",
        answer:
          "Yes. Keego Properties operates in compliance with Dubai Land Department and RERA regulations.",
      },
    ],
    ctaTitle: "Get a Free Asset Management Consultation",
    icon: "fa-chart-line",
    status: "published",
    displayOrder: 1,
  },
  {
    id: "holiday-homes",
    title: "Holiday Homes in Dubai",
    division: "Ultima Homes - A Division of Keego Properties",
    description:
      "Short-term rental management solutions to maximize income, improve guest experience, and protect your property's long-term value.",
    intro:
      "Turn your property into a high-performing holiday home with professionally managed short-term rental solutions in Dubai. Through Ultima Homes, we help property owners maximize rental income, enhance guest experiences, and maintain complete flexibility over their assets.",
    lifecycle:
      "From property setup and licensing to guest bookings, concierge support, and ongoing maintenance, our team manages every stage of the holiday home journey with precision, transparency, and care.",
    services: [
      {
        title: "Property Setup & Registration",
        description:
          "We handle property onboarding, compliance requirements, and registration with Dubai's tourism authorities, ensuring your property is ready for the short-term rental market.",
      },
      {
        title: "Interior Styling & Professional Listing",
        description:
          "Our team prepares your property with professional photography, optimized listings, and strategic positioning designed to attract quality guests and increase booking performance.",
      },
      {
        title: "Booking & Guest Management",
        description:
          "From reservation handling and guest communication to check-in coordination and concierge support, every guest interaction is managed professionally to deliver a seamless experience.",
      },
      {
        title: "Maintenance & Property Care",
        description:
          "Through Fixoo Nova, your property receives regular inspections, cleaning, maintenance, and operational support between every stay.",
      },
    ],
    whyChoose:
      "Ultima Homes combines hospitality, real estate expertise, and local market knowledge to help property owners generate stronger short-term rental returns while protecting long-term asset value.",
    faqs: [
      {
        question: "What is a holiday home in Dubai?",
        answer:
          "A holiday home is a fully furnished property licensed for short-term rentals, offering guests an alternative to traditional hotels.",
      },
      {
        question: "Can I still use my property?",
        answer: "Yes. You maintain full ownership and flexibility to block dates whenever needed.",
      },
      {
        question: "Do you manage guest bookings and maintenance?",
        answer:
          "Yes. Our team manages bookings, guest support, cleaning, inspections, and ongoing property care.",
      },
    ],
    ctaTitle: "Get a Free Holiday Home Consultation",
    icon: "fa-list",
    status: "published",
    displayOrder: 2,
  },
  {
    id: "commercial-real-estate",
    title: "Commercial Real Estate Services in Dubai",
    division: "Keego Properties - Commercial Division",
    description:
      "Strategic office, retail, warehouse, and investment advisory support for businesses and commercial investors in Dubai.",
    intro:
      "Keego Properties provides strategic commercial real estate services in Dubai, helping businesses, investors, and property owners identify opportunities across office spaces, retail units, warehouses, and investment assets.",
    lifecycle:
      "Whether you are leasing, buying, selling, or expanding your commercial portfolio, our team provides clear guidance at every stage of the transaction.",
    services: [
      {
        title: "Office & Retail Leasing",
        description:
          "We help businesses secure office spaces, retail units, and commercial locations that align with operational goals, budget, and market positioning.",
      },
      {
        title: "Commercial Sales & Acquisitions",
        description:
          "From owner-occupied spaces to income-generating investment assets, we support buyers and sellers with market analysis, negotiations, and transaction management.",
      },
      {
        title: "Market Analysis & Investment Support",
        description:
          "Our team evaluates location performance, rental demand, yield potential, and market trends to help clients make informed commercial investment decisions.",
      },
      {
        title: "Lease Negotiation & Documentation",
        description:
          "We manage negotiations, lease structuring, documentation review, and compliance support to ensure smooth and secure transactions.",
      },
    ],
    whyChoose:
      "With strong market knowledge and a client-focused approach, Keego Properties delivers commercial real estate solutions built on transparency, strategy, and long-term value creation.",
    faqs: [
      {
        question: "What types of commercial properties do you handle?",
        answer:
          "We work with office spaces, retail units, warehouses, mixed-use developments, and commercial investment properties across Dubai.",
      },
      {
        question: "Do you support both leasing and sales?",
        answer: "Yes. We assist clients with leasing, acquisitions, disposals, and portfolio expansion.",
      },
      {
        question: "Do you provide investment advice for commercial properties?",
        answer:
          "Yes. Our team provides market insights, yield analysis, and strategic guidance for commercial real estate investments.",
      },
    ],
    ctaTitle: "Talk to Our Commercial Property Experts",
    icon: "fa-building",
    status: "published",
    displayOrder: 3,
  },
  {
    id: "investment-advisory",
    title: "Real Estate Investment Advisory in Dubai",
    division: "Keego Properties - Investment Advisory Division",
    description:
      "Strategic, data-driven investment guidance for first-time and experienced investors building Dubai property portfolios.",
    intro:
      "Keego Properties provides strategic real estate investment advisory services in Dubai, helping investors identify opportunities, evaluate market potential, and build property portfolios aligned with their financial goals.",
    lifecycle:
      "Whether you are entering the Dubai market for the first time or expanding an existing portfolio, our team provides clear guidance designed to support confident investment decisions.",
    services: [
      {
        title: "Investment Planning & Strategy",
        description:
          "We work closely with investors to understand financial objectives, risk appetite, and investment timelines, creating strategies tailored to long-term growth.",
      },
      {
        title: "Market Research & Opportunity Analysis",
        description:
          "Our team analyzes market trends, location performance, rental demand, and capital appreciation potential to identify high-value investment opportunities.",
      },
      {
        title: "Portfolio Advisory",
        description:
          "From single-property investments to diversified portfolios, we provide strategic guidance designed to improve performance, balance risk, and support sustainable returns.",
      },
      {
        title: "Acquisition Support",
        description:
          "We assist throughout the acquisition process, including property selection, financial evaluation, negotiations, and transaction support.",
      },
    ],
    whyChoose:
      "With strong market knowledge and a strategic advisory approach, Keego Properties helps investors navigate Dubai's real estate market with clarity, confidence, and long-term focus.",
    faqs: [
      {
        question: "Is Dubai a good market for property investment?",
        answer:
          "Dubai continues to attract global investors through strong infrastructure, tax advantages, competitive rental yields, and long-term growth opportunities.",
      },
      {
        question: "Do you advise first-time investors?",
        answer:
          "Yes. We support both first-time buyers and experienced investors with tailored investment guidance.",
      },
      {
        question: "Do you help build investment portfolios?",
        answer:
          "Yes. We help clients identify opportunities, diversify assets, and build portfolios aligned with their financial objectives.",
      },
    ],
    ctaTitle: "Speak to Our Investment Advisors",
    icon: "fa-arrow-trend-up",
    status: "published",
    displayOrder: 4,
  },
  {
    id: "luxury-property-services",
    title: "Luxury Property Services in Dubai",
    division: "Keego Properties - Luxury Division",
    description:
      "Bespoke advisory and sourcing for premium apartments, villas, penthouses, and branded residences in Dubai.",
    intro:
      "Keego Properties offers bespoke luxury property services in Dubai, connecting buyers, investors, and homeowners with some of the city's most exclusive residences.",
    lifecycle:
      "Our approach is built on discretion, market expertise, and a personalized service experience, ensuring every property journey is handled with attention, precision, and confidence.",
    services: [
      {
        title: "Luxury Property Sales",
        description:
          "We represent a curated selection of luxury apartments, villas, penthouses, and branded residences across Dubai's premium residential communities.",
      },
      {
        title: "Exclusive Property Sourcing",
        description:
          "For clients seeking specific lifestyle or investment opportunities, our team provides tailored property sourcing based on location, preferences, and investment goals.",
      },
      {
        title: "Investment & Portfolio Support",
        description:
          "We help investors evaluate high-value properties based on capital appreciation, rental potential, market positioning, and long-term performance.",
      },
      {
        title: "Private Viewing & Transaction Support",
        description:
          "From private viewings and negotiations to documentation and transaction management, every stage is handled with professionalism and discretion.",
      },
    ],
    whyChoose:
      "Keego Properties combines market insight, personalized advisory, and access to premium opportunities, helping clients navigate Dubai's luxury real estate market with confidence.",
    faqs: [
      {
        question: "What types of luxury properties do you offer?",
        answer:
          "We work with luxury apartments, waterfront residences, penthouses, private villas, and branded developments across Dubai.",
      },
      {
        question: "Do you support international buyers?",
        answer:
          "Yes. We assist both local and international clients throughout the buying and investment process.",
      },
      {
        question: "Do you provide private property sourcing?",
        answer:
          "Yes. Our team offers tailored sourcing based on lifestyle preferences, location requirements, and investment objectives.",
      },
    ],
    ctaTitle: "Explore Luxury Opportunities with Keego Properties",
    icon: "fa-gem",
    status: "published",
    displayOrder: 5,
  },
  {
    id: "property-valuation",
    title: "Property Valuation Services in Dubai",
    division: "Keego Properties - Valuation Division",
    description:
      "Accurate, data-led residential and commercial valuation services for buying, selling, refinancing, and portfolio strategy.",
    intro:
      "Keego Properties provides professional property valuation services in Dubai for residential, commercial, and investment assets. Whether you are buying, selling, refinancing, investing, or reviewing portfolio performance, accurate valuation is essential for making informed property decisions.",
    lifecycle:
      "Our valuation approach combines market analysis, location insights, property performance, and current market trends to deliver clear, reliable, and data-driven assessments.",
    services: [
      {
        title: "Residential Property Valuation",
        description:
          "Professional valuation for apartments, villas, townhouses, and luxury residences based on location demand, condition, and comparable market activity.",
      },
      {
        title: "Commercial Property Valuation",
        description:
          "Evaluation of office spaces, retail units, warehouses, and commercial assets using rental performance, occupancy trends, and investment potential.",
      },
      {
        title: "Investment Analysis & Portfolio Review",
        description:
          "Assessment of rental income performance, yield potential, and appreciation opportunities to support smarter investment planning.",
      },
      {
        title: "Market Reporting & Advisory",
        description:
          "Valuation reports supported by market insights and strategic guidance for acquisitions, disposals, refinancing, and portfolio expansion.",
      },
    ],
    whyChoose:
      "Keego Properties delivers accurate property assessments supported by market expertise, strategic analysis, and a commitment to transparency at every stage.",
    faqs: [
      {
        question: "Why is property valuation important?",
        answer:
          "Property valuation helps determine the current market value of an asset, supporting informed decisions for sales, purchases, financing, and investment planning.",
      },
      {
        question: "Do you value both residential and commercial properties?",
        answer:
          "Yes. We provide valuation services across residential, commercial, and investment property sectors in Dubai.",
      },
      {
        question: "Can valuation support investment decisions?",
        answer:
          "Yes. Accurate valuation helps investors assess performance, identify opportunities, and plan long-term growth.",
      },
    ],
    ctaTitle: "Request a Property Valuation Today",
    icon: "fa-calculator",
    status: "published",
    displayOrder: 6,
  },
  {
    id: "mortgage-advisory",
    title: "Mortgage Advisory Services in Dubai",
    division: "Keego Properties - Mortgage Advisory Division",
    description:
      "Financing guidance with trusted banking partners to support first-time purchase, refinancing, and portfolio expansion.",
    intro:
      "Keego Properties provides professional mortgage advisory services in Dubai, helping buyers, investors, and property owners secure financing solutions aligned with their financial goals.",
    lifecycle:
      "With access to trusted banking partners and a strong understanding of the local financing market, we help clients make informed mortgage decisions with confidence, clarity, and long-term planning in mind.",
    services: [
      {
        title: "Mortgage Consultation & Financial Assessment",
        description:
          "We review your financial profile, borrowing capacity, and eligibility to identify mortgage options best suited to your needs.",
      },
      {
        title: "Home Loan & Property Financing",
        description:
          "Support in exploring competitive home loan options for apartments, villas, townhouses, and investment properties from leading institutions.",
      },
      {
        title: "Refinancing & Mortgage Restructuring",
        description:
          "Advisory solutions to optimize rates, improve repayment terms, or unlock equity for future investments.",
      },
      {
        title: "Documentation & Approval Support",
        description:
          "End-to-end process support from application preparation and lender communication to approval coordination.",
      },
    ],
    whyChoose:
      "Keego Properties combines market expertise, financial insight, and trusted lender relationships to deliver mortgage solutions designed around clarity, flexibility, and long-term value.",
    faqs: [
      {
        question: "Can you help first-time property buyers?",
        answer:
          "Yes. We guide first-time buyers through every stage of the mortgage process, from financial assessment to final approval.",
      },
      {
        question: "Do you work with multiple banks?",
        answer:
          "Yes. We work with trusted financial institutions across Dubai to help clients explore competitive mortgage options.",
      },
      {
        question: "Can you assist with refinancing?",
        answer:
          "Yes. We support refinancing, mortgage restructuring, and financing reviews for existing property owners.",
      },
    ],
    ctaTitle: "Speak to Our Mortgage Advisors Today",
    icon: "fa-landmark",
    status: "published",
    displayOrder: 7,
  },
  {
    id: "property-listing",
    title: "Property Listing Services in Dubai",
    division: "Keego Properties - Listing Division",
    description:
      "Strategic listing, premium exposure, and transaction support to attract qualified buyers and tenants in Dubai.",
    intro:
      "Keego Properties provides professional property listing services in Dubai, helping owners market, lease, and sell residential, commercial, and investment properties with confidence.",
    lifecycle:
      "Whether you are listing a single apartment, a luxury villa, a commercial unit, or an investment asset, we focus on maximizing visibility and achieving the best possible market outcome.",
    services: [
      {
        title: "Property Evaluation & Market Positioning",
        description:
          "Every successful listing begins with the right strategy based on location demand, comparable transactions, and current pricing trends.",
      },
      {
        title: "Professional Marketing & Digital Exposure",
        description:
          "Your property is showcased across Property Finder, Bayut, and Dubizzle with professional photography and optimized listing content.",
      },
      {
        title: "Buyer & Tenant Qualification",
        description:
          "We manage enquiries, schedule viewings, and screen prospects to increase lead quality and save owner time.",
      },
      {
        title: "Negotiation & Transaction Support",
        description:
          "From offers and documentation to closing, we manage every stage with transparency and detail.",
      },
    ],
    whyChoose:
      "Keego Properties combines market expertise, strategic marketing, and client-focused service to ensure every property receives the visibility and support required for strong results.",
    faqs: [
      {
        question: "What types of properties can you list?",
        answer:
          "We list apartments, villas, townhouses, commercial spaces, retail units, and investment properties across Dubai.",
      },
      {
        question: "Where will my property be marketed?",
        answer:
          "Your property is promoted across leading real estate portals, digital channels, and our professional buyer and investor network.",
      },
      {
        question: "Do you handle viewings and negotiations?",
        answer:
          "Yes. We manage enquiries, viewings, screening, negotiations, and transaction coordination from start to finish.",
      },
    ],
    ctaTitle: "List Your Property with Keego Properties",
    icon: "fa-list",
    status: "published",
    displayOrder: 8,
  },
  {
    id: "property-maintenance",
    title: "Property Maintenance Services in Dubai",
    division: "Fixoo Nova - A Specialized Division of Keego Properties",
    description:
      "Proactive maintenance and technical support that protects property value and keeps residential and commercial assets operating at their best.",
    intro:
      "Through Fixoo Nova, the dedicated property maintenance division of Keego Properties, we provide professional property maintenance services in Dubai for residential, commercial, and investment properties.",
    lifecycle:
      "Whether you own a single property, multiple units, or a growing portfolio, our maintenance solutions are designed to deliver reliable support and complete peace of mind.",
    services: [
      {
        title: "Preventive Maintenance & Inspections",
        description:
          "Scheduled checks across electrical systems, plumbing, air conditioning, and operational safety to identify issues early.",
      },
      {
        title: "Repair & Technical Support",
        description:
          "Efficient technical support for plumbing, electrical, AC servicing, carpentry, painting, and general repair requirements.",
      },
      {
        title: "Building & Facility Support",
        description:
          "Ongoing building maintenance support for apartments, villas, offices, retail, and commercial assets.",
      },
      {
        title: "Emergency Response & Ongoing Care",
        description:
          "Rapid support for urgent repair issues with continuous maintenance planning to minimize downtime and preserve standards.",
      },
    ],
    whyChoose:
      "As the specialized maintenance division of Keego Properties, Fixoo Nova combines technical expertise, proactive service, and operational reliability for long-term asset protection.",
    faqs: [
      {
        question: "What types of properties do you maintain?",
        answer:
          "We provide maintenance services for apartments, villas, townhouses, office spaces, retail units, and commercial properties across Dubai.",
      },
      {
        question: "Do you offer emergency maintenance support?",
        answer:
          "Yes. Our team responds to urgent repair and operational issues with timely technical support.",
      },
      {
        question: "Do you provide scheduled maintenance?",
        answer:
          "Yes. We offer preventive maintenance plans, routine inspections, and ongoing facility support tailored to property requirements.",
      },
    ],
    ctaTitle: "Schedule a Property Maintenance Consultation",
    icon: "fa-list",
    status: "published",
    displayOrder: 9,
  },
];

export const defaultServices: ServiceItem[] = servicePages.map((service) => ({
  id: service.id,
  title: service.title,
  description: service.description,
  icon: service.icon,
  status: service.status,
  displayOrder: service.displayOrder,
}));

export const serviceContentMap = Object.fromEntries(servicePages.map((service) => [service.id, service]));
