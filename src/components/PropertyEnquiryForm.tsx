"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

interface PropertyEnquiryFormProps {
  defaultType?: "buy" | "rent" | "all";
  propertyName?: string;
}

const emptyFields = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  budget: "",
  message: "",
};

const PropertyEnquiryForm = ({ defaultType = "all", propertyName }: PropertyEnquiryFormProps) => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lookingTo, setLookingTo] = useState(defaultType === "all" ? "" : defaultType);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [fields, setFields] = useState(emptyFields);

  const set = (key: keyof typeof emptyFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const subCategoryOptions: Record<string, string[]> = {
    "Off-plan":    ["Apartments", "Villas", "Town House", "Penthouse"],
    "Residential": ["Apartments", "Town House", "Penthouse", "Villas"],
    "Commercial":  ["Office"],
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "enquiries"), {
        firstName: fields.firstName.trim(),
        lastName: fields.lastName.trim(),
        email: fields.email.trim(),
        phone: fields.phone.trim(),
        budget: fields.budget.trim(),
        message: fields.message.trim(),
        lookingTo,
        category,
        subCategory,
        propertyName: propertyName ?? "",
        source: "property_detail",
        read: false,
        createdAt: Timestamp.now(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Enquiry submission failed:", err);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-navy-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Get In Touch</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-3">
            Enquire About a Property
          </h2>
          {propertyName && (
            <div className="inline-block mt-2 mb-1 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 text-gold text-sm font-medium">
              {propertyName}
            </div>
          )}
          <p className="text-primary-foreground/60 mt-2">
            Fill in the form below and one of our agents will get back to you shortly.
          </p>
        </div>

        {submitted ? (
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 py-12 text-center">
            <CheckCircle2 className="w-14 h-14 text-gold" />
            <h3 className="font-serif text-2xl font-bold text-primary-foreground">Enquiry Sent!</h3>
            <p className="text-primary-foreground/60 max-w-md">
              Thank you for reaching out. One of our agents will contact you shortly
              {propertyName ? ` regarding <strong>${propertyName}</strong>` : ""}.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFields(emptyFields); setLookingTo(defaultType === "all" ? "" : defaultType); setCategory(""); setSubCategory(""); }}
              className="mt-2 text-sm text-gold underline underline-offset-4 hover:text-gold/80 transition-colors"
            >
              Submit another enquiry
            </button>
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
                value={fields.firstName}
                onChange={set("firstName")}
                placeholder="John"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Last Name *</label>
              <input
                type="text"
                required
                value={fields.lastName}
                onChange={set("lastName")}
                placeholder="Doe"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Email Address *</label>
              <input
                type="email"
                required
                value={fields.email}
                onChange={set("email")}
                placeholder="john@example.com"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-primary-foreground/60">Phone Number</label>
              <input
                type="tel"
                value={fields.phone}
                onChange={set("phone")}
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
                value={fields.budget}
                onChange={set("budget")}
                placeholder="e.g. 1,500,000"
                className="h-10 rounded-md border border-primary-foreground/20 bg-transparent px-3 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="text-xs text-primary-foreground/60">Message</label>
              <textarea
                rows={4}
                value={fields.message}
                onChange={set("message")}
                placeholder="Tell us what you're looking for…"
                className="rounded-md border border-primary-foreground/20 bg-transparent px-3 py-2 text-sm text-primary-foreground placeholder:text-primary-foreground/35 focus:border-gold focus:outline-none resize-none"
              />
            </div>

            <div className="sm:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-11 items-center gap-2 rounded-md border border-gold px-8 text-sm font-medium text-gold transition-colors hover:bg-gold hover:text-black disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default PropertyEnquiryForm;
