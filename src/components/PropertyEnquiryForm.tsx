import { useState } from "react";
import { Send } from "lucide-react";

interface PropertyEnquiryFormProps {
  defaultType?: "buy" | "rent" | "all";
}

const PropertyEnquiryForm = ({ defaultType = "all" }: PropertyEnquiryFormProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [lookingTo, setLookingTo] = useState(defaultType === "all" ? "" : defaultType);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const subCategoryOptions: Record<string, string[]> = {
    "Off-plan":    ["Apartments", "Villas", "Town House", "Penthouse"],
    "Residential": ["Apartments", "Town House", "Penthouse", "Villas"],
    "Commercial":  ["Office"],
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire up to backend / Firebase
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-navy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Get In Touch</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            Enquire About a Property
          </h2>
          <p className="text-primary-foreground/60">
            Fill in the form below and one of our agents will get back to you shortly.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-3xl mx-auto text-center py-10">
            <p className="text-gold text-lg font-medium">Thank you! We'll be in touch soon.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-3xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">First Name *</label>
              <input
                type="text"
                required
                placeholder="John"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Last Name *</label>
              <input
                type="text"
                required
                placeholder="Doe"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Email Address *</label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Phone Number</label>
              <input
                type="tel"
                placeholder="+971 50 000 0000"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">I'm looking to</label>
              <select
                value={lookingTo}
                onChange={(e) => setLookingTo(e.target.value)}
                className="h-10 rounded-md border border-primary-foreground/20 bg-navy-dark px-3 text-sm text-primary-foreground focus:border-gold focus:outline-none"
              >
                <option value="" disabled>Select…</option>
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Property Category</label>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setSubCategory(""); }}
                className="h-10 rounded-md border border-primary-foreground/20 bg-navy-dark px-3 text-sm text-primary-foreground focus:border-gold focus:outline-none"
              >
                <option value="" disabled>Select…</option>
                <option value="Off-plan">Off-plan</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Sub-category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                disabled={!category}
                className="h-10 rounded-md border border-primary-foreground/20 bg-navy-dark px-3 text-sm text-primary-foreground focus:border-gold focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="" disabled>{category ? "Select…" : "Select a category first"}</option>
                {(subCategoryOptions[category] ?? []).map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Budget (AED)</label>
              <input
                type="text"
                placeholder="e.g. 1,500,000"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-xs text-primary-foreground/60">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us what you're looking for…"
                className="rounded-md border border-primary-foreground/20 bg-transparent px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none resize-none"
              />
            </div>

            <div className="sm:col-span-2 flex justify-center">
              <button
                type="submit"
                className="inline-flex h-11 items-center gap-2 rounded-md border border-gold px-8 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-black"
              >
                Send Enquiry
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default PropertyEnquiryForm;
