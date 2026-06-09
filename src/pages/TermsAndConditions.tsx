import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LAST_UPDATED = "8 May 2026";

const sections = [
  {
    title: "Acceptance of Terms",
    subsections: [
      {
        heading: null,
        body: "By accessing and using the Keego Properties website (keego.ae) or any of our services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Service. These Terms apply to all visitors, users, and others who access or use the Service.",
      },
    ],
  },
  {
    title: "Definitions",
    subsections: [
      {
        heading: null,
        body: null,
        list: [
          { term: "Company", def: '(referred to as "We", "Us" or "Our") refers to Keego Properties LLC, Wafi Residence Office Block : LHEU -FF-06, Al Razi Street, Dubai Health Care City, Dubai, UAE.' },
          { term: "Service", def: "refers to the Website and all related property services offered by Keego Properties." },
          { term: "You / User", def: "means any individual or entity accessing or using our Service." },
          { term: "Content", def: "refers to all text, images, data, information, and other material available on the Service." },
          { term: "Property Listing", def: "means any residential, commercial, or off-plan property advertised through our Service." },
          { term: "RERA", def: "refers to the Real Estate Regulatory Agency of Dubai." },
        ],
      },
    ],
  },
  {
    title: "Use of the Service",
    subsections: [
      {
        heading: "Permitted Use",
        body: "You may use the Service solely for lawful purposes and in accordance with these Terms. You agree to use the Service only for personal, non-commercial purposes unless expressly agreed otherwise in writing by Keego Properties.",
      },
      {
        heading: "Prohibited Conduct",
        body: "You agree not to:",
        list: [
          { term: "Misrepresentation", def: "Submit false, misleading, or fraudulent property enquiries or information." },
          { term: "Scraping", def: "Use automated systems or bots to extract data from our Service without prior written consent." },
          { term: "Interference", def: "Attempt to interfere with or disrupt the integrity or performance of the Service." },
          { term: "Impersonation", def: "Impersonate any person or entity or misrepresent your affiliation with any person or entity." },
          { term: "Unlawful activity", def: "Use the Service for any purpose that is unlawful under UAE law or applicable international law." },
        ],
      },
    ],
  },
  {
    title: "Property Listings and Information",
    subsections: [
      {
        heading: "Accuracy of Listings",
        body: "Keego Properties endeavours to ensure that all property listings, prices, and information displayed on the Service are accurate and up to date. However, we do not guarantee the accuracy, completeness, or availability of any listing. Prices are subject to change without notice and availability is not guaranteed until a formal agreement is signed.",
      },
      {
        heading: "No Contractual Obligation",
        body: "Information provided on the Service, including pricing, availability, and property details, does not constitute an offer or contract. Any transaction is subject to a separate formal agreement between the relevant parties.",
      },
      {
        heading: "Third-Party Listings",
        body: "Some listings may be provided by third-party developers, landlords, or agents. Keego Properties does not warrant the accuracy of such third-party information and shall not be liable for any inaccuracies therein.",
      },
    ],
  },
  {
    title: "Intellectual Property",
    subsections: [
      {
        heading: null,
        body: "The Service and its original content, features, and functionality — including but not limited to text, graphics, logos, images, and software — are and will remain the exclusive property of Keego Properties and its licensors. Our trademarks may not be used in connection with any product or service without the prior written consent of Keego Properties. You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any content from the Service without our express written permission.",
      },
    ],
  },
  {
    title: "User-Submitted Content",
    subsections: [
      {
        heading: null,
        body: "By submitting any content through the Service (including property enquiries, reviews, or feedback), you grant Keego Properties a non-exclusive, worldwide, royalty-free licence to use, reproduce, and display such content in connection with the Service. You represent and warrant that you own or have the necessary rights to submit such content and that it does not infringe the rights of any third party.",
      },
    ],
  },
  {
    title: "Enquiries and Communications",
    subsections: [
      {
        heading: null,
        body: "When you submit an enquiry through the Service, you consent to being contacted by Keego Properties or its authorised agents via telephone, email, or WhatsApp for the purpose of responding to your enquiry or providing relevant property information. You may opt out of marketing communications at any time by contacting us directly.",
      },
    ],
  },
  {
    title: "Disclaimers and Limitation of Liability",
    subsections: [
      {
        heading: "No Warranty",
        body: 'The Service is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.',
      },
      {
        heading: "Limitation of Liability",
        body: "To the fullest extent permitted by applicable law, Keego Properties shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of, or inability to use, the Service. Our total liability in connection with the Service shall not exceed the amount paid, if any, by you to Keego Properties in the six months preceding the claim.",
      },
      {
        heading: "Investment Risk",
        body: "Real estate investment involves risk. Any information or analysis provided through the Service is for general informational purposes only and does not constitute financial, legal, or investment advice. You should conduct your own due diligence and consult qualified professionals before making any investment decisions.",
      },
    ],
  },
  {
    title: "Third-Party Links and Services",
    subsections: [
      {
        heading: null,
        body: "The Service may contain links to third-party websites or services that are not owned or controlled by Keego Properties. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to read the terms and privacy policies of any third-party sites you visit.",
      },
    ],
  },
  {
    title: "Privacy",
    subsections: [
      {
        heading: null,
        body: "Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.",
      },
    ],
  },
  {
    title: "Governing Law and Dispute Resolution",
    subsections: [
      {
        heading: null,
        body: "These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, specifically the laws applicable in the Emirate of Dubai. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE. The parties shall first attempt to resolve any dispute amicably through good-faith negotiation before initiating formal legal proceedings.",
      },
    ],
  },
  {
    title: "RERA Compliance",
    subsections: [
      {
        heading: null,
        body: "Keego Properties operates in compliance with the Real Estate Regulatory Agency (RERA) of Dubai and all applicable UAE real estate regulations. Our agents are appropriately licensed as required by RERA. All property transactions facilitated through our Service are subject to applicable UAE real estate laws and regulations.",
      },
    ],
  },
  {
    title: "Changes to Terms",
    subsections: [
      {
        heading: null,
        body: 'We reserve the right to modify these Terms at any time. We will notify you of any changes by updating the "Last updated" date at the top of this page and, where material, by providing additional notice. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. You are advised to review these Terms periodically.',
      },
    ],
  },
  {
    title: "Contact Us",
    subsections: [
      {
        heading: null,
        body: "If you have any questions about these Terms and Conditions, please contact us:",
        list: [
          { term: "By email", def: "info@keegoproperties.com" },
          { term: "By phone", def: "+971 54 391 2231" },
          { term: "By address", def: "Wafi Residence Office Block : LHEU -FF-06, Al Razi Street, Dubai Health Care City, Dubai, UAE" },
        ],
      },
    ],
  },
];

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
      <Navbar />

      {/* Hero */}
      <section className="bg-navy-dark pt-40 pb-16">
        <div className="container mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-3">Legal</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">Terms &amp; Conditions</h1>
          <p className="text-white/60 text-sm">Last updated: {LAST_UPDATED}</p>
          <p className="mt-5 max-w-2xl text-white/70 text-sm leading-relaxed">
            Please read these Terms and Conditions carefully before using the Keego Properties website or any of our
            services. By accessing or using the Service, you agree to be bound by these terms.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[240px_1fr] gap-10">

            {/* Sticky ToC */}
            <nav className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl border border-border bg-white p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-4">Contents</p>
                <ol className="space-y-2">
                  {sections.map((s, i) => (
                    <li key={s.title}>
                      <a
                        href={`#section-${i}`}
                        className="text-xs text-muted-foreground leading-snug hover:text-foreground transition-colors"
                      >
                        {i + 1}. {s.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            {/* Body */}
            <div className="space-y-10">
              {sections.map((section, i) => (
                <div
                  key={section.title}
                  id={`section-${i}`}
                  className="rounded-3xl border border-border bg-white p-8 shadow-sm scroll-mt-32"
                >
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-5 pb-3 border-b border-border">
                    {i + 1}. {section.title}
                  </h2>
                  {section.subsections.map((sub, j) => (
                    <div key={j} className="mb-5 last:mb-0">
                      {sub.heading && (
                        <h3 className="font-semibold text-foreground mb-2">{sub.heading}</h3>
                      )}
                      {sub.body && (
                        <p className="text-sm leading-relaxed text-muted-foreground mb-3">{sub.body}</p>
                      )}
                      {sub.list && (
                        <ul className="space-y-2">
                          {sub.list.map((item) => (
                            <li key={item.term} className="flex gap-2 text-sm text-muted-foreground">
                              <span className="shrink-0 font-medium text-foreground">{item.term}:</span>
                              <span className="leading-relaxed">{item.def}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ))}

              {/* CTA */}
              <div className="rounded-3xl bg-navy-dark p-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">Need Assistance?</p>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">We're here to help</h3>
                <p className="text-white/65 text-sm mb-6">
                  If you have any questions or concerns about these Terms, our team is ready to assist you.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-2.5 text-sm font-semibold text-navy-dark hover:bg-gold/90 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
