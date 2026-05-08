import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { sendEnquiryNotification } from "@/lib/emailNotifications";

const Contact = () => {
  const { toast } = useToast();
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const notifyResult = await sendEnquiryNotification({
        source: "contact_form",
        subject: "New Contact Form Submission",
        message: formData.message.trim(),
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        phone: formData.phone.trim(),
      });

      toast({
        title: "Message Sent!",
        description: notifyResult.sent
          ? "We'll get back to you within 24 hours."
          : "Message received. Email notification is not configured yet.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
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
    { icon: MapPin, label: "Office", value: "Business Bay, Dubai, UAE" },
    { icon: Clock, label: "Hours", value: "Sun-Thu: 9AM-6PM" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-8 bg-navy-dark">
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
              <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-[var(--shadow-card)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      required
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+971 50 XXX XXXX"
                    className="rounded-xl h-12"
                  />
                </div>
                <div className="mb-6">
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your property needs..."
                    required
                    rows={5}
                    className="rounded-xl resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={sending}
                  className="w-full bg-navy hover:bg-navy-light text-primary-foreground rounded-xl h-12 text-base font-medium transition-all duration-300"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {sending ? "Sending..." : "Send Message"}
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
