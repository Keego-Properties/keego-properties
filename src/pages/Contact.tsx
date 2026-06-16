import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    lookingTo: "",
    category: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      await addDoc(collection(db, "submissions"), {
        source: "contact_form",
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        lookingTo: formData.lookingTo,
        category: formData.category,
        message: formData.message.trim(),
        read: false,
        createdAt: Timestamp.now(),
      });

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        lookingTo: "",
        category: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission failed:", error);
      toast({
        title: "Submission failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+971 54 391 2231", href: "tel:+971543912231" },
    { icon: Mail, label: "Email", value: "info@keegoproperties.com", href: "mailto:info@keegoproperties.com" },
    { icon: MapPin, label: "Office", value: "Wafi Residence Office Block : LHEU -FF-06, Al Razi Street, Dubai Health Care City, Dubai, UAE" },
    { icon: Clock, label: "Hours", value: "Sun-Thu: 9AM-6PM" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold/35 via-gold/20 to-cream">
      <Navbar />
      <section className="pt-56 md:pt-32 pb-8 bg-navy-dark">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Get in Touch</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Contact Us
          </h1>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Have a question or need expert advice? Our team is ready to help you.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-12">
            <div className="md:col-span-2">
              <p className="text-gold font-medium tracking-[0.2em] uppercase text-sm mb-2">Reach Out</p>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                We'd Love to Hear From You
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="font-medium text-foreground hover:text-gold transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] space-y-4">
                <p className="text-gold font-medium uppercase tracking-[0.2em] text-xs">Contact Form</p>
                <h3 className="font-serif text-2xl font-bold text-foreground">Tell us what you need.</h3>
                <p className="text-muted-foreground text-sm leading-relaxed pb-1">
                  Share your requirement and our team will contact you within 24 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      required
                      className="h-10 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      required
                      className="h-10 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      required
                      className="h-10 rounded-md"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 XXX XXXX"
                      className="h-10 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">I am looking to</label>
                    <select
                      value={formData.lookingTo}
                      onChange={(e) => setFormData({ ...formData, lookingTo: e.target.value })}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      <option value="">Select...</option>
                      <option value="buy">Buy</option>
                      <option value="rent">Rent</option>
                      <option value="sell">Sell</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-foreground">Property Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-gold"
                    >
                      <option value="">Select...</option>
                      <option value="Off-plan">Off-plan</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your property needs..."
                    required
                    rows={4}
                    className="rounded-md resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-full bg-gold text-navy-dark font-semibold hover:bg-gold/90 h-11"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sending ? "Sending..." : "Submit Enquiry"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
